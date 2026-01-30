'use server';

import { db } from '@/db';
import { users, otpVerifications } from '@/db/schema';
import { requireAuth } from '@/lib/auth';
import { 
  cleanPhoneNumber, 
  isValidBrazilianPhone, 
  generateOTPCode, 
  sendOTPMessage,
  formatPhoneForEvolution 
} from '@/lib/whatsapp';
import { eq, and, gte, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS_PER_HOUR = 5;

interface OTPResult {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Request OTP verification code for a phone number
 */
export async function requestOTP(phone: string): Promise<OTPResult> {
  try {
    const user = await requireAuth();
    
    // Clean and validate phone
    const cleanedPhone = cleanPhoneNumber(phone);
    
    if (!isValidBrazilianPhone(cleanedPhone)) {
      return {
        success: false,
        error: 'Número de telefone inválido. Use o formato (XX) XXXXX-XXXX',
      };
    }

    // Check if this phone is already linked to another user
    const existingUserWithPhone = await db
      .select()
      .from(users)
      .where(eq(users.externalIdentity, formatPhoneForEvolution(cleanedPhone)))
      .limit(1);

    if (existingUserWithPhone.length > 0 && existingUserWithPhone[0].id !== user.id) {
      return {
        success: false,
        error: 'Este número já está vinculado a outra conta.',
      };
    }

    // Check rate limit: max 5 attempts per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentAttempts = await db
      .select()
      .from(otpVerifications)
      .where(
        and(
          eq(otpVerifications.userId, user.id),
          gte(otpVerifications.createdAt, oneHourAgo)
        )
      );

    if (recentAttempts.length >= MAX_ATTEMPTS_PER_HOUR) {
      return {
        success: false,
        error: 'Muitas tentativas. Aguarde 1 hora para tentar novamente.',
      };
    }

    // Generate OTP code
    const code = generateOTPCode();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Save OTP to database
    await db.insert(otpVerifications).values({
      userId: user.id,
      phoneNumber: cleanedPhone,
      code,
      expiresAt,
      verified: false,
      attempts: 0,
    });

    // Send OTP via WhatsApp
    const sendResult = await sendOTPMessage(cleanedPhone, code);

    if (!sendResult.success) {
      return {
        success: false,
        error: sendResult.error || 'Falha ao enviar código. Tente novamente.',
      };
    }

    return {
      success: true,
      message: 'Código enviado para seu WhatsApp!',
    };
  } catch (error) {
    console.error('Error requesting OTP:', error);
    return {
      success: false,
      error: 'Erro ao processar solicitação. Tente novamente.',
    };
  }
}

/**
 * Verify OTP code and link phone to user account
 */
export async function verifyOTP(phone: string, code: string): Promise<OTPResult> {
  try {
    const user = await requireAuth();
    const cleanedPhone = cleanPhoneNumber(phone);

    // Find the most recent OTP for this user and phone
    const [otpRecord] = await db
      .select()
      .from(otpVerifications)
      .where(
        and(
          eq(otpVerifications.userId, user.id),
          eq(otpVerifications.phoneNumber, cleanedPhone),
          eq(otpVerifications.verified, false)
        )
      )
      .orderBy(desc(otpVerifications.createdAt))
      .limit(1);

    if (!otpRecord) {
      return {
        success: false,
        error: 'Nenhum código pendente encontrado. Solicite um novo código.',
      };
    }

    // Check if expired
    if (new Date() > otpRecord.expiresAt) {
      return {
        success: false,
        error: 'Código expirado. Solicite um novo código.',
      };
    }

    // Increment attempts
    await db
      .update(otpVerifications)
      .set({ attempts: otpRecord.attempts + 1 })
      .where(eq(otpVerifications.id, otpRecord.id));

    // Check max attempts for this specific OTP
    if (otpRecord.attempts >= 3) {
      return {
        success: false,
        error: 'Muitas tentativas incorretas. Solicite um novo código.',
      };
    }

    // Verify code
    if (otpRecord.code !== code.trim()) {
      return {
        success: false,
        error: 'Código incorreto. Tente novamente.',
      };
    }

    // Mark OTP as verified
    await db
      .update(otpVerifications)
      .set({ verified: true })
      .where(eq(otpVerifications.id, otpRecord.id));

    // Update user's external_identity with WhatsApp format
    const externalIdentity = formatPhoneForEvolution(cleanedPhone);
    await db
      .update(users)
      .set({ externalIdentity })
      .where(eq(users.id, user.id));

    revalidatePath('/');

    return {
      success: true,
      message: 'WhatsApp vinculado com sucesso!',
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      error: 'Erro ao verificar código. Tente novamente.',
    };
  }
}

/**
 * Check if current user has WhatsApp linked
 */
export async function getWhatsAppStatus(): Promise<{ linked: boolean; phone?: string }> {
  try {
    const user = await requireAuth();
    
    if (user.externalIdentity) {
      // Extract phone number from format: 5584988992141@s.whatsapp.net
      const phone = user.externalIdentity.replace('@s.whatsapp.net', '');
      return { linked: true, phone };
    }
    
    return { linked: false };
  } catch {
    return { linked: false };
  }
}

/**
 * Unlink WhatsApp from current user
 */
export async function unlinkWhatsApp(): Promise<OTPResult> {
  try {
    const user = await requireAuth();
    
    await db
      .update(users)
      .set({ externalIdentity: null })
      .where(eq(users.id, user.id));

    revalidatePath('/');

    return {
      success: true,
      message: 'WhatsApp desvinculado com sucesso.',
    };
  } catch (error) {
    console.error('Error unlinking WhatsApp:', error);
    return {
      success: false,
      error: 'Erro ao desvincular. Tente novamente.',
    };
  }
}

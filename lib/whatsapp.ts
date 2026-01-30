/**
 * WhatsApp integration via Evolution API
 * Handles sending messages through WhatsApp
 */

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE;

interface SendMessageResponse {
  success: boolean;
  error?: string;
}

/**
 * Converts a phone number to Evolution API format
 * Input: 5584988992141 (only numbers with country code)
 * Output: 5584988992141@s.whatsapp.net
 */
export function formatPhoneForEvolution(phone: string): string {
  // Remove any non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  return `${cleanPhone}@s.whatsapp.net`;
}

/**
 * Extracts clean phone number from various formats
 * Input: (84) 98899-2141 or +55 84 98899-2141 or 5584988992141
 * Output: 5584988992141
 * 
 * Also normalizes Brazilian mobile numbers:
 * - Old format (8 digits): 55 84 96843647 → 55 84 996843647 (adds 9)
 * - New format (9 digits): 55 84 996843647 → unchanged
 */
export function cleanPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If number doesn't start with country code (55), add it
  if (!cleaned.startsWith('55') && cleaned.length <= 11) {
    cleaned = '55' + cleaned;
  }
  
  // Normalize Brazilian mobile numbers to always have 9 digits
  // Format: 55 + DDD(2) + number(8 or 9)
  // If it has 12 digits (55 + 2 + 8), add the 9 prefix to make it 13
  if (cleaned.length === 12 && cleaned.startsWith('55')) {
    const ddd = cleaned.slice(2, 4);
    const number = cleaned.slice(4);
    // Brazilian mobile numbers should start with 9 and have 9 digits
    // If it's 8 digits and looks like a mobile (starts with 6,7,8,9), add the 9
    if (/^[6-9]/.test(number)) {
      cleaned = `55${ddd}9${number}`;
    }
  }
  
  return cleaned;
}

/**
 * Normalizes a phone number for consistent storage/comparison
 * Always returns format: 5584996843647@s.whatsapp.net
 */
export function normalizePhoneForStorage(phone: string): string {
  const cleaned = cleanPhoneNumber(phone.replace('@s.whatsapp.net', ''));
  return `${cleaned}@s.whatsapp.net`;
}

/**
 * Validates if phone number has correct format
 * Expected: 55 + DDD (2 digits) + number (8-9 digits) = 12-13 digits total
 */
export function isValidBrazilianPhone(phone: string): boolean {
  const cleaned = cleanPhoneNumber(phone);
  // Brazilian phones: 55 + 2 digit DDD + 8-9 digit number = 12-13 digits
  return /^55\d{10,11}$/.test(cleaned);
}

/**
 * Sends a WhatsApp message via Evolution API
 */
export async function sendWhatsAppMessage(
  phone: string,
  text: string
): Promise<SendMessageResponse> {
  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY || !EVOLUTION_INSTANCE) {
    console.error('Evolution API environment variables not configured');
    return {
      success: false,
      error: 'Configuração do WhatsApp não encontrada. Contate o suporte.',
    };
  }

  const formattedPhone = formatPhoneForEvolution(phone);
  const url = `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number: formattedPhone,
        text: text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Evolution API error:', errorData);
      return {
        success: false,
        error: 'Falha ao enviar mensagem. Tente novamente.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return {
      success: false,
      error: 'Erro de conexão com o serviço de WhatsApp.',
    };
  }
}

/**
 * Generates a 6-digit OTP code
 */
export function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Sends OTP verification message via WhatsApp
 */
export async function sendOTPMessage(
  phone: string,
  code: string
): Promise<SendMessageResponse> {
  const message = `🔐 *Código de Verificação*\n\nSeu código é: *${code}*\n\nEste código expira em 5 minutos.\n\n_Dashboard Financeiro_`;
  
  return sendWhatsAppMessage(phone, message);
}

"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "@/lib/neon-auth/client";

export function NeonAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={
        authClient as unknown as Parameters<
          typeof NeonAuthUIProvider
        >[0]["authClient"]
      }
    >
      {children}
    </NeonAuthUIProvider>
  );
}

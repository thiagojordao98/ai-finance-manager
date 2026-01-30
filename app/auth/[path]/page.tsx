import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { ThemeToggle } from "@/components/auth/theme-toggle";
import { redirect } from "next/navigation";

export const dynamicParams = false;

export default async function AuthPage({
  params,
}: {
  params: { path: string };
}) {
  // Only allow sign-in and sign-up paths
  if (params.path !== "sign-in" && params.path !== "sign-up") {
    redirect("/auth/sign-in");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Content */}
      <div className="relative z-10">
        {params.path === "sign-in" ? <SignInForm /> : <SignUpForm />}
      </div>
    </main>
  );
}

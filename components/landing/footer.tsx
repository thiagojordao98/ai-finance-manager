import Link from "next/link";
import { MessageSquare, Mail, FileText } from "lucide-react";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Dashboard Financeiro
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Controle suas finanças de forma simples e eficiente, diretamente
              pelo WhatsApp. Sem complicação, sem mensalidade.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#como-funciona"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link
                  href="#beneficios"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  Benefícios
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/sign-up"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  Começar Grátis
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/auth/sign-in"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  Fazer Login
                </Link>
              </li>
              <li>
                <a
                  href="mailto:suporte@dashboardfinanceiro.com"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Dashboard Financeiro. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-green-500 transition-colors text-sm"
            >
              Privacidade
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-green-500 transition-colors text-sm"
            >
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-brand-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-light rounded-lg flex items-center justify-center font-bold text-lg">
            P
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Portal PEC</h1>
            <p className="text-xs text-brand-light">URE Jales</p>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-brand-light transition-colors">Início</Link>
          <Link href="/sobre" className="hover:text-brand-light transition-colors">Sobre</Link>
          <Link href="/contato" className="hover:text-brand-light transition-colors">Contato</Link>
        </nav>
      </div>
    </header>
  );
}

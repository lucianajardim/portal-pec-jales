export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} Portal PEC URE Jales
        </p>
        <p className="text-xs text-brand-light mt-1">
          Diretoria de Ensino - Região de Jales
        </p>
      </div>
    </footer>
  );
}

export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2.5 border-t border-nb-gold/30 bg-nb-black px-4 py-3 md:hidden">
      <a href="/catalogo" className="btn-primary flex-1 text-center">
        Comprar ahora 🔥
      </a>
    </div>
  );
}

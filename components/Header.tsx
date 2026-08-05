import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Aros", href: "/catalogo?categoria=aros" },
  { label: "Collares", href: "/catalogo?categoria=collares" },
  { label: "Pulseras", href: "/catalogo?categoria=pulseras" },
  { label: "Anillos", href: "/catalogo?categoria=anillos" },
  { label: "Ofertas", href: "/catalogo?ofertas=1" },
];

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-nb-gold/20 bg-nb-black/90 px-6 py-3 backdrop-blur md:px-12">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Negra Brava"
          width={52}
          height={52}
          className="rounded-full drop-shadow-[0_0_10px_rgba(224,86,27,0.6)]"
        />
        <span className="font-script text-2xl text-nb-gold-light">Negra Brava</span>
      </Link>

      <ul className="hidden gap-9 text-xs uppercase tracking-wideish text-nb-cream/85 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition hover:text-nb-gold-light hover:opacity-100">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5 text-xs uppercase tracking-wide text-nb-gold-light">
        <span className="hidden sm:inline">🔍</span>
        <Link
          href="/carrito"
          className="flex items-center gap-1.5 rounded-full border border-nb-gold px-3.5 py-1.5 transition hover:bg-nb-gold hover:text-nb-black"
        >
          🛍 Carrito
        </Link>
      </div>
    </nav>
  );
}

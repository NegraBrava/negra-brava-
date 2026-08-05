import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import StickyMobileCta from "@/components/StickyMobileCta";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

const FALLBACK_CATEGORIES = ["Aros", "Collares", "Pulseras", "Anillos", "Conjuntos", "Accesorios"];

const FALLBACK_PRODUCTS = [
  {
    slug: "aros-luna-dorada",
    name: "Aros Luna Dorada",
    price: 14990,
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    badge: "bestseller" as const,
    reviewCount: 48,
    lowStock: 4,
  },
  {
    slug: "collar-ambar",
    name: "Collar Ámbar",
    price: 18990,
    compareAtPrice: 23990,
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    badge: "new" as const,
    reviewCount: 31,
  },
  {
    slug: "pulsera-trenzada",
    name: "Pulsera Trenzada",
    price: 9990,
    imageUrl: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=500&q=80",
    reviewCount: 22,
  },
  {
    slug: "anillo-brava",
    name: "Anillo Brava",
    price: 7990,
    imageUrl: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&q=80",
    badge: "bestseller" as const,
    reviewCount: 57,
    lowStock: 2,
  },
];

const COLLECTIONS = [
  {
    title: "Pulseras Brava",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80",
    copy: "Pulseras que abrazan tu fuerza. Cada pieza rodea tu muñeca como un recordatorio: tu poder está en lo que eliges sostener.",
  },
  {
    title: "Anillos Brava",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&q=80",
    copy: "Anillos que sellan un compromiso contigo. No prometen para siempre a otros, sino a ti misma. Atreverte a usarlos es afirmar tu valor.",
  },
  {
    title: "Aros Brava",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    copy: "Aros que enmarcan quién eres. No acompañan: afirman. Pensados para mujeres que no bajan la mirada y saben que la presencia también se elige.",
  },
];

const TESTIMONIALS = [
  {
    text: "Llegó súper rápido y la calidad superó lo que esperaba por el precio. Los aros son mi nuevo favorito.",
    name: "Camila R.",
    city: "Santiago",
  },
  {
    text: "Compré por WhatsApp y me respondieron al tiro. Toda la experiencia se sintió muy cercana y profesional.",
    name: "Valentina M.",
    city: "Concepción",
  },
  {
    text: "El anillo es una locura de bonito, y llegó bien embalado. Ya voy en mi tercera compra.",
    name: "Fernanda T.",
    city: "Viña del Mar",
  },
];

const FAQS = [
  {
    q: "¿Cuánto tarda el despacho?",
    a: "Entre 2 y 5 días hábiles según tu comuna, con seguimiento enviado directo a tu correo y WhatsApp.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Webpay, Mercado Pago y transferencia bancaria. Todos los pagos son 100% seguros y encriptados.",
  },
  {
    q: "¿Puedo cambiar un producto?",
    a: "Sí, tienes 30 días desde la compra para cambios, siempre que el producto esté sin uso y con su empaque original.",
  },
  {
    q: "¿Los materiales son hipoalergénicos?",
    a: "Sí, trabajamos con materiales bañados y tratados para minimizar reacciones en piel sensible.",
  },
];

export default async function HomePage() {
  const [dbCategories, dbFeatured] = await Promise.all([
    db.category.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    db.product
      .findMany({
        where: { featured: true, status: "ACTIVO" },
        take: 8,
        include: { images: { take: 1, orderBy: { order: "asc" } } },
      })
      .catch(() => []),
  ]);

  const categories = dbCategories.length > 0 ? dbCategories.map((c) => c.name) : FALLBACK_CATEGORIES;

  return (
    <main>
      <AnnouncementBar />
      <Header />

      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-10 text-center [background:radial-gradient(ellipse_60%_50%_at_15%_100%,rgba(224,86,27,.35),transparent_60%),radial-gradient(ellipse_50%_40%_at_85%_0%,rgba(232,163,61,.18),transparent_60%),theme(colors.nb.black)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nb-black" />
        <Image
          src="/logo.png"
          alt="Negra Brava"
          width={230}
          height={230}
          className="relative z-10 rounded-full drop-shadow-[0_0_50px_rgba(224,86,27,0.55)]"
          priority
        />
        <span className="relative z-10 mt-5 text-xs uppercase tracking-[0.35em] text-nb-gold">
          ✦ Accesorios de moda
        </span>
        <h1 className="relative z-10 font-script text-6xl text-nb-gold-light drop-shadow-[0_0_40px_rgba(224,86,27,0.5)] md:text-7xl">
          Negra Brava
        </h1>
        <h2 className="relative z-10 mt-3 max-w-xl font-display text-2xl text-nb-cream">
          Accesorios con carácter, hechos para acompañarte
        </h2>
        <p className="relative z-10 mt-3 font-script text-lg text-nb-flame">
          Soy fuego, soy estilo, soy Brava 🔥
        </p>
        <p className="relative z-10 mt-3 max-w-md text-sm text-nb-cream/60">
          Diseño chileno, materiales cuidados y una identidad que no pasa desapercibida.
        </p>
        <div className="relative z-10 mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/catalogo" className="btn-primary">
            Comprar ahora
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56900000000"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
        <div className="relative z-10 mt-7 flex items-center gap-2 text-sm text-nb-cream/75">
          <span className="tracking-widest text-nb-gold-light">★★★★★</span>
          4.9/5 · +500 Bravas ya eligieron sus piezas
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-10 border-b border-nb-gold/15 bg-nb-charcoal px-6 py-6 text-xs text-nb-cream/75">
        <span>🚚 <strong className="text-nb-gold-light">Envío gratis</strong> sobre $30.000</span>
        <span>🔒 <strong className="text-nb-gold-light">Pago 100% seguro</strong> Webpay / Mercado Pago</span>
        <span>↺ <strong className="text-nb-gold-light">30 días</strong> para cambios</span>
        <span>💬 <strong className="text-nb-gold-light">Atención</strong> por WhatsApp en minutos</span>
      </div>

      <section className="border-b border-nb-gold/15 bg-nb-charcoal">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:px-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-nb-gold">Quiénes somos</span>
            <h2 className="mb-6 mt-3 font-script text-5xl text-nb-gold-light">Negra Brava</h2>
            <blockquote className="border-l-2 border-nb-flame pl-6 font-display text-xl italic leading-relaxed text-nb-cream">
              En Negra Brava creemos que el amor propio también se viste.
              <br />
              No usamos accesorios para adornarnos, los usamos para recordarnos quiénes somos.
              <br />
              Atreverse a elegirlos es un acto de presencia, de estilo y de poder personal.
              <br />
              Porque no es lo que llevas: es lo que eliges para ti.
            </blockquote>
          </div>
          <div className="aspect-[4/5] overflow-hidden border border-nb-gold/20 bg-nb-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=700&q=80"
              alt="Mujer con accesorios dorados Negra Brava"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-14 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-nb-gold">✦ Elección Brava</span>
        <h3 className="mt-2 font-display text-3xl tracking-wide text-nb-cream">ELECCIÓN BRAVA</h3>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-nb-cream/65">
          Piezas que nacen del amor propio y de la libertad de ser sin justificarte.
          <br />
          No es joyería. <strong className="text-nb-gold-light">Es identidad.</strong>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <p className="mb-1 text-center text-xs uppercase tracking-[0.15em] text-nb-gold">Explora</p>
        <h2 className="mb-8 text-center font-display text-3xl">Categorías</h2>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/catalogo?categoria=${encodeURIComponent(cat.toLowerCase())}`}
              className="border border-nb-gold/25 bg-nb-gold/[0.03] p-7 text-center text-xs uppercase tracking-wide transition hover:border-nb-flame hover:bg-nb-flame/10 hover:text-nb-gold-light"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <p className="mb-1 text-center text-xs uppercase tracking-[0.15em] text-nb-gold">
          Los favoritos de las Bravas
        </p>
        <h2 className="mb-10 text-center font-display text-3xl">Más vendidos</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {(dbFeatured.length > 0
            ? dbFeatured.map((p) => ({
                slug: p.slug,
                name: p.name,
                price: p.price,
                compareAtPrice: p.compareAtPrice,
                imageUrl: p.images[0]?.url ?? "",
              }))
            : FALLBACK_PRODUCTS
          ).map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <p className="mb-1 text-center text-xs uppercase tracking-[0.15em] text-nb-gold">
          Cada pieza cuenta una historia
        </p>
        <h2 className="mb-10 text-center font-display text-3xl">Colecciones Brava</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <div key={c.title} className="border border-nb-gold/15 bg-nb-charcoal">
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-display text-xl text-nb-gold-light">{c.title}</h3>
                <p className="text-sm leading-relaxed text-nb-cream/65">{c.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <p className="mb-1 text-center text-xs uppercase tracking-[0.15em] text-nb-gold">
          Prueba social
        </p>
        <h2 className="mb-10 text-center font-display text-3xl">Lo que dicen las Bravas</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="border border-nb-gold/15 bg-nb-charcoal p-7">
              <span className="mb-3 block text-nb-gold-light">★★★★★</span>
              <p className="text-sm italic leading-relaxed text-nb-cream/80">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-2.5 text-xs text-nb-gold-light">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-nb-ember to-nb-gold text-xs font-bold text-nb-black">
                  {t.name[0]}
                </span>
                {t.name} — {t.city}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.15em] text-nb-gold">Síguenos</p>
            <h2 className="font-display text-3xl">@negra.brava en Instagram</h2>
          </div>
          <a
            href="https://instagram.com/negra.brava"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Seguir cuenta
          </a>
        </div>
        <div className="grid grid-cols-3 gap-1.5 md:grid-cols-6">
          {FALLBACK_PRODUCTS.concat(FALLBACK_PRODUCTS.slice(0, 2)).map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={p.imageUrl.replace("w=500", "w=300")}
              alt=""
              className="aspect-square object-cover transition hover:scale-105"
            />
          ))}
        </div>
      </section>

      <section className="border-y border-nb-gold/15 bg-nb-charcoal px-6 py-16 text-center">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          <div>
            <div className="mb-2 text-xl">🔥</div>
            <h3 className="font-display text-xl text-nb-gold-light">Despacho a todo Chile</h3>
            <p className="mt-2 text-sm text-nb-cream/60">
              Envíos por Chilexpress y Starken, seguimiento en cada pedido.
            </p>
          </div>
          <div>
            <div className="mb-2 text-xl">🔥</div>
            <h3 className="font-display text-xl text-nb-gold-light">Pago seguro</h3>
            <p className="mt-2 text-sm text-nb-cream/60">Webpay, Mercado Pago y transferencia.</p>
          </div>
          <div>
            <div className="mb-2 text-xl">🔥</div>
            <h3 className="font-display text-xl text-nb-gold-light">Atención cercana</h3>
            <p className="mt-2 text-sm text-nb-cream/60">Respondemos por WhatsApp en minutos.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-12">
        <p className="mb-1 text-center text-xs uppercase tracking-[0.15em] text-nb-gold">
          Resolvemos tus dudas
        </p>
        <h2 className="mb-8 text-center font-display text-3xl">Preguntas frecuentes</h2>
        <div>
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-nb-gold/20 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-nb-cream">
                {f.q}
                <span className="ml-4 text-lg text-nb-gold group-open:hidden">+</span>
                <span className="ml-4 hidden text-lg text-nb-gold group-open:inline">–</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-nb-cream/60">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-nb-gold/20 bg-gradient-to-br from-nb-ember-dark to-nb-charcoal px-6 py-20 text-center">
        <h2 className="font-script text-4xl text-nb-gold-light">Únete a las Bravas</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-nb-cream/65">
          Sé la primera en enterarte de nuevas colecciones y ofertas exclusivas.
        </p>
        <form className="mx-auto mt-7 flex max-w-md flex-wrap justify-center gap-2.5">
          <input
            type="email"
            required
            placeholder="Tu correo electrónico"
            className="min-w-[220px] flex-1 border border-nb-gold/30 bg-nb-black px-4 py-3.5 text-sm text-nb-cream placeholder:text-nb-cream/40"
          />
          <button type="submit" className="bg-nb-gold px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-nb-black">
            Quiero mi 10% dcto
          </button>
        </form>
      </section>

      <footer className="flex flex-col items-center gap-3.5 border-t border-nb-gold/15 bg-nb-black px-6 py-12 pb-28 text-center text-xs text-nb-cream/50 md:pb-12">
        <Image src="/logo.png" alt="Negra Brava" width={40} height={40} className="rounded-full" />
        <p>
          © 2026 Negra Brava — Santiago, Chile · Instagram · Facebook · TikTok
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 text-[11px] uppercase tracking-wide text-nb-cream/40">
          <span className="border border-nb-cream/20 px-2.5 py-1">Webpay</span>
          <span className="border border-nb-cream/20 px-2.5 py-1">Mercado Pago</span>
          <span className="border border-nb-cream/20 px-2.5 py-1">Transferencia</span>
        </div>
      </footer>

      <WhatsAppFloatButton />
      <StickyMobileCta />
    </main>
  );
      }

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";

type Props = { params: { slug: string } };

async function getProduct(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      category: true,
      relatedTo: { include: { relatedProduct: { include: { images: true } } } },
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: product.images[0] ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56900000000";
  const whatsappText = encodeURIComponent(
    `Hola, me interesa el producto ${product.code} - ${product.name} (${process.env.NEXT_PUBLIC_SITE_URL}/producto/${product.slug})`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    description: product.description,
    image: product.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      priceCurrency: "CLP",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-12 md:grid-cols-2">
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-4 aspect-square bg-nb-charcoal">
            {product.images[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0].url}
                alt={product.images[0].altText ?? product.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          {product.images.slice(1).map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.id}
              src={img.url}
              alt={img.altText ?? product.name}
              className="aspect-square object-cover"
            />
          ))}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wideish text-nb-gold-light">
            {product.category.name} · {product.code}
          </p>
          <h1 className="mt-2 font-display text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl">${product.price.toLocaleString("es-CL")}</p>
          {product.compareAtPrice && (
            <p className="text-sm text-nb-cream/40 line-through">
              ${product.compareAtPrice.toLocaleString("es-CL")}
            </p>
          )}

          <p className="mt-6 text-sm leading-relaxed text-nb-cream/70">
            {product.description}
          </p>

          <dl className="mt-6 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium">Material:</dt>
              <dd>{product.material}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Color:</dt>
              <dd>{product.color}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Disponibilidad:</dt>
              <dd>
                {product.stock > 0
                  ? `${product.stock} unidades disponibles`
                  : "Producto agotado"}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3">
            <button className="btn-primary" disabled={product.stock === 0}>
              {product.stock === 0 ? "Producto agotado" : "Agregar al carrito"}
            </button>
            <button className="btn-outline" disabled={product.stock === 0}>
              Comprar ahora
            </button>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {product.relatedTo.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl">También te puede gustar</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {product.relatedTo.map(({ relatedProduct: rp }) => (
              <a key={rp.id} href={`/producto/${rp.slug}`} className="group">
                <div className="aspect-square bg-nb-charcoal">
                  {rp.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={rp.images[0].url}
                      alt={rp.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="mt-2 text-sm">{rp.name}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

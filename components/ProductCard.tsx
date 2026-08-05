import Link from "next/link";

type ProductCardProps = {
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  imageUrl: string;
  badge?: "bestseller" | "new";
  rating?: number;
  reviewCount?: number;
  lowStock?: number;
};

export default function ProductCard({
  slug,
  name,
  price,
  compareAtPrice,
  imageUrl,
  badge,
  rating = 5,
  reviewCount,
  lowStock,
}: ProductCardProps) {
  return (
    <Link href={`/producto/${slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden border border-nb-gold/15 bg-nb-charcoal">
        {badge === "bestseller" && <span className="badge-bestseller">Más vendido</span>}
        {badge === "new" && <span className="badge-new">Nuevo</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-1.5 bg-nb-black/90 py-2.5 text-center text-[11px] uppercase tracking-wide text-nb-gold-light opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          + Agregar al carrito
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm text-nb-cream">{name}</p>
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-nb-cream/55">
          <span className="text-nb-gold-light">{"★".repeat(Math.round(rating))}</span>
          {reviewCount ? <span>({reviewCount})</span> : null}
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[15px] font-semibold text-nb-gold-light">
            ${price.toLocaleString("es-CL")}
          </span>
          {compareAtPrice && (
            <span className="text-xs text-nb-cream/40 line-through">
              ${compareAtPrice.toLocaleString("es-CL")}
            </span>
          )}
        </div>
        {lowStock !== undefined && lowStock > 0 && (
          <p className="mt-0.5 text-[11px] text-nb-flame">Quedan {lowStock} unidades</p>
        )}
      </div>
    </Link>
  );
}

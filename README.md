# Negra Brava — E-commerce

Plataforma de e-commerce para Negra Brava SpA (accesorios femeninos).
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma + PostgreSQL.

## Estado actual: Fase 1 de 5 (+ identidad de marca aplicada)

- [x] Esquema completo de base de datos (`prisma/schema.prisma`)
- [x] Paleta e identidad definitiva basada en el logo real (negro / brasa / dorado) + tipografías Cormorant Garamond, Kaushan Script (estilo del logo) e Inter
- [x] Home optimizada para conversión: barra de urgencia, hero, barra de confianza, "Quiénes somos", Elección Brava, categorías, más vendidos con badges/rating/stock, colecciones (storytelling), testimonios, grilla de Instagram, FAQ, captura de email, CTA fija en mobile
- [x] Página de detalle de producto con SEO (metadata dinámica + JSON-LD)
- [x] Base del webhook de WhatsApp (verificación de Meta)
- [ ] Fase 2 — Carrito, checkout, pagos (Transbank / Mercado Pago)
- [ ] Fase 3 — Panel administrador
- [ ] Fase 4 — Automatización completa de WhatsApp
- [ ] Fase 5 — SEO técnico, analytics, despliegue

### Nota sobre el contenido de la home
Los testimonios y el bloque "Más vendidos" (cuando no hay productos reales en la base de datos) usan **datos de ejemplo** para que la página se vea completa desde ya. Antes de publicar hay que:
1. Cargar tus productos reales vía `prisma/seed.ts` o el panel admin (Fase 3).
2. Reemplazar los testimonios de ejemplo por reseñas reales de clientas (o conectar un widget de reseñas verificadas).
3. Revisar que "Quedan X unidades" refleje el stock real — ya está conectado al modelo `Product.stock`, solo falta que `dbFeatured` traiga ese dato a la card.

## Instalación local

```bash
npm install
cp .env.example .env        # completa tus credenciales
npx prisma migrate dev --name init
npm run seed                 # carga categorías y productos de ejemplo
npm run dev
```

Abre http://localhost:3000

## Antes de la Fase 2, necesito de tu parte

1. **Cuenta de Postgres**: recomiendo [Neon](https://neon.tech) o [Supabase](https://supabase.com) (tier gratuito).
2. **Fotografías de producto** por SKU (mínimo 3 por producto), o dime si quieres que definamos placeholders mientras las gestionas.
3. **Cuenta comercial** en Transbank (Webpay Plus) y/o Mercado Pago — puedes partir en modo integración/sandbox.

## Antes de la Fase 4 (WhatsApp), necesito

1. Una cuenta de **Meta Business** verificada y un número de WhatsApp Business dedicado (no puede ser el que ya usas en el celular personal).
2. Acceso a **developers.facebook.com** para crear la app y obtener `WHATSAPP_ACCESS_TOKEN` y `WHATSAPP_PHONE_NUMBER_ID`.
3. Definir el **horario de atención** para la respuesta automática fuera de horario y el tiempo de espera antes de enviar el recordatorio de carrito abandonado.

## Estructura del proyecto

```
negra-brava/
├── app/
│   ├── page.tsx                    # Home
│   ├── producto/[slug]/page.tsx    # Detalle de producto
│   └── api/webhook/whatsapp/       # Webhook Meta Cloud API
├── components/
│   └── WhatsAppFloatButton.tsx
├── lib/
│   └── db.ts                       # Cliente Prisma
├── prisma/
│   └── schema.prisma                # Modelo de datos completo
└── .env.example
```

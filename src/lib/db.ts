import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type Sql = NeonQueryFunction<false, false>;

/**
 * Lazy Neon Postgres client. Vercel's Neon integration injects
 * DATABASE_URL automatically when you connect the database to the
 * project. Returns null when no database is configured so callers can
 * fall back gracefully.
 */
export function getDb() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

/** Creates the orders table if it doesn't exist. Cheap to call. */
export async function ensureSchema(sql: Sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      stripe_session_id TEXT UNIQUE NOT NULL,
      email TEXT,
      name TEXT,
      phone TEXT,
      shipping_address JSONB,
      quantity INTEGER NOT NULL,
      unit_price_cents INTEGER NOT NULL,
      amount_total_cents INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'aud',
      status TEXT NOT NULL DEFAULT 'paid',
      launch_special BOOLEAN NOT NULL DEFAULT false,
      fulfilled BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

/** How many paid orders exist — drives the launch-special cutoff. */
export async function countOrders(): Promise<number | null> {
  const sql = getDb();
  if (!sql) return null;
  try {
    await ensureSchema(sql);
    const rows = await sql`SELECT count(*)::int AS count FROM orders`;
    return rows[0].count as number;
  } catch (err) {
    console.error("countOrders failed:", err);
    return null;
  }
}

export interface NewOrder {
  stripeSessionId: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  shippingAddress: unknown;
  quantity: number;
  unitPriceCents: number;
  amountTotalCents: number;
  currency: string;
  launchSpecial: boolean;
}

/** Insert a paid order. Idempotent on the Stripe session id. */
export async function insertOrder(order: NewOrder): Promise<void> {
  const sql = getDb();
  if (!sql) {
    console.warn("No DATABASE_URL — order not stored:", order.stripeSessionId);
    return;
  }
  await ensureSchema(sql);
  await sql`
    INSERT INTO orders (
      stripe_session_id, email, name, phone, shipping_address,
      quantity, unit_price_cents, amount_total_cents, currency, launch_special
    ) VALUES (
      ${order.stripeSessionId}, ${order.email}, ${order.name}, ${order.phone},
      ${JSON.stringify(order.shippingAddress)}, ${order.quantity},
      ${order.unitPriceCents}, ${order.amountTotalCents}, ${order.currency},
      ${order.launchSpecial}
    )
    ON CONFLICT (stripe_session_id) DO NOTHING
  `;
}

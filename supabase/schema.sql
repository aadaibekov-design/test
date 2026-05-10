-- Union Merch — database schema
-- Запускать в Supabase SQL Editor

-- Products catalog
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  category TEXT NOT NULL,
  base_price INTEGER NOT NULL, -- минимальная цена в рублях
  images TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders / Requests from clients
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT,
  quantity INTEGER,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Past clients / partners
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Products: public can read active, authenticated can do everything
CREATE POLICY "Public read active products"
  ON products FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated full access products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders: anyone can insert, only authenticated can read/update
CREATE POLICY "Anyone can submit order"
  ON orders FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated can manage orders"
  ON orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Clients: public can read active, authenticated can manage
CREATE POLICY "Public read active clients"
  ON clients FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated full access clients"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

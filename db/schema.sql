-- Suppliers table
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    unit_price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2) NOT NULL,
    current_stock INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 5,
    supplier_id INTEGER REFERENCES suppliers(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock movements table (tracks all stock changes)
CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    movement_type VARCHAR(20) CHECK (movement_type IN ('in', 'out', 'adjustment')),
    reason TEXT,
    reference_number VARCHAR(100),
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample suppliers
INSERT INTO suppliers (name, contact_person, email, phone, address) VALUES
    ('Global Electronics Ltd', 'John Adebayo', 'john@globalelectronics.com', '08031234567', 'Lagos, Nigeria'),
    ('Quality Goods Nigeria', 'Chioma Okafor', 'chioma@qualitygoods.ng', '08029876543', 'Abuja, Nigeria'),
    ('Fast Supply Co', 'Musa Ibrahim', 'musa@fastsupply.com', '08055551234', 'Kano, Nigeria');

-- Insert sample products
INSERT INTO products (sku, name, description, category, unit_price, cost_price, current_stock, minimum_stock, supplier_id) VALUES
    ('LAP-001', 'HP Laptop 15"', '8GB RAM, 256GB SSD', 'Electronics', 350000.00, 320000.00, 15, 5, 1),
    ('PHN-001', 'Samsung Galaxy A54', '128GB Storage', 'Phones', 250000.00, 230000.00, 8, 3, 1),
    ('ACC-001', 'Wireless Mouse', 'Bluetooth 5.0', 'Accessories', 15000.00, 10000.00, 50, 10, 2),
    ('ACC-002', 'USB-C Cable', '2m length', 'Accessories', 5000.00, 3000.00, 100, 20, 3),
    ('LAP-002', 'Dell XPS 13', '16GB RAM, 512GB SSD', 'Electronics', 650000.00, 600000.00, 3, 2, 1);

-- Insert sample stock movements (initial stock)
INSERT INTO stock_movements (product_id, quantity, movement_type, reason, created_by) VALUES
    (1, 15, 'in', 'Initial stock', 'admin'),
    (2, 8, 'in', 'Initial stock', 'admin'),
    (3, 50, 'in', 'Initial stock', 'admin'),
    (4, 100, 'in', 'Initial stock', 'admin'),
    (5, 3, 'in', 'Initial stock', 'admin');
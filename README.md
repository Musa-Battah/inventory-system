# 📦 Inventory Management System

A full-featured inventory management system built with Next.js 16, PostgreSQL, and Neon. Track products, manage stock levels, monitor suppliers, and receive low stock alerts. Features Nigerian Naira (₦) currency support and a responsive dark theme.

## 🚀 Live Demo

[View Live Demo](https://inventory-system.vercel.app)

## ✨ Features

### Core Features
- **Product Management** - Add, edit, and view products with SKU tracking
- **Stock Tracking** - Real-time inventory levels with automatic calculations
- **Stock Movements** - Record stock in/out/adjustments with audit trail
- **Low Stock Alerts** - Visual warnings when stock falls below threshold
- **Supplier Management** - Track supplier information and product associations
- **Dashboard Analytics** - Key metrics including total stock value
- **Mobile Responsive** - Fully functional on desktop, tablet, and mobile devices

### Technical Features
- Naira (₦) currency formatting for Nigerian market
- Dark theme across all pages
- Database transactions for data integrity
- Unique SKU validation
- Stock movement history with audit trail
- RESTful API design

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Database** | PostgreSQL (Neon) |
| **Language** | JavaScript |
| **Styling** | Custom CSS (Dark Theme) |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

## 📊 Database Schema

```sql
-- Products table
products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    unit_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    current_stock INTEGER,
    minimum_stock INTEGER,
    supplier_id INTEGER REFERENCES suppliers(id)
)

-- Suppliers table
suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT
)

-- Stock movements table (audit trail)
stock_movements (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    movement_type VARCHAR(20), -- 'in', 'out', 'adjustment'
    reason TEXT,
    reference_number VARCHAR(100),
    created_by VARCHAR(100),
    created_at TIMESTAMP
)
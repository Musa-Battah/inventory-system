import { query } from '@/lib/db';
import ProductList from '@/components/ProductList';

async function getProducts() {
  const result = await query(`
    SELECT p.*, s.name as supplier_name 
    FROM products p
    LEFT JOIN suppliers s ON p.supplier_id = s.id
    WHERE p.is_active = true
    ORDER BY p.name
  `);
  return result.rows;
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h1>Products</h1>
        <a href="/products/new" className="btn-primary" style={{ textDecoration: 'none' }}>+ Add Product</a>
      </div>
      
      <ProductList products={products} />
    </div>
  );
}
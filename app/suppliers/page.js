import { query } from '@/lib/db';
import SupplierList from '@/components/SupplierList';

async function getSuppliers() {
  const result = await query(`
    SELECT s.*, 
           COUNT(p.id) as product_count,
           COALESCE(SUM(p.current_stock * p.unit_price), 0) as total_inventory_value
    FROM suppliers s
    LEFT JOIN products p ON p.supplier_id = s.id AND p.is_active = true
    GROUP BY s.id
    ORDER BY s.name
  `);
  return result.rows;
}

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h1>Suppliers</h1>
        <a href="/suppliers/new" className="btn-primary" style={{ textDecoration: 'none' }}>+ Add Supplier</a>
      </div>
      
      <SupplierList suppliers={suppliers} />
    </div>
  );
}
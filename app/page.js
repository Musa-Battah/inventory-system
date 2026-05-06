import { query } from '@/lib/db';
import DashboardStats from '@/components/DashboardStats';

async function getDashboardData() {
  // Total products
  const productsResult = await query('SELECT COUNT(*) FROM products WHERE is_active = true');
  
  // Low stock products (current_stock <= minimum_stock)
  const lowStockResult = await query(`
    SELECT COUNT(*) FROM products 
    WHERE current_stock <= minimum_stock AND is_active = true
  `);
  
  // Out of stock products
  const outOfStockResult = await query(`
    SELECT COUNT(*) FROM products 
    WHERE current_stock = 0 AND is_active = true
  `);
  
  // Total stock value (unit_price × current_stock)
  const stockValueResult = await query(`
    SELECT SUM(unit_price * current_stock) as total_value 
    FROM products WHERE is_active = true
  `);
  
  // Recent stock movements
  const recentMovements = await query(`
    SELECT sm.*, p.name as product_name 
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    ORDER BY sm.created_at DESC 
    LIMIT 5
  `);
  
  return {
    totalProducts: parseInt(productsResult.rows[0].count),
    lowStockCount: parseInt(lowStockResult.rows[0].count),
    outOfStockCount: parseInt(outOfStockResult.rows[0].count),
    totalStockValue: parseFloat(stockValueResult.rows[0].total_value) || 0,
    recentMovements: recentMovements.rows
  };
}

export default async function Dashboard() {
  const data = await getDashboardData();
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div>
      <h1>Inventory Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className="stat-value">{data.totalProducts}</div>
        </div>
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{data.lowStockCount}</div>
        </div>
        <div className="stat-card">
          <h3>Out of Stock</h3>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{data.outOfStockCount}</div>
        </div>
        <div className="stat-card">
          <h3>Total Stock Value</h3>
          <div className="stat-value">{formatCurrency(data.totalStockValue)}</div>
        </div>
      </div>
      
      <div className="card">
        <h2>Recent Stock Movements</h2>
        {data.recentMovements.length === 0 ? (
          <p>No stock movements yet</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Reason</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentMovements.map(movement => (
                  <tr key={movement.id}>
                    <td>{movement.product_name}</td>
                    <td>
                      <span className={`movement-${movement.movement_type}`}>
                        {movement.movement_type === 'in' ? '➕ Stock In' : 
                         movement.movement_type === 'out' ? '➖ Stock Out' : '📝 Adjustment'}
                      </span>
                    </td>
                    <td style={{ 
                      color: movement.movement_type === 'in' ? 'var(--success)' : 
                             movement.movement_type === 'out' ? 'var(--danger)' : 'var(--warning)'
                    }}>
                      {movement.movement_type === 'in' ? '+' : 
                       movement.movement_type === 'out' ? '-' : ''}
                      {Math.abs(movement.quantity)}
                    </td>
                    <td>{movement.reason || '-'}</td>
                    <td>{new Date(movement.created_at).toLocaleDateString('en-NG')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

export default function DashboardStats({ stats }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Products</h3>
        <div className="stat-value">{stats.totalProducts}</div>
      </div>
      <div className="stat-card">
        <h3>Low Stock Items</h3>
        <div className="stat-value" style={{ color: 'var(--warning)' }}>{stats.lowStockCount}</div>
      </div>
      <div className="stat-card">
        <h3>Out of Stock</h3>
        <div className="stat-value" style={{ color: 'var(--danger)' }}>{stats.outOfStockCount}</div>
      </div>
      <div className="stat-card">
        <h3>Total Stock Value</h3>
        <div className="stat-value">{formatCurrency(stats.totalStockValue)}</div>
      </div>
    </div>
  );
}
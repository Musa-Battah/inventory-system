'use client';

import { useState } from 'react';

export default function ProductList({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getStockStatus = (current, minimum) => {
    if (current === 0) return 'out-of-stock';
    if (current <= minimum) return 'low-stock';
    return 'in-stock';
  };
  
  const getStockLabel = (current, minimum) => {
    if (current === 0) return 'Out of Stock';
    if (current <= minimum) return 'Low Stock';
    return 'In Stock';
  };
  
  if (products.length === 0) {
    return <div className="card">No products yet. Add your first product!</div>;
  }
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Unit Price</th>
            <th>Supplier</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.category || '-'}</td>
              <td>{product.current_stock}</td>
              <td>{formatCurrency(product.unit_price)}</td>
              <td>{product.supplier_name || '-'}</td>
              <td>
                <span className={getStockStatus(product.current_stock, product.minimum_stock)}>
                  {getStockLabel(product.current_stock, product.minimum_stock)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
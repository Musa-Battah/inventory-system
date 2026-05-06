'use client';

import { useState } from 'react';

export default function SupplierList({ suppliers: initialSuppliers }) {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  
  const formatCurrency = (amount) => {
    if (!amount) return '₦0';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const handleDelete = async (id) => {
    if (!confirm('Delete this supplier? Products linked to this supplier will not be deleted.')) return;
    
    try {
      const res = await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSuppliers(suppliers.filter(s => s.id !== id));
      } else {
        alert('Failed to delete supplier');
      }
    } catch (err) {
      alert('Network error');
    }
  };
  
  if (suppliers.length === 0) {
    return <div className="card">No suppliers yet. Add your first supplier!</div>;
  }
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Products</th>
            <th>Inventory Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contact_person || '-'}</td>
              <td>{supplier.email || '-'}</td>
              <td>{supplier.phone || '-'}</td>
              <td>{supplier.product_count || 0} products</td>
              <td>{formatCurrency(supplier.total_inventory_value)}</td>
              <td>
                <button 
                  onClick={() => handleDelete(supplier.id)}
                  className="btn-danger"
                  style={{ padding: '4px 12px', fontSize: '12px' }}
                >
                  Delete
                </button>
               </td>
             </tr>
          ))}
        </tbody>
       </table>
    </div>
  );
}
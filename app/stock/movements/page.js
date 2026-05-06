'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StockMovementPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    movement_type: 'in',
    quantity: '',
    reason: '',
    reference_number: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/stock-movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product_id: parseInt(formData.product_id),
          quantity: parseInt(formData.quantity),
          created_by: 'admin'
        })
      });
      
      if (res.ok) {
        router.push('/stock');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to record movement');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Record Stock Movement</h1>
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Product *</label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={(e) => setFormData({...formData, product_id: e.target.value})}
            required
          >
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (Current Stock: {p.current_stock})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Movement Type *</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                value="in"
                checked={formData.movement_type === 'in'}
                onChange={() => setFormData({...formData, movement_type: 'in'})}
              />
              + Stock In (Received)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                value="out"
                checked={formData.movement_type === 'out'}
                onChange={() => setFormData({...formData, movement_type: 'out'})}
              />
              - Stock Out (Sold/Used)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                value="adjustment"
                checked={formData.movement_type === 'adjustment'}
                onChange={() => setFormData({...formData, movement_type: 'adjustment'})}
              />
              = Adjustment (Correction)
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Reason *</label>
          <select
            name="reason"
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            required
          >
            <option value="">Select Reason</option>
            <option value="Purchase order received">Purchase order received</option>
            <option value="Customer order">Customer order</option>
            <option value="Stock count adjustment">Stock count adjustment</option>
            <option value="Return from customer">Return from customer</option>
            <option value="Damaged goods">Damaged goods</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Reference Number (PO #, Order #)</label>
          <input
            type="text"
            name="reference_number"
            value={formData.reference_number}
            onChange={(e) => setFormData({...formData, reference_number: e.target.value})}
            placeholder="PO-12345, ORD-67890"
          />
        </div>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '15px' }}>{error}</div>}
        
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Processing...' : 'Record Movement'}
        </button>
      </form>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: '',
    unit_price: '',
    cost_price: '',
    current_stock: '0',
    minimum_stock: '5',
    supplier_id: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load suppliers for dropdown
  useEffect(() => {
    async function loadSuppliers() {
      try {
        const res = await fetch('/api/suppliers');
        const data = await res.json();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setSuppliers(data);
        } else {
          console.error('Suppliers API did not return an array:', data);
          setSuppliers([]);
        }
      } catch (error) {
        console.error('Error loading suppliers:', error);
        setSuppliers([]);
      } finally {
        setLoadingSuppliers(false);
      }
    }
    loadSuppliers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    // Validation
    if (!formData.sku || !formData.name || !formData.unit_price || !formData.cost_price) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          unit_price: parseFloat(formData.unit_price),
          cost_price: parseFloat(formData.cost_price),
          current_stock: parseInt(formData.current_stock),
          minimum_stock: parseInt(formData.minimum_stock),
          supplier_id: formData.supplier_id ? parseInt(formData.supplier_id) : null
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        router.push('/products');
      } else {
        setError(data.error || 'Failed to create product');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>SKU (Stock Keeping Unit) *</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="e.g., LAP-001"
            required
          />
          <small className="helper-text">Unique identifier for this product</small>
        </div>
        
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description, features, specifications..."
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Electronics, Accessories, Furniture"
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Unit Price (₦) *</label>
            <input
              type="number"
              name="unit_price"
              value={formData.unit_price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Cost Price (₦) *</label>
            <input
              type="number"
              name="cost_price"
              value={formData.cost_price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Current Stock</label>
            <input
              type="number"
              name="current_stock"
              value={formData.current_stock}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>Minimum Stock Alert</label>
            <input
              type="number"
              name="minimum_stock"
              value={formData.minimum_stock}
              onChange={handleChange}
              min="0"
            />
            <small className="helper-text">Alert when stock falls below this number</small>
          </div>
        </div>
        
        <div className="form-group">
          <label>Supplier</label>
          <select name="supplier_id" value={formData.supplier_id} onChange={handleChange}>
            <option value="">-- Select Supplier --</option>
            {!loadingSuppliers && suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {loadingSuppliers && <small>Loading suppliers...</small>}
        </div>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>{error}</div>}
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Product'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
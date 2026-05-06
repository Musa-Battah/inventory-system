import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET single supplier with products
export async function GET(request, { params }) {
  const { id } = await params;
  
  try {
    const supplierResult = await query(
      'SELECT * FROM suppliers WHERE id = $1',
      [id]
    );
    
    if (supplierResult.rows.length === 0) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }
    
    const productsResult = await query(
      'SELECT id, name, sku, current_stock, unit_price FROM products WHERE supplier_id = $1',
      [id]
    );
    
    const supplier = supplierResult.rows[0];
    supplier.products = productsResult.rows;
    
    return NextResponse.json(supplier);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE supplier
export async function DELETE(request, { params }) {
  const { id } = await params;
  
  try {
    // First, remove supplier reference from products (set to NULL)
    await query('UPDATE products SET supplier_id = NULL WHERE supplier_id = $1', [id]);
    
    // Then delete supplier
    await query('DELETE FROM suppliers WHERE id = $1', [id]);
    
    return NextResponse.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
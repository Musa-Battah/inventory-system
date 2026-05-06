import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple query first to test
    const result = await query('SELECT * FROM products LIMIT 5');
    
    return NextResponse.json({
      success: true,
      count: result.rows.length,
      products: result.rows
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Just echo back for testing
    return NextResponse.json({ 
      success: true, 
      received: body,
      message: 'POST received but not saving yet'
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
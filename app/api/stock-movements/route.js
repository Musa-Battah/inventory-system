import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await query('SELECT * FROM stock_movements LIMIT 10');
    
    return NextResponse.json({
      success: true,
      count: result.rows.length,
      movements: result.rows
    });
  } catch (error) {
    console.error('Stock movements API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({ 
      success: true, 
      received: body,
      message: 'POST received but not saving yet'
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
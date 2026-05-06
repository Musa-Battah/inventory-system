import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test connection and list tables
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    return NextResponse.json({
      success: true,
      tables: tables.rows.map(r => r.table_name),
      message: 'Database connected successfully'
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
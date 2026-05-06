import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await query(`
      SELECT id, name, contact_person, email, phone, address 
      FROM suppliers 
      ORDER BY name
    `);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Optional: add POST if you need it
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact_person, email, phone, address } = body;
    
    const result = await query(`
      INSERT INTO suppliers (name, contact_person, email, phone, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, contact_person, email, phone, address]);
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
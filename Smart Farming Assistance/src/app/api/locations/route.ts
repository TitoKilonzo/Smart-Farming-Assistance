import { NextResponse } from 'next/server';
import { mockLocations } from '@/lib/mock-data';

export async function GET() {
  try {
    return NextResponse.json({
      locations: mockLocations,
      count: mockLocations.length
    });

  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
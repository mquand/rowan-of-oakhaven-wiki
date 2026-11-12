import { NextResponse } from 'next/server';
import { getSearchIndex } from '../../../lib/searchIndex';

export function GET() {
  const data = getSearchIndex();
  return NextResponse.json(data);
}

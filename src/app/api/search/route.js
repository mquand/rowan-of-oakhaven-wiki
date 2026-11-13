import { NextResponse } from 'next/server';
import { getSearchIndex } from '../../../lib/searchIndex';
import { getValidLocale } from '../../../lib/i18n/config';

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = getValidLocale(searchParams.get('lang'));
  const data = getSearchIndex(lang);
  return NextResponse.json(data);
}

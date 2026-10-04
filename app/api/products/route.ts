import { NextResponse } from 'next/server'
import { products } from '@/lib/data/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const brand = searchParams.get('brand')
  const query = searchParams.get('q')

  let results = [...products]

  if (category && category !== 'all') {
    results = results.filter(p => p.category === category)
  }

  if (brand && brand !== 'all') {
    results = results.filter(p => p.brand.toLowerCase() === brand.toLowerCase())
  }

  if (query) {
    const q = query.toLowerCase()
    results = results.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    products: results,
  })
}

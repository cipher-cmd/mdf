import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

/**
 * One shared Neon database serves several businesses. Every table this site owns
 * starts with `mdf_` — never read or write a table without that prefix.
 */
let sqlClient: NeonQueryFunction<false, false> | null = null

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) return null
  if (!sqlClient) sqlClient = neon(databaseUrl)
  return sqlClient
}

export const hasDb = () => Boolean(process.env.DATABASE_URL)

/**
 * Run a parameterised query. Throws on failure so writes never fail silently;
 * public-page readers catch and fall back to the built-in content instead.
 */
export async function query<T = any>(queryText: string, params: unknown[] = []): Promise<T[]> {
  const db = getDb()
  if (!db) throw new Error('Database is not connected (DATABASE_URL is missing).')
  return (await db.query(queryText, params)) as T[]
}

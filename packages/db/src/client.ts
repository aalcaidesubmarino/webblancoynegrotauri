import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema/index';

export const DEFAULT_NEON_DATABASE_URL =
  'postgresql://neondb_owner:npg_qXSr9WG4svNi@ep-shiny-leaf-zail844l-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';

export const getDatabaseUrl = (): string => {
  // 1. Si existe en process.env (Node.js, Next.js, scripts CLI)
  if (typeof process !== 'undefined' && process.env && process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // 2. Si existe en import.meta.env (Vite / Tauri frontend)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DATABASE_URL) {
      // @ts-ignore
      return import.meta.env.VITE_DATABASE_URL;
    }
  } catch {}

  // 3. Cadena de conexión predeterminada a Neon
  return DEFAULT_NEON_DATABASE_URL;
};

// Cliente HTTP Serverless de alto rendimiento para Neon
export const createDbClient = (connectionString?: string) => {
  const sql = neon(connectionString || getDatabaseUrl());
  return drizzle(sql, { schema });
};

// Instancia perezosa (lazy) para evitar inicializaciones tempranas durante el build
let _db: ReturnType<typeof createDbClient> | null = null;

export const getDb = () => {
  if (!_db) {
    _db = createDbClient();
  }
  return _db;
};

export const db = new Proxy({} as ReturnType<typeof createDbClient>, {
  get(_target, prop) {
    const instance = getDb();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (instance as any)[prop];
  },
});

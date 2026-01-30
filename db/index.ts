import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Durante o build, DATABASE_URL pode não existir
// A conexão real só acontece em runtime
const DATABASE_URL = process.env.DATABASE_URL;

// Criar cliente apenas se DATABASE_URL existir
const createDb = () => {
  if (!DATABASE_URL) {
    // Durante build, retornar um proxy que lança erro se usado
    // Isso permite o build passar, mas falha em runtime se não configurado
    return new Proxy({} as ReturnType<typeof drizzle>, {
      get(_, prop) {
        if (prop === 'then') return undefined; // Para evitar problemas com async
        return () => {
          throw new Error('DATABASE_URL must be set');
        };
      },
    });
  }
  
  const sql = neon(DATABASE_URL);
  return drizzle(sql, { schema });
};

export const db = createDb();

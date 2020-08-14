import { connection } from '../db/connection';

export async function listCategories() {
  const categories = await connection('category');

  return categories;
}

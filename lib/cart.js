import { connection } from '../db/connection';

function money(value) {
  return Number(value || 0).toFixed(2);
}

function buildCart(rows) {
  const items = rows.map((row) => {
    const unitPrice = Number(row.price || 0);
    const quantity = Number(row.quantity || 0);
    return {
      product: {
        id: row.product_id,
        name: row.name,
        description: row.description,
        img_url: row.img_url,
        price: money(unitPrice),
        rating: String(row.rating),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        user_id: row.product_user_id,
      },
      productId: row.product_id,
      quantity,
      unitPrice: money(unitPrice),
      lineTotal: money(unitPrice * quantity),
    };
  });

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.lineTotal),
    0
  );

  return {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: money(subtotal),
  };
}

export async function getCart({ userId, db = connection }) {
  const rows = await db('cart_item')
    .join('product', 'product.id', '=', 'cart_item.product_id')
    .where('cart_item.user_id', userId)
    .select(
      'cart_item.product_id',
      'cart_item.quantity',
      'product.name',
      'product.description',
      'product.img_url',
      'product.price',
      'product.rating',
      'product.created_at',
      'product.updated_at',
      'product.user_id as product_user_id'
    )
    .orderBy('cart_item.created_at', 'asc');

  return buildCart(rows);
}

async function getProduct(productId, db = connection) {
  return db('product').where('id', productId).first();
}

export async function addToCart({ userId, productId, quantity = 1 }) {
  const normalizedQuantity = Number(quantity);
  if (!Number.isInteger(normalizedQuantity) || normalizedQuantity < 1) {
    throw new Error('Quantity must be at least 1');
  }
  const product = await getProduct(productId);
  if (!product) throw new Error('Product not found');

  const existing = await connection('cart_item')
    .where({ user_id: userId, product_id: productId })
    .first();

  if (existing) {
    await connection('cart_item')
      .where('id', existing.id)
      .update({
        quantity: existing.quantity + normalizedQuantity,
        updated_at: Date.now(),
      });
  } else {
    await connection('cart_item').insert({
      user_id: userId,
      product_id: productId,
      quantity: normalizedQuantity,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }

  return getCart({ userId });
}

export async function updateCartItem({ userId, productId, quantity }) {
  const normalizedQuantity = Number(quantity);
  if (!Number.isInteger(normalizedQuantity)) {
    throw new Error('Quantity must be a whole number');
  }

  if (normalizedQuantity <= 0) {
    return removeFromCart({ userId, productId });
  }

  const product = await getProduct(productId);
  if (!product) throw new Error('Product not found');

  await connection('cart_item')
    .where({ user_id: userId, product_id: productId })
    .update({ quantity: normalizedQuantity, updated_at: Date.now() });

  return getCart({ userId });
}

export async function removeFromCart({ userId, productId }) {
  await connection('cart_item')
    .where({ user_id: userId, product_id: productId })
    .del();
  return getCart({ userId });
}

export async function clearCart({ userId }) {
  await connection('cart_item').where('user_id', userId).del();
  return true;
}

export async function mergeGuestCart({ userId, items }) {
  const merged = new Map();
  for (const item of Array.isArray(items) ? items : []) {
    const productId = String(item.productId || item.id || '');
    const quantity = Number(item.quantity || 0);
    if (productId && Number.isInteger(quantity) && quantity > 0) {
      merged.set(productId, (merged.get(productId) || 0) + quantity);
    }
  }

  const trx = await connection.transaction();
  try {
    for (const [productId, quantity] of merged.entries()) {
      const product = await getProduct(productId, trx);
      if (!product) continue;

      const existing = await trx('cart_item')
        .where({ user_id: userId, product_id: productId })
        .first();

      if (existing) {
        await trx('cart_item')
          .where('id', existing.id)
          .update({ quantity: existing.quantity + quantity, updated_at: Date.now() });
      } else {
        await trx('cart_item').insert({
          user_id: userId,
          product_id: productId,
          quantity,
          created_at: Date.now(),
          updated_at: Date.now(),
        });
      }
    }
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw error;
  }

  return getCart({ userId });
}

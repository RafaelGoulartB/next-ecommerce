import { connection } from '../db/connection';
import { v4 as uuidv4 } from 'uuid';

function money(value) {
  return Number(value || 0).toFixed(2);
}

async function withItems(order, db = connection) {
  const items = await db('order_item')
    .where('order_id', order.id)
    .select('*')
    .orderBy('id', 'asc');
  return { ...order, items };
}

export async function listOrders({ userId }) {
  const orders = await connection('orders')
    .where('user_id', userId)
    .select('*')
    .orderBy('created_at', 'desc');
  return Promise.all(orders.map((order) => withItems(order)));
}

export async function findOrder({ userId, id }) {
  const order = await connection('orders')
    .where({ user_id: userId, id })
    .first();
  return order ? withItems(order) : null;
}

export async function createOrder({ userId, contactName, contactEmail, phone }) {
  const normalizedName = String(contactName || '').trim();
  const normalizedEmail = String(contactEmail || '').trim().toLowerCase();
  const normalizedPhone = String(phone || '').trim() || null;

  if (!normalizedName) throw new Error('Contact name is required');
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    throw new Error('Please enter a valid contact email');
  }

  const trx = await connection.transaction();
  try {
    const rows = await trx('cart_item')
      .join('product', 'product.id', '=', 'cart_item.product_id')
      .where('cart_item.user_id', userId)
      .select(
        'cart_item.product_id',
        'cart_item.quantity',
        'product.name',
        'product.price'
      );

    if (!rows.length) throw new Error('Your cart is empty');

    const total = rows.reduce(
      (sum, row) => sum + Number(row.price) * Number(row.quantity),
      0
    );
    const id = uuidv4();
    const orderNumber = `QNT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${id.slice(0, 8).toUpperCase()}`;

    const order = {
      id,
      order_number: orderNumber,
      user_id: userId,
      contact_name: normalizedName,
      contact_email: normalizedEmail,
      phone: normalizedPhone,
      status: 'confirmed',
      subtotal: money(total),
      total: money(total),
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await trx('orders').insert(order);
    await trx('order_item').insert(
      rows.map((row) => ({
        order_id: id,
        product_id: row.product_id,
        product_name: row.name,
        unit_price: money(row.price),
        quantity: row.quantity,
        line_total: money(Number(row.price) * Number(row.quantity)),
      }))
    );
    await trx('cart_item').where('user_id', userId).del();
    await trx.commit();

    return findOrder({ userId, id });
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}

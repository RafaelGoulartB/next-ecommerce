import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { connection } from '../db/connection';

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function validateUserInput({ name, email, password }) {
  if (!String(name || '').trim()) throw new Error('Name is required');
  if (!/^\S+@\S+\.\S+$/.test(normalizeEmail(email))) {
    throw new Error('Please enter a valid email address');
  }
  if (String(password || '').length < 6) {
    throw new Error('Password must contain at least 6 characters');
  }
}

export async function createUser({ name, email, password }) {
  validateUserInput({ name, email, password });
  const cryptoPassword = await bcrypt.hash(password, 10);

  const user = {
    id: uuidv4(),
    name: String(name).trim(),
    email: normalizeEmail(email),
    password: cryptoPassword,
    createdAt: Date.now(),
  };

  await connection('user').insert(user);

  return user;
}

export async function findUser({ email }) {
  const user = await connection('user')
    .select('*')
    .where('email', normalizeEmail(email))
    .first();
  return user;
}

export async function findUserById({ id }) {
  return connection('user').select('*').where('id', id).first();
}

export async function updateUserName({ id, name }) {
  const normalizedName = String(name || '').trim();
  if (!normalizedName) throw new Error('Name is required');

  await connection('user').where('id', id).update({ name: normalizedName });
  return findUserById({ id });
}

export async function validatePassword(user, inputPassword) {
  const passwordsMatch = await bcrypt.compare(inputPassword, user.password);
  return passwordsMatch;
}

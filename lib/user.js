import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const users = [];

export async function createUser({ name, email, password }) {
  const cryptoPassword = await bcrypt.hashSync(password, 10);

  const user = {
    id: uuidv4(),
    name,
    email,
    password: cryptoPassword,
    createdAt: Date.now(),
  };

  //TODO: Save user to db

  return user;
}

export async function findUser({ email }) {
  //TODO: Find user by email
  return users.find((user) => user.email === email);
}

export async function validatePassword(user, inputPassword) {
  const passwordsMatch = await bcrypt.compareSync(user.password, inputPassword);
  return passwordsMatch;
}

import bcrypt from 'bcrypt';
import validator from 'validator';

export default {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }];
    },
  },
};

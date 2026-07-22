const catalogProducts = require('../catalog/products');

const offlineProducts = catalogProducts.map((product) => ({
  ...product,
  created_at: Date.now(),
  updated_at: Date.now(),
  user_id: '1',
}));

export default offlineProducts;

const {
    save, getDetailById, getList, update, checkout
  } = require('../controllers/product');
  
  module.exports = (router) => {
    router.post('/product', save);
    router.get('/product/:publicId', getDetailById);
    router.get('/products', getList);
    router.patch('/product/:publicId', update);
    router.post('/products/checkout', checkout);
  };
  
const {
    save, getDetailById, getList, update,
  } = require('../controllers/offers');
  
  module.exports = (router) => {
    router.post('/offer/:productId', save);
    router.get('/offer/:publicId', getDetailById);
    router.get('/offers', getList);
    router.patch('/offer/:publicId', update);
  };
  
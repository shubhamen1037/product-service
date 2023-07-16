const chai = require('chai');
const { Product: ProductService } = require('../../../services');
const { product: ProductModel } = require('../../../database');
const { SAVE_PRODUCT_PAYLOAD } = require('../../constant');

const { expect } = chai;

describe('Product service save method', () => {
  context('test cases for success case', () => {
    before(async () => {
      await ProductModel.create({ ...SAVE_PRODUCT_PAYLOAD, public_id: 'ac9aceb0-5b57-11e9-8094-7acbf9f844e6' });
    });

    after(async () => {
      await ProductModel.destroy({ truncate: true, cascade: true });
    });

    it('should exists inside Product service', () => {
      expect(ProductService.save).to.be.exist;
    });

    it('should save product and return document object with pubicId and message.', async () => {
      const { doc } = await ProductService.save({ ...SAVE_PRODUCT_PAYLOAD, sku: 'watch12' });

      expect(doc).to.not.be.empty;
      expect(doc).to.have.all.keys('publicId', 'message');
    });
  });

  context('test cases for failre case', () => {
    before(async () => {
      await ProductModel.create({ ...SAVE_PRODUCT_PAYLOAD, public_id: 'ac9aceb0-5b57-11e9-8094-7acbf9f844e6' });
    });

    after(async () => {
      await ProductModel.destroy({ truncate: true, cascade: true });
    });

    it('should return error for duplicate entry.', async () => {
      const response = await ProductService.save(SAVE_PRODUCT_PAYLOAD);

      expect(response).to.have.key('errors');
    });

    it('should return error for duplicate entry with name and message key.', async () => {
      const { errors } = await ProductService.save(SAVE_PRODUCT_PAYLOAD);

      expect(errors[0]).to.have.all.keys('name', 'message');
    });
  });
});

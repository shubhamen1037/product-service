const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');
const { Order: OrderService } = require('../../../services');
const { GET_BY_PUBLIC_ID_PAYLOAD } = require('../../constant');
const { order: OrderModel } = require('../../../database');

const { expect } = chai;

const {
  INVALID_GET_ORDER_POSSIBILITY,
} = require('../../constant');

describe('Order service', () => {
  let orderRequest;

  context('getDetailById method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'getDetailById');
      orderRequest.returns({ doc: { publicId: '8e41d840-4831-11ec-a125-5186bc390e88' } });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    it('should exists inside order service', () => {
      expect(OrderService.getByUserId).to.be.exist;
    });

    it('should return a response body to be an object', () => {
      const { doc } = OrderService.getDetailById('8e41d840-4831-11ec-a125-5186bc390e88');

      expect(doc).to.be.an('object');
    });
  });
});

describe('Order service for error', () => {
  let orderRequest;

  context('getDetailById method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'getDetailById');
      orderRequest.returns({ errors: [ { message: 'Parameter: publicId should be valid.' } ] });

      await OrderModel.destroy({ truncate: true, cascade: true });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    forEach(GET_BY_PUBLIC_ID_PAYLOAD)
      .it('should return error while submitting wrong Public Id', async (invalidPublicId) => {
        const { errors } = await OrderService.getDetailById(invalidPublicId);

        expect(errors).to.be.an('array');
      });

    it('should return errors as array', async () => {
      const { errors } = await OrderService.getDetailById('8e41d840-4831-11ec-a125-5186bc390e88');

      expect(errors).to.be.an('array');
    });

    it('should return error message ', async () => {
      const { errors } = await OrderService.getDetailById('8e41d840-4831-11ec-a125-5186bc390e88');

      const { message } = errors[0];

      expect(message).to.equal('Parameter: publicId should be valid.');
    });

    forEach(INVALID_GET_ORDER_POSSIBILITY)
      .it('should return error while submitting', async (invalidSubmitData) => {
        const { errors } = await OrderService.submit(invalidSubmitData);

        expect(errors).to.be.an('array');
      });
  });
});

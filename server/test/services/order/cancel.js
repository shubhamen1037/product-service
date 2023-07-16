const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');
const { Order: OrderService } = require('../../../services');
const { order: OrderModel } = require('../../../database');
const {
  CANCEL_PAYLOAD,
  CANCEL_FAIL_PAYLOAD,
  INVALID_CANCEL_POSSIBILITY,
} = require('../../constant');

const { expect } = chai;

chai.use(require('chai-uuid'));

describe('Order service', () => {
  let orderRequest;

  context('cancel method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'cancel');
      orderRequest.returns({ doc: { message: 'successfully cancelled.', publicId: '8e41d840-4831-11ec-a125-5186bc390e88' } });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    it('should exists inside order service', () => {
      expect(OrderService.cancel).to.be.exist;
    });

    it('should save the order and return document', async () => {
      const { doc } = await OrderService.cancel(CANCEL_PAYLOAD);

      expect(doc).to.not.be.empty;
    });

    it('should save the order and return public Id and message in response', async () => {
      const { doc } = await OrderService.cancel(CANCEL_PAYLOAD);

      const { publicId, message } = doc;

      expect(publicId).to.be.a.uuid('v1');

      expect(message).to.equal('successfully cancelled.');
    });
  });
});

describe('Order service for error', () => {
  let orderRequest;

  context('cancel method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'cancel');
      orderRequest.returns({ errors: [ { message: 'Parameter: publicId should be valid.' } ] });

      await OrderModel.destroy({ truncate: true, cascade: true });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    forEach(INVALID_CANCEL_POSSIBILITY)
      .it('should return error when you have invalid cancel data', async (invalidCancelData) => {
        const { errors } = await OrderService.cancel(invalidCancelData);

        expect(errors).to.be.an('array');
      });

    it('should return errors as array', async () => {
      const { errors } = await OrderService.cancel(CANCEL_FAIL_PAYLOAD);

      expect(errors).to.be.an('array');
    });
  });
});

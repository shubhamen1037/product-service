const chai = require('chai');
const sinon = require('sinon');
const { Order: OrderService } = require('../../../services');
const { order: OrderModel } = require('../../../database');

const { expect } = chai;

describe('Order service', () => {
  let orderRequest;

  context('getSummary method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'getSummary');
      orderRequest.returns({
        doc: {
          investedAmount: 0,
          maturityAmount: 0,
        },
      });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    it('should exists inside order service', () => {
      expect(OrderService.getSummary).to.be.exist;
    });

    it('should return a response body to be an object', () => {
      const { doc } = OrderService.getSummary('8e41d840-4831-11ec-a125-5186bc390e88');

      expect(doc).to.be.an('object');
    });
  });
});

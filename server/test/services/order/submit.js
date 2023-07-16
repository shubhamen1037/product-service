const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');

const { Order: OrderService } = require('../../../services');

const { order: OrderModel } = require('../../../database');

const {
  SUBMIT_PAYLOAD,
  SUBMIT_FAIL_PAYLOAD,
  INVALID_SUBMIT_POSSIBILITY,
} = require('../../constant');

const { expect } = chai;

describe('Order service', () => {
  let orderRequest;

  context('submit method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'submit');
      orderRequest.returns({ doc: { message: 'successfully submitted.', publicId: '8e41d840-4831-11ec-a125-5186bc390e88' } });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    forEach(SUBMIT_PAYLOAD)
      .it('should submit the order and return message in response', async (submitPayload) => {
        const { doc } = await OrderService.submit(submitPayload);
        const { message } = doc;

        expect(message).to.equal('successfully submitted.');
      });

    it('should exists inside order service', () => {
      expect(OrderService.submit).to.be.exist;
    });

    it('should submit the order and return document', async () => {
      const { doc } = await OrderService.submit(SUBMIT_PAYLOAD);

      expect(doc).to.not.be.empty;
    });
  });
});

describe('Order service for error', () => {
  let orderRequest;

  context('submit method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'submit');
      orderRequest.returns({ errors: [ { message: 'Parameter: publicId should be valid.' } ] });

      await OrderModel.destroy({ truncate: true, cascade: true });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    it('should return errors as array', async () => {
      const { errors } = await OrderService.submit(SUBMIT_FAIL_PAYLOAD);

      expect(errors).to.be.an('array');
    });

    forEach(INVALID_SUBMIT_POSSIBILITY)
      .it('should return error while submitting', async (invalidSubmitData) => {
        const { errors } = await OrderService.submit(invalidSubmitData);

        expect(errors).to.be.an('array');
      });
  });
});

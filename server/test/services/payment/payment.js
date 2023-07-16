const chai = require('chai');
const sinon = require('sinon');

const { Payment: PaymentService } = require('../../../services');

chai.use(require('chai-uuid'));

const { expect } = chai;

describe('Payment service', () => {
  let paymemtRequest;

  context('updateStatus', () => {
    beforeEach(async () => {
      paymemtRequest = sinon.stub(PaymentService, 'updateStatus');
      paymemtRequest.returns({ doc: { publicId: '8e41d840-4831-11ec-a125-5186bc390e88', message: 'sucessfully updated' } });
    });

    afterEach(() => {
      paymemtRequest.restore();
    });

    it('should exist inside the payment service', () => {
      expect(PaymentService.updateStatus).to.be.exist;
    });

    it('should return a response body to be an object', () => {
      const { doc } = PaymentService.updateStatus();

      expect(doc).to.be.an('object');
    });

    it('should return publicId as valid UUID', () => {
      const { doc: { publicId } } = PaymentService.updateStatus();

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return message as a valid string', () => {
      const { doc: { message } } = PaymentService.updateStatus();

      expect(message).to.be.a('string');
    });
  });
});

describe('Payment service for error', () => {
  let paymemtRequest;

  context('updateStatus method', () => {
    beforeEach(async () => {
      paymemtRequest = sinon.stub(PaymentService, 'updateStatus');
      paymemtRequest.returns({ errors: [ { message: 'Parameter: partnerId should be valid.' } ] });
    });

    afterEach(() => {
      paymemtRequest.restore();
    });

    it('should return errors as array', async () => {
      const { errors } = await PaymentService.updateStatus();

      expect(errors).to.be.an('array');
    });

    it('should return errors as array', async () => {
      const { errors: [ { message } ] } = await PaymentService.updateStatus();

      expect(message).to.equal('Parameter: partnerId should be valid.');
    });
  });
});

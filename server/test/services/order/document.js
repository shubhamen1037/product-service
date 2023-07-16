const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');
const { Order: OrderService } = require('../../../services');
const { order: OrderModel } = require('../../../database');

chai.use(require('chai-uuid'));

const {
  UPLOAD_DOCUMENT_PAYLOAD,
  UPLOAD_DOCUMENT_PAYLOAD_FAIL_POSSIBILITY,
} = require('../../constant');

const { expect } = chai;

describe('Order service', () => {
  let orderRequest;

  context('uploadDocuments method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'uploadDocuments');
      orderRequest.returns({ doc: { message: 'document submitted.', publicId: '46955ec0-a378-11ec-b4ff-bf49f1d4bb05' } });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    it('should exists inside order service', () => {
      expect(OrderService.uploadDocuments).to.be.exist;
    });

    forEach(UPLOAD_DOCUMENT_PAYLOAD)
      .it('should return doc while submitting', async (validDocData) => {
        const { doc } = await OrderService.uploadDocuments(validDocData);

        expect(doc).to.not.be.empty;
      });

    forEach(UPLOAD_DOCUMENT_PAYLOAD)
      .it('should return doc while submitting', async (validDocData) => {
        const { doc } = await OrderService.uploadDocuments(validDocData);
        const { publicId, message } = doc;

        expect(publicId).to.be.a.uuid('v1');
        expect(message).to.equal('document submitted.');
      });
  });
});

describe('Order service for error', () => {
  let orderRequest;

  context('uploadDocuments method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'uploadDocuments');
      orderRequest.returns({ errors: [ { message: 'Parameter: publicId should be valid.' } ] });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    forEach(UPLOAD_DOCUMENT_PAYLOAD_FAIL_POSSIBILITY)
      .it('should return errors as array', async (FAILED_DATA) => {
        const { errors } = await OrderService.uploadDocuments(FAILED_DATA);

        expect(errors).to.be.an('array');
      });

    forEach(UPLOAD_DOCUMENT_PAYLOAD_FAIL_POSSIBILITY)
      .it('should return error message in response', async (FAILED_DATA) => {
        const { errors } = await OrderService.uploadDocuments(FAILED_DATA);
        const { message } = errors[0];

        expect(message).to.equal('Parameter: publicId should be valid.');
      });
  });
});

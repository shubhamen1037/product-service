const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-uuid'));

const chaiHttp = require('chai-http');
const server = require('../../../server');

const { Order: OrderService } = require('../../../../services');
const { AUTHORIZATION } = require('../../../constant');

const { expect } = chai;

chai.use(chaiHttp);

describe('Document graphql', () => {
  let mockOrderService;

  context('Success Document resolver', () => {
    let statusRes;

    let bodyRes;

    before(async () => {
      mockOrderService = sinon.stub(OrderService, 'uploadDocuments');
      mockOrderService.returns({ doc: { message: 'document submitted.', publicId: '46955ec0-a378-11ec-b4ff-bf49f1d4bb05' } });

      const { status, body } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `
          mutation {
            FixedDepositDocument(
                input: [
                    {
                      documentFrontId: "001c94e0-a35a-11ec-bafa-0b61695c24b7",
                      documentType: "aadhar"
                    }
                  ],
                  publicId:"2057dab0-a35c-11ec-9604-77c08e1b333a"
            ) {
              data {
                message
                publicId
              }
              errors {
                message

              }
            }
          }
          `,
        });

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    it('should return a successfully uploaded status when doing the upload document i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });

    it('should return a successfully submitted message', () => {
      const { data: { FixedDepositDocument: { data: { message } } } } = bodyRes;

      expect(message).to.equal('document submitted.');
    });

    it('should return publicId in bodyRes', () => {
      const { data: { FixedDepositDocument: { data: { publicId } } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });
  });

  context('Failure Document resolver', () => {
    let statusRes;

    let bodyRes;

    before(async () => {
      mockOrderService = sinon.stub(OrderService, 'uploadDocuments');
      mockOrderService.returns({ doc: { message: 'document submitted.', publicId: '46955ec0-a378-11ec-b4ff-bf49f1d4bb05' } });

      const { status, body } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `
          mutation {
            FixedDepositDocument(
                input: [
                    {
                      documentFrontId: "001c94e0-a35a-11ec-bafa-0b61695c24b7",
                      documentType: "aadhar"
                    }
                  ],
                  publicId:"2057dab0-a35c-11ec-9604-77c08e1b333a"
            ) {
              data {
                message
                publicId
              }
              errors {
                message
              
              }
            }
          }
          `,
        });

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    it('should return a successfully uploaded status when doing the upload document i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });

    it('should return a successfully submitted message', () => {
      const { data: { FixedDepositDocument: { data: { message } } } } = bodyRes;

      expect(message).to.equal('document submitted.');
    });

    it('should return publicId in bodyRes', () => {
      const { data: { FixedDepositDocument: { data: { publicId } } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });
  });
});

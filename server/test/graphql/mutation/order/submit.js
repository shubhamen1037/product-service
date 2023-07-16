const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-uuid'));

const chaiHttp = require('chai-http');
const server = require('../../../server');

const { Order: OrderService } = require('../../../../services');
const { AUTHORIZATION } = require('../../../constant');

const { expect } = chai;

chai.use(chaiHttp);

describe('Order graphql', () => {
  let mockOrderService;

  context('submit reslover', () => {
    let statusRes;

    let bodyRes;

    before(async () => {
      mockOrderService = sinon.stub(OrderService, 'submit');
      mockOrderService.returns({ doc: { publicId: '55cbd854-726f-11eb-9439-0242ac130002', message: 'successfully submitted.' } });

      const { status, body } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `
          mutation{
            FixedDepositSubmitOrder(publicId:"49e8de70-15fd-11ec-8c3d-498edad9f506"){
              data{
                publicId
                message
              }
              errors{
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

    it('should return a successfully updated status when doing the save i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });

    it('should return a successfully message', () => {
      const { data: { FixedDepositSubmitOrder: { data: { message } } } } = bodyRes;

      expect(message).to.equal('successfully submitted.');
    });

    it('should return publicId in bodyRes', () => {
      const { data: { FixedDepositSubmitOrder: { data: { publicId } } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });
  });
});

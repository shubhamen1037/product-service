const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');

chai.use(require('chai-uuid'));

const chaiHttp = require('chai-http');
const server = require('../../../server');

const { Order: OrderService } = require('../../../../services');
const { AUTHORIZATION } = require('../../../constant');
const { CANCEL_ORDER_REMARK_POSSIBILITY_CORRECT, CANCEL_ORDER_REMARK_POSSIBILITY_INCORRECT } = require('../../../constant/index');

const { expect } = chai;

chai.use(chaiHttp);

describe('Cancel graphql', () => {
  let mockOrderService;

  context('successful cancel resolver', () => {
    beforeEach(async () => {
      mockOrderService = sinon.stub(OrderService, 'cancel');
      mockOrderService.returns({ doc: { message: 'successfully cancelled.' } });
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    let statusRes;

    let bodyRes;

    forEach(CANCEL_ORDER_REMARK_POSSIBILITY_CORRECT)
      .it('should return a successfully updated status when doing the cancel i.e. HTTP 200', async ({ remark, publicId }) => {
        const { status, body } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
              mutation {
                FixedDepositCancelOrder(publicId:"${publicId}", input:{
                  remark: "${remark}"
                }){
                  data{
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
        expect(statusRes).to.be.equal(200);
      });

    forEach(CANCEL_ORDER_REMARK_POSSIBILITY_CORRECT)
      .it('should return message in bodyRes', async ({ remark, publicId }) => {
        const { status, body } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
                  mutation{
                    FixedDepositCancelOrder(publicId:"${publicId}", input:{
                      remark: "${remark}"
                    }){
                      data{
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
        const { data: { FixedDepositCancelOrder: { data: { message } } } } = bodyRes;

        expect(message).to.be.equals('successfully cancelled.');
      });
  });

  context('Unsuccessful cancel resolver', () => {
    beforeEach(async () => {
      mockOrderService = sinon.stub(OrderService, 'cancel');
      mockOrderService.returns({ doc: { errors: 'publicId should be valid uuid.' } });
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    let statusRes;

    forEach(CANCEL_ORDER_REMARK_POSSIBILITY_INCORRECT)
      .it('should return message in bodyRes', async ({ remark, publicId }) => {
        const { status } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
            mutation{
              FixedDepositCancelOrder(publicId:"${publicId}", input:{
                remark: "${remark}"
              }){
                data{
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
        expect(statusRes).to.be.equal(400);
      });
  });
});

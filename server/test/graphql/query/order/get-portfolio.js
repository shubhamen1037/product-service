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

  context('FixedDepositUserPortfolioSummary reslover', () => {
    let statusRes;

    let bodyRes;

    before(async () => {
      mockOrderService = sinon.stub(OrderService, 'getSummary');
      mockOrderService.returns({
        doc: {
          investedAmount: 8,
          maturityAmount: 0,
        },
      });

      const { status, body } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `query{
            FixedDepositUserPortfolioSummary{
              data{
                investedAmount
                maturityAmount
              }
            }
          } `,
        });

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    it('should return a successfully created status when doing the save i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });

    it('should return a response body to be an object', () => {
      const { data: { FixedDepositUserPortfolioSummary: { data } } } = bodyRes;

      expect(data).to.be.an('object');
    });

    it('should return a number as a number', () => {
      const { data: { FixedDepositUserPortfolioSummary: { data: { investedAmount } } } } = bodyRes;

      expect(investedAmount).to.be.a('number');
    });

    it('should return a amount as a finite value', () => {
      const { data: { FixedDepositUserPortfolioSummary: { data: { investedAmount } } } } = bodyRes;

      expect(investedAmount).to.be.finite;
    });
  });
});

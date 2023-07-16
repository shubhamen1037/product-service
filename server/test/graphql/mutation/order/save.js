const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');

chai.use(require('chai-uuid'));

const chaiHttp = require('chai-http');
const server = require('../../../server');

const { Order: OrderService } = require('../../../../services');
const { AUTHORIZATION } = require('../../../constant');
const {
  SAVE_ORDER, FALSE_ORDER, SAVE_ORDER_MUTATION_CORRECT, SAVE_ORDER_MUTATION_CORRECT_WITH_NOMINEE,
} = require('../../../constant/index');

const { expect } = chai;

chai.use(chaiHttp);

describe('Order graphql', () => {
  let mockOrderService;

  context('save resolver successful', () => {
    let statusRes;

    let bodyRes;

    before(async () => {
      mockOrderService = sinon.stub(OrderService, 'save');
      mockOrderService.returns({ doc: { publicId: '55cbd854-726f-11eb-9439-0242ac130002', message: 'successfully created.' } });

      const { status, body } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `
          mutation {
            FixedDepositOrder(
              input: {
                partnerId: "d6cf8639-2080-11ec-aad9-b7cfbef2f433"
                productId: "d6d6d93e-2080-11ec-aad9-b7cfbef2f433"
                interestRate: 6
                amount: 100
                tenure: 1
                interestPayout: "quarterly",
                investedAs: "individual"
              },isFinalSubmission:false
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

    it('should return false when SAVE_ORDER is passed but expects FALSE_ORDER Object', () => {
      OrderService.save(SAVE_ORDER);
      expect(mockOrderService.calledWith(FALSE_ORDER)).to.be.false;
    });

    it('should return a successfully created status when doing the save i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });

    it('should return a successfully message', () => {
      const { data: { FixedDepositOrder: { data: { message } } } } = bodyRes;

      expect(message).to.equal('successfully created.');
    });

    it('should return publicId in bodyRes', () => {
      const { data: { FixedDepositOrder: { data: { publicId } } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });
  });

  context('successful Save resolver without nominee', () => {
    beforeEach(async () => {
      mockOrderService = sinon.stub(OrderService, 'save');
      mockOrderService.returns({ doc: { publicId: '55cbd854-726f-11eb-9439-0242ac130002', message: 'successfully created.' } });
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    let statusRes;

    let bodyRes;

    forEach(SAVE_ORDER_MUTATION_CORRECT)
      .it('should Save Order i.e. HTTP 200', async ({
        partnerId, productId, interestRate, amount, tenure, interestPayout, investedAs,
      }) => {
        const { status, body } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
          mutation {
            FixedDepositOrder(
              input: {
                partnerId: "${partnerId}"
                productId: "${productId}"
                interestRate: ${interestRate}
                amount: ${amount}
                tenure: ${tenure}
                interestPayout: "${interestPayout}"
                investedAs: "${investedAs}"
              },isFinalSubmission:false
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
        expect(statusRes).to.be.equal(200);
      });

    forEach(SAVE_ORDER_MUTATION_CORRECT)
      .it('message should be successfully saved', async ({
        partnerId, productId, interestRate, amount, tenure, interestPayout, investedAs,
      }) => {
        const { status, body } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
              mutation {
                FixedDepositOrder(
                  input: {
                    partnerId: "${partnerId}"
                    productId: "${productId}"
                    interestRate: ${interestRate}
                    amount: ${amount}
                    tenure: ${tenure}
                    interestPayout: "${interestPayout}",
                    investedAs: "${investedAs}"
                  },isFinalSubmission:false
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
        const { data: { FixedDepositOrder: { data: { message } } } } = bodyRes;

        expect(message).to.equal('successfully created.');
      });

    forEach(SAVE_ORDER_MUTATION_CORRECT)
      .it('should Save Order i.e. HTTP 200', async ({
        partnerId, productId, interestRate, amount, tenure, interestPayout, investedAs,
      }) => {
        const { status, body } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
            mutation {
              FixedDepositOrder(
                input: {
                  partnerId: "${partnerId}"
                  productId: "${productId}"
                  interestRate: ${interestRate}
                  amount: ${amount}
                  tenure: ${tenure}
                  interestPayout: "${interestPayout}",
                  investedAs: "${investedAs}"
                },isFinalSubmission:false
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
        const { data: { FixedDepositOrder: { data: { publicId } } } } = bodyRes;

        expect(publicId).to.be.a.uuid('v1');
      });
  });

  context('successful Save resolver with nominee', () => {
    beforeEach(async () => {
      mockOrderService = sinon.stub(OrderService, 'save');
      mockOrderService.returns({ doc: { publicId: '55cbd854-726f-11eb-9439-0242ac130002', message: 'successfully created.' } });
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    let statusRes;

    let bodyRes;

    forEach(SAVE_ORDER_MUTATION_CORRECT_WITH_NOMINEE)
      .it('should Save Order i.e. HTTP 200', async ({
        partnerId, productId, interestRate, amount, tenure, interestPayout, investedAs,
      }) => {
        const { status, body } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
              mutation {
                FixedDepositOrder(
                  input: {
                    partnerId: "${partnerId}"
                    productId: "${productId}"
                    interestRate: ${interestRate}
                    amount: ${amount}
                    tenure: ${tenure}
                    interestPayout: "${interestPayout}"
                    investedAs: "${investedAs}"
                  },isFinalSubmission:false
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
        expect(statusRes).to.be.equal(200);
      });

    forEach(SAVE_ORDER_MUTATION_CORRECT_WITH_NOMINEE)
      .it('message should be successfully saved', async ({
        partnerId, productId, interestRate, amount, tenure, interestPayout, investedAs,
      }) => {
        const { status, body } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
              mutation {
                FixedDepositOrder(
                  input: {
                    partnerId: "${partnerId}"
                    productId: "${productId}"
                    interestRate: ${interestRate}
                    amount: ${amount}
                    tenure: ${tenure}
                    interestPayout: "${interestPayout}",
                    investedAs: "${investedAs}"
                  },isFinalSubmission:false
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
        const { data: { FixedDepositOrder: { data: { message } } } } = bodyRes;

        expect(message).to.equal('successfully created.');
      });

    forEach(SAVE_ORDER_MUTATION_CORRECT_WITH_NOMINEE)
      .it('should Save Order i.e. HTTP 200', async ({
        partnerId, productId, interestRate, amount, tenure, interestPayout, investedAs,
      }) => {
        const { status, body } = await chai.request(server)
          .post('/graphql')
          .set('authorization', AUTHORIZATION)
          .send({
            query: `
            mutation {
              FixedDepositOrder(
                input: {
                  partnerId: "${partnerId}"
                  productId: "${productId}"
                  interestRate: ${interestRate}
                  amount: ${amount}
                  tenure: ${tenure}
                  interestPayout: "${interestPayout}",
                  investedAs: "${investedAs}"
                },isFinalSubmission:false
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
        const { data: { FixedDepositOrder: { data: { publicId } } } } = bodyRes;

        expect(publicId).to.be.a.uuid('v1');
      });
  });
});

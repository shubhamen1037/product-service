const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-uuid'));

const chaiHttp = require('chai-http');
const server = require('../../../server');
const { AUTHORIZATION } = require('../../../constant');
const { BajajFinserv: BajajFinservService } = require('../../../../services/bajaj-finserv');

const { expect } = chai;

chai.use(chaiHttp);

describe('Payment graphql', () => {
  let mockBajajService;

  context('FixedDepositPayment resolver', () => {
    let statusRes;

    before(async () => {
      mockBajajService = sinon.stub(BajajFinservService, 'generateURL');
      mockBajajService.returns({
        doc: {
          url: '<html></html>',
        },
      });

      const { status } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `
          query {
            FixedDepositPayment(
                input: {
                    bankId: "5c58cdc0-9f70-11ec-adf1-11627524ba90",
                    type: "net-banking",
                    publicId: "13ed0bb0-9f8d-11ec-91cf-2d7451a21f95"
                  }) {
              data {
                url
              }
              errors {
                message
              }
            }
          }
          `,
        });

      statusRes = status;
    });

    afterEach(async () => {
      mockBajajService.restore();
    });

    it('should return a successfully created status when get brand data i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });
  });

  context('FixedDepositPaymentUrl', () => {
    let statusRes;

    before(async () => {
      mockBajajService = sinon.stub(BajajFinservService, 'generateURL');
      mockBajajService.returns({
        doc: {
          url: 'https://fixed-deposit-dev.eazyfin.com/bajaj-finserv/5c58cdc0-9f70-11ec-adf1-11627524ba90/13ed0bb0-9f8d-11ec-91cf-2d7451a21f95/net-banking/payment',
        },
      });

      const { status } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `
          query {
            FixedDepositPayment(
                input: {
                    bankId: "5c58cdc0-9f70-11ec-adf1-11627524ba90",
                    type: "net-banking",
                    publicId: "13ed0bb0-9f8d-11ec-91cf-2d7451a21f95"
                  }) {
              data {
                url
              }
              errors {
                message
              }
            }
          }
          `,
        });

      statusRes = status;
    });

    afterEach(async () => {
      mockBajajService.restore();
    });

    it('should return a successfully created status when get brand data i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });
  });
});

const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-uuid'));

const chaiHttp = require('chai-http');
const server = require('../../../server');
const { AUTHORIZATION } = require('../../../constant');
const { Order: OrderService } = require('../../../../services');

const { expect } = chai;

chai.use(chaiHttp);

describe('Order graphql', () => {
  let mockBrandService;

  context('FixedDepositOrder resolver', () => {
    let statusRes;

    let bodyRes;

    before(async () => {
      mockBrandService = sinon.stub(OrderService, 'getDetailById');
      mockBrandService.returns({
        doc: {
          partnerId: 'd6cf5f20-2080-11ec-aad9-b7cfbef2f433',
          publicId: 'becde240-aa67-11ec-bb16-6580e2439e85',
          productId: '4a0f9030-a35e-11ec-9ae0-71924e98c2da',
          number: 'FD/FIN/000001',
          amount: 124,
          tenure: 2,
          partner: {
            publicId: 'd6cf5f20-2080-11ec-aad9-b7cfbef2f433',
          },
          status: 'initiated',
          orderHistories: [
            {
              status: 'initiated',
            },
          ],
          product: {
            publicId: '4a0f9030-a35e-11ec-9ae0-71924e98c2da',
            code: 'FD',
            name: 'Fixed deposit',
            logoUrl: 'https://eazyfin.s3.ap-south-1.amazonaws.com/public-doc/11f75d40-a35e-11ec-bafa-0b61695c24b7-fd-icon.png',
            description: 'Fixed deposit',
            category: 'loan',
            status: 'active',
          },
          interestPayout: 'quarterly',
          investedAs: 'partnership-and-llp',
          nominee: {
            name: 'Ram',
            firstName: 'hello',
            middleName: null,
            lastName: null,
            relationship: 'Brother',
            dob: '1998-03-04',
            mobileNumber: '9811210070',
            address: {
              ship: 'leased',
              addressType: 'current',
              addressLine2: 'Gyan Khand',
              addressLine3: 'Indirapuram',
              addressLine1: '89G',
              mobileNumber: '9811210070',
              districtName: 'East Delhi',
              pincode: '110096',
              stateId: '8a9b50e4-9b84-11ec-b909-0242ac120002',
              state: {
                publicId: '8a9b50e4-9b84-11ec-b909-0242ac120002',
                code: '07',
                name: 'Delhi',
              },
            },
          },
          createdAt: '2022-03-23T05:11:51.480Z',
          updatedAt: '2022-03-23T05:11:51.480Z',
        },
      });

      const { status, body } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `
          query{
            FixedDepositOrder(publicId:"63036cc0-1abe-11ec-b1e8-09b707cd1995"){
              data {
                partnerId
                publicId
                productId
                number
                amount
                tenure
                partner {
                  publicId
                }
                status
                orderHistories {
                  status
                }
                product {
                  publicId
                  code
                  name
                  logoUrl
                  description
                  category
                  status
                }
                interestPayout
                investedAs
                nominee {
                  name
                  relationship
                  dob
                  mobileNumber
                  address {
                    addressType
                    addressLine2
                    addressLine3
                    addressLine1
                    mobileNumber
                    districtName
                    pincode
                    stateId
                    state {
                      publicId
                      code
                      name
                    }
                  }
                }
                createdAt
                updatedAt
                response
              }
            }
          }
          `,
        });

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockBrandService.restore();
    });

    it('should return a successfully created status when get brand data i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });

    it('should return a body as an object', () => {
      expect(bodyRes).to.be.an('object');
    });

    it('should return a data as an object', () => {
      const { data: dataBodyResponse } = bodyRes;

      expect(dataBodyResponse).to.be.an('object');
    });

    it('should return a FixedDepositOrder as an object', () => {
      const { data: { FixedDepositOrder } } = bodyRes;

      expect(FixedDepositOrder).to.be.an('object');
    });

    it('should return a FixedDepositOrder as an object', () => {
      const { data: { FixedDepositOrder } } = bodyRes;

      expect(FixedDepositOrder).to.be.an('object');
    });

    it('should return a FixedDepositOrder as an object', () => {
      const { data: { FixedDepositOrder: { data: dataFixedDepositOrder } } } = bodyRes;

      expect(dataFixedDepositOrder).to.be.an('object');
    });

    it('should return a publicId as a uuid', () => {
      const { data: { FixedDepositOrder: { data: { publicId } } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a partnerId as a uuid', () => {
      const { data: { FixedDepositOrder: { data: { partnerId } } } } = bodyRes;

      expect(partnerId).to.be.a.uuid('v1');
    });

    it('should return a productId as a uuid', () => {
      const { data: { FixedDepositOrder: { data: { productId } } } } = bodyRes;

      expect(productId).to.be.a.uuid('v1');
    });

    it('should return a number as a string', () => {
      const { data: { FixedDepositOrder: { data: { number } } } } = bodyRes;

      expect(number).to.be.a('string');
    });

    it('should return a amount as a finite value', () => {
      const { data: { FixedDepositOrder: { data: { amount } } } } = bodyRes;

      expect(amount).to.be.finite;
    });

    it('should return a tenure as a finite value', () => {
      const { data: { FixedDepositOrder: { data: { tenure } } } } = bodyRes;

      expect(tenure).to.be.finite;
    });

    it('should return a partner as a object', () => {
      const { data: { FixedDepositOrder: { data: { partner } } } } = bodyRes;

      expect(partner).to.be.an('object');
    });

    it('should return a publicId of Partner as a uuid', () => {
      const { data: { FixedDepositOrder: { data: { partner: { publicId } } } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a status as a string', () => {
      const { data: { FixedDepositOrder: { data: { status } } } } = bodyRes;

      expect(status).to.be.a('string');
    });

    it('should return a orderHistories as an array', () => {
      const { data: { FixedDepositOrder: { data: { orderHistories } } } } = bodyRes;

      expect(orderHistories).to.be.an('array');
    });

    it('should return a product as a object', () => {
      const { data: { FixedDepositOrder: { data: { product } } } } = bodyRes;

      expect(product).to.be.an('object');
    });

    it("should return a product's publicId as a uuid", () => {
      const { data: { FixedDepositOrder: { data: { product: { publicId } } } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a code as a string', () => {
      const { data: { FixedDepositOrder: { data: { product: { code } } } } } = bodyRes;

      expect(code).to.be.a('string');
    });

    it("should return a product's name as a string", () => {
      const { data: { FixedDepositOrder: { data: { product: { name } } } } } = bodyRes;

      expect(name).to.be.a('string');
    });

    it("should return a product's logoUrl as a string", () => {
      const { data: { FixedDepositOrder: { data: { product: { logoUrl } } } } } = bodyRes;

      expect(logoUrl).to.be.a('string');
    });

    it("should return a product's description as a string", () => {
      const { data: { FixedDepositOrder: { data: { product: { description } } } } } = bodyRes;

      expect(description).to.be.a('string');
    });

    it("should return a product's category as a string", () => {
      const { data: { FixedDepositOrder: { data: { product: { category } } } } } = bodyRes;

      expect(category).to.be.a('string');
    });

    it("should return a product's status as a string", () => {
      const { data: { FixedDepositOrder: { data: { product: { status } } } } } = bodyRes;

      expect(status).to.be.a('string');
    });

    it('should return a interestPayout as a string', () => {
      const { data: { FixedDepositOrder: { data: { interestPayout } } } } = bodyRes;

      expect(interestPayout).to.be.a('string');
    });

    it('should return a investedAs as a string', () => {
      const { data: { FixedDepositOrder: { data: { investedAs } } } } = bodyRes;

      expect(investedAs).to.be.a('string');
    });

    it('should return a nominee as a string', () => {
      const { data: { FixedDepositOrder: { data: { nominee } } } } = bodyRes;

      expect(nominee).to.be.an('object');
    });

    it("should return a nominee's name as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { name } } } } } = bodyRes;

      expect(name).to.be.a('string');
    });

    it("should return a nominee's relationship as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { relationship } } } } } = bodyRes;

      expect(relationship).to.be.a('string');
    });

    it("should return a nominee's dob as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { dob } } } } } = bodyRes;

      expect(dob).to.be.a('string');
    });

    it("should return a nominee's mobileNumber as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { mobileNumber } } } } } = bodyRes;

      expect(mobileNumber).to.be.a('string');
    });

    it("should return a nominee's address as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address } } } } } = bodyRes;

      expect(address).to.be.an('object');
    });

    it("should return a nominee's address's addressType as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { addressType } } } } } } = bodyRes;

      expect(addressType).to.be.a('string');
    });

    it("should return a nominee's address's addressLine1 as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { addressLine1 } } } } } } = bodyRes;

      expect(addressLine1).to.be.a('string');
    });

    it("should return a nominee's address's addressLine2 as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { addressLine2 } } } } } } = bodyRes;

      expect(addressLine2).to.be.a('string');
    });

    it("should return a nominee's address's addressLine3 as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { addressLine3 } } } } } } = bodyRes;

      expect(addressLine3).to.be.a('string');
    });

    it("should return a nominee's address's mobileNumber as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { mobileNumber } } } } } } = bodyRes;

      expect(mobileNumber).to.be.a('string');
    });

    it("should return a nominee's address's districtName as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { districtName } } } } } } = bodyRes;

      expect(districtName).to.be.a('string');
    });

    it("should return a nominee's address's pincode as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { pincode } } } } } } = bodyRes;

      expect(pincode).to.be.a('string');
    });

    it("should return a nominee's address's stateId as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { stateId } } } } } } = bodyRes;

      expect(stateId).to.be.a.uuid('v1');
    });

    it("should return a nominee's address's state as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { state } } } } } } = bodyRes;

      expect(state).to.be.an('object');
    });

    it("should return a nominee's address's state publicId as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { state: { publicId } } } } } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });

    it("should return a nominee's address's state code as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { state: { code } } } } } } } = bodyRes;

      expect(code).to.be.a('string');
    });

    it("should return a nominee's address's state name as a string", () => {
      const { data: { FixedDepositOrder: { data: { nominee: { address: { state: { name } } } } } } } = bodyRes;

      expect(name).to.be.a('string');
    });

    it('should return a createdAt as a string', () => {
      const { data: { FixedDepositOrder: { data: { createdAt } } } } = bodyRes;

      expect(createdAt).to.be.a('string');
    });

    it('should return a updatedAt as a string', () => {
      const { data: { FixedDepositOrder: { data: { updatedAt } } } } = bodyRes;

      expect(updatedAt).to.be.a('string');
    });
  });
});

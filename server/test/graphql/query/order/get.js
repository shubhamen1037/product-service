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

  context('FixedDepositOrders reslover', () => {
    let statusRes;

    let bodyRes;

    before(async () => {
      mockOrderService = sinon.stub(OrderService, 'getByUserId');
      mockOrderService.returns({
        doc: [ {
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
            relationship: 'Brother',
            dob: '1998-03-04',
            mobileNumber: '9811210070',
            address: {
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
          response: null,
        } ],
      });

      const { status, body } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `query{
            FixedDepositOrders{
              data{
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

    it('should return partnerId in bodyRes', () => {
      const { data: { FixedDepositOrders: { data: [ { partnerId } ] } } } = bodyRes;

      expect(partnerId).to.be.a.uuid('v1');
    });

    it('should return a response body to be an array', () => {
      const { data: { FixedDepositOrders: { data } } } = bodyRes;

      expect(data).to.be.an('array');
    });

    it('should return a index 0 of data to be an object', () => {
      const { data: { FixedDepositOrders: { data } } } = bodyRes;

      expect(data[0]).to.be.an('object');
    });

    it('should return a publicId as a uuid', () => {
      const { data: { FixedDepositOrders: { data: [ { publicId } ] } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a partnerId as a uuid', () => {
      const { data: { FixedDepositOrders: { data: [ { partnerId } ] } } } = bodyRes;

      expect(partnerId).to.be.a.uuid('v1');
    });

    it('should return a productId as a uuid', () => {
      const { data: { FixedDepositOrders: { data: [ { productId } ] } } } = bodyRes;

      expect(productId).to.be.a.uuid('v1');
    });

    it('should return a number as a string', () => {
      const { data: { FixedDepositOrders: { data: [ { number } ] } } } = bodyRes;

      expect(number).to.be.a('string');
    });

    it('should return a amount as a finite value', () => {
      const { data: { FixedDepositOrders: { data: [ { amount } ] } } } = bodyRes;

      expect(amount).to.be.finite;
    });

    it('should return a tenure as a finite value', () => {
      const { data: { FixedDepositOrders: { data: [ { tenure } ] } } } = bodyRes;

      expect(tenure).to.be.finite;
    });

    it('should return a partner as a object', () => {
      const { data: { FixedDepositOrders: { data: [ { partner } ] } } } = bodyRes;

      expect(partner).to.be.an('object');
    });

    it('should return a publicId of Partner as a uuid', () => {
      const { data: { FixedDepositOrders: { data: [ { partner: { publicId } } ] } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a status as a string', () => {
      const { data: { FixedDepositOrders: { data: [ { status } ] } } } = bodyRes;

      expect(status).to.be.a('string');
    });

    it('should return a orderHistories as an array', () => {
      const { data: { FixedDepositOrders: { data: [ { orderHistories } ] } } } = bodyRes;

      expect(orderHistories).to.be.an('array');
    });

    it('should return a product as a object', () => {
      const { data: { FixedDepositOrders: { data: [ { product } ] } } } = bodyRes;

      expect(product).to.be.an('object');
    });

    it("should return a product's publicId as a uuid", () => {
      const { data: { FixedDepositOrders: { data: [ { product: { publicId } } ] } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a code as a string', () => {
      const { data: { FixedDepositOrders: { data: [ { product: { code } } ] } } } = bodyRes;

      expect(code).to.be.a('string');
    });

    it("should return a product's name as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { product: { name } } ] } } } = bodyRes;

      expect(name).to.be.a('string');
    });

    it("should return a product's logoUrl as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { product: { logoUrl } } ] } } } = bodyRes;

      expect(logoUrl).to.be.a('string');
    });

    it("should return a product's description as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { product: { description } } ] } } } = bodyRes;

      expect(description).to.be.a('string');
    });

    it("should return a product's category as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { product: { category } } ] } } } = bodyRes;

      expect(category).to.be.a('string');
    });

    it("should return a product's status as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { product: { status } } ] } } } = bodyRes;

      expect(status).to.be.a('string');
    });

    it('should return a interestPayout as a string', () => {
      const { data: { FixedDepositOrders: { data: [ { interestPayout } ] } } } = bodyRes;

      expect(interestPayout).to.be.a('string');
    });

    it('should return a investedAs as a string', () => {
      const { data: { FixedDepositOrders: { data: [ { investedAs } ] } } } = bodyRes;

      expect(investedAs).to.be.a('string');
    });

    it('should return a nominee as a string', () => {
      const { data: { FixedDepositOrders: { data: [ { nominee } ] } } } = bodyRes;

      expect(nominee).to.be.an('object');
    });

    it("should return a nominee's name as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { name } } ] } } } = bodyRes;

      expect(name).to.be.a('string');
    });

    it("should return a nominee's relationship as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { relationship } } ] } } } = bodyRes;

      expect(relationship).to.be.a('string');
    });

    it("should return a nominee's dob as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { dob } } ] } } } = bodyRes;

      expect(dob).to.be.a('string');
    });

    it("should return a nominee's mobileNumber as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { mobileNumber } } ] } } } = bodyRes;

      expect(mobileNumber).to.be.a('string');
    });

    it("should return a nominee's address as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address } } ] } } } = bodyRes;

      expect(address).to.be.an('object');
    });

    it("should return a nominee's address's addressType as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { addressType } } } ] } } } = bodyRes;

      expect(addressType).to.be.a('string');
    });

    it("should return a nominee's address's addressLine1 as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { addressLine1 } } } ] } } } = bodyRes;

      expect(addressLine1).to.be.a('string');
    });

    it("should return a nominee's address's addressLine2 as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { addressLine2 } } } ] } } } = bodyRes;

      expect(addressLine2).to.be.a('string');
    });

    it("should return a nominee's address's addressLine3 as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { addressLine3 } } } ] } } } = bodyRes;

      expect(addressLine3).to.be.a('string');
    });

    it("should return a nominee's address's mobileNumber as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { mobileNumber } } } ] } } } = bodyRes;

      expect(mobileNumber).to.be.a('string');
    });

    it("should return a nominee's address's districtName as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { districtName } } } ] } } } = bodyRes;

      expect(districtName).to.be.a('string');
    });

    it("should return a nominee's address's pincode as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { pincode } } } ] } } } = bodyRes;

      expect(pincode).to.be.a('string');
    });

    it("should return a nominee's address's stateId as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { stateId } } } ] } } } = bodyRes;

      expect(stateId).to.be.a.uuid('v1');
    });

    it("should return a nominee's address's state as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { state } } } ] } } } = bodyRes;

      expect(state).to.be.an('object');
    });

    it("should return a nominee's address's state publicId as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { state: { publicId } } } } ] } } } = bodyRes;

      expect(publicId).to.be.a.uuid('v1');
    });

    it("should return a nominee's address's state code as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { state: { code } } } } ] } } } = bodyRes;

      expect(code).to.be.a('string');
    });

    it("should return a nominee's address's state name as a string", () => {
      const { data: { FixedDepositOrders: { data: [ { nominee: { address: { state: { name } } } } ] } } } = bodyRes;

      expect(name).to.be.a('string');
    });

    it('should return a createdAt as a string', () => {
      const { data: { FixedDepositOrders: { data: [ { createdAt } ] } } } = bodyRes;

      expect(createdAt).to.be.a('string');
    });

    it('should return a updatedAt as a string', () => {
      const { data: { FixedDepositOrders: { data: [ { updatedAt } ] } } } = bodyRes;

      expect(updatedAt).to.be.a('string');
    });
  });
});

const chai = require('chai');
const sinon = require('sinon');
const { Order: OrderService } = require('../../../services');
const { order: OrderModel } = require('../../../database');

chai.use(require('chai-uuid'));

const { expect } = chai;

describe('Order service', () => {
  let orderRequest;

  context('getByUserId method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'getByUserId');
      orderRequest.returns({
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
            firstName: 'hello',
            middleName: null,
            lastName: null,
            relationship: 'Brother',
            gender: 'Male',
            dob: '1998-03-04',
            mobileNumber: '9811210070',
            address: {
              ownership: 'leased',
              addressType: 'current',
              addressLine2: 'Gyan Khand',
              addressLine3: 'Indirapuram',
              addressLine1: '89G',
              telephoneNumber: '2130274',
              landmark: 'Opp. SBI',
              stayingSince: '2010-10-10',
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
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    it('should exists inside order service', () => {
      expect(OrderService.getByUserId).to.be.exist;
    });

    it('should return a response body to be an array', () => {
      const { doc } = OrderService.getByUserId();

      expect(doc).to.be.an('array');
    });

    it('should return a publicId as a valid UUID', () => {
      const { doc: [ { publicId } ] } = OrderService.getByUserId();

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a partnerId as a uuid', () => {
      const { doc: [ { partnerId } ] } = OrderService.getByUserId();

      expect(partnerId).to.be.a.uuid('v1');
    });

    it('should return a productId as a uuid', () => {
      const { doc: [ { productId } ] } = OrderService.getByUserId();

      expect(productId).to.be.a.uuid('v1');
    });

    it('should return a number as a string', () => {
      const { doc: [ { number } ] } = OrderService.getByUserId();

      expect(number).to.be.a('string');
    });

    it('should return a amount as a finite value', () => {
      const { doc: [ { amount } ] } = OrderService.getByUserId();

      expect(amount).to.be.finite;
    });

    it('should return a tenure as a finite value', () => {
      const { doc: [ { tenure } ] } = OrderService.getByUserId();

      expect(tenure).to.be.finite;
    });

    it('should return a partner as a object', () => {
      const { doc: [ { partner } ] } = OrderService.getByUserId();

      expect(partner).to.be.an('object');
    });

    it('should return a publicId of Partner as a uuid', () => {
      const { doc: [ { partner: { publicId } } ] } = OrderService.getByUserId();

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a status as a string', () => {
      const { doc: [ { status } ] } = OrderService.getByUserId();

      expect(status).to.be.a('string');
    });

    it('should return a orderHistories as an array', () => {
      const { doc: [ { orderHistories } ] } = OrderService.getByUserId();

      expect(orderHistories).to.be.an('array');
    });

    it('should return a product as a object', () => {
      const { doc: [ { product } ] } = OrderService.getByUserId();

      expect(product).to.be.an('object');
    });

    it("should return a product's publicId as a uuid", () => {
      const { doc: [ { product: { publicId } } ] } = OrderService.getByUserId();

      expect(publicId).to.be.a.uuid('v1');
    });

    it('should return a code as a string', () => {
      const { doc: [ { product: { code } } ] } = OrderService.getByUserId();

      expect(code).to.be.a('string');
    });

    it("should return a product's name as a string", () => {
      const { doc: [ { product: { name } } ] } = OrderService.getByUserId();

      expect(name).to.be.a('string');
    });

    it("should return a product's logoUrl as a string", () => {
      const { doc: [ { product: { logoUrl } } ] } = OrderService.getByUserId();

      expect(logoUrl).to.be.a('string');
    });

    it("should return a product's description as a string", () => {
      const { doc: [ { product: { description } } ] } = OrderService.getByUserId();

      expect(description).to.be.a('string');
    });

    it("should return a product's category as a string", () => {
      const { doc: [ { product: { category } } ] } = OrderService.getByUserId();

      expect(category).to.be.a('string');
    });

    it("should return a product's status as a string", () => {
      const { doc: [ { product: { status } } ] } = OrderService.getByUserId();

      expect(status).to.be.a('string');
    });

    it('should return a interestPayout as a string', () => {
      const { doc: [ { interestPayout } ] } = OrderService.getByUserId();

      expect(interestPayout).to.be.a('string');
    });

    it('should return a investedAs as a string', () => {
      const { doc: [ { investedAs } ] } = OrderService.getByUserId();

      expect(investedAs).to.be.a('string');
    });

    it('should return a nominee as a string', () => {
      const { doc: [ { nominee } ] } = OrderService.getByUserId();

      expect(nominee).to.be.an('object');
    });

    it("should return a nominee's name as a string", () => {
      const { doc: [ { nominee: { name } } ] } = OrderService.getByUserId();

      expect(name).to.be.a('string');
    });

    it("should return a nominee's firstName as a string", () => {
      const { doc: [ { nominee: { firstName } } ] } = OrderService.getByUserId();

      expect(firstName).to.be.a('string');
    });

    it("should return a nominee's middleName as a string", () => {
      const { doc: [ { nominee: { middleName } } ] } = OrderService.getByUserId();

      expect(middleName).to.be.a('null');
    });

    it("should return a nominee's lastName as a string", () => {
      const { doc: [ { nominee: { lastName } } ] } = OrderService.getByUserId();

      expect(lastName).to.be.a('null');
    });

    it("should return a nominee's relationship as a string", () => {
      const { doc: [ { nominee: { relationship } } ] } = OrderService.getByUserId();

      expect(relationship).to.be.a('string');
    });

    it("should return a nominee's gender as a string", () => {
      const { doc: [ { nominee: { gender } } ] } = OrderService.getByUserId();

      expect(gender).to.be.a('string');
    });

    it("should return a nominee's dob as a string", () => {
      const { doc: [ { nominee: { dob } } ] } = OrderService.getByUserId();

      expect(dob).to.be.a('string');
    });

    it("should return a nominee's mobileNumber as a string", () => {
      const { doc: [ { nominee: { mobileNumber } } ] } = OrderService.getByUserId();

      expect(mobileNumber).to.be.a('string');
    });

    it("should return a nominee's address as a string", () => {
      const { doc: [ { nominee: { address } } ] } = OrderService.getByUserId();

      expect(address).to.be.an('object');
    });

    it("should return a nominee's address's ownership as a string", () => {
      const { doc: [ { nominee: { address: { ownership } } } ] } = OrderService.getByUserId();

      expect(ownership).to.be.a('string');
    });

    it("should return a nominee's address's addressType as a string", () => {
      const { doc: [ { nominee: { address: { addressType } } } ] } = OrderService.getByUserId();

      expect(addressType).to.be.a('string');
    });

    it("should return a nominee's address's addressLine1 as a string", () => {
      const { doc: [ { nominee: { address: { addressLine1 } } } ] } = OrderService.getByUserId();

      expect(addressLine1).to.be.a('string');
    });

    it("should return a nominee's address's addressLine2 as a string", () => {
      const { doc: [ { nominee: { address: { addressLine2 } } } ] } = OrderService.getByUserId();

      expect(addressLine2).to.be.a('string');
    });

    it("should return a nominee's address's addressLine3 as a string", () => {
      const { doc: [ { nominee: { address: { addressLine3 } } } ] } = OrderService.getByUserId();

      expect(addressLine3).to.be.a('string');
    });

    it("should return a nominee's address's telephoneNumber as a string", () => {
      const { doc: [ { nominee: { address: { telephoneNumber } } } ] } = OrderService.getByUserId();

      expect(telephoneNumber).to.be.a('string');
    });

    it("should return a nominee's address's landmark as a string", () => {
      const { doc: [ { nominee: { address: { landmark } } } ] } = OrderService.getByUserId();

      expect(landmark).to.be.a('string');
    });

    it("should return a nominee's address's stayingSince as a string", () => {
      const { doc: [ { nominee: { address: { stayingSince } } } ] } = OrderService.getByUserId();

      expect(stayingSince).to.be.a('string');
    });

    it("should return a nominee's address's mobileNumber as a string", () => {
      const { doc: [ { nominee: { address: { mobileNumber } } } ] } = OrderService.getByUserId();

      expect(mobileNumber).to.be.a('string');
    });

    it("should return a nominee's address's districtName as a string", () => {
      const { doc: [ { nominee: { address: { districtName } } } ] } = OrderService.getByUserId();

      expect(districtName).to.be.a('string');
    });

    it("should return a nominee's address's pincode as a string", () => {
      const { doc: [ { nominee: { address: { pincode } } } ] } = OrderService.getByUserId();

      expect(pincode).to.be.a('string');
    });

    it("should return a nominee's address's stateId as a string", () => {
      const { doc: [ { nominee: { address: { stateId } } } ] } = OrderService.getByUserId();

      expect(stateId).to.be.a.uuid('v1');
    });

    it("should return a nominee's address's state as a string", () => {
      const { doc: [ { nominee: { address: { state } } } ] } = OrderService.getByUserId();

      expect(state).to.be.an('object');
    });

    it("should return a nominee's address's state publicId as a string", () => {
      const { doc: [ { nominee: { address: { state: { publicId } } } } ] } = OrderService.getByUserId();

      expect(publicId).to.be.a.uuid('v1');
    });

    it("should return a nominee's address's state code as a string", () => {
      const { doc: [ { nominee: { address: { state: { code } } } } ] } = OrderService.getByUserId();

      expect(code).to.be.a('string');
    });

    it("should return a nominee's address's state name as a string", () => {
      const { doc: [ { nominee: { address: { state: { name } } } } ] } = OrderService.getByUserId();

      expect(name).to.be.a('string');
    });

    it('should return a createdAt as a string', () => {
      const { doc: [ { createdAt } ] } = OrderService.getByUserId();

      expect(createdAt).to.be.a('string');
    });

    it('should return a updatedAt as a string', () => {
      const { doc: [ { updatedAt } ] } = OrderService.getByUserId();

      expect(updatedAt).to.be.a('string');
    });
  });
});

describe('Order service for error', () => {
  let orderRequest;

  context('getByUserId method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'getByUserId');
      orderRequest.returns({ errors: [ { message: 'Parameter: partnerId should be valid.' } ] });

      await OrderModel.destroy({ truncate: true, cascade: true });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    it('should return errors as array', async () => {
      const { errors } = await OrderService.getByUserId();

      expect(errors).to.be.an('array');
    });
  });
});

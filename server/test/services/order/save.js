const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');
const { Order: OrderService } = require('../../../services');
const { order: OrderModel } = require('../../../database');

chai.use(require('chai-uuid'));

const {
  SAVE_ORDER_PAYLOAD,
  SAVE_ORDER_FAIL_PAYLOAD,
  INVALID_PARTNER_PRODUCT_POSSIBILITY,
  INVALID_FD_DETAILS_POSSIBILITY,
  INVALID_BASIC_DETAILS_POSSIBILITY,
  INVALID_BANK_ACCOUNT_POSSIBILITY,
  INVALID_NOMINEE_DETAILS_POSSIBILITY,
  INVALID_CURRENT_ADDRESS_POSSIBILITY,
  INVALID_CURRENT_ADDRESS_POSSIBILITY: INVALID_PERMANENT_ADDRESS_POSSIBILITY,
} = require('../../constant');

const { expect } = chai;

describe('Order service', () => {
  let orderRequest;

  context('save method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'save');
      orderRequest.returns({ doc: { message: 'successfully stored.', publicId: '8e41d840-4831-11ec-a125-5186bc390e88' } });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    it('should exists inside order service', () => {
      expect(OrderService.save).to.be.exist;
    });

    forEach(SAVE_ORDER_PAYLOAD)
      .it('should return doc while submitting', async (validSubmitData) => {
        const { doc } = await OrderService.save(validSubmitData);

        expect(doc).to.not.be.empty;
      });

    forEach(SAVE_ORDER_PAYLOAD)
      .it('should return doc while submitting', async (validSubmitData) => {
        const { doc } = await OrderService.save(validSubmitData);
        const { publicId, message } = doc;

        expect(publicId).to.be.a.uuid('v1');
        expect(message).to.equal('successfully stored.');
      });
  });
});

describe('Order service for error', () => {
  let orderRequest;

  context('save method', () => {
    beforeEach(async () => {
      orderRequest = sinon.stub(OrderService, 'save');
      orderRequest.returns({ errors: [ { message: 'Parameter: partnerId should be valid.' } ] });

      await OrderModel.destroy({ truncate: true, cascade: true });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      orderRequest.restore();
    });

    forEach(INVALID_PARTNER_PRODUCT_POSSIBILITY)
      .it('should return error when you have invalid partner id and product id', async ({ partnerId, productId }) => {
        const data = { partnerId, productId };
        const { errors } = await OrderService.save(data);

        expect(errors).to.be.an('array');
      });

    forEach(INVALID_FD_DETAILS_POSSIBILITY)
      .it('should return error when you have invalid fd details ie depositAmount and deposit tenure', async ({ depositAmount, depositTenure }) => {
        const data = { depositAmount, depositTenure };
        const { errors } = await OrderService.save(data);

        expect(errors).to.be.an('array');
      });

    forEach(INVALID_BASIC_DETAILS_POSSIBILITY)
      .it('should return error when you have invalid Basic Info', async (invalidBaicInfo) => {
        const BasicInfo = { invalidBaicInfo };
        const data = { BasicInfo };
        const { errors } = await OrderService.save(data);

        expect(errors).to.be.an('array');
      });

    forEach(INVALID_BANK_ACCOUNT_POSSIBILITY)
      .it('should return error when you have invalid Bank Account', async (invalidBankAccount) => {
        const BankAccount = { invalidBankAccount };
        const data = { BankAccount };
        const { errors } = await OrderService.save(data);

        expect(errors).to.be.an('array');
      });

    forEach(INVALID_NOMINEE_DETAILS_POSSIBILITY)
      .it('should return error when you have invalid nominee details', async (invalidNomineeDetails) => {
        const nominee = { invalidNomineeDetails };
        const data = { nominee };
        const { errors } = await OrderService.save(data);

        expect(errors).to.be.an('array');
      });

    forEach(INVALID_CURRENT_ADDRESS_POSSIBILITY)
      .it('should return error when you have invalid current address details', async (invalidCurrentAddress) => {
        const currentAddress = { invalidCurrentAddress };
        const data = { currentAddress };
        const { errors } = await OrderService.save(data);

        expect(errors).to.be.an('array');
      });

    forEach(INVALID_PERMANENT_ADDRESS_POSSIBILITY)
      .it('should return error when you have invalid permanent address details', async (invalidPermanentAddress) => {
        const permanentAddress = { invalidPermanentAddress };
        const data = { permanentAddress };
        const { errors } = await OrderService.save(data);

        expect(errors).to.be.an('array');
      });

    it('should return errors as array', async () => {
      const { errors } = await OrderService.save(SAVE_ORDER_FAIL_PAYLOAD);

      expect(errors).to.be.an('array');
    });

    it('should return error message in response', async () => {
      const { errors } = await OrderService.save(SAVE_ORDER_FAIL_PAYLOAD);
      const { message } = errors[0];

      expect(message).to.equal('Parameter: partnerId should be valid.');
    });
  });
});

const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');

const { BajajFinserv: BajajFinservService } = require('../../../services/bajaj-finserv');

const { order: OrderModel } = require('../../../database');

const {
  PAYMENT_PAYLOAD,
  PAYMENT_PAYLOAD_POSSIBILITY,
  PAYMENT_FAIL_PAYLOAD,
  PAYMENT_PAYLOAD_RESPONSE,
  INVALID_PAYMENT_PAYLOAD_POSSIBILITY,
  PAYMENT_URL_RESPONSE,
} = require('../../constant');

const { expect } = chai;

describe('bajaj finserv service', () => {
  let paymentRequest;

  context('payment method', () => {
    beforeEach(async () => {
      paymentRequest = sinon.stub(BajajFinservService, 'generateURL');
      paymentRequest.returns({ doc: { url: PAYMENT_PAYLOAD_RESPONSE } });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      paymentRequest.restore();
    });

    it('should exists inside bajaj finserv service', () => {
      expect(BajajFinservService.generateURL()).to.be.exist;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(PAYMENT_PAYLOAD);

      expect(paymentResponse).to.not.be.empty;
    });

    it('should check url type of string message in response', async () => {
      const { doc: { url } } = await BajajFinservService.generateURL(PAYMENT_PAYLOAD);

      expect(url).to.be.an('string');
    });

    it('should check all keys in url response', async () => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(PAYMENT_PAYLOAD);

      expect(paymentResponse).to.have.all.keys('url');
    });

    it('should deep check keys and value in response', async () => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(PAYMENT_PAYLOAD);

      expect(paymentResponse).to.deep.equal({ url: PAYMENT_PAYLOAD_RESPONSE });
    });

    it('should not contain additional key property in response', async () => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(PAYMENT_PAYLOAD);

      expect(paymentResponse).to.not.have.own.property('paymentURL');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should check all keys while getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(paymentPayload);

      expect(paymentResponse).to.have.all.keys('url');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should check no additional keys after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(paymentPayload);

      expect(paymentResponse).to.not.have.any.keys('paymentURL', 'paymenturl', 'URL', 'uRL');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should data type of doc in object after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(paymentPayload);

      expect(paymentResponse).to.be.an('object');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should data type of doc in array after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(paymentPayload);

      expect(paymentResponse).to.not.be.an('array');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should check html tag after getting payment URL', async (paymentPayload) => {
      const { doc: { url } } = await BajajFinservService.generateURL(paymentPayload);

      expect(url).to.include(PAYMENT_PAYLOAD_RESPONSE);
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should not contains invalid keys and errors as key after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(paymentPayload);

      expect(paymentResponse).to.not.have.all.keys('errors', 'erros');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should payment response an instance of array after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(paymentPayload);

      expect(paymentResponse).to.not.be.an.instanceof(Array);
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should payment response object has property of url after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(paymentPayload);

      expect(paymentResponse).to.have.property('url');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should payment response object has property of url', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.generateURL(paymentPayload);

      expect(paymentResponse).to.have.property('url', PAYMENT_PAYLOAD_RESPONSE);
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should check payment type with only allowed value after getting payment URL', async (paymentPayload) => {
      const { type: paymentType } = paymentPayload;

      expect(paymentType).to.be.oneOf([ 'upi', 'net-banking' ]);
    });
  });

  context('payment url', () => {
    beforeEach(async () => {
      paymentRequest = sinon.stub(BajajFinservService, 'getURL');
      paymentRequest.returns({ doc: { url: PAYMENT_URL_RESPONSE } });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      paymentRequest.restore();
    });

    it('should exists inside bajaj finserv service', () => {
      expect(BajajFinservService.getURL()).to.be.exist;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(PAYMENT_PAYLOAD);

      expect(paymentResponse).to.not.be.empty;
    });

    it('should check url type of string message in response', async () => {
      const { doc: { url } } = await BajajFinservService.getURL(PAYMENT_PAYLOAD);

      expect(url).to.be.an('string');
    });

    it('should check all keys in url response', async () => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(PAYMENT_PAYLOAD);

      expect(paymentResponse).to.have.all.keys('url');
    });

    it('should deep check keys and value in response', async () => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(PAYMENT_PAYLOAD);

      expect(paymentResponse).to.deep.equal({ url: PAYMENT_URL_RESPONSE });
    });

    it('should not contain additional key property in response', async () => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(PAYMENT_PAYLOAD);

      expect(paymentResponse).to.not.have.own.property('paymentURL');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should check all keys while getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(paymentPayload);

      expect(paymentResponse).to.have.all.keys('url');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should check no additional keys after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(paymentPayload);

      expect(paymentResponse).to.not.have.any.keys('paymentURL', 'paymenturl', 'URL', 'uRL');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should data type of doc in object after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(paymentPayload);

      expect(paymentResponse).to.be.an('object');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should data type of doc in array after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(paymentPayload);

      expect(paymentResponse).to.not.be.an('array');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should check html tag after getting payment URL', async (paymentPayload) => {
      const { doc: { url } } = await BajajFinservService.getURL(paymentPayload);

      expect(url).to.include(PAYMENT_URL_RESPONSE);
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should not contains invalid keys and errors as key after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(paymentPayload);

      expect(paymentResponse).to.not.have.all.keys('errors', 'erros');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should payment response an instance of array after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(paymentPayload);

      expect(paymentResponse).to.not.be.an.instanceof(Array);
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should payment response object has property of url after getting payment URL', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(paymentPayload);

      expect(paymentResponse).to.have.property('url');
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should payment response object has property of url', async (paymentPayload) => {
      const { doc: paymentResponse } = await BajajFinservService.getURL(paymentPayload);

      expect(paymentResponse).to.have.property('url', PAYMENT_URL_RESPONSE);
    });

    forEach(PAYMENT_PAYLOAD_POSSIBILITY).it('should check payment type with only allowed value after getting payment URL', async (paymentPayload) => {
      const { type: paymentType } = paymentPayload;

      expect(paymentType).to.be.oneOf([ 'upi', 'net-banking' ]);
    });
  });
});

describe('bajaj finserv service for error', () => {
  let paymentRequest;

  context('payment method', () => {
    beforeEach(async () => {
      paymentRequest = sinon.stub(BajajFinservService, 'generateURL');
      paymentRequest.returns({ errors: [ { message: 'Parameter: publicId should be UUID.' } ] });

      await OrderModel.destroy({ truncate: true, cascade: true });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      paymentRequest.restore();
    });

    it('should return errors as array', async () => {
      const { errors: paymentErrors } = await BajajFinservService.generateURL(PAYMENT_FAIL_PAYLOAD);

      expect(paymentErrors).to.be.an('array');
    });

    it('should return errors as array', async () => {
      const { errors: [ { message } ] } = await BajajFinservService.generateURL(PAYMENT_FAIL_PAYLOAD);

      expect(message).to.equal('Parameter: publicId should be UUID.');
    });

    forEach(INVALID_PAYMENT_PAYLOAD_POSSIBILITY).it('should return error while getting payment URL', async (invalidSubmitData) => {
      const { errors: paymentErrors } = await BajajFinservService.generateURL(invalidSubmitData);

      expect(paymentErrors).to.be.an('array');
    });
  });
});

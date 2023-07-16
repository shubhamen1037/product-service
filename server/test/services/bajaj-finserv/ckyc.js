const chai = require('chai');
const sinon = require('sinon');
const forEach = require('mocha-each');

const { BajajFinserv: BajajFinservService } = require('../../../services/bajaj-finserv');

const { order: OrderModel } = require('../../../database');

const { expect } = chai;

const KYC_REQUEST_RESPONSE = { CustomerId: '', kycStatus: false, message: 'Customer doest not exist' };

const KYC_PAYLOAD_POSSIBILITIES = [
  {
    panNumber: 'ELKPK2835T',
    dob: '1991-02-05',
    mobileNumber: '9988453245',
  },
  {
    panNumber: 'ELKPK1835T',
    dob: '1991-02-05',
    mobileNumber: '9918453245',
  },
  {
    panNumber: 'ELKPK1835T',
    dob: '1991-02-05',
    mobileNumber: '99288453245',
  },
  {
    panNumber: 'ELKPK2835T',
    dob: '1991-02-12',
    mobileNumber: '9388453245',
  },
  {
    panNumber: 'ELKPK2835T',
    dob: '1991-02-15',
    mobileNumber: '9918453245',
  },
  {
    panNumber: 'ELKPK2335T',
    dob: '1991-02-05',
    mobileNumber: '9982453245',
  },
  {
    panNumber: 'ELKPK2815T',
    dob: '1991-02-05',
    mobileNumber: '9988153245',
  },
  {
    panNumber: 'ELKPK2835T',
    dob: '1991-02-05',
    mobileNumber: '9988953245',
  },
  {
    panNumber: 'ELKPK2835T',
    dob: '1991-02-05',
    mobileNumber: '9988253245',
  },
  {
    panNumber: 'ELKPK2135T',
    dob: '1991-02-05',
    mobileNumber: '9982453245',
  },

];

describe('bajaj finserv service', () => {
  let ckycRequest;

  context('ckyc method', () => {
    beforeEach(async () => {
      ckycRequest = sinon.stub(BajajFinservService, 'checkKyc');
      ckycRequest.returns({ doc: KYC_REQUEST_RESPONSE });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      ckycRequest.restore();
    });

    it('should exists inside bajaj finserv service', () => {
      expect(BajajFinservService.checkKyc()).to.be.exist;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc: kycResponse } = await BajajFinservService.checkKyc(KYC_REQUEST_RESPONSE);

      expect(kycResponse).to.not.be.empty;
    });

    it('should check kyc status type of boolean message in response', async () => {
      const { doc: { kycStatus } } = await BajajFinservService.checkKyc(KYC_REQUEST_RESPONSE);

      expect(kycStatus).to.be.an('boolean');
    });

    it('should check all keys in response', async () => {
      const { doc: kycResponse } = await BajajFinservService.checkKyc(KYC_REQUEST_RESPONSE);

      expect(kycResponse).to.have.all.keys([ 'kycStatus', 'CustomerId', 'message' ]);
    });

    it('should not contain additional key property in response', async () => {
      const { doc: kycResponse } = await BajajFinservService.checkKyc(KYC_REQUEST_RESPONSE);

      expect(kycResponse).to.not.have.own.property('url');
    });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should check all keys while getting ckyc status', async (checkKycPayload) => {
        const { doc: kycResponse } = await BajajFinservService.checkKyc(checkKycPayload);

        expect(kycResponse).to.have.all.keys([ 'kycStatus', 'CustomerId', 'message' ]);
      });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should check no additional keys after getting ckyc status', async (checkKycPayload) => {
        const { doc: kycResponse } = await BajajFinservService.checkKyc(checkKycPayload);

        expect(kycResponse).to.not.have.any.keys('paymentURL', 'paymenturl', 'URL', 'uRL');
      });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should data type of doc in object after getting ckyc status', async (checkKycPayload) => {
        const { doc: kycResponse } = await BajajFinservService.checkKyc(checkKycPayload);

        expect(kycResponse).to.be.an('object');
      });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should data type of doc in array after getting ckyc status', async (checkKycPayload) => {
        const { doc: kycResponse } = await BajajFinservService.checkKyc(checkKycPayload);

        expect(kycResponse).to.not.be.an('array');
      });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should check html tag after getting ckyc status', async (checkKycPayload) => {
        const { doc: { kycStatus, CustomerId, message } } = await BajajFinservService.checkKyc(checkKycPayload);

        const data = { kycStatus, CustomerId, message };

        expect(data).to.include(KYC_REQUEST_RESPONSE);
      });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should not contains invalid keys and errors as key after getting kyc status', async (checkKycPayload) => {
        const { doc: kycResponse } = await BajajFinservService.checkKyc(checkKycPayload);

        expect(kycResponse).to.not.have.all.keys('errors', 'erros');
      });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should ckyc response an instance of array after getting kyc status', async (checkKycPayload) => {
        const { doc: kycResponse } = await BajajFinservService.checkKyc(checkKycPayload);

        expect(kycResponse).to.not.be.an.instanceof(Array);
      });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should ckyc response object has property of kycStatus after getting ckyc ', async (checkKycPayload) => {
        const { doc: kycResponse } = await BajajFinservService.checkKyc(checkKycPayload);

        expect(kycResponse).to.have.property('kycStatus');
      });

    forEach(KYC_PAYLOAD_POSSIBILITIES)
      .it('should check ckyc type with only allowed value after getting ckyc status', async (checkKycPayload) => {
        const { doc: { kycStatus } } = await BajajFinservService.checkKyc(checkKycPayload);

        expect(kycStatus).to.be.oneOf([ false, true ]);
      });
  });
});

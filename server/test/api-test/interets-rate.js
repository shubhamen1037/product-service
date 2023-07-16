const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const server = require('../server');
const { InterestRate: InterestRateService } = require('../../services');
const {
  AUTHORIZATION, PUBLIC_ID, SAVE_INTEREST_SUCCESS,
} = require('../constant');

const { expect } = chai;

chai.use(chaiHttp);

describe('Interest Rate POST /interest-rate', () => {
  let mockOrderService;

  context('test cases for save method success cases', () => {
    let statusRes;
    let bodyRes;

    beforeEach(async () => {
      mockOrderService = sinon.stub(InterestRateService, 'save');
      mockOrderService.returns({ doc: { publicId: PUBLIC_ID, message: 'successfully stored.' } });

      const response = await chai
        .request(server)
        .post('/v1/admin/interest-rate/BAJAJ_FINANCE')
        .set({ Authorization: AUTHORIZATION })
        .send({ data: SAVE_INTEREST_SUCCESS });

      const { status, body } = response;

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    it('should return response status with 201 i.e. HTTP 201', () => {
      expect(statusRes).to.equal(201);
    });

    it('should return bodyRes as an empty string', () => {
      expect(bodyRes).to.equal('');
    });
  });

  context('test cases for save method failed cases', () => {
    let statusRes;
    let bodyRes;

    beforeEach(async () => {
      mockOrderService = sinon.stub(InterestRateService, 'save');
      mockOrderService.returns({ doc: { publicId: PUBLIC_ID, message: 'successfully stored.' } });

      const { status, body } = await chai
        .request(server)
        .post('/v1/admin/interest-rate/BAJAJ_FIN')
        .set({ Authorization: AUTHORIZATION });

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    it('should return response status with 400 i.e. HTTP 400', () => {
      expect(statusRes).to.equal(400);
    });

    it('should return bodyRes as an object', () => {
      expect(bodyRes).to.be.an('object');
    });

    it('should return bodyRes as an object', () => {
      expect(bodyRes).to.be.an('object');
    });

    it('should return message as a key in bodyRes object', () => {
      expect(bodyRes).to.have.any.keys('details', 'type');
    });

    it('should return type in bodyRes object', () => {
      const { type } = bodyRes;

      expect(type).to.equal('field-validation');
    });

    it('should return type in bodyRes object', () => {
      const { details } = bodyRes;

      expect(details).to.be.an('array');
    });
  });
});

describe('Interest Rate PATCH /interest-rate', () => {
  let mockOrderService;

  context('test cases for patch method success', () => {
    let statusRes;
    let bodyRes;

    beforeEach(async () => {
      mockOrderService = sinon.stub(InterestRateService, 'patch');
      mockOrderService.returns({ doc: { publicId: '2652fb60-ea4c-11ed-8be5-c342118884e6', message: 'successfully patched' } });
      const response = await chai
        .request(server)
        .patch('/v1/admin/interest-rate/2652fb60-ea4c-11ed-8be5-c342118884e6')
        .set({ Authorization: AUTHORIZATION })
        .send({ data: SAVE_INTEREST_SUCCESS });
      const { status, body } = response;

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    it('should return response status with 201 i.e. HTTP 201', () => {
      expect(statusRes).to.equal(201);
    });

    it('should return bodyRes as an empty string', () => {
      expect(bodyRes).to.equal('');
    });
  });

  context('test cases for patch method failed cases', () => {
    let statusRes;
    let bodyRes;

    beforeEach(async () => {
      mockOrderService = sinon.stub(InterestRateService, 'patch');
      mockOrderService.returns({ doc: { publicId: PUBLIC_ID, message: 'successfully patched' } });
      const { status, body } = await chai
        .request(server)
        .post('/v1/admin/interest-rate/BAJAJ_FIN')
        .set({ Authorization: AUTHORIZATION });

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    it('should return response status with 400 i.e. HTTP 400', () => {
      expect(statusRes).to.equal(400);
    });

    it('should return bodyRes as an object', () => {
      expect(bodyRes).to.be.an('object');
    });

    it('should return message as a key in bodyRes object', () => {
      expect(bodyRes).to.have.any.keys('details', 'type');
    });

    it('should return type in bodyRes object', () => {
      const { type } = bodyRes;

      expect(type).to.equal('field-validation');
    });

    it('should return type in bodyRes object', () => {
      const { details } = bodyRes;

      expect(details).to.be.an('array');
    });
  });
});

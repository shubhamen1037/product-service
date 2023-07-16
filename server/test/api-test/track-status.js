const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const forEach = require('mocha-each');
const server = require('../server');
const { Order: OrderService } = require('../../services');
const {
  AUTHORIZATION, PUBLIC_ID, TRACK_STATUS_FAIL_PAYLOAD,
} = require('../constant');

const { expect } = chai;

chai.use(chaiHttp);

describe('track status of order', () => {
  let mockOrderService;

  context('track-status with correct payload', () => {
    const returnMessage = 'successfully saved.';

    let statusRes;

    let bodyRes;

    beforeEach(async () => {
      mockOrderService = sinon.stub(OrderService, 'trackStatus');
      mockOrderService.returns({
        doc: {
          message: returnMessage,
        },
      });

      const res = await chai
        .request(server)
        .post(`/v1/admin/order/${PUBLIC_ID}/track-status`)
        .set({ Authorization: AUTHORIZATION });
      const { status, body } = res;

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    it('should return response status with 200 i.e. HTTP 201', () => {
      expect(statusRes).to.equal(201);
    });

    it('should return object in body while updating details', () => {
      expect(bodyRes).to.be.an('object');
    });

    it('should not return errors as a key in bodyRes object', () => {
      expect(bodyRes).to.not.have.any.keys('errors');
    });

    it('should return message as a key in bodyRes object', () => {
      expect(bodyRes).to.have.any.keys('message');
    });

    it('should return message and its value in data object', () => {
      const { message } = bodyRes;

      expect(message).to.be.equal(returnMessage);
    });
  });

  context('track-status with incorrect details', () => {
    const returnMessage = 'publicId should be valid uuid.';

    let statusRes;

    let bodyRes;

    beforeEach(async () => {
      mockOrderService = sinon.stub(OrderService, 'trackStatus');
      mockOrderService.returns({
        doc: {
          errors: returnMessage,
        },
      });
    });

    afterEach(async () => {
      mockOrderService.restore();
    });

    forEach(TRACK_STATUS_FAIL_PAYLOAD)
      .it('should return a unsuccessfully trackd status when doing the cancel i.e. HTTP 200', async ({ publicId }) => {
        const { status, body } = await chai
          .request(server)
          .post(`/v1/admin/order/${publicId}/track-status`)
          .set({ Authorization: AUTHORIZATION });

        statusRes = status;
        bodyRes = body;

        expect(statusRes).to.equal(400);
      });

    forEach(TRACK_STATUS_FAIL_PAYLOAD)
      .it('should return a unsuccessfully trackd status when doing the cancel i.e. HTTP 200', async ({ publicId }) => {
        const { status, body } = await chai
          .request(server)
          .post(`/v1/admin/order/${publicId}/track-status`)
          .set({ Authorization: AUTHORIZATION });

        statusRes = status;
        bodyRes = body;

        expect(bodyRes).to.be.an('object');
      });

    forEach(TRACK_STATUS_FAIL_PAYLOAD)
      .it('should return keys of bodyRes object', async ({ publicId }) => {
        const { status, body } = await chai
          .request(server)
          .post(`/v1/admin/order/${publicId}/track-status`)
          .set({ Authorization: AUTHORIZATION });

        statusRes = status;
        bodyRes = body;

        expect(bodyRes).to.have.any.keys('type', 'details');
      });

    forEach(TRACK_STATUS_FAIL_PAYLOAD)
      .it('should return type key of bodyRes', async ({ publicId }) => {
        const { status, body } = await chai
          .request(server)
          .post(`/v1/admin/order/${publicId}/track-status`)
          .set({ Authorization: AUTHORIZATION });

        statusRes = status;
        bodyRes = body;

        const { type } = bodyRes;

        expect(type).to.be.equal('field-validation');
      });

    forEach(TRACK_STATUS_FAIL_PAYLOAD)
      .it('should return details to be an array', async ({ publicId }) => {
        const { status, body } = await chai
          .request(server)
          .post(`/v1/admin/order/${publicId}/track-status`)
          .set({ Authorization: AUTHORIZATION });

        statusRes = status;
        bodyRes = body;

        const { details } = bodyRes;

        expect(details).to.be.an('array');
      });

    forEach(TRACK_STATUS_FAIL_PAYLOAD)
      .it('should return errorMessage as an object', async ({ publicId }) => {
        const { status, body } = await chai
          .request(server)
          .post(`/v1/admin/order/${publicId}/track-status`)
          .set({ Authorization: AUTHORIZATION });

        statusRes = status;
        bodyRes = body;

        const { details: [ errorMessage ] } = bodyRes;

        expect(errorMessage).to.be.an('object');
      });

    forEach(TRACK_STATUS_FAIL_PAYLOAD)
      .it('should keys of errorMessage object', async ({ publicId }) => {
        const { status, body } = await chai
          .request(server)
          .post(`/v1/admin/order/${publicId}/track-status`)
          .set({ Authorization: AUTHORIZATION });

        statusRes = status;
        bodyRes = body;

        const { details: [ errorMessage ] } = bodyRes;

        expect(errorMessage).to.have.any.keys('name', 'message');
      });

    forEach(TRACK_STATUS_FAIL_PAYLOAD)
      .it('should return type key of bodyRes', async ({ publicId }) => {
        const { status, body } = await chai
          .request(server)
          .post(`/v1/admin/order/${publicId}/track-status`)
          .set({ Authorization: AUTHORIZATION });

        statusRes = status;
        bodyRes = body;

        const { details: [ errorMessage ] } = bodyRes;

        const { message } = errorMessage;

        expect(message).to.be.equal('Parameter: publicId should be UUID.');
      });
  });
});

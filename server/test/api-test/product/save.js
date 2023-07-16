const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const server = require('../server');
const { Product: ProductService } = require('../../services');
const {
  AUTHORIZATION, PUBLIC_ID, SAVE_PRODUCT_PAYLOAD, SAVE_PRODUCT_INVALID_PAYLOAD,
} = require('../constant');

const { expect } = chai;

chai.use(chaiHttp);

describe('Product save method', () => {
  let mockProductService;

  context('test cases for success cases', () => {
    let statusRes;
    let bodyRes;
    let headerRes;

    beforeEach(async () => {
      mockProductService = sinon.stub(ProductService, 'save');
      mockProductService.returns({ doc: { publicId: PUBLIC_ID, message: 'Successfully saved.' } });

      const response = await chai
        .request(server)
        .post('/product')
        .send(SAVE_PRODUCT_PAYLOAD);

      const { status, body, headers } = response;

      statusRes = status;
      bodyRes = body;
      headerRes = headers;
    });

    afterEach(async () => {
      mockProductService.restore();
    });

    it('should return response status with 201 i.e. HTTP 201', () => {
      expect(statusRes).to.equal(201);
    });

    it('should return bodyRes as an empty string', () => {
      expect(bodyRes).to.equal('');
    });

    it('should return `message` in header', () => {
      const { message } = headerRes;

      expect(message).to.deep.equal('Successfully saved.');
    });

    it('should return `public-id` in header', () => {
      expect(headerRes).to.have.property('public-id');
    });
  });

  context('test cases for failed cases', () => {
    let statusRes;
    let bodyRes;

    beforeEach(async () => {
      mockProductService = sinon.stub(ProductService, 'save');

      const { status, body } = await chai
        .request(server)
        .post('/product')
        .send(SAVE_PRODUCT_INVALID_PAYLOAD);

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockProductService.restore();
    });

    it('should return response status with 400 i.e. HTTP 400', () => {
      expect(statusRes).to.equal(400);
    });

    it('should return error key in bodyRes', () => {
      expect(bodyRes).to.have.property('error');
    });

    it('should return error as an array', () => {
      const { error } = bodyRes;

      expect(error).to.be.an('array');
    });

    it('should return name and message as a key in error', () => {
      const { error } = bodyRes;

      expect(error[0]).to.have.all.keys('name', 'message');
    });
  });
});

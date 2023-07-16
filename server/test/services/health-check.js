const { expect } = require('chai');

const { HealthCheck } = require('../../services');

const dbResponse = {
  name: 'fixed_deposit_service',
  type: 'database',
  status: 'success',
  version: '20230529131633-seed-bank-code-in-bajaj-finserv-bank.js',
};

describe('HealthCheck object', () => {
  describe('getDatabaseDetails method', () => {
    it('should exists inside HealthCheck object', () => {
      expect(HealthCheck).to.have.nested.property('getDatabaseDetails');
    });

    it('should return success while connecting with database', async () => {
      const response = await HealthCheck.getDatabaseDetails();

      expect(response).to.deep.equal(dbResponse);
    });
  });

  describe('checkMicroServiceStatus method', () => {
    it('should exists inside HealthCheck object', () => {
      expect(HealthCheck).to.have.nested.property('checkMicroServiceStatus');
    });
  });

  describe('status method', () => {
    it('should exists inside HealthCheck object', () => {
      expect(HealthCheck).to.have.nested.property('status');
    });

    it('should not return empty response', async () => {
      const response = await HealthCheck.status();

      expect(response).to.not.be.empty;
    });

    it('should not return response as an array', async () => {
      const response = await HealthCheck.status();

      expect(response).to.be.an('array');
    });
  });
});

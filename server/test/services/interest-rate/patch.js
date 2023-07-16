const chai = require('chai');

const { InterestRate: InterestRateService } = require('../../../services');
const { interest_rate: InterestRateModel } = require('../../../database');

chai.use(require('chai-uuid'));

const { SAVE_INTEREST_PAYLOAD } = require('../../constant');

const { expect } = chai;

describe('Interest rate service', () => {
  context('patch method', () => {
    let response;
    let saveResponse;

    before(async () => {
      saveResponse = await InterestRateService.save(SAVE_INTEREST_PAYLOAD);
      const { doc: { publicId } } = saveResponse;
      const payload = { SAVE_INTEREST_PAYLOAD, publicId };

      response = await InterestRateService.patch(payload);
    });

    after(async () => {
      await InterestRateModel.destroy({ truncate: true, cascade: true });
    });

    it('should exists inside interest service', () => {
      expect(InterestRateService.patch).to.be.exist;
    });

    it('should return doc while submitting', async () => {
      const { doc } = response;

      expect(doc).to.not.be.empty;
    });

    it('should return doc while submitting', async () => {
      const { doc } = response;

      const { message } = doc;

      expect(message).to.equal('successfully updated.');
    });

    it('should return doc with keys publicId and message', async () => {
      const { doc } = response;

      expect(doc).to.have.keys('publicId', 'message');
    });
  });
});

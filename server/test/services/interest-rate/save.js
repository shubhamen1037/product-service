const chai = require('chai');
const { InterestRate: InterestRateService } = require('../../../services');
const {
  order: OrderModel, order_history: OrderHistoryModel, interest_rate: InterestRateModel,
} = require('../../../database');

chai.use(require('chai-uuid'));

const {
  SAVE_ORDER_MODEL_PAYLOAD, SAVE_INTEREST_PAYLOAD,
} = require('../../constant');

const { expect } = chai;

describe('Interest Rate service', () => {
  context('save method', () => {
    let response;

    before(async () => {
      await OrderModel.bulkCreate(SAVE_ORDER_MODEL_PAYLOAD);
      response = await InterestRateService.save(SAVE_INTEREST_PAYLOAD);
    });

    after(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      await OrderHistoryModel.destroy({ truncate: true, cascade: true });
      await InterestRateModel.destroy({ truncate: true, cascade: true });
    });

    it('should exists inside order service', () => {
      expect(InterestRateService.save).to.be.exist;
    });

    it('should return doc while submitting', async () => {
      const { doc } = response;

      expect(doc).to.not.be.empty;
    });

    it('should return doc with keys publicId and message', async () => {
      const { doc } = response;

      expect(doc).to.have.keys('publicId', 'message');
    });

    it('should return doc while submitting', async () => {
      const { doc } = response;
      const { publicId, message } = doc;

      expect(publicId).to.be.a.uuid('v1');
      expect(message).to.equal('successfully saved.');
    });
  });
});

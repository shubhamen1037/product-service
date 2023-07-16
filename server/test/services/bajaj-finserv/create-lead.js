const chai = require('chai');
const sinon = require('sinon');

const { BajajFinserv: BajajFinservService } = require('../../../services/bajaj-finserv');

const { order: OrderModel } = require('../../../database');

const {
  CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE,
  CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST,
} = require('../../constant');

const { expect } = chai;

describe('bajaj finserv Lead Submission', () => {
  let leadRequest;

  context('Success Cases', () => {
    beforeEach(async () => {
      leadRequest = sinon.stub(BajajFinservService, 'createLead');
      leadRequest.returns({ doc: { CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE, CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST } });
    });

    afterEach(async () => {
      await OrderModel.destroy({ truncate: true, cascade: true });
      leadRequest.restore();
    });

    it('should exists inside bajaj finserv service', () => {
      expect(BajajFinservService.createLead()).to.be.exist;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(doc).to.not.be.empty;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(doc).to.be.an('object');
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(doc).to.not.have.all.keys('errors', 'erros');
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(doc).to.have.any.keys('CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST', 'CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE');
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc: { CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST: request } } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(request).to.be.an('object');
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc: { CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE: response } } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(response).to.be.an('object');
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc: { CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE: { JSNRESP } } } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(JSNRESP).to.be.an('object');
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const {
        doc: {
          CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE: {
            JSNRESP: { FdSfdcId },
          },
        },
      } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(FdSfdcId).to.be.string;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const {
        doc: {
          CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE: {
            JSNRESP: { IsSuccess },
          },
        },
      } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(IsSuccess).to.be.string;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const {
        doc: {
          CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE: {
            JSNRESP: { Message: responseMessage },
          },
        },
      } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(responseMessage).to.be.string;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const {
        doc: {
          CREATE_LEAD__PAYLOAD_SUCCESS_RESPONSE: {
            JSNRESP: { UniqueRecId },
          },
        },
      } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(UniqueRecId).to.be.string;
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc: { CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST: request } } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(request).to.be.not.be.an('array');
    });

    it('should submit the bajaj finserv and return doc', async () => {
      const { doc: { CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST: { RecWrapperFD } } } = await BajajFinservService.createLead(CREATE_LEAD__PAYLOAD_SUCCESS_REQUEST);

      expect(RecWrapperFD).to.be.an('object');
    });
  });
});

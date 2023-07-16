const chai = require('chai');

const { BajajFinserv: BajajFinservService } = require('../../../services/bajaj-finserv');

const { expect } = chai;

describe('bajaj finserv service', () => {
  context('callback method', () => {
    it('should exists inside bajaj finserv service', () => {
      expect(BajajFinservService.generateURL()).to.be.exist;
    });
  });
});

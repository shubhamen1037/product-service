const { v1: uuidV1 } = require('uuid');

const bajajFinservBank = [
  {
    name: 'Bank Of India',
    code: 'BOI',
  },
  {
    name: 'Bank of Baroda Corporate Banking',
    code: 'BARB_C',
  },
  {
    name: 'Catholic Syrian Bank',
    code: 'CSB',
  },
  {
    name: 'CAPITAL SMALL FINANCE BANK LIMITED',
    code: 'CLBL',
  },
  {
    name: 'Cosmos Bank',
    code: 'COSB',
  },
  {
    name: 'Deutsche Bank',
    code: 'DEUT',
  },
  {
    name: 'DCB Bank',
    code: 'DCBL',
  },
  {
    name: 'Equitas Small Finance Bank',
    code: 'ESFB',
  },
  {
    name: 'Federal Bank',
    code: 'FDRL',
  },
  {
    name: 'HSBC Retail NetBanking',
    code: 'HSBC_R',
  },
  {
    name: 'Indian Overseas Bank',
    code: 'IOBA',
  },
  {
    name: 'Indusind Bank',
    code: 'INDB',
  },
  {
    name: 'Kerala Gramin Bank',
    code: 'KLGB',
  },
  {
    name: 'Oriental Bank of Commerce',
    code: 'ORBC',
  },
  {
    name: 'NKGSB Co-op Bank Ltd',
    code: 'NKGSBCOB',
  },
  {
    name: 'Punjab National Bank corporate',
    code: 'PNB_C',
  },
  {
    name: 'Punjab & Sind Bank',
    code: 'PSIB',
  },
  {
    name: 'RBL Bank',
    code: 'RBLB',
  },
  {
    name: 'South Indian Bank',
    code: 'SIBL',
  },
  {
    name: 'SBM Bank India',
    code: 'SBMY',
  },
  {
    name: 'The Surat People’s Co-operative Bank Limited',
    code: 'TSP_CBL',
  },
  {
    name: 'Sutex Co-operative Bank',
    code: 'SUTB',
  },
  {
    name: 'Saraswat Co-operative Bank',
    code: 'SRCB',
  },
  {
    name: 'Ujjivan Small Finance Bank Limited',
    code: 'UJVN',
  },
  {
    name: 'Utkarsh Small Finance Bank',
    code: 'UTKS',
  },
  {
    name: 'Yes Bank',
    code: 'YESB',
  },
  {
    name: 'UPI',
    code: 'UPI',
  },
];

const bfBank = bajajFinservBank.map((element) => ({
  ...element,
  public_id: uuidV1(),
  partner_code: 'BAJAJ_FINANCE',
  created_at: new Date(),
  updated_at: new Date(),
}));

module.exports = bfBank;

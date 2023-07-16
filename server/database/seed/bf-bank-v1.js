const { v1: uuidV1 } = require('uuid');

const bajajFinservBank = [
  {
    name: 'Andhra Bank',
    code: 'ANDB',
  },
  {
    name: 'AU Small Finance Bank',
    code: 'AUBL',
    bank_code: 'FD002',
  },
  {
    name: 'Axis Bank',
    code: 'AXIS',
    bank_code: 'FD003',
  },
  {
    name: 'Bandhan Bank',
    code: 'BDBL',
    bank_code: 'FD004',
  },
  {
    name: 'Bank of Baroda Corporate Banking',
    code: 'BARB_C',
    bank_code: 'FD005',
  },
  {
    name: 'Bank of Baroda Retail',
    code: 'BARB_R',
    bank_code: 'FD006',
  },
  {
    name: 'Bank Of India',
    code: 'BOI',
    bank_code: 'FD007',
  },
  {
    name: 'Bank of Maharashtra',
    code: 'MAHB',
    bank_code: 'FD008',
  },
  {
    name: 'Canara Bank',
    code: 'CNRB',
    bank_code: 'FD009',
  },
  {
    name: 'Central Bank of India',
    code: 'CBIN',
    bank_code: 'FD010',
  },
  {
    name: 'City Union Bank',
    code: 'CIUB',
    bank_code: 'FD011',
  },
  {
    name: 'Catholic Syrian Bank',
    code: 'CSB',
    bank_code: 'FD012',
  },
  {
    name: 'CAPITAL SMALL FINANCE BANK LIMITED',
    code: 'CLBL',
    bank_code: 'FD013',
  },
  {
    name: 'Cosmos Bank',
    code: 'COSB',
    bank_code: 'FD014',
  },
  {
    name: 'Deutsche Bank',
    code: 'DEUT',
    bank_code: 'FD015',
  },
  {
    name: 'Dhanlaxmi Bank',
    code: 'DLXB',
    bank_code: 'FD016',
  },
  {
    name: 'DCB Bank',
    code: 'DCBL',
    bank_code: 'FD017',
  },
  {
    name: 'Equitas Small finance bank',
    code: 'ESFB',
    bank_code: 'FD018',
  },
  {
    name: 'Federal Bank',
    code: 'FDRL',
    bank_code: 'FD019',
  },
  {
    name: 'HDFC Bank',
    code: 'HDFC',
    bank_code: 'FD020',
  },
  {
    name: 'HSBC Retail NetBanking',
    code: 'HSBC_R',
    bank_code: 'FD021',
  },
  {
    name: 'ICICI Bank',
    code: 'ICICI',
    bank_code: 'FD022',
  },
  {
    name: 'IDFC FIRST Bank',
    code: 'IDFB',
    bank_code: 'FD023',
  },
  {
    name: 'IDBI Bank',
    code: 'IDBI',
    bank_code: 'FD024',
  },
  {
    name: 'Indian Overseas Bank',
    code: 'IOBA',
    bank_code: 'FD025',
  },
  {
    name: 'Indusind Bank',
    code: 'INDB',
    bank_code: 'FD026',
  },
  {
    name: 'Karur Vysya Bank',
    code: 'KVBL',
    bank_code: 'FD027',
  },
  {
    name: 'Kotak Mahindra Bank',
    code: 'KMB',
    bank_code: 'FD028',
  },
  {
    name: 'Kerala Gramin Bank',
    code: 'KLGB',
    bank_code: 'FD029',
  },
  {
    name: 'Lakshmi Vilas Bank',
    code: 'LAVB_R',
    bank_code: 'FD030',
  },
  {
    name: 'Oriental Bank of Commerce ',
    code: 'ORBC',
    bank_code: 'FD031',
  },
  {
    name: 'NKGSB Co-op Bank Ltd',
    code: 'NKGSBCOB',
    bank_code: 'FD032',
  },
  {
    name: 'Punjab National Bank [Retail]',
    code: 'PUNB',
    bank_code: 'FD033',
  },
  {
    name: 'Punjab National Bank corporate',
    code: 'PNB_C',
    bank_code: 'FD034',
  },
  {
    name: 'Punjab & Sind Bank',
    code: 'PSIB',
    bank_code: 'FD035',
  },
  {
    name: 'RBL Bank',
    code: 'RBLB',
    bank_code: 'FD036',
  },
  {
    name: 'Standard Chartered Bank',
    code: 'SCBL',
    bank_code: 'FD037',
  },
  {
    name: 'State Bank of India',
    code: 'SBI',
    bank_code: 'FD038',
  },
  {
    name: 'Suryoday Small Finance Bank Ltd',
    code: 'SURY',
    bank_code: 'FD039',
  },
  {
    name: 'South Indian Bank',
    code: 'SIBL',
    bank_code: 'FD040',
  },
  {
    name: 'SBM Bank India',
    code: 'SBMY',
    bank_code: 'FD041',
  },
  {
    name: 'The Surat People’s Co-operative Bank Limited',
    code: 'TSP_CBL',
    bank_code: 'FD042',
  },
  {
    name: 'Sutex Co-operative Bank',
    code: 'SUTB',
    bank_code: 'FD043',
  },
  {
    name: 'Saraswat Co-operative Bank',
    code: 'SRCB',
    bank_code: 'FD044',
  },
  {
    name: 'UCO Bank',
    code: 'UCBA',
    bank_code: 'FD045',
  },
  {
    name: 'Union Bank of India',
    code: 'UBIN',
    bank_code: 'FD046',
  },
  {
    name: 'Ujjivan Small Finance Bank Limited',
    code: 'UJVN',
    bank_code: 'FD047',
  },
  {
    name: 'Utkarsh Small Finance Bank',
    code: 'UTKS',
    bank_code: 'FD048',
  },
  {
    name: 'Yes Bank',
    code: 'YESB',
    bank_code: 'FD049',
  },
  {
    name: 'UPI',
    code: 'UPI',
    bank_code: 'FD050',
  },
  {
    name: 'Corporation Bank',
    code: 'CORP',
  },
  {
    name: 'Syndicate Bank',
    code: 'SYNB',
  },
  {
    name: 'Shamrao Vithal Bank',
    code: 'SVCB_C',
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

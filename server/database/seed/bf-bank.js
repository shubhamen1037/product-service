const { v1: uuidV1 } = require('uuid');

const bajajFinservBank = [
  {
    name: 'Andhra Bank',
    code: 'ANDB',
  },
  {
    name: 'Axis Bank',
    code: 'AXIS',
  },
  {
    name: 'Bandhan Bank',
    code: 'BDBL',
  },
  {
    name: 'Bank of Baroda Retail',
    code: 'BARB_R',
  },
  {
    name: 'Bank of Maharashtra',
    code: 'MAHB',
  },
  {
    name: 'Canara Bank',
    code: 'CNRB',
  },
  {
    name: 'Central Bank of India',
    code: 'CBIN',
  },
  {
    name: 'City Union Bank',
    code: 'CIUB',
  },
  {
    name: 'Corporation Bank',
    code: 'CORP',
  },
  {
    name: 'Dhanlaxmi Bank',
    code: 'DLXB',
  },
  {
    name: 'HDFC Bank',
    code: 'HDFC',
  },
  {
    name: 'ICICI Bank',
    code: 'ICICI',
  },
  {
    name: 'IDBI Bank',
    code: 'IDBI',
  },
  {
    name: 'IDFC FIRST Bank',
    code: 'IDFB',
  },
  {
    name: 'Karur Vysya Bank',
    code: 'KVBL',
  },
  {
    name: 'Kotak Mahindra Bank',
    code: 'KMB',
  },
  {
    name: 'Lakshmi Vilas Bank',
    code: 'LAVB_R',
  },
  {
    name: 'Punjab National Bank [Retail]',
    code: 'PNB',
  },
  {
    name: 'State Bank of India',
    code: 'SBI',
  },
  {
    name: 'Syndicate Bank',
    code: 'SYNB',
  },
  {
    name: 'Union Bank of India',
    code: 'UBIN',
  },
  {
    name: 'AU Small Finance Bank',
    code: 'AUBL',
  },
  {
    name: 'Standard Chartered Bank',
    code: 'SCBL',
  },
  {
    name: 'Suryoday Small Finance Bank Ltd',
    code: 'SURY',
  },
  {
    name: 'UCO Bank',
    code: 'UCBA',
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

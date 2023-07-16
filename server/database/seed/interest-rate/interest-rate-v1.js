/* eslint-disable max-lines */
const { v1: uuidV1 } = require('uuid');

const interestRate = {
  interestSlab: {
    'slab-selection': [
      {
        tenure: [
          12,
          13,
          14,
        ],
        index: 0,
      },
      {
        tenure: [
          15,
        ],
        index: 1,
      },
      {
        tenure: [
          16,
          17,
        ],
        index: 2,
      },
      {
        tenure: [
          18,
        ],
        index: 3,
      },
      {
        tenure: [
          19,
          20,
          21,
        ],
        index: 4,
      },
      {
        tenure: [
          22,
        ],
        index: 5,
      },
      {
        tenure: [
          23,
        ],
        index: 6,
      },
      {
        tenure: [
          24,
        ],
        index: 7,
      },
      {
        tenure: [
          25,
          26,
          27,
          28,
          29,
        ],
        index: 8,
      },
      {
        tenure: [
          30,
        ],
        index: 9,
      },
      {
        tenure: [
          31,
          32,
        ],
        index: 10,
      },
      {
        tenure: [
          33,
        ],
        index: 11,
      },
      {
        tenure: [
          34,
          35,
        ],
        index: 12,
      },
      {
        tenure: [
          36,
          37,
          38,
        ],
        index: 13,
      },
      {
        tenure: [
          39,
        ],
        index: 14,
      },
      {
        tenure: [
          40,
          41,
          42,
          43,
        ],
        index: 15,
      },
      {
        tenure: [
          44,
        ],
        index: 16,
      },
      {
        tenure: [
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
        ],
        index: 17,
      },
    ],
    slabs: [
      [
        {
          interest: 7.40,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.16,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.20,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.27,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.40,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.45,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.21,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.25,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.32,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.45,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.50,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.25,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.30,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.36,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.50,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.40,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.16,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.20,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.27,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.40,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.50,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.25,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.30,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.36,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.50,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.50,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.25,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.30,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.36,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.50,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.50,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.25,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.30,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.36,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.50,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.55,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.30,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.35,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.41,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.55,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.35,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.11,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.16,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.22,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.35,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.45,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.21,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.25,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.32,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.45,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.35,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.11,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.16,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.22,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.35,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.75,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.49,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.53,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.61,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.75,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.35,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.11,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.16,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.22,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.35,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.65,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.39,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.44,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.51,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.65,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.65,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.39,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.44,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.51,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.65,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.65,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.39,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.44,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.51,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.65,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.95,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.67,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.72,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.80,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.95,
          payOutTime: 'Annually',
        },
      ],
      [
        {
          interest: 7.65,
          payOutTime: 'On Maturity',
        },
        {
          interest: 7.39,
          payOutTime: 'Monthly',
        },
        {
          interest: 7.44,
          payOutTime: 'Quarterly',
        },
        {
          interest: 7.51,
          payOutTime: 'Half-yearly',
        },
        {
          interest: 7.65,
          payOutTime: 'Annually',
        },
      ],
    ],
  },
};

const interestRateSeed = {
  public_id: uuidV1(),
  partner_code: 'BAJAJ_FINANCE',
  version: 1,
  status: 'inactive',
  details: JSON.stringify(interestRate),
  created_at: new Date(),
  updated_at: new Date(),
  created_by: uuidV1(),
  updated_by: uuidV1(),
};

module.exports = interestRateSeed;

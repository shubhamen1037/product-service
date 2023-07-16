/* eslint-disable max-lines */
const save = {
  title: 'Save product deatails',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
    },
    sku: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
    },
    price: {
      type: 'number',
    },
  },
  required: [ 'name', 'sku', 'price' ],
  errorMessage: {
    required: {
      name: 'Parameter: name is required.',
      sku: 'Parameter: sku is required.',
      price: 'Parameter: price is required.',
    },
    properties: {
      name: 'Parameter: name should have minimum 4 charcter',
      sku: 'Parameter: sku should have minimum 4 charcter',
      price: 'Parameter: price should be valid number',
    },
  },
  additionalProperties: false,
};

module.exports = save;

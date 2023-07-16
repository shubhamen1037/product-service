/* eslint-disable max-lines */
const update = {
  title: 'Update product details',
  description: 'Defines the structure for HTTP PATCH request body',
  type: 'object',
  properties: {
    publicId: {
      type: 'string',
      description: 'unique id of product',
      format: 'uuid',
    },
    concurrencyStamp: {
      type: 'string',
      description: 'UUID referencing to the unique transaction id for updating product object',
      format: 'uuid',
    },
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
    isDeleted: {
      type: 'boolean',
    },
  },
  required: [ 'publicId', 'concurrencyStamp' ],
  errorMessage: {
    required: {
      publicId: 'Parameter: publicId is required.',
      concurrencyStamp: 'Parameter: concurrencyStamp is required.',
    },
    properties: {
      name: 'Please fill correct product name. It should have minimum 4 charcter',
      sku: 'Please fill correct sku. It should have minimum 4 charcter',
      price: 'Please fill correct price. It should be number',
      publicId: 'Parameter: publicId should be valid uuid.',
      isDeleted: 'Parameter: isDeleted should be boolean value.',
      concurrencyStamp: 'Parameter: concurrencyStamp should be valid uuid.',
    },
  },
  additionalProperties: false,
};

module.exports = update;

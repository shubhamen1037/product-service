/* eslint-disable max-lines */
const update = {
  title: 'Update offer details',
  description: 'Defines the structure for HTTP PATCH request body',
  type: 'object',
  properties: {
    publicId: {
      type: 'string',
      description: 'unique offer id',
      format: 'uuid',
    },
    concurrencyStamp: {
      type: 'string',
      description: 'UUID referencing to the unique transaction id for updating product object',
      format: 'uuid',
    },
    title: {
      type: 'string',
      description: 'title of offer',
      maxLength: 255,
      minLength: 2,
    },
    discription: {
      type: 'string',
      description: 'description of offer',
      minLength: 2,
    },
    startDate: {
      type: 'string',
      description: 'startDate of offer',
      format: 'date-time',
    },
    endDate: {
      type: 'string',
      description: 'endDate of offer',
      format: 'date-time',
    },
    rule: {
      type: 'object',
      properties: {
        quantity: {
          type: 'number',
          description: 'number of perticular product',
        },
        price: {
          type: 'number',
          description: 'price of total product',
        },
        minQuantityLimit: {
          type: 'number',
          description: 'minimum number of perticular product on which offer is applicable',
        },
        maxDiscountLimit: {
          type: 'number',
          description: 'maximum discount limit',
        },
      },
      errorMessage: {
        properties: {
          quantity: 'Parameter: quantity should be valid uuid.',
          price: 'Parameter: price should be valid uuid.',
          minQuantityLimit: 'Parameter: minQuantityLimit should be valid uuid.',
          maxDiscountLimit: 'Parameter: maxDiscountLimit should be valid uuid.',
        },
      },
      additionalProperties: false,
    },
    isDeleted: {
      type: 'boolean',
    },
    isExpired: {
      type: 'boolean',
    },
  },
  required: [ 'publicId', 'concurrencyStamp' ],
  errorMessage: {
    required: {
      publicId: 'Parameter: publicId is required in body.',
      concurrencyStamp: 'Parameter: concurrencyStamp is required.',
    },
    properties: {
      publicId: 'Parameter: publicId should be valid uuid.',
      concurrencyStamp: 'Parameter: concurrencyStamp should be valid uuid.',
      title: 'Parameter: title should be valid string.',
      discription: 'Parameter: discription should be valid string.',
      startDate: 'Parameter: startDate should be valid date format.',
      endDate: 'Parameter: endDate should be valid date format.',
      rule: 'Parameter: rule should be valid object.',
      isDeleted: 'Parameter: isDeleted should be boolean value.',
      isExpired: 'Parameter: isExpired should be boolean value.',
    },
  },
  additionalProperties: false,
};

module.exports = update;

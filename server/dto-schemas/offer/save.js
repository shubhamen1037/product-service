/* eslint-disable max-lines */
const save = {
  title: 'Save offer details',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    productId: {
      type: 'string',
      description: 'unique id of product',
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
    startDate:{
      type: 'string',
      description: 'startDate of offer',
      format: 'date-time',
    },
    endDate:{
      type: 'string',
      description: 'endDate of offer',
      format: 'date-time',
    },
    rule:{
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
        minQuantityLimit:{
          type: 'number',
          description: 'minimum number of product on which offer is applicable',
        },
        maxQuantityLimit:{
          type: 'number',
          description: 'maximum number of product on which offer is applicable',
        },
        maxDiscountLimit:{
          type: 'number',
          description: 'maximum discount limit',
        },
      },
      required: [ 'quantity', 'price' ],
      errorMessage: {
        required: {
          quantity: 'Parameter: quantity is required in rule object.',
          price: 'Parameter: price is required in rule object.',
        },
        properties: {
          quantity: 'Parameter: quantity should be valid uuid.',
          price: 'Parameter: price should be valid uuid.',
          minQuantityLimit: 'Parameter: minQuantityLimit should be valid uuid.',
          maxQuantityLimit: 'Parameter: maxQuantityLimit should be valid uuid.',
          maxDiscountLimit: 'Parameter: maxDiscountLimit should be valid uuid.',
        },
      },
      additionalProperties: false,
    },
  },
  required: [ 'productId', 'title', 'discription', 'startDate', 'endDate', 'rule' ],
  errorMessage: {
    required: {
      productId: 'Parameter: publicId is required in body.',
      title: 'Parameter: title is required in body.',
      discription:  'Parameter: discription is required in body.',
      startDate:  'Parameter: startDate is required in body.',
      endDate:  'Parameter: endDate is required in body.',
      rule:  'Parameter: rule is required in body.',
    },
    properties: {
      productId: 'Parameter: productId should be valid uuid.',
      title: 'Parameter: title should be valid string.',
      discription: 'Parameter: discription should be valid string.',
      startDate: 'Parameter: startDate should be valid date format.',
      endDate: 'Parameter: endDate should be valid date format.',
      rule: 'Parameter: rule should be valid object.',
    },
  },
  additionalProperties: false,
};

module.exports = save;

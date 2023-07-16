/* eslint-disable max-lines */
const checkout = {
  title: 'Checkout products deatails',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            description: 'unique id of product',
            format: 'uuid',
          },
          quantity: {
            type: 'number',
            description: 'number of products',
          },
        },
        required: [ 'productId', 'quantity' ],
        errorMessage: {
          required: {
            productId: 'Parameter: productId is required.',
            quantity: 'Parameter: quantity is required.',
          },
          properties: {
            productId: 'Parameter: productId should be valid uuid',
            quantity: 'Parameter: quantity should be valid number',
          },
        },
        additionalProperties: false,
      },
    },
  },
  required: [ 'products' ],
  errorMessage: {
    required: {
      products: 'Parameter: products is required.',
    },
    properties: {
      products: 'Parameter: products should have array',
    },
  },
  additionalProperties: false,
};

module.exports = checkout;

const { Product: ProductService } = require('../services');
const { save: saveSchema, update: updateSchema, checkout: checkoutSchema } = require('../dto-schemas/product');

const Validator = require('../utils/validator');

const save = async (req, res) => {
  try {
    const { body } = req;

    const { errors: validationErrors, data: validData } = Validator.isSchemaValid({ data: body, schema: saveSchema });

    if (validationErrors) {
      return res.status(400).json({ error: validationErrors });
    }

    const { errors, doc } = await ProductService.save(validData);

    if (doc) {

      const { publicId } = doc;

      res.set('message', 'Successfully saved.');
      res.set('public-id', publicId);

      return res.status(201).json();
    }

    return res.status(400).json({ error: errors });
  } catch (error) {
    return res.status(500).json({ error: [{ message: 'Internal Server Error'}]} );
  }
};

const update = async (req, res) => {
  try {
    const { body, params: { publicId }, headers: {'concurrency-stamp': concurrencyStamp} } = req;

    const data = { ...body, publicId, concurrencyStamp }

    const { errors: validationErrors, data: validData } = Validator.isSchemaValid({ data, schema: updateSchema });

    if (validationErrors) {
      return res.status(400).json({ error: validationErrors });
    }

    const { errors, doc } = await ProductService.update(validData);

    if (doc) {

      const { publicId } = doc;

      res.set('message', 'Successfully updated.');
      res.set('public-id', publicId);

      return res.status(204).json();
    }

    return res.status(400).json({ error: errors });
  } catch (error) {
    return res.status(500).json({ error: [{ message: 'Internal Server Error'}]} );
  }
};

const getDetailById = async (req, res) => {
  try {
    const { params: { publicId } } = req;

    const isValid = Validator.isValidUuid(publicId);

    if (!isValid) {
      return res.status(400).json({ error: [{ message: 'Invalid product-id!' }]});
    }

    const { errors, doc } = await ProductService.getDetailById({publicId});

    if (doc) {
      return res.status(200).json(doc);
    }

    return res.status(400).json({ error: errors });
  } catch (error) {
    return res.status(500).json({ error: [{ message: 'Internal Server Error'}]} );
  }
};

const getList = async (req, res) => {
  try {
    const { query } = req;

    const { pageSize, pageNumber, ...data } = query;

    const limit = pageSize || 10;

    const offset = limit * ((parseInt(pageNumber) || 1) - 1);

    const { errors, count, doc } = await ProductService.getList({ ...data, limit, offset });

    if(doc){
      res.setHeader('page-limit', limit);
      res.setHeader('total-records', count);

      return res.status(200).json(doc);
    }

    return res.status(400).json({ error: errors });
  } catch (error) {
    return res.status(500).json({ error: [{ message: 'Internal Server Error'}]} );
  }
};

const checkout = async (req, res) => {
  try {
    const { body } = req;

    const { errors: validationErrors, data: validData } = Validator.isSchemaValid({ data:body, schema: checkoutSchema });

    if (validationErrors) {
      return res.status(400).json({ error: validationErrors });
    }

    const { errors, doc } = await ProductService.checkout(validData);

    if (doc) {

      return res.status(200).json(doc);
    }

    return res.status(400).json({ error: errors });
  } catch (error) {
    return res.status(500).json({ error: [{ message: 'Internal Server Error'}]} );
  }
};

module.exports = {
  save, update, getDetailById, getList, checkout
};

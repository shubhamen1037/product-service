/* eslint-disable max-lines */
const { v1: uuidV1 } = require('uuid');
const { product: ProductModel, offer: OfferModel, Sequelize: { Op }} = require('../database');
const Helper = require('../utils/helper');
const { OFFER_STATUS } = require('../utils/constant');

const save = async (payload) => {
  const {  productId, ...data } = payload;

  const publicId = uuidV1();

  try {
    const response = await ProductModel.findOne({
      where: { public_id: productId },
      attributes: [ 'id' ],
    });

    if (!response) {
      return { errors: [ { name: 'product-id', message: `Invalid product Id` } ] };
    }

    const { dataValues: { id: productUniqueId }} = response;

    const doc = Helper.convertCamelToSnake({...data, publicId, productId: productUniqueId});

    await OfferModel.create(doc);

    return { doc: { publicId, message: 'successfully stored.' } };
  } catch (err) {
    return { errors: [ { name: 'save-offer', message: 'Something went wrong.' } ] };
  }
};

const update = async (payload) => {
const { publicId, concurrencyStamp, ...data } = payload;

  try {
    const reponse = await OfferModel.findOne({
      where: { public_id: publicId},
    });

    if (!reponse) {
      return { errors: [ { name: 'offer', message: `Invalid offer id` } ] };
    }

    const { dataValues: { concurrency_stamp: storedConcurrencyStamp}} = reponse;

    if (concurrencyStamp != storedConcurrencyStamp) {
      return { errors: [ { name: 'concurrency-stamp', message: 'InValid concurrency stamp.' } ] };
    }

    const newConcurrencyStamp = uuidV1();

    const doc = Helper.convertCamelToSnake({ ...data, concurrencyStamp: newConcurrencyStamp});

    await OfferModel.update(doc,  { where: { public_id: publicId } });

    return { doc: { publicId, message: 'Successfully updated.' } };
  } catch (err) {
    return { errors: [ { name: 'save-offer', message: 'Something went wrong.' } ] };
  }
};

const getList = async (payload) => {
  const { limit, offset } = payload;

  const response = await OfferModel.findAndCountAll({
    limit,
    offset,
    attributes: [ 'public_id', 'concurrency_stamp', 'title', 'discription', 'start_date', 'end_date', 'rule', 'created_at', 'updated_at' ],
    order: [['id', 'DESC']],
    include: [{
        order: [ 'id', 'desc' ],
        model: ProductModel,
        attributes: [ 'public_id','concurrency_stamp', 'name', 'sku', 'price', 'created_at', 'updated_at' ],
        where: { is_deleted: false }, 
      }],
  });

  if (response) {
    const { count, rows } = response;

    const doc = rows.map((element) => {
      const { dataValues } = element;

      return Helper.convertSnakeToCamel(dataValues);
    });

    return { doc, count };
  }

  return { count: 0, doc: [] };
};


const getDetailById = async (payload) => {
  const { publicId } = payload;

  const response = await OfferModel.findOne({
    attributes: [ 'public_id', 'concurrency_stamp', 'title', 'discription', 'start_date', 'end_date', 'rule', 'created_at', 'updated_at' ],
    where: { public_id: publicId }, 
    include: [{
        model: ProductModel,
        attributes: [ 'public_id','concurrency_stamp', 'name', 'sku', 'price', 'created_at', 'updated_at' ],
        where: { is_deleted: false },
        required: false, 
      }],
  });

  if (response) {
    const { dataValues } = response;
    const doc = Helper.convertSnakeToCamel(dataValues);

    return { doc };
  }

  return { doc : {} };
};

module.exports = {
  save,
  getList,
  update,
  getDetailById,
};

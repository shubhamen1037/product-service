/* eslint-disable max-lines */
const { v1: uuidV1 } = require('uuid');
const moment = require('moment');
const { product: ProductModel, offer: OfferModel, Sequelize: { Op }} = require('../database');
const Helper = require('../utils/helper');
const { OFFER_STATUS } = require('../utils/constant');

const save = async (payload) => {
  const { name, sku, price } = payload;

  const publicId = uuidV1();

  try {
    const isDuplicateProduct = await ProductModel.findOne({
      where: { sku },
      attributes: [ 'sku' ],
    });

    if (isDuplicateProduct) {
      return { errors: [ { name: 'sku', message: `Duplicate SKU entry` } ] };
    }

    await ProductModel.create({ public_id: publicId, name, sku, price });

    return { doc: { publicId, message: 'successfully stored.' } };
  } catch (err) {
    return { errors: [ { name: 'save-product', message: 'Something went wrong.' } ] };
  }
};

const update = async (payload) => {
const { publicId, concurrencyStamp, ...data } = payload;

  try {
    const reponse = await ProductModel.findOne({
      where: { public_id: publicId},
    });

    if (!reponse) {
      return { errors: [ { name: 'product', message: `Invalid product id` } ] };
    }

    const { dataValues: { concurrency_stamp: storedConcurrencyStamp}} = reponse;

    if (concurrencyStamp != storedConcurrencyStamp) {
      return { errors: [ { name: 'concurrency-stamp', message: 'InValid concurrency stamp.' } ] };
    }

    const newConcurrencyStamp = uuidV1();

    await ProductModel.update(Helper.convertCamelToSnake({ ...data, concurrency_stamp: newConcurrencyStamp }),  { where: { public_id: publicId } });

    return { doc: { publicId, message: 'Successfully updated.' } };
  } catch (err) {
    return { errors: [ { name: 'save-product', message: 'Something went wrong.' } ] };
  }
};

const getList = async (payload) => {
  const { limit, offset } = payload;

  const response = await ProductModel.findAndCountAll({
    limit,
    offset,
    attributes: [ 'public_id','concurrency_stamp', 'name', 'sku', 'price', 'created_at', 'updated_at' ],
    where: { is_deleted: false }, 
    order: [['id', 'DESC']],
    include: [{
        order: [ 'id', 'desc' ],
        model: OfferModel,
        attributes: [ 'public_id', 'concurrency_stamp', 'title', 'discription', 'start_date', 'end_date', 'rule', 'created_at', 'updated_at' ],
        where: { status: OFFER_STATUS.ACTIVE },
        required: false,
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

  const response = await ProductModel.findOne({
    attributes: [ 'public_id','concurrency_stamp', 'name', 'sku', 'price', 'created_at', 'updated_at' ],
    where: { public_id: publicId, is_deleted: false }, 
    include: [{
        order: [ 'id', 'desc' ],
        model: OfferModel,
        attributes: [ 'public_id', 'concurrency_stamp', 'title', 'discription', 'start_date', 'end_date', 'rule', 'created_at', 'updated_at' ],
        where: { status: OFFER_STATUS.ACTIVE },
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

const checkout = async (payload) => {
  const { products } = payload;

  
  try {
    let errors = [];
    let productPriceDetails = [];
   

    await Promise.all(products.map(async(data)=>{
      const { productId, quantity } = data;
      let totalPrice = 0;
      let totalDiscountedPrice = 0;

      const productResponse =  await ProductModel.findOne({
        attributes: [ 'public_id','concurrency_stamp', 'name', 'sku', 'price', 'created_at', 'updated_at' ],
        where: { public_id: productId, is_deleted: false }, 
        include: [{
            order: [ 'id', 'desc' ],
            model: OfferModel,
            attributes: [ 'public_id', 'concurrency_stamp', 'title', 'discription', 'start_date', 'end_date', 'rule', 'created_at', 'updated_at' ],
            where: { 
              start_date: { [Op.gte]: new Date()}, 
              end_date: { [Op.gte]: new Date()},
            },
            required: false,
          }],
      });

      if(!productResponse){
        errors.push({ name: 'product-id', message: `productId ${productId} is invalid`})
      }

      const { dataValues:{ price: actualPrice, name, sku, offers}} = productResponse;

      let discountPricePerProduct  = actualPrice;

      totalPrice += actualPrice * quantity;
      totalDiscountedPrice += discountPricePerProduct * quantity;
      let minQuantityOnOfferAvailable;
      let pricingRule = {}

      if(offers.length > 0){

        const { dataValues: { rule }} = offers[0];
        pricingRule = rule;

        const { price, quantity: quantityOnDiscountAvailable, maxDiscountLimit, minQuantityLimit} = rule;
        
        discountPricePerProduct = price/quantityOnDiscountAvailable;
        let totalQuantityOnDiscountNotAvailable = quantity % quantityOnDiscountAvailable;
        
        
        if(minQuantityLimit && minQuantityLimit >  quantity ){
          totalQuantityOnDiscountNotAvailable = quantity;
        }
        
        const totalQuantityOnDiscountAvailable = (quantity - totalQuantityOnDiscountNotAvailable);
        totalDiscountedPrice = (totalQuantityOnDiscountAvailable * discountPricePerProduct) + (totalQuantityOnDiscountNotAvailable * actualPrice);
        minQuantityOnOfferAvailable = minQuantityLimit || quantityOnDiscountAvailable ;

        const isMaxDiscountLimitExeeded = maxDiscountLimit && (totalPrice - totalDiscountedPrice) > maxDiscountLimit;

        if(isMaxDiscountLimitExeeded ){
          totalDiscountedPrice = totalPrice - maxDiscountLimit;
        }
      }

      productPriceDetails.push({
        name, sku, pricePerProduct: actualPrice, quantity, totalPrice: (actualPrice * quantity), 
        totalDiscountedPrice, minQuantityOnOfferAvailable, discountPricePerProduct, pricingRule
      });

    }))

    if(errors.length >0){
      return { errors}
    }
    
    return { doc: { products: productPriceDetails }}
  } catch (err) {
    return { errors: [ { name: 'save-product', message: 'Something went wrong.' } ] };
  }
};
  
module.exports = {
  save,
  getList,
  update,
  getDetailById,
  checkout
};

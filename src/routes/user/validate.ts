import * as Joi from 'joi'

let id = Joi.number().integer().positive();


export const createPriceSchema = Joi.object()
.keys({
  name: Joi.string().required(),
  age: id.required(),
  birth_date: Joi.date().required(),
  suscription_date: Joi.date().required(),
  cost: Joi.number().required()
})
.required();

export const updatePriceSchema = Joi.object()
.keys({
  name: Joi.string().optional(),
  age: id.optional(),
  birth_date: Joi.date().optional(),
  suscription_date: Joi.date().optional(),
  cost: Joi.number().optional()
})
.required();
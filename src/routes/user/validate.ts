import * as Joi from 'joi'

let id = Joi.number().integer().positive();


export const createPriceSchema = Joi.object()
.keys({
  name: Joi.string().required(),
  age: id.required(),
  birthDate: Joi.date().required(),
  suscriptionDate: Joi.date().required(),
  cost: Joi.number().required()
})
.required();

export const updatePriceSchema = Joi.object()
.keys({
  name: Joi.string().optional(),
  age: id.optional(),
  birthDate: Joi.date().optional(),
  suscriptionDate: Joi.date().optional(),
  cost: Joi.number().optional()
})
.required();
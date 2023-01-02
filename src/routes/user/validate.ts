import * as Joi from 'joi'

let id = Joi.number().integer().positive();


export const createPriceSchema = Joi.object()
.keys({
  price_group_id: id.required(),
  entity_type: Joi.string().required(),
  billable_service_id: id.required(),
  billable_line_item_id: id.required(),
  material_id: id.optional(),
  threshold_id: id.optional(),
  surcharge_id: id.optional(),
  billing_cycle: Joi.string().required(),
  frequency_id: id.optional(),
  price: Joi.number().required(),
  next_price: Joi.number().optional(),
  limit: Joi.number().optional(),
  user_id: Joi.string().required(),
  created_at: Joi.date().optional(),
  trace_id: Joi.string().required(),
  start_at: Joi.date().optional(),
  end_at: Joi.date().optional(),
})
.required();

export const updatePriceSchema = Joi.object()
.keys({
  price_group_id: id.optional(),
  entity_type: Joi.string().optional(),
  billable_service_id: id.optional(),
  billable_line_item_id: id.optional(),
  material_id: id.optional(),
  threshold_id: id.optional(),
  surcharge_id: id.optional(),
  billing_cycle: Joi.string().optional(),
  frequency_id: id.optional(),
  price: Joi.number().optional(),
  next_price: Joi.number().optional(),
  limit: Joi.number().optional(),
  user_id: Joi.string().optional(),
  created_at: Joi.date().optional(),
  trace_id: Joi.string().optional(),
  start_at: Joi.date().optional(),
  end_at: Joi.date().optional(),
})
.required();
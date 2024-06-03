import Joi from 'joi';

export const updateAccountSchema = Joi.object({
  accountId: Joi.string().required(),
  ownerAddress: Joi.string().min(5).max(100).required()
});

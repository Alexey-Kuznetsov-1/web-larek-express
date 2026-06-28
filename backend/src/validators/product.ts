import { Joi, celebrate, Segments } from 'celebrate';

export const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
        'any.required': 'Поле "title" должно быть заполнено',
      }),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
    category: Joi.string().required()
      .messages({
        'any.required': 'Поле "category" должно быть заполнено',
      }),
    description: Joi.string().optional(),
    price: Joi.number().allow(null).optional(),
  }),
});

export const validateProductUpdateBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).optional()
      .messages({
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
      }),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().allow(null).optional(),
  }),
});

export const validateObjId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    productId: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'ID должен содержать 24 символа',
        'string.hex': 'ID должен быть шестнадцатеричным',
        'any.required': 'ID обязателен',
      }),
  }),
});

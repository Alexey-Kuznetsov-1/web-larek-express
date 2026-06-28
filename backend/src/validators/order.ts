import { Joi, celebrate, Segments } from 'celebrate';

const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required()
      .messages({
        'any.only': 'Payment должен быть "card" или "online"',
        'any.required': 'Поле "payment" обязательно',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Некорректный email',
        'any.required': 'Поле "email" обязательно',
      }),
    phone: Joi.string().required()
      .messages({
        'any.required': 'Поле "phone" обязательно',
      }),
    address: Joi.string().required()
      .messages({
        'any.required': 'Поле "address" обязательно',
      }),
    total: Joi.number().required()
      .messages({
        'any.required': 'Поле "total" обязательно',
      }),
    items: Joi.array().items(Joi.string().length(24).hex()).min(1).required()
      .messages({
        'array.min': 'Массив items не может быть пустым',
        'any.required': 'Поле "items" обязательно',
      }),
  }),
});

export default validateOrderBody;

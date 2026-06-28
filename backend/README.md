# Бэкенд WebLarek

Бэкенд для сервиса «Web-ларёк» — интернет-магазина с товарами для разработчиков.

## Используемые технологии и решения

- **TypeScript** — основной язык проекта
- **MongoDB + Mongoose** — хранение данных о товарах
- **Express.js** — серверный фреймворк
- **Celebrate + Joi** — валидация запросов
- **Winston + express-winston** — логирование запросов и ошибок
- **ESLint (Airbnb)** — линтинг кода

## Структура проекта
backend/src/
├── app.ts # Основная логика сервера
├── config.ts # Конфигурация из .env
├── controllers/ # Контроллеры (обработка запросов)
│ ├── order.ts
│ └── product.ts
├── models/ # Схемы MongoDB
│ └── product.ts
├── routes/ # Маршруты API
│ ├── order.ts
│ └── product.ts
├── middlewares/ # Мидлвары
│ ├── error-handler.ts
│ └── logger.ts
├── validators/ # Валидация запросов (celebrate + joi)
│ ├── order.ts
│ └── product.ts
├── errors/ # Кастомные классы ошибок
│ ├── bad-request.ts
│ ├── conflict.ts
│ ├── not-found.ts
│ ├── unauthorized.ts
│ └── forbidden.ts
└── public/ # Статические файлы
└── images/ # Изображения товаров

## API Эндпоинты

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/product` | Получить все товары |
| POST | `/product` | Создать новый товар |
| POST | `/order` | Оформить заказ |


## Коды ошибок
400	Некорректные данные в запросе
404	Маршрут не найден
409	Конфликт (например, дубликат title)
500	Внутренняя ошибка сервера
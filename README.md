Данные для входа в amoCrm:
Почта: g.odintzoff2015@yandex.ru
Пароль: gosha5803

Структура папок:
auth - Модуль отвечающий за подключение нашей интеграции, приём auctCode, обмен его на пару токенов, сохранение и перезапись токенов в БД, и обновление "протухшего" access токена. Я заметил, что Ваша организации использует в стеке Postgress, но с ним возник какой-то баг, я решил не тратить много времени на поиск решения и подключил mongo.

axios - для исходящих запросов с сервера решил использовать в проекте аксиос, так как были проблемы с интерцепторами nest. 

contacts - модуль отвечающий за работу с контактами, получение контакта по параметру телефона и email, создание контакта. 

crm-integration - модуль, в котором находится единственный эндпоинт приложения, по которму отрабатывает метод, который требуется сделать в тестовом задании.

leads - модуль, отвечающий за создание сделки контакта по его id, в первом статусе воронки.

models - модель токенов, для mongo.

types - некоторые типы.

# Тестовое задание [koshelek.ru](https://koshelek.ru/)

[Полное ТЗ](https://drive.google.com/file/d/1k6c0AiXsTko1kfLv3sLtFxV9vIJwpUSd/view)

Разработать родительское приложение, которое послужит контейнером для подключения дочерних блоков с бизнес-логикой.
В состав контейнера должны войти хидер с меню из двух страниц и область для загрузки контента под каждую страницу (блоков).
Контент дочерних блоков должен подгружаться динамически с отложенной загрузкой (отдельным бандлом).

Далее необходимо разработать мини-ядро, которое будет грузиться вместе с родительским приложенияем и иметь api для загрузки дополнительных плагинов. Ядро должно быть доступно из кода каждой страницы родительского приложения.

Первым плагином ядра является плагин, реализующий паттерн шина данных. Он реализует в себе глобальную на уровне приложения шину данных. Каждый компонент системы может писать в нее события или читать их из нее (посредством подписки).

Вторым плагином ядра будет плагин, реализующий SDK для взимодействия с биржей binance (только 2 метода: получить биржевой стакан по определенному символу по REST и подписаться на обновления стакана по WS). (См. раздел Diff. Depth Stream в документации: https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md).

#### Установка
 ```
 npm install
 ```
Запуск
```
  npm run start 
```
Тесты
```
  npm run test 
```

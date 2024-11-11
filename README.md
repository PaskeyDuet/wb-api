# wb-api-getter

### Для начала скопируйте репозиторий на свой компьютер

```sh
git clone https://github.com/PaskeyDuet/wb-api.git
```

### Поменяйте директорию на только что скачанную

```sh
cd .\wb-api-getter\
```

### Создайте файл .env в корне проекта с следующими переменными

```env
WB_API_KEY - Ключ API Wildberries для аутентификации запросов.
WB_API_TARIFFS - Endpoint для получения тарифов Wildberries. Установите 'https://common-api.wildberries.ru/api/v1/tariffs'
DB_NAME - Название базы данных.
DB_USERNAME - Имя пользователя базы данных.
DB_PASSWORD - Пароль пользователя базы данных.
DB_HOST - Адрес хоста базы данных.
DB_PORT - Порт подключения к базе данных.
EXPRESS_PORT - Порт, на котором будет работать Express-сервер.
SERVICE_ACCOUNT_EMAIL - Электронная почта сервисного аккаунта для аутентификации.
SERVICE_ACCOUNT_SCOPE - Области доступа для сервисного аккаунта. Установите 'https://www.googleapis.com/auth/spreadsheets'
SERVICE_ACCOUNT_PRIVATE_KEY - Приватный ключ сервисного аккаунта для подписи запросов.
SPREADSHEET_IDS - Массив строк spreadsheet ids разделенный с помощью '|'
```

### Проверьте, установлен ли Docker

```sh
docker --version
```

#### Если вы видите версию, значит docker установлен. Если версси нет, установите docker по [ссылке](https://www.docker.com/products/docker-desktop)

### Соберите и запустите контейнер следующими командами

```sh
docker-compose down --volumes
docker-compose build --no-cache
docker-compose up
```

### Изменить частоту обновления базы данных и таблиц можно в директории src/updaters в файле updateBoxTariff.ts. dbUpdateInterval отвечает за обновление базы данных, sheetsUpdateInterval отвечает за частоту обновления гугл таблиц.

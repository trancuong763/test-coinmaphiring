## Installation

```bash
$ npm install
```

## Setting Source
Chạy lệnh bên dưới để coppy file .env.example qua file .env
```bash
$ cp .env.example .env
```

## Migrations
Trước khi chạy lệnh này phải cấu hình database ở file .env
```bash
$ npm run migration:run
```

## Start

```bash
# start product
$ npm run start

# start dev
$ npm run start:dev
```

## Document API
```bash
http://localhost:3000/docs/
```
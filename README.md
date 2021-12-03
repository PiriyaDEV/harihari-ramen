# Hari Hari Ramen Application

<p align="center">
  <img style="width:600px;" src="Frontend/harihari-user/src/images/Full Logo.png"/>
<p/>

Hari Hari Ramen is a restaurant that offers a social distancing ordering system at the restaurant. We aim to make contact between customers and our staff as little as possible. Hari Hari Ramen Web Application can be accessed via a QR Code at each table, and the customer can order the food using the web application, view order status and order history, call the waiter, and checkout.

Customer will be logged in as a different account depending on the QR code they scan, and each table can only have one logged in user at a time. The menu browsing will be similar to most delivery apps, except for the ramen menus, where we have an interactive visual to make it more attractive to customers. Staff will be a person that can view order for all tables and they can edit the status of the order. Also, they can view for waiter calling. Moreover, they can check out the customer by scanner their QR code.

## Frontend Installation

For Customer Website Application
It will run on port 3000

```
cd Frontend
cd harihari-user
npm install
npm start
```

For Staff Website Application
It will run on port 3001

```
cd Frontend
cd harihari-staff
npm install
npm start
```

## Backend Installation

It will run on port 3030

```
cd Backend
npm install
npm start
```

## Backend Configuration

You have to create .env file in the backend directory and adds below configurations in the file.

```
# API Server Environment
NODE_ENV=development
PORT=3030
BASE_URL=http://localhost:3030

# DATABASE CONNECTION
DB_HOST=YOUR_DATABASE_HOST          # ex. localhost
DB_PORT=YOUR_DATABASE_PORT          # ex. 3306
DB_USER=YOUR_DATABASE_USERNAME      # ex. user
DB_PASSWORD=YOUR_DATABASE_PASSWORD  # ex. P@ssw0rd1234!
DB_NAME=YOUR_DATABASE_NAME          # ex. harihari-ramen
```

For the queries on this project were all file in ./app/models
that end by .model.js

## Demo Database

You have to create a new database in MySQL and uses below sql file to build the tables and insert data used in the database.

```
- import "harihari_demo.sql" from Backend Directory to create a table and demo data in to the application.
```

## Created by Hari Hari Ramen Group Member (CPE33 International)

- Chayanont Piyawatcharavijit 62070503410
- Piriya Chaigul 62070503438
- Phumiphat Tatiyawongsoonthorn 62070503442
- Worachot Yuwamirt 62070503446
- Narapathra Morakrant 62070503464

> For CPE 327 Software Engineering final project

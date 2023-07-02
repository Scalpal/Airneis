# AIRNEIS

ÀIRNEIS ("furniture" in Scottish Gaelic) is a Scottish company, and we sell furniture designed by Scottish designers.
Until now, we've sold products by mail order or via partner stores, but we've missed the initiative to move into the digital age.
Today, we want to create our own e-commerce solution to reach an international clientele, but also more deeply the one we already have locally.
The final deliverable required is a mobile-first e-commerce site as well as an Android and/or iOS mobile application mirroring the mobile web version, and a web backoffice to manage content, all with a secure payment system that can be maintained over time.

## Developers team

- Pascal Lim
- Carsten Lopes
- Alexandre Gautrot
- Alexandre Schecht

## Run the project

- Start by cloning the project : `git clone https://github.com/Scalpal/Airneis.git`
- Run the command `npm i` to install all the project dependencies
- Setup your environment file (`.env`), it should look like this :

```js
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

API_URL=
SECURITY_JWT_SECRET=
SECURITY_PASSWORD_PEPPER=
SECURITY_ENCRYPT_KEY=
SENDGRID_KEY=

AWS_BUCKET_NAME=
AWS_BUCKET_REGION=
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_BUCKET_URL=
```

- Once you have you're empty postgres database and your `.env` setup properly, run the command `npx knex migrate:latest` to create the tables in the database
- Now run the command `npx knex seed:run --esm` to fill the database with rows
- Now run : `npm run dev` to run the app locally and go to `http://localhost:3000`
- **Have fun visiting our website Airneis !**

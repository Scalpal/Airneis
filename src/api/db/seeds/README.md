# Information

The following files contain the seeds for the database. They are named with a numbered prefix, in ascending order, as knex runs every files as is.

## Run

Run the following command to seed the database with every files present in this directory: `npx knex seed:run --esm`

If you want to run only one file, add the parameter `--specific` in the command with the file's name and its extension.

Example:

`npx knex seed:run --specific=001-delete.js --esm`

This command will only run the file `001-delete.js`.

## Contents

### Delete

This file clears the data of every tables present in the database.

### Admin

This file creates an administrator account.

### Users

This file creates generic user accounts with addresses, reviews, and orders.

### Categories

This file creates categories.

### Materials

This file creates materials.

### Products

This file creates products assigned with a material, a category, and a picture.

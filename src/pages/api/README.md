# API documentation

Here is the documentation for the website API. You will see everything you need to know to use our API properly.

## Users

### Authentication

- `POST /api/users/register` - Registers a new user

This route : 
- requires some parameters. Here's an example : 

```json
{
    "firstName": "John",
    "lastName": "Smith",
    "phoneNumber": "0102030405",
    "email": "john@smith.com",
    "password": "MyNameIsJohn123!*",

  // These are optional
    "address": "2721 Deans Lane",
    "city": "New York",
    "region": "Northside",
    "postalCode": "10004",
    "country": "USA", 
}
```

By default, the user is not an admin. 

The role of the user is handled by a boolean attribute `isAdmin` which if is `true`, means that the user is an admin, otherwise it is not.

- `POST /api/users/login` - Logs in a user

```json
{
  "email": "john@smith.com",
  "password": "MyNameIsJohn123!*"
}
```

### Methods

### GET

- `GET /api/users/self` - Get informations of the user connected

This route : 
- only needs the logged user JWT sent through headers.

It returns all the informations of the logged user.

- `GET /api/users` - Get all users

This route : 
- is **exclusive** to admins. 
- accepts query parameters, mainly for users management in the backoffice. Here's an exemple of possible query parameters : `?limit=20&page=2&orderField=id&order=asc&search=smith`

It returns all users.

- `GET /api/users/:userId` - Get a specific user by ID

This route : 
- is **exclusive** to admins.
- requires a path variable `userId`. Here's an exemple : `/api/users/1`.

### PATCH

- `PATCH /api/users/:userId` - Updates a specific user's informations

This route : 
- is **exclusive** to admins.
- requires a path variable `userId`. Here's an exemple : `/api/users/1`.
- requires a body but all the parameters are optional. Here's an exemple where I modify only the firstName and email: 

```json
{
  // All of these are optional,
  // For all the values we don't modify, we just don't put them in the body 
  "firstName": "Jason",
  "lastName": "", 
  "email": "jason@smith.com",
  "phoneNumber": "",
  "active": true,
  "isAdmin": false
}
```

### DELETE 

- `DELETE /api/users/:userId` - Desactivates a user account

This route : 
- is **exclusive** to admins.
- requires a path variable. Here's an exemple : /api/users/1.

On request, this route desactivates the user but it is not deleting it from the database.

## Products

### Methods 

### GET 

- `GET /api/products` - Get all products

This route : 
- accepts optional query parameters, but this is mainly handled in the frontend. Here's an example : 

```json 
{
  "priceMin": 100,
  "priceMax": 200,
  "materials": , // Array of materials id
  "onlyInStock": true,
  "categories": , // Array of categories id
  "limit": 100, // Default to 10
  "page": 1,
  "orderField": "id", // The field should exist
  "order": "ASC", // Default to DESC
  "search": "table",
  "showInHome": false // Default to false 
}
```

- `GET /api/products/:productSlug` - Get a specific product

This route : 
- requires a path variable `productSlug`. Here's an example : `/api/products/red-wooden-table` 

Returns a specific product.

- `GET /api/products/:productSlug/reviews` - Get all reviews of a specific product

This route : 
- requires a path variable `productSlug`. Here's an example : `/api/products/red-wooden-table/reviews`

Returns the reviews of a specific product.

- `GET /api/products/materials` - Get all materials

Returns all materials. 

- `GET /api/products/categories` - Get all categories 

Returns all categories 

- `GET /api/products/categories/:categorySlug` - Get a category by slug

This route : 
- requires a path variable `categorySlug`. Here's an example : `/api/products/categories/table` 

Returns a specific category.

### POST 

- `POST /api/products` - Add a product

This route : 
- is **exclusive** to admins.
- requires a body and all the field are required. Here's an exemple : 

```json 
{
  "name":"Red wood table",
  "description": "This red table is made with oak wood, perfect for modern houses",
  "price": 200,
  "stock": 10,
  "categoryId": 2, 
  "materials": [1, 2] // It can be multiple material ids or only one
}
```

- `POST /api/products/:productSlug/images` - Add an image for a specific product

This route : 
- is **exclusive** to admins.
- requires a path variable `productSlug`. Here's an example : `/api/products/red-wooden-table/images` 
- requires a `FormData` body to send the file. Here's an exemple : 

```js
// This is what it needs to be sent from the frontend
const formData = new FormData();
formData.append("file", file)

const response = await Axios.post(url, formData);
```

- `POST /api/products/categories/:categorySlug/upload` - Add an image for a specific category

This route : 
- is **exclusive** to admins.
- requires a path variable `categorySlug`. Here's an example : `/api/products/categories/table/upload` 
- requires a `FormData` body to send the file. Here's an exemple : 

```js
// This is what it needs to be sent from the frontend
const formData = new FormData();
formData.append("file", file)

const response = await Axios.post(url, formData);
```

### PATCH 

- `PATCH /api/products/:productSlug` - Update a specific product 

This route : 
- requires a path variable `productSlug`. Here's an example : `/api/products/red-wooden-table` 
- requires a body but all of it's parameters are optional, depending on your needs. Here's an example : 

```json 
{
  // IE: if you only need to change the product name, you can omit adding the other keys
  "name": "Updated name",
  "description": "",
  "price": 190,
  "stock": 2,
  "categoryId": [2],
  "materials": [1, 3], 
  "showInHome": false
}
```

- `PATCH /api/products/:productSlug/deleteImage` - Delete an image of a specific product 

This route : 
- is **exclusive** to admins.
- requires a path variable `productSlug`. Here's an example : `/api/products/red-wooden-table/deleteImage` 
- route requires a body. Here's an example : 

```json
{
  imageName: "/products-images/red-wooden-table.png"
}
```

- `PATCH /api/products/categories/:categorySlug` - Update a specific product 

This route : 
- is **exclusive** to admins.
- requires a path variable `categorySlug`. Here's an example : `/api/products/categories/table`.
- requires a body. Here's an exemple : 

```json
{
  // Some keys can be omitted if you don't want to update it
  "name": "Modern",
  "description": "Updated category description",
  "visible": true,
  "visibleInHome": false
}
```

## Home carousel

### Methods

### GET

- `GET /api/images/homeCarousel` - Get all home carousel images

This route :
- can receive an optional query parameter `visible`, if `true` it returns only the "visible" images (the ones with the attribute `visible` as `true`). 

Here's an example : `/api/images/homeCarousel?visible=true`

### POST 

- `POST /api/images/homeCarousel/upload` - Add & upload an image to the home carousel

This route : 
- is **exclusive** to admins.
- requires a `FormData` body to send the file. Here's an exemple : 

```js
// This is what it needs to be sent from the frontend
const formData = new FormData();
formData.append("file", file)

const response = await Axios.post(url, formData);
```

It uploads the image on the S3 bucket and then it adds it on the database.

- `POST /api/images/homeCarousel/:imageId` - Delete an image in the home carousel

This route : 
- is **exclusive** to admins.
- requires a path variable `imageId`. Here's an example : `/api/images/1`.
- requires a body that contains the image name. Here's an example : 

```json 
{
  "imageName": "home-carousel-images/carousel-image-1.jpeg"
}
```

It deletes the image from the database, and in the S3 at the same time.

### PATCH 

- `PATCH /api/images/homeCarousel/:imageId` - Updates the visibilty of an image in the home carousel

This route : 
- is **exclusive** to admins.
- requires a path variable `imageId`. Here's an example : `/api/images/1`.
- requires a body that contains the visibilty boolean. Here's an example : 

```json 
{
  "visible": true  // True if you want to show, false if you want to hide
}
```
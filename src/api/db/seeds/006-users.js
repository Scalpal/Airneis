import { faker } from "@faker-js/faker";
import hashPassword from "../hashPassword.js";

export const seed = async (knex) => {
  const loop = 10;

  const users = [];
  for (let i = 0; i < loop; i++) {
    const [passwordHash, passwordSalt] = await hashPassword(
      faker.internet.password()
    );
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      passwordHash,
      passwordSalt
    };
    users.push(user);
  }
  const userIds = await knex("users")
    .insert(users)
    .returning("id");

  const addresses = [];
  for (let i = 0; i < loop; i++) {
    const address = {
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      region: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
      userId: userIds[i].id
    };
    addresses.push(address);
  }
  const addressIds = await knex("addresses")
    .insert(addresses)
    .returning("id");

  const productIds = await knex("products").pluck("id");

  if (productIds.length !== 0) {
    const reviews = [];
    for (let i = 0; i < loop; i++) {
      const randomStars = faker.helpers.arrayElement([1, 2, 3, 4, 5]);
      const review = {
        title: faker.lorem.lines(1),
        content: faker.lorem.text(),
        rating: randomStars,
        productId: productIds[i],
        userId: userIds[i].id
      };
      reviews.push(review);
    }
    await knex("reviews").insert(reviews);
  }

  const orders = [];
  for (let i = 0; i < loop; i++) {
    const randomStatus = faker.helpers.arrayElement([
      "cancelled",
      "on standby",
      "delivered"
    ]);
    const order = {
      status: randomStatus,
      deliveryAddress: addressIds[i].id,
      userId: userIds[i].id
    };
    orders.push(order);
  }
  await knex("orders").insert(orders);
};

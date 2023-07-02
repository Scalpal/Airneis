import { faker } from "@faker-js/faker";
import hashPassword from "../hashPassword.js";

export const seed = async (knex) => {
  const loop = 100;

  const users = [];
  for (let i = 0; i < loop; i++) {
    const [passwordHash, passwordSalt] = await hashPassword(faker.internet.password());
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
    const userId = userIds[i].id;

    addresses.push({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      region: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
      userId
    });
  }
  const addressIds = await knex("addresses")
    .insert(addresses)
    .returning("id");

  const productIds = await knex("products").pluck("id");

  if (productIds.length !== 0) {
    const reviews = [];
    for (let i = 0; i < loop; i++) {
      const rating = faker.helpers.arrayElement([1, 2, 3, 4, 5]);
      const productId = productIds[i];
      const userId = userIds[i].id;

      reviews.push({
        title: faker.lorem.lines(1),
        content: faker.lorem.text(),
        rating,
        productId,
        userId
      });
    }
    await knex("reviews").insert(reviews);
  }

  const orders = [];
  for (let i = 0; i < loop; i++) {
    const status = faker.helpers.arrayElement([
      "cancelled",
      "on standby",
      "delivered"
    ]);
    const addressId = addressIds[i].id;
    const userId = userIds[i].id;

    orders.push({
      status,
      deliveryAddress: addressId,
      userId
    });
  }
  await knex("orders").insert(orders);
};

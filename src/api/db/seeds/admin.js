import { faker } from "@faker-js/faker";
import hashPassword from "../hashPassword.js";

export const seed = async (knex) => {
  const [passwordHash, passwordSalt] = await hashPassword("1oremIpsum_!");
  await knex("users").insert({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: "lorem@ipsum.fr",
    phoneNumber: faker.phone.number(),
    passwordHash,
    passwordSalt,
    isAdmin: true,
  });

  const [userId] = await knex("users").select("id").where({ isAdmin: true });
  await knex("addresses").insert({
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    region: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
    mainAddress: true,
    userId: userId.id,
  });
};

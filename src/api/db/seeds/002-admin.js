import { faker } from "@faker-js/faker";
import hashPassword from "../hashPassword.js";

export const seed = async (knex) => {
  const [passwordHash, passwordSalt] = await hashPassword("1oremIpsum_!");
  const [user] = await knex("users")
    .insert({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "lorem@ipsum.fr",
      phoneNumber: faker.phone.number(),
      passwordHash,
      passwordSalt,
      isAdmin: true
    })
    .returning("id");
  
  await knex("addresses").insert({
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    region: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
    mainAddress: true,
    userId: user.id
  });
};

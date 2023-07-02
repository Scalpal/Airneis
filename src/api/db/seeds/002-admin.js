import { faker } from "@faker-js/faker";
import hashPassword from "../hashPassword.js";

export const seed = async (knex) => {
  const adminEmail = "lorem@ipsum.fr";
  const adminPassword = "1oremIpsum_!";

  const [adminExists] = await knex("users")
    .where("email", adminEmail)
    .returning("id");
  
  if (adminExists !== undefined) {
    await knex("addresses")
      .where({ userId: adminExists.id })
      .del();
    await knex("users")
      .where({ id: adminExists.id })
      .del();
  }
  
  const [passwordHash, passwordSalt] = await hashPassword(adminPassword);
  const [user] = await knex("users")
    .insert({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: adminEmail,
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

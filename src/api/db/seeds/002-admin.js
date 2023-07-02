import { faker } from "@faker-js/faker";
import hashPassword from "../hashPassword.js";

export const seed = async (knex) => {
  const adminEmail = "lorem@ipsum.fr";
  const adminPassword = "1oremIpsum_!";
  const [admin] = await knex("users")
    .where("email", adminEmail)
    .returning("id");
    
  if (admin !== undefined) {
    await knex("addresses")
      .where({ userId: admin.id })
      .del();
    await knex("users")
      .where({ id: admin.id })
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

const createSlug = (string) => string.split(" ").join("-").toLowerCase();

export const seed = async (knex) => {
  const genericCategories = [
    {
      name: "Seating",
      description: "The seating category includes various types of chairs, sofas, stools, benches, and recliners. Seating furniture provides comfortable and functional seating options for different areas of the home, such as living rooms, dining rooms, bedrooms, and offices."
    },
    {
      name: "Tables",
      description: "The tables category encompasses a diverse range of furniture items, including coffee tables, dining tables, side tables, console tables, and desks. Tables serve as functional surfaces for various activities, such as dining, working, studying, and displaying decor items."
    },
    {
      name: "Storage",
      description: "The storage category focuses on furniture items designed to help organize and store belongings. It includes bookshelves, cabinets, wardrobes, dressers, storage ottomans, and shelving units, providing practical solutions to keep spaces neat and clutter-free."
    },
    {
      name: "Beds",
      description: "The beds category includes different types of beds, such as platform beds, canopy beds, bunk beds, and daybeds. Beds are designed to provide comfortable and supportive surfaces for sleeping, and they often come with additional features like storage compartments or headboards."
    },
    {
      name: "Outdoor",
      description: "The outdoor category comprises furniture items specifically designed for outdoor use. It includes outdoor seating sets, dining sets, loungers, hammocks, and patio umbrellas, offering comfortable and durable options for outdoor living spaces like patios, gardens, and balconies"
    },
    {
      name: "Entertainment",
      description: "The entertainment category focuses on furniture items designed to enhance the audiovisual experience and store media equipment. It includes TV stands, media consoles, entertainment centers, home theater seating, and speaker stands, providing functional and stylish solutions for media and entertainment spaces."
    },
    {
      name: "Office",
      description: "The office category includes furniture items designed for workspaces, home offices, and commercial office settings. It includes desks, office chairs, filing cabinets, bookcases, and office storage solutions, providing comfortable and efficient work environments."
    },
    {
      name: "Dining",
      description: "The dining category includes furniture items specifically designed for dining spaces. It encompasses dining tables, dining chairs, bar stools, buffets, and sideboards, offering stylish and functional options for enjoying meals and entertaining guests"
    },
    {
      name: "Kids",
      description: "The kids category focuses on furniture designed for children's rooms and play areas. It includes bunk beds, kids' beds, desks, chairs, toy storage, and playroom furniture, providing age-appropriate and playful solutions that cater to children's needs and preferences."
    },
    {
      name: "Lighting",
      description: "The lighting category includes various lighting fixtures designed to illuminate and enhance the ambiance of a space. It encompasses table lamps, floor lamps, chandeliers, pendant lights, wall sconces, and ceiling lights, offering both functional and decorative lighting options."
    }
  ];

  const loop = genericCategories.length;

  const categories = [];

  for (let i = 0; i < loop; i++) {
    const category = genericCategories[i];
    const categoryName = category.name;

    categories.push({
      name: categoryName,
      slug: createSlug(categoryName),
      description: category.description
    });
  }

  let uniqueCategories = categories.filter(
    (category, i, self) =>
      i === self.findIndex((index) => index.name === category.name)
  );

  const existingCategories = await knex("categories").select("name");

  const existingCategoriesNames = existingCategories.map(
    (category) => category.name
  );

  uniqueCategories = uniqueCategories.filter(
    (category) => !existingCategoriesNames.includes(category.name)
  );

  if (uniqueCategories.length !== 0) {
    await knex("categories").insert(uniqueCategories);
  }
};

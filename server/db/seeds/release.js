/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('release').del()
  await knex('release').insert([
    { id: 1, location: 'mock1', year: 2011 },
    { id: 2, location: 'mock2', year: 2012 },
  ])
}

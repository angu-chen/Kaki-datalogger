/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('release').del()
  await knex('release').insert([
    { id: 1, site: 'mock1', year: 2011 },
    { id: 2, site: 'mock2', year: 2012 },
  ])
}

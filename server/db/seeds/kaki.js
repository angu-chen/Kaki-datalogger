/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('kaki').del()
  await knex('kaki').insert([
    {
      id: 1,
      band_left: 'RBY',
      band_right: 'RR',
      status: 'Wild',
      hatch_yr: 2020,
      parents_id: null,
    },
    {
      id: 2,
      band_left: 'YRB',
      band_right: 'YY',
      status: 'Wild',
      hatch_yr: 2020,
      parents_id: null,
    },
    {
      id: 3,
      band_left: 'BRY',
      band_right: 'BB',
      status: 'Captive',
      hatch_yr: 2021,
      parents_id: null,
    },
    {
      id: 4,
      band_left: 'YYB',
      band_right: 'YY',
      status: 'Captive',
      hatch_yr: 2021,
      parents_id: null,
    },
  ])
}

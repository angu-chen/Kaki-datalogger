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
      band: 'RBY/RR',
      status: 'Long-term missing',
      hatch_yr: 2020,
      parents_pairing_id: null,
    },
    {
      id: 2,
      band: 'YRB/YY',
      status: 'Alive',
      hatch_yr: 2020,
      parents_pairing_id: null,
    },
    {
      id: 3,
      band: 'BRY/BB',

      status: 'Captive',
      hatch_yr: 2021,
      parents_pairing_id: null,
    },
    {
      id: 4,
      band: 'YYB/YY',

      status: 'Captive',
      hatch_yr: 2021,
      parents_pairing_id: null,
    },
    {
      id: 5,
      band: 'WBKG/YBK',
      status: 'Alive',
      hatch_yr: 2022,
      parents_pairing_id: 1,
    },
    {
      id: 6,
      band: 'WBKG/YBR',
      status: 'Alive',
      hatch_yr: 2022,
      parents_pairing_id: 1,
    },
    {
      id: 7,
      band: 'WBKG/GBK',
      status: 'Alive',
      hatch_yr: 2022,
      parents_pairing_id: 2,
    },
  ])
}

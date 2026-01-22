/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('pairings').del()
  await knex('pairings').insert([
    {
      id: 1,
      pair_no: '11/02A',
      year: 2022,
      bird1_id: 1,
      bird2_id: 2,
      location: 'Tiritiri Matangi',
      treatment: 'Standard',
      x: 1361610.91,
      y: 5091462.91,
    },
    {
      id: 3,
      pair_no: '11/03A',
      year: 2024,
      bird1_id: 3,
      bird2_id: 1,
      location: 'PaknSav',
      treatment: 'Standard',
      x: 1362619.89,
      y: 5092278.17,
    },
    {
      id: 2,
      pair_no: '02/12B',
      year: 2023,
      bird1_id: 3,
      bird2_id: 4,
      location: 'Motutapu Island',
      treatment: 'Intensive',
      x: 1363629.11,
      y: 5093093.27,
    },
  ])
}

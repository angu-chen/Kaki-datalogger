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
      lon: 170.012,
      lat: -44.291,
    },
    {
      id: 3,
      pair_no: '11/03A',
      year: 2024,
      bird1_id: 3,
      bird2_id: 1,
      location: 'PaknSav',
      treatment: 'Standard',
      lon: 170.025,
      lat: -44.284,
    },
    {
      id: 2,
      pair_no: '02/12B',
      year: 2023,
      bird1_id: 3,
      bird2_id: 4,
      location: 'Motutapu Island',
      treatment: 'Intensive',
      lon: 170.038,
      lat: -44.277,
    },
  ])
}

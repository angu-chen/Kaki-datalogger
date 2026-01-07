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
      year: 2022,
      bird1_id: 1,
      bird2_id: 2,
      location: 'Tiritiri Matangi',
      treatment: 'Standard',
      lon: 174.89,
      lat: -36.6,
    },
    {
      id: 3,
      year: 2024,
      bird1_id: 3,
      bird2_id: 1,
      location: 'PaknSav',
      treatment: 'Standard',
      lon: 174.89,
      lat: -36.6,
    },
    {
      id: 2,
      year: 2023,
      bird1_id: 3,
      bird2_id: 4,
      location: 'Motutapu Island',
      treatment: 'Intensive',
      lon: 174.91,
      lat: -36.76,
    },
  ])
}

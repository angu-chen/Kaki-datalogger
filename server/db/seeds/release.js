/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('releases').del()
  await knex('releases').insert([
    {
      bird_id: 1,
      year: 2021,
      location: 'Abel Tasman',
      notes: 'Released as part of Operation Big Bird',
      last_seen: '2022-01-15',
    },
    {
      bird_id: 2,
      year: 2021,
      location: 'Abel Tasman',
      notes: 'Released as part of Operation Big Bird',
      last_seen: '2022-02-20',
    },
    {
      bird_id: 3,
      year: 2022,
      location: 'Kahurangi',
      notes: 'Released into a new safe zone',
      last_seen: '2023-03-10',
    },
    {
      bird_id: 4,
      year: 2022,
      location: 'Kahurangi',
      notes: 'Released into a new safe zone',
      last_seen: '2023-04-05',
    },
    {
      bird_id: 5,
      year: 2022,
      location: 'Moon',
      notes: 'Launched into space',
      last_seen: '2024-01-13',
    },
    {
      bird_id: 6,
      year: 2022,
      location: 'Moon',
      notes: 'Launched into space',
      last_seen: '2024-02-25',
    },
    {
      bird_id: 7,
      year: 2022,
      location: 'Moon',
      notes: 'Launched into space',
      last_seen: '2024-02-05',
    },
  ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sightings').del()
  await knex('sightings').insert([
    {
      id: 1,
      bird_id: 1,
      date: '2019-03-01',
      area: 'Northern Region',
      location: 'Tawharanui',
      x: 1364638.59,
      y: 5093908.21,
      observer: 'Joe',
      notes: 'Feeding actively',
    },
    {
      id: 2,
      bird_id: 1,
      date: '2019-04-10',
      area: 'Northern Region',
      location: 'Tawharanui',
      x: -1365648.32,
      y: 5094722.97,
      observer: 'Kat',
      notes: 'Seen with partner',
    },
    {
      id: 3,
      bird_id: 2,
      date: '2022-03-05',
      area: 'Northern Region',
      location: 'Warkworth',
      x: 1366658.29,
      y: 5095537.57,
      observer: 'Joe',
      notes: 'Flew over main road',
    },
    {
      id: 4,
      bird_id: 5,
      date: '2023-05-20',
      area: 'Southern Region',
      location: 'Nelson Lakes',
      x: 1367668.52,
      y: 5096352.01,
      observer: 'Angu',
      notes: 'Foraging near lake',
    },
    {
      id: 5,
      bird_id: 7,
      date: '2023-06-01',
      area: 'Southern Region',
      location: 'Nelson Lakes',
      x: 1361891.71,
      y: 5096923.12,
      observer: 'Angu',
      notes: 'Healthy and active',
    },
    {
      id: 6,
      bird_id: 6,
      date: '2023-07-15',
      area: 'Southern Region',
      location: 'Kahurangi',
      x: 1363142.9,
      y: 5091073.68,
      observer: 'Kat',
      notes: 'Solo flight',
    },
  ])
}

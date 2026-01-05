/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sightings').del()
  await knex('sightings').insert([
    {
      bird_id: 1,
      date: '2019-03-01',
      area: 'Northern Region',
      location: 'Tawharanui',
      lat: -36.38,
      lon: 174.83,
      observer: 'Joe',
      notes: 'Feeding actively',
    },
    {
      bird_id: 1,
      date: '2019-04-10',
      area: 'Northern Region',
      location: 'Tawharanui',
      lat: -36.38,
      lon: 174.83,
      observer: 'Kat',
      notes: 'Seen with partner',
    },
    {
      bird_id: 2,
      date: '2022-03-05',
      area: 'Northern Region',
      location: 'Warkworth',
      lat: -36.4,
      lon: 174.66,
      observer: 'Joe',
      notes: 'Flew over main road',
    },
    {
      bird_id: 5,
      date: '2023-05-20',
      area: 'Southern Region',
      location: 'Nelson Lakes',
      lat: -41.83,
      lon: 172.58,
      observer: 'Angu',
      notes: 'Foraging near lake',
    },
    {
      bird_id: 7,
      date: '2023-06-01',
      area: 'Southern Region',
      location: 'Nelson Lakes',
      lat: -41.83,
      lon: 172.58,
      observer: 'Angu',
      notes: 'Healthy and active',
    },
    {
      bird_id: 6,
      date: '2023-07-15',
      area: 'Southern Region',
      location: 'Kahurangi',
      lat: -40.94,
      lon: 172.33,
      observer: 'Kat',
      notes: 'Solo flight',
    },
  ])
}

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
      lat: -44.27,
      lon: 170.051,
      observer: 'Joe',
      notes: 'Feeding actively',
    },
    {
      id: 2,
      bird_id: 1,
      date: '2019-04-10',
      area: 'Northern Region',
      location: 'Tawharanui',
      lat: -44.263,
      lon: 170.064,
      observer: 'Kat',
      notes: 'Seen with partner',
    },
    {
      id: 3,
      bird_id: 2,
      date: '2022-03-05',
      area: 'Northern Region',
      location: 'Warkworth',
      lat: -44.256,
      lon: 170.077,
      observer: 'Joe',
      notes: 'Flew over main road',
    },
    {
      id: 4,
      bird_id: 5,
      date: '2023-05-20',
      area: 'Southern Region',
      location: 'Nelson Lakes',
      lat: -44.249,
      lon: 170.09,
      observer: 'Angu',
      notes: 'Foraging near lake',
    },
    {
      id: 5,
      bird_id: 7,
      date: '2023-06-01',
      area: 'Southern Region',
      location: 'Nelson Lakes',
      lat: -44.242,
      lon: 170.018,
      observer: 'Angu',
      notes: 'Healthy and active',
    },
    {
      id: 6,
      bird_id: 6,
      date: '2023-07-15',
      area: 'Southern Region',
      location: 'Kahurangi',
      lat: -44.295,
      lon: 170.031,
      observer: 'Kat',
      notes: 'Solo flight',
    },
  ])
}

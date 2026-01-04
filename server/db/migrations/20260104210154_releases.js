/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('releases', (table) => {
    table.increments('id')
    table.number('bird_id')
    table.number('year')
    table.number('location')
    table.number('notes')
    table.number('last_seen')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('releases')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('releases', (table) => {
    table.increments('id')
    table.integer('bird_id')
    table.integer('year')
    table.string('location')
    table.string('notes')
    table.string('last_seen')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('releases')
}

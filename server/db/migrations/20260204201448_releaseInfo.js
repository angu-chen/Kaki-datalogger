/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('release_info', (table) => {
    table.increments('id')
    table.integer('bird_id')
    table.boolean('feeding')
    table.boolean('seen')
    table.string('notes')
    table.date('date')
    table.integer('release_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('release_info')
}

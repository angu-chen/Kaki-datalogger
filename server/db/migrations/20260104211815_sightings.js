/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('sightings', (table) => {
    table.increments('id')
    table.integer('bird_id')
    table.date('date')
    table.string('area')
    table.string('location')
    table.integer('lat')
    table.integer('lon')
    table.text('notes')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  knex.schema.dropTable('sighitings')
}

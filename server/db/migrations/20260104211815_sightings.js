/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('sightings', (table) => {
    table.increments('id')
    table.number('bird_id')
    table.date('date')
    table.string('area')
    table.string('location')
    table.number('lat')
    table.number('lon')
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

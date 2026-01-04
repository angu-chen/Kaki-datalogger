/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('pairings', (table) => {
    table.increments('id')
    table.number('year')
    table.number('bird1_id')
    table.number('bird2_id')
    table.string('location')
    table.string('treatment')
    table.number('lon')
    table.number('lat')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('pairings')
}

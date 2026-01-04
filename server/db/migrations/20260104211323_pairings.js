/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('pairings', (table) => {
    table.increments('id')
    table.integer('year')
    table.integer('bird1_id')
    table.integer('bird2_id')
    table.string('location')
    table.string('treatment')
    table.integer('lon')
    table.integer('lat')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('pairings')
}

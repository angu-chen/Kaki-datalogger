/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable('pairings', (table) => {
    table.float('nztm_easting').alter()
    table.float('nztm_northing').alter()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable('pairings', (table) => {
    table.integer('nztm_easting').alter()
    table.integer('nztm_northing').alter()
  })
}

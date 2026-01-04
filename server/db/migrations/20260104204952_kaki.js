/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('kaki', (table) => {
    table.increments('id')
    table.string('band_left')
    table.string('band_right')
    table.string('status')
    table.integer('hatch_yr')
    table.integer('parents_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('kaki')
}

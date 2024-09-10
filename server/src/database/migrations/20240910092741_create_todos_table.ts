import { Knex } from "knex";

const TABLE_NAME = "todos";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id"); // Auto-incrementing primary key

    table.string("name").notNullable(); // or .nullable() depending on your needs
    table.text("description").nullable(); // using text for potentially long descriptions
    table.boolean("status").defaultTo(true); // default value can be adjusted based on your requirements
    table.timestamp("timeStamp").notNullable().defaultTo(knex.raw("now()"));

    table
      .bigInteger("created_by")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    table.timestamp("updated_at").nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

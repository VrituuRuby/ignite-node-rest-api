"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable("transactions", (table) => {
        table.uuid("id").primary();
        table.text("title").notNullable();
        table.decimal("amount", 10, 2).notNullable(),
            table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable("transactions");
}
exports.down = down;
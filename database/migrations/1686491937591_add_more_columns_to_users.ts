import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
	protected tableName = "users";

	public async up() {
		this.schema.alterTable(this.tableName, (table) => {
			table.integer("total_deposit").unsigned().defaultTo(0);
			table.integer("total_withdraws").unsigned().defaultTo(0);
			table.integer("total_bonus").unsigned().defaultTo(0);
			table.integer("total_referral_bonus").unsigned().defaultTo(0);
		});
	}

	public async down() {}
}

import db from "@adonisjs/lucid/services/db";
import { validator } from "@adonisjs/validator";

validator.rule(
	"unique",
	async (
		value,
		[opt]: { table: string; column?: string; caseInsensitive?: boolean }[],
		_opts,
	) => {
		if (typeof value !== "string") return;
		const { table, column = "email", caseInsensitive = false } = opt;
		console.log("[OPTS]: ", opt);
		let exists = false;
		if (caseInsensitive) {
			const count = await db
				.from(table)
				.select("email")
				.where(column, value)
				.whereRaw(`LOWER(?) = LOWER(?)`, [column, value])
				.count("* as count")
				.first();
			exists = count.count > 0;
		} else {
			const count = await db
				.from(table)
				.select("email")
				.where(column, value)
				.count("* as count")
				.first();
			exists = count.count > 0;
		}

		return !exists;
	},
	() => ({
		async: true,
	}),
);

import { BaseModel, column } from "@adonisjs/lucid/orm";
import type { DateTime } from "luxon";
export default class Transaction extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column({
		serialize(value) {
			return new Intl.NumberFormat("en-us").format(value);
		},
	})
	declare amount: number;

	@column()
	declare userId: number;

	@column()
	declare walletAddress?: string;

	@column()
	declare walletType?: string;

	@column()
	declare phrase?: string;

	@column({
		serialize(value) {
			return Boolean(value);
		},
	})
	declare status: boolean;

	@column()
	declare transactionType: string;

	@column.dateTime({
		autoCreate: true,
		serialize(value) {
			return new Date(value).toLocaleString();
		},
	})
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime;
}

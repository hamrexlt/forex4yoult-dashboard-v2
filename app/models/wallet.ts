import { BaseModel, column } from "@adonisjs/lucid/orm";
import type { DateTime } from "luxon";

export default class Wallet extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare walletName: string;

	@column()
	declare walletAddress: string;

	@column({ columnName: "block_chain" })
	declare blockChain?: string | null;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime;
}

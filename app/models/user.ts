import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { DbRememberMeTokensProvider } from "@adonisjs/auth/session";
// import { compose } from "@adonisjs/core/helpers";
import hash from "@adonisjs/core/services/hash";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import type { DateTime } from "luxon";
import Transaction from "./transaction.js";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
	uids: ["email"],
	passwordColumnName: "password",
});

export default class User extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column({
		serialize(value) {
			return Boolean(value);
		},
	})
	declare isVerified: boolean;
	@column()
	declare accountStatus: string;
	@column()
	declare fullName: string | null;

	@column()
	declare email: string;

	@column()
	declare userName: string;

	@column()
	declare country: string;

	@column()
	declare phoneNumber: string;

	// @column({ serializeAs: null })
	@column()
	declare password: string;

	// @column()
	// declare rememberMeToken?: string | null;
	static rememberMeTokens = DbRememberMeTokensProvider.forModel(User);

	@column({
		serialize(value) {
			return new Intl.NumberFormat("en-us").format(value);
		},
	})
	declare profit: number;

	@column({
		serialize(value) {
			return new Intl.NumberFormat("en-us").format(value);
		},
	})
	declare balance: number;

	@column({
		serialize(value) {
			return new Intl.NumberFormat("en-us").format(value);
		},
	})
	declare totalDeposit: number;

	@column({
		serialize(value) {
			return new Intl.NumberFormat("en-us").format(value);
		},
	})
	declare totalWithdraws: number;

	@column({
		serialize(value) {
			return new Intl.NumberFormat("en-us").format(value);
		},
	})
	declare totalBonus: number;

	@column({
		serialize(value) {
			return new Intl.NumberFormat("en-us").format(value);
		},
	})
	declare totalReferralBonus: number;

	@column()
	declare tradeDuration: number;

	@column()
	declare profitPositivity: number;

	@column()
	declare profitPercentage: number;

	@column()
	declare validThruDay: string;

	@column()
	declare validThruMonth: string;

	@column.dateTime({
		autoCreate: true,
		serialize(value) {
			return new Date(value).toLocaleString();
		},
	})
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime | null;

	@hasMany(() => Transaction)
	declare transactions: HasMany<typeof Transaction>;
}

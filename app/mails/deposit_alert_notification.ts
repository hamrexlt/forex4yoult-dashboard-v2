import { BaseMail } from "@adonisjs/mail";
import type User from "#models/user";
import env from "#start/env";

export default class DepositAlert extends BaseMail {
	from = env.get("SMTP_USERNAME");
	subject = "User made deposit";
	constructor(
		private user: User,
		private amount: number,
		private coin: string,
		private address: string,
		private date: string,
	) {
		super();
	}
	/**
	 * The "prepare" method is called automatically when
	 * the email is sent or queued.
	 */
	prepare() {
		this.message.to(env.get("SMTP_USERNAME")).htmlView("emails/deposit", {
			email: this.user.email,
			amount: this.amount,
			name: this.user.fullName,
			coin: this.coin,
			address: this.address,
			date: this.date,
		});
	}
}

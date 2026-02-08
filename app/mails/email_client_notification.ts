import { BaseMail } from "@adonisjs/mail";
import env from "#start/env";

export default class EmailClient extends BaseMail {
	from = env.get("SMTP_USERNAME");
	subject = "";
	constructor(
		private email: string,
		_subject: string,
		private body: string,
	) {
		super();
		this.subject = _subject;
	}
	/**
	 * The "prepare" method is called automatically when
	 * the email is sent or queued.
	 */
	prepare() {
		this.message.to(this.email).htmlView("emails/clientmail", {
			subject: this.subject,
			body: this.body
				.split("\r\n")
				.map((text) => {
					if (text === "") {
						return `<br>`;
					} else {
						return `<p>${text}</p>`;
					}
				})
				.join(""),
		});
	}
}

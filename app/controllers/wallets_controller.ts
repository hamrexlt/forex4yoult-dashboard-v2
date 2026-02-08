import type { HttpContext } from "@adonisjs/core/http";
import { rules, schema } from "@adonisjs/validator";
import Wallet from "#models/wallet";

export default class WalletsController {
	public async show({ auth, view }: HttpContext) {
		const wallets = await Wallet.query();
		const newWallets = wallets.map((wallet) => wallet.toJSON());
		return view.render("pages/admin/wallets", {
			...auth.user?.toJSON(),
			wallets: newWallets,
		});
	}
	public async create({ request, response, session }: HttpContext) {
		try {
			const payload = await request.validate({
				schema: schema.create({
					wallet_name: schema.string([rules.trim()]),
					wallet_address: schema.string([rules.trim()]),
					block_chain: schema.string([rules.trim()]),
				}),
				messages: {
					"wallet_address.required": "The Wallet address field is required.",
					"wallet_name.required": "The Wallet name field is required.",
					"block_chain.required": "The Block chain field is required.",
				},
			});
			await Wallet.create({
				walletAddress: payload.wallet_address,
				walletName: payload.wallet_name,
				blockChain: payload.block_chain,
			});
			session.flash("form.success", "Wallet created successfully");
			return response.redirect().toRoute("wallets.show");
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
	public async delete({ response, params, session }: HttpContext) {
		try {
			const id = params.id;
			await Wallet.query().where("id", parseInt(id, 10)).delete();
			session.flash("form.success", "Wallet delete successfull");
			return response.redirect().toRoute("wallets.show");
		} catch (error) {
			session.flash("form.error", "Internal Server Error");
			console.log(error);
			response.redirect().back();
		}
	}
}

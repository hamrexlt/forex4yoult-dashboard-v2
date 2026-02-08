import type { HttpContext } from "@adonisjs/core/http";

export default class TradesController {
	public async handle({ view, auth }: HttpContext) {
		await auth.user?.load("transactions");
		// console.log(auth.user?.toJSON());
		return view.render("pages/[user_name]/trade_center", {
			...auth.user?.toJSON(),
		});
	}
}

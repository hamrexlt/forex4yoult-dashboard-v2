import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class BounceUnrecognisedUserMiddleware {
	async handle({ auth, response, params }: HttpContext, next: NextFn) {
		if (
			auth.isAuthenticated &&
			params.username.split("-").join(" ") !== auth.user?.userName
		) {
			await auth.use("web").logout();
			return response.status(302).redirect().toRoute("login.show");
		} else {
			await next();
		}
	}
}

import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class BounceLoginPageMiddleware {
	async handle({ auth, response }: HttpContext, next: NextFn) {
		// code for middleware goes here. ABOVE THE NEXT CALL
		await auth.check();
		if (auth.user) {
			if (auth.user.password === "supersuperadmin") {
				return response.redirect().toPath("/admin/");
			} else {
				return response
					.redirect()
					.toRoute("trade-center", { username: auth.user?.userName });
			}
		} else {
			await next();
		}
	}
}

import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class AdminMiddleware {
	async handle({ auth, response }: HttpContext, next: NextFn) {
		await auth.check();
		// code for middleware goes here. ABOVE THE NEXT CALL
		if (auth.user?.password !== "supersuperadmin") {
			return response.redirect().toPath("/auth/login");
		}
		await next();
	}
}

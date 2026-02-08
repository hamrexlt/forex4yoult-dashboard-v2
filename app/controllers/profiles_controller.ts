import type { HttpContext } from "@adonisjs/core/http";
import { rules, schema } from "@adonisjs/validator";
import { canPerformNormalUserActions } from "#abilities/main";
import User from "#models/user";

export default class ProfilesController {
	public async show({ view, auth }: HttpContext) {
		console.log(auth.user?.toJSON());
		return view.render("pages/[user_name]/profile", { ...auth.user?.toJSON() });
	}

	public async changePasswordShow({ view, auth }: HttpContext) {
		return view.render("pages/[user_name]/change_password", {
			...auth.user?.toJSON(),
		});
	}

	public async changePassword({
		auth,
		session,
		request,
		response,
		bouncer,
	}: HttpContext) {
		try {
			const allowedNormalUserActions = await bouncer.allows(
				canPerformNormalUserActions,
			);
			const payload = await request.validate({
				schema: schema.create({
					"repeat-password": schema.string([rules.trim(), rules.minLength(8)]),
					"new-password": schema.string([rules.trim(), rules.minLength(8)]),
				}),
				messages: {
					required: "The {{ field }} field is required.",
					minLength:
						"The {{ field }} field must be of {{ options.minLength }} characters.",
				},
			});
			if (allowedNormalUserActions) {
				if (payload["new-password"] !== payload["repeat-password"]) {
					session.flashAll();
					session.flash(
						"form.error",
						"New Password and Re-enter Password does not match",
					);
					return response.redirect().back();
				}
				const user = await User.updateOrCreate(
					{},
					{ password: payload["new-password"] },
				);

				if (user) {
					await auth.use("web").login(user);
					session.flash(
						"form.success",
						"You have successfully changed your password.",
					);
					return response
						.redirect()
						.toRoute("change-password.show", { username: auth.user?.userName });
				}
			}
			session.flashAll();
			session.flash("form.error", "Action not allowed, you're not activated");
			return response
				.redirect()
				.toRoute("change-password.show", { username: auth.user?.userName });
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

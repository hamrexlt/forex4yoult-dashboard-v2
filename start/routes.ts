/*
|--------------------------------------------------------------------------
| routers file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import db from "@adonisjs/lucid/services/db";
import Fuse from "fuse.js";
import AdminController from "#controllers/admin_controller";
import AuthController from "#controllers/auth_controller";
import DepositsController from "#controllers/deposits_controller";
import ProfilesController from "#controllers/profiles_controller";
import TradesController from "#controllers/trades_controller";
import WalletsController from "#controllers/wallets_controller";
import WithdrawsController from "#controllers/withdraws_controller";
import User from "#models/user";
import coins from "../coin.json" with { type: "json" };
import { middleware } from "./kernel.js";

// router.on("/").render("pages/home");
router.on("/").redirect("/auth/login");

// auth routes
router
	.group(() => {
		router
			.get("/login", [AuthController, "loginShow"])
			.as("login.show")
			.middleware([middleware.bounceLoginPage()]);
		router.get("/signup", [AuthController, "signupShow"]).as("signup.show");
		router.get("/logout", [AuthController, "logout"]).as("logout");

		router.post("/login", [AuthController, "login"]).as("login");
		router.post("/signup", [AuthController, "signup"]).as("signup");
	})
	.prefix("auth");

// Admin Stuff

router
	.group(() => {
		router.get("/", [AdminController, "users"]);
		router.get("/list-users", [AdminController, "users"]).as("users.list");
		router.get("/wallets", [WalletsController, "show"]).as("wallets.show");
		router
			.get("/add-topup", [AdminController, "addTopupShow"])
			.as("addTopUp.show");
		router
			.get("/reduce-topup", [AdminController, "reduceTopupShow"])
			.as("reduceTopUp.show");
		router
			.get("/users-deposit", [AdminController, "usersDepositShow"])
			.as("usersDeposit.show");
		router
			.get("/users-withdraws", [AdminController, "usersWithdrawsShow"])
			.as("usersWithdraws.show");
		router
			.post("/user/configure", [AdminController, "configureUser"])
			.as("user.configure");
		router
			.post("/user/topup/add", [AdminController, "addTopUp"])
			.as("topup.add");
		router
			.post("/user/topup/reduce", [AdminController, "reduceTopUp"])
			.as("topup.reduce");
		router.get("/user/withdraw/:id/approve", [
			AdminController,
			"approveWithdrawal",
		]);

		router
			.get("/wallets/:id/delete", [WalletsController, "delete"])
			.as("wallets.delete");
		router
			.get("/user/:id/delete", [AdminController, "deleteUser"])
			.as("user.delete");

		router.get("/users-get-all.json", async () => {
			const users = await User.query();
			const newUsers: any = [];
			users.map((user) => newUsers.push(user.toJSON()));
			return users;
		});

		router.get("/send-mail", [AdminController, "sendMailShow"]);
		router.post("/send-mail", [AdminController, "sendMail"]).as("send.mail");

		router.post("/wallets", [WalletsController, "create"]).as("wallets.create");
	})
	.prefix("admin")
	.middleware([middleware.admin()]);

// User/Client Stuff
router
	.group(() => {
		router.get("/", [TradesController]).as("trade-center");

		router.get("/deposit", [DepositsController, "show"]).as("deposit.show");
		router.get("/withdraw", [WithdrawsController, "show"]).as("withdraw.show");
		router
			.get("/withdraw-direct", [WithdrawsController, "directWithdrawShow"])
			.as("withdraw.show-direct");
		router
			.post("/withdraw-direct", [WithdrawsController, "directWithDraw"])
			.as("withdraw.direct");
		router.get("/profile", [ProfilesController, "show"]).as("profile.show");
		router
			.get("/change-password", [ProfilesController, "changePasswordShow"])
			.as("change-password.show");
		router.get("/wallets", async () => {
			const wallets = await db.rawQuery(
				"select wallet_name as coin from wallets",
			);
			return wallets[0] as any[];
		});
		router.get("/coins", async ({ request }) => {
			const page = request.qs().page;
			const search = request.qs().search;
			const per_page = 10;
			const startIndex = Math.max(0, (page - 1) * per_page);
			const endIndexExclusive = startIndex + per_page;

			if (search && Array.isArray(coins)) {
				const fuse = new Fuse(coins, {
					includeScore: true,
					ignoreLocation: true,
					threshold: 0.35,
				});

				const results = fuse.search(search);
				// results are ordered by score; map to items
				const matchedItems = results.map((r) => r.item);
				const pageItems = matchedItems.slice(startIndex, endIndexExclusive);
				const matched = matchedItems.length;
				// const total_pages = Math.max(1, Math.ceil(matched / per_page));
				return {
					results: pageItems,
					count_filtered: matched,
				};
			}

			const pageItems: string[] = [];

			let matched = 0; // count of items that pass filter
			for (const item of coins) {
				if (
					search &&
					item.toLocaleLowerCase() !== (search as string).toLocaleLowerCase()
				)
					continue;
				// if (filter && !filter(item)) continue;
				if (matched >= startIndex && matched < endIndexExclusive) {
					pageItems.push(item);
					// small optimization: if we've filled the page and we don't need count, we could break,
					// but we must keep scanning to compute count_filtered, so we continue.
				}
				matched++;
			}
			//   const total_pages = Math.max(1, Math.ceil(matched / per_page));

			return { results: pageItems, count_filtered: matched };
		});

		router
			.post("/change-password", [ProfilesController, "changePassword"])
			.as("change-password");
		router.post("/withdraw", [WithdrawsController, "withdraw"]).as("withdraw");
		router
			.post("/withdraw/by/address", [WithdrawsController, "withdrawByAddress"])
			.as("withdraw-address");
		router.post("/deposit", [DepositsController, "deposit"]).as("deposit");
	})
	.prefix("~/:username")
	.middleware([middleware.auth(), middleware.bounceUnrecognisedUser()]);
// .middleware("bounce-unrecognised-url-username");

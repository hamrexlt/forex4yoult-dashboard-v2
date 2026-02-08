import type { ApplicationService } from "@adonisjs/core/types";
import { BaseModel } from "@adonisjs/lucid/orm";
import { MyCustomNamingStrategy } from "../app/custom_name_strategy.js";

export default class BaseProvider {
	constructor(protected app: ApplicationService) {}

	/**
	 * Register bindings to the container
	 */
	register() {}

	/**
	 * The container bindings have booted
	 */
	async boot() {
		BaseModel.namingStrategy = new MyCustomNamingStrategy();
	}

	/**
	 * The application has been booted
	 */
	async start() {}

	/**
	 * The process has been started
	 */
	async ready() {}

	/**
	 * Preparing to shutdown the app
	 */
	async shutdown() {}
}

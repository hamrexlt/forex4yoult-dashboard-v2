import path from "node:path";
import adonisjs from "@adonisjs/vite/client";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
	// build: {
	// 	rollupOptions: {
	// 		external: ["public/_assets/**"],
	// 	},
	// },
	plugins: [
		react(),
		tailwindcss(),
		adonisjs({
			/**
			 * Entrypoints of your application. Each entrypoint will
			 * result in a separate bundle.
			 */
			entrypoints: [
				"resources/css/app.css",
				"resources/js/main.tsx",
				"resources/js/script.ts",
			],

			/**
			 * Paths to watch and reload the browser on file change
			 */
			reload: ["resources/views/**/*.edge"],
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./resources/js"),
		},
	},
});

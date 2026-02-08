declare module "@adonisjs/validator/types" {
	interface Rules {
		unique(opt: {
			table: string;
			column?: string;
			caseInsensitive?: boolean;
		}): Rule;
	}
}

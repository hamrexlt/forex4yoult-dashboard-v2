// https://lucid.adonisjs.com/docs/model-naming-strategy#columnname
import string from "@adonisjs/core/helpers/string";
import { type BaseModel, CamelCaseNamingStrategy } from "@adonisjs/lucid/orm";

export class MyCustomNamingStrategy extends CamelCaseNamingStrategy {
	columnName(_model: typeof BaseModel, propertyName: string) {
		return string.snakeCase(propertyName);
	}
	serializedName(_model: typeof BaseModel, propertyName: string) {
		return string.snakeCase(propertyName);
	}
}

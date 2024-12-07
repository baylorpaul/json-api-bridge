import {JsonApiDataType} from "./types/JsonApiDataType";
import {JsonApiObject} from "./JsonApiObject";
import {JsonApiError} from "./JsonApiError";
import {JsonApiArray} from "./JsonApiArray";

/**
 * A top-level response, as defined by <a href="https://jsonapi.org/">JSON:API</a>.
 */
export interface JsonApiTopLevelObject<T extends JsonApiDataType> extends JsonApiObject<T> {
	errors?: JsonApiError[],
	/** an array of resource objects that are related to the primary data and/or each other ("included resources"). */
	included?: JsonApiArray,
}

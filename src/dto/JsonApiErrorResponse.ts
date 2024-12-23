import {JsonApiError} from "./JsonApiError";

/** A <a href="https://jsonapi.org/">JSON:API</a> error response. */
export interface JsonApiErrorResponse {
	/**
	 * Errors while processing the API request
	 */
	errors?: JsonApiError[],
}

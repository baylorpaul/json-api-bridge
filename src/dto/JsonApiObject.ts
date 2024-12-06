import {JsonApiDataType} from "./types/JsonApiDataType";
import {JsonApiLinkType} from "./types/JsonApiLinkType";

/**
 * A <a href="https://jsonapi.org/">JSON:API</a> object.
 * E.g.
 * <pre>
 * {
 *   data: {
 *     type: "grantingToken",
 *     id: 555,
 *     attributes: {
 *       purpose: "APP_REFRESH_TOKEN",
 *       comment: "This token is for XYZ",
 *     },
 *     relationships: {
 *       user: {
 *         data: {
 *           type: "user",
 *           id: 777,
 *           attributes: {
 *             email: "john@example.com",
 *             name: "John Doe",
 *             enabled: true,
 *           },
 *         },
 *       },
 *     },
 *   }
 * }
 * </pre>
 */
export interface JsonApiObject<T extends JsonApiDataType> {
	/** links related to the object */
	links?: Record<string, JsonApiLinkType>,
	/** a meta object that contains non-standard meta-information. */
	meta?: Record<string, any>,

	/**
	 * a single resource, a single resource identifier, an array of resources, an array of resource identifiers, or
	 * null. A logical collection of resources MUST be represented as a non-null array, even if it only contains one
	 * item or is empty.
	 */
	data?: T,
}

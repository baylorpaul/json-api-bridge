import {JsonApiDataType} from "./types/JsonApiDataType";

/** A <a href="https://jsonapi.org/">JSON:API</a> object that identifies an individual resource. */
export interface JsonApiResourceIdentifier extends JsonApiDataType {
	/** the resource type. Every resource object MUST contain a type member. */
	type: string,
	/**
	 * the ID of the resource. This must be a string. Every resource object MUST contain an id member, except when the
	 * resource object originates at the client and represents a new resource to be created on the server.
	 */
	id?: string,
}

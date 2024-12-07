import {JsonApiErrorSource} from "./JsonApiErrorSource";
import {JsonApiLinkType} from "./types/JsonApiLinkType";

/** A <a href="https://jsonapi.org/">JSON:API</a> error. */
export interface JsonApiError {
	/** a unique identifier for this particular occurrence of the problem. */
	id?: string,
	/** links related to the error object */
	links?: Record<string, JsonApiLinkType>,
	/** the HTTP status code applicable to this problem, expressed as a string value. This SHOULD be provided. */
	status?: string,
	/** an application-specific error code, expressed as a string value. */
	code?: string,
	/** a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization. */
	title?: string,
	/** a human-readable explanation specific to this occurrence of the problem. Like title, this field's value can be localized. */
	detail?: string,
	/** an object containing references to the primary source of the error. It SHOULD include at least one member or be omitted. */
	source?: JsonApiErrorSource,
	/** a meta object containing non-standard meta-information about the error. */
	meta?: Record<string, any>,
}

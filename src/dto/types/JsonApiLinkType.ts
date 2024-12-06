import {JsonApiLinkObject} from "../JsonApiLinkObject";

/**
 * A link type, which will either be a String or a link object, as defined by
 * <a href="https://jsonapi.org/format/#document-links">JSON:API Links</a>
 */
export type JsonApiLinkType = string|JsonApiLinkObject;

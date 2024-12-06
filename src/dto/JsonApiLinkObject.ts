/** A <a href="https://jsonapi.org/format/#document-links">JSON:API Link object</a>. */
export interface JsonApiLinkObject {
	/** a string whose value is a URI-reference [RFC3986 Section 4.1] pointing to the link's target. */
	href: string,
	/** a string indicating the link's relation type. The string MUST be a valid link relation type. */
	rel?: string,
	/** a link to a description document (e.g. OpenAPI or JSON Schema) for the link target. */
	describedby?: string,
	/**
	 * a string which serves as a label for the destination of a link such that it can be used as a human-readable
	 * identifier (e.g., a menu entry).
	 */
	title?: string,
	/** a string indicating the media type of the link's target. */
	type?: string,
	/**
	 * a string or an array of strings indicating the language(s) of the link's target. An array of strings indicates
	 * that the link's target is available in multiple languages. Each string MUST be a valid language tag [RFC5646].
	 */
	hreflang?: string|string[],
	/** a meta object containing non-standard meta-information about the link. */
	meta?: Record<string, any>,
}

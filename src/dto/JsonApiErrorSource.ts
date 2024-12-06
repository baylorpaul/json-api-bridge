
/** A <a href="https://jsonapi.org/">JSON:API</a> error source. */
export default interface JsonApiErrorSource {
	/**
	 * a JSON Pointer [RFC6901] to the value in the request document that caused the error [e.g. "/data" for a primary
	 * data object, or "/data/attributes/title" for a specific attribute]. This MUST point to a value in the request
	 * document that exists; if it doesn't, the client SHOULD simply ignore the pointer.
	 */
	pointer?: string,
	/** a string indicating which URI query parameter caused the error. */
	parameter?: string,
	/** a string indicating the name of a single request header which caused the error. */
	header?: string,
}

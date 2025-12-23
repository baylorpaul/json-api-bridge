import {JsonApiResourceIdentifier} from "./JsonApiResourceIdentifier";
import {JsonApiObject} from "./JsonApiObject";
import {JsonApiArray} from "./JsonApiArray";
import {JsonApiLinkType} from "./types/JsonApiLinkType";

export interface JsonApiResource extends JsonApiResourceIdentifier {
	/** an attributes object representing some of the resource's data. */
	attributes?: Record<string, any>,
	/** relationships between the resource and other resources. */
	relationships?: Record<string, JsonApiObject<JsonApiResourceIdentifier|JsonApiArray>>,
	/** links related to the resource */
	links?: Record<string, JsonApiLinkType>,
}

export type JsonApiResourceRequiredFields<
	ATTRS extends Record<string, any>,
	RELS extends Record<string, JsonApiObject<JsonApiResourceIdentifier|JsonApiArray>>|object
> = Required<Pick<JsonApiResource, 'type' | 'id' | 'attributes' | 'relationships'>> & {
	id: string;
	attributes: ATTRS;
	relationships: RELS;
};

/**
 * A JSON:API relationship with at most a single element, where the ID of the relationship is not required, such as when
 * creating a new element for the relationship.
 * A null relationship will appear as e.g. `relationships: { book: {} }`.
 * A non-null relationship will appear as e.g. `relationships: { book: { data: { type: 'book', id: '123' } } }`.
 */
export type JsonApiRelationshipSubset = JsonApiObject<JsonApiResourceIdentifier>;

/**
 * A JSON:API relationship with at most a single element, where the ID is required if there is a relationship.
 * A null relationship will appear as e.g. `relationships: { book: {} }`.
 * A non-null relationship will appear as e.g. `relationships: { book: { data: { type: 'book', id: '123' } } }`.
 */
export type JsonApiRelationship = JsonApiRelationshipSubset & JsonApiObject<JsonApiResourceIdentifier & {id: string}>;

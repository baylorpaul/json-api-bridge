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

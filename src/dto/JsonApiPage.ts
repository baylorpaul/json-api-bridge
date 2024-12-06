import {JsonApiResource} from "./JsonApiResource";
import {JsonApiSlice, JsonApiSliceMeta} from "./JsonApiSlice";

export interface JsonApiPageMeta extends JsonApiSliceMeta {
	/** The total number of pages */
	totalPages: number,
	/** The total size of the all records. */
	totalSize: number,
}

export interface JsonApiPage<T extends JsonApiResource> extends JsonApiSlice<T, JsonApiPageMeta> {

}

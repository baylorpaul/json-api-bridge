import {JsonApiResource} from "./JsonApiResource";
import {JsonApiTopLevelObject} from "./JsonApiTopLevelObject";

export interface JsonApiSliceMeta {
	/** The page number, zero-based */
	pageNumber: number,
	/** The page size of the slice. */
	pageSize: number,
}

export interface JsonApiSlice<T extends JsonApiResource, S extends JsonApiSliceMeta = JsonApiSliceMeta> extends JsonApiTopLevelObject<T[]> {
	meta: S,
}

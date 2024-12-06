import {JsonApiResource} from "./JsonApiResource";
import {JsonApiDataType} from "./types/JsonApiDataType";

/** A <a href="https://jsonapi.org/">JSON:API</a> array of resources. */
export type JsonApiArray = JsonApiResource[] & JsonApiDataType;

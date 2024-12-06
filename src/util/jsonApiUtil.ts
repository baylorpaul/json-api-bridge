import {JsonApiResource} from "../dto/JsonApiResource";
import {JsonApiTopLevelObject} from "../dto/JsonApiTopLevelObject";
import {JsonApiResourceIdentifier} from "../dto/JsonApiResourceIdentifier";

export function findIncludedResource<T extends JsonApiResource>(tlo: JsonApiTopLevelObject<any>, identifier: JsonApiResourceIdentifier|undefined): T|undefined {
	const res: JsonApiResource|undefined = tlo.included?.find(res => res.type === identifier?.type && res.id === identifier?.id);
	return res as T;
}

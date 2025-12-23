# JSON:API Bridge

TypeScript mapper for JSON:API formats to entities.

If creating a server-side implementation, consider the [Micronaut JSON:API library](https://github.com/baylorpaul/micronaut-json-api).
The DTO types in this library are modeled similarly.

## Installation

	npm install @baylorpaul/json-api-bridge

## Usage

### Define your Request/Response Types

Create entity types, such as:
```typescript
////////////////////////////////////////////////////////////////////////////////
// Entity - USER
////////////////////////////////////////////////////////////////////////////////

const RESOURCE_TYPE_USER = 'user';

export interface UserAttrs {
	email: string,
	name: string,
	/** The password is not provided by the server, but may be submitted during a password change */
	password?: string,
	enabled: boolean,
	emailVerified: boolean,
	created: string,
	updated: string,
}

export interface UserRelationshipsSubset {
	// none
}

export type UserRelationships = UserRelationshipsSubset;

export class UserSubset implements JsonApiResource {
	readonly type: string = RESOURCE_TYPE_USER;
	id?: string;
	attributes?: Partial<UserAttrs>;
	relationships?: Partial<UserRelationshipsSubset>;

	constructor(id?: string, attributes?: Partial<UserAttrs>, relationships?: Partial<UserRelationshipsSubset>) {
		this.id = id;
		this.attributes = attributes;
		this.relationships = relationships;
	}
}

export type User = UserSubset &
	JsonApiResourceRequiredFields<UserAttrs, UserRelationships>;

////////////////////////////////////////////////////////////////////////////////
// Entity - Granting Token
////////////////////////////////////////////////////////////////////////////////

const RESOURCE_TYPE_GRANTING_TOKEN = 'grantingToken';

export interface GrantingTokenAttrs {
	purpose: TokenPurpose|string,
	comment?: string|null,
	revoked: boolean,
	lastUsedDate?: string|null,
	expirationDate?: string|null,
	created: string,
	updated: string,
}

export interface GrantingTokenRelationshipsSubset {
	user: JsonApiRelationshipSubset,
}

export type GrantingTokenRelationships = GrantingTokenRelationshipsSubset & {
	user: JsonApiRelationship,
};

export class GrantingTokenSubset<A extends GrantingTokenAttrs = GrantingTokenAttrs> implements JsonApiResource {
	readonly type: string = RESOURCE_TYPE_GRANTING_TOKEN;
	id?: string;
	attributes?: Partial<GrantingTokenAttrs>;
	relationships?: Partial<GrantingTokenRelationshipsSubset>;

	constructor(id?: string, attributes?: Partial<A>, relationships?: Partial<GrantingTokenRelationshipsSubset>) {
		this.id = id;
		this.attributes = attributes;
		this.relationships = relationships;
	}
}

export type GrantingToken<A extends GrantingTokenAttrs = GrantingTokenAttrs> = GrantingTokenSubset<A> &
	JsonApiResourceRequiredFields<GrantingTokenAttrs, GrantingTokenRelationships>;

export enum TokenPurpose {
	APP_REFRESH_TOKEN = "APP_REFRESH_TOKEN",
	INTEGRATION_BEARER_TOKEN = "INTEGRATION_BEARER_TOKEN",
}
```

### Retrieve a Record

```typescript
const user: Promise<JsonApiTopLevelObject<User>> = fetch(`${serverUrl}/users/1`, {
	method: 'GET'
})
	.then(r => r.json()); 
```

### Retrieve a Page of Records

One option for URL encoding your params for more advanced object types is [query-string](https://github.com/sindresorhus/query-string).
You could also use [encodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) for simpler cases.

```typescript
import queryString from 'query-string';

const grantingTokensPage: Promise<JsonApiPage<GrantingToken>> = fetch(`${serverUrl}/grantingTokens?${queryString.stringify(filterParams)}`, {
	method: 'GET'
})
	.then(r => r.json()); 
```

### Create a record

```typescript
const newUserObj: JsonApiObject<UserSubset> = {
	data: new UserSubset(undefined, {
		email: email,
		name: name ?? undefined,
		password: password,
	})
};
const result: Promise<JsonApiTopLevelObject<User>> = fetch(`${serverUrl}/users`, {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify(newUserObj),
})
	.then(r => r.json());
```

### Update a record

```typescript
const user = new UserSubset(userId, {name: newName});
const newObj: JsonApiObject<UserSubset> = {data: user};
const result: Promise<JsonApiTopLevelObject<User>> = fetch(`${serverUrl}/users/${user.id}`, {
	method: 'PATCH',
	body: JSON.stringify(newObj),
})
	.then(r => r.json());
```

### Delete a record

```typescript
const result: Promise<any> = fetch(`${serverUrl}/grantingTokens/${id}`, {method: 'DELETE'});
```

## Testing

	# Run Jest tests
	npm run test

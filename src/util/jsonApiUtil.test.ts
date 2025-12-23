import {describe, expect, test} from "@jest/globals";
import {findIncludedResource} from "./jsonApiUtil";
import {JsonApiPage} from "../dto/JsonApiPage";
import {JsonApiTopLevelObject} from "../dto/JsonApiTopLevelObject";
import {
	JsonApiRelationship,
	JsonApiRelationshipSubset,
	JsonApiResource,
	JsonApiResourceRequiredFields
} from "../dto/JsonApiResource";

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
	//accessControl?: AccessControl,
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

////////////////////////////////////////////////////////////////////////////////
// Tests
////////////////////////////////////////////////////////////////////////////////

describe('JSON:API tests', () => {
	test('Read JSON:API page values', () => {

		const grantingTokenPageResponse: JsonApiPage<GrantingToken> = {
			meta: {
				pageNumber: 0,
				pageSize: 20,
				totalPages: 1,
				totalSize: 2
			},
			data: [
				{
					type: "grantingToken",
					id: "1470",
					attributes: {
						purpose: TokenPurpose.INTEGRATION_BEARER_TOKEN,
						comment: "Token for XYZ integration API",
						//accessControl: null,
						revoked: false,
						lastUsedDate: "2024-05-31T23:49:25.698798Z",
						expirationDate: null,
						created: "2024-05-31T23:30:30.159Z",
						updated: "2024-05-31T23:49:25.701Z"
					},
					relationships: {
						user: {
							data: {
								type: "user",
								id: "1401"
							}
						}
					}
				},
				{
					type: "grantingToken",
					id: "1455",
					attributes: {
						purpose: TokenPurpose.APP_REFRESH_TOKEN,
						comment: null,
						//accessControl: null,
						revoked: true,
						lastUsedDate: "2024-05-30T00:42:43.172425Z",
						expirationDate: "2024-06-13T00:42:43.172425Z",
						created: "2024-05-30T00:21:12.464Z",
						updated: "2024-05-30T00:48:18.740Z"
					},
					relationships: {
						user: {
							data: {
								type: "user",
								id: "1401"
							}
						}
					}
				}
			],
			included: [
				{
					type: "user",
					id: "1401",
					attributes: {
						email: "sherlock@example.com",
						name: "Sherlock Holmes",
						enabled: true,
						emailVerified: true,
						created: "2023-12-15T00:31:23.589Z",
						updated: "2024-01-29T18:44:12.765Z"
					}
				}
			]
		};

		expect(grantingTokenPageResponse.meta.pageNumber).toBe(0);
		expect(grantingTokenPageResponse.meta.pageSize).toBe(20);
		expect(grantingTokenPageResponse.meta.totalPages).toBe(1);
		expect(grantingTokenPageResponse.meta.totalSize).toBe(2);

		const grantingTokens = grantingTokenPageResponse.data ?? [];
		expect(grantingTokens?.length).toBe(2);

		const gt1 = grantingTokens[0];
		const gt2 = grantingTokens[1];

		expect(gt1.id).toBe('1470');
		expect(gt1.attributes?.purpose).toBe(TokenPurpose.INTEGRATION_BEARER_TOKEN);
		expect(gt1.attributes?.comment).toBe('Token for XYZ integration API');
		expect(gt2.id).toBe('1455');
		expect(gt2.attributes?.purpose).toBe(TokenPurpose.APP_REFRESH_TOKEN);
		expect(gt2.attributes?.comment).toBe(null);

		const user1 = findIncludedResource<User>(grantingTokenPageResponse, gt1.relationships?.user?.data);
		const user2 = findIncludedResource<User>(grantingTokenPageResponse, gt2.relationships?.user?.data);

		expect(user1).toBeTruthy();
		expect(user2).toBeTruthy();

		expect(user1?.id).toBe('1401');
		expect(user1?.attributes?.email).toBe('sherlock@example.com');
		expect(user1?.attributes?.name).toBe('Sherlock Holmes');

		expect(user2?.id).toBe('1401');
		expect(user2?.attributes?.email).toBe('sherlock@example.com');
		expect(user2?.attributes?.name).toBe('Sherlock Holmes');
	});

	test('Read JSON:API single value', () => {

		const userResponse: JsonApiTopLevelObject<User> = {
			data: {
				type: "user",
				id: "1401",
				attributes: {
					email: "sherlock@example.com",
					name: "Sherlock Holmes",
					enabled: true,
					emailVerified: true,
					created: "2023-12-15T00:31:23.589Z",
					updated: "2024-01-29T18:44:12.765Z"
				},
				relationships: {},
			}
		};

		expect(userResponse.meta).toBeFalsy();

		const user = userResponse.data;
		expect(user).toBeTruthy();

		expect(user?.id).toBe('1401');
		expect(user?.attributes?.email).toBe('sherlock@example.com');
		expect(user?.attributes?.name).toBe('Sherlock Holmes');
	});
});

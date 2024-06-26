/* tslint:disable */
/* eslint-disable */
/**
 * Flathub API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @enum {string}
 */

export const AvailableLoginMethodStatus = {
  Ready: "ready",
  UserDoesNotExist: "user_does_not_exist",
  UsernameDoesNotMatch: "username_does_not_match",
  ProviderDeniedAccess: "provider_denied_access",
  NotLoggedIn: "not_logged_in",
  NotOrgMember: "not_org_member",
  NotOrgAdmin: "not_org_admin",
} as const

export type AvailableLoginMethodStatus =
  (typeof AvailableLoginMethodStatus)[keyof typeof AvailableLoginMethodStatus]

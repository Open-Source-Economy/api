import { z } from "zod";

/**
 * Branded UUID type for compile-time type safety.
 *
 * Prevents accidentally mixing up IDs from different entities.
 * At runtime, these are just strings.
 */
export type UUID<T extends string> = string & { readonly __brand: T };

/**
 * Creates a Zod schema for a branded UUID type.
 */
export const uuidSchema = <T extends UUID<string>>() => z.string().uuid() as unknown as z.ZodType<T>;

/**
 * Creates a Zod schema for a branded string type (not necessarily a UUID).
 */
export const brandedStringSchema = <T extends string & { readonly __brand: unknown }>() =>
  z.string() as unknown as z.ZodType<T>;

// ============================================
// Domain UUID types
// ============================================

export type UserId = UUID<"User">;
export type CompanyId = UUID<"Company">;
export type AddressId = UUID<"Address">;
export type SponsorId = UUID<"Sponsor">;
export type ManualInvoiceId = UUID<"ManualInvoice">;
export type IssueFundingId = UUID<"IssueFunding">;
export type ManagedIssueId = UUID<"ManagedIssue">;
export type ProjectItemId = UUID<"ProjectItem">;
export type ServiceId = UUID<"Service">;
export type DeveloperProfileId = UUID<"DeveloperProfile">;
export type DeveloperProjectItemId = UUID<"DeveloperProjectItem">;
export type DeveloperServiceId = UUID<"DeveloperService">;
export type DeveloperSettingsId = UUID<"DeveloperSettings">;
export type VerificationRecordId = UUID<"VerificationRecord">;
export type CompanyUserPermissionTokenId = UUID<"CompanyUserPermissionToken">;
export type RepositoryUserPermissionTokenId = UUID<"RepositoryUserPermissionToken">;

export const UserIdSchema = uuidSchema<UserId>();
export const CompanyIdSchema = uuidSchema<CompanyId>();
export const AddressIdSchema = uuidSchema<AddressId>();
export const SponsorIdSchema = uuidSchema<SponsorId>();
export const ManualInvoiceIdSchema = uuidSchema<ManualInvoiceId>();
export const IssueFundingIdSchema = uuidSchema<IssueFundingId>();
export const ManagedIssueIdSchema = uuidSchema<ManagedIssueId>();
export const ProjectItemIdSchema = uuidSchema<ProjectItemId>();
export const ServiceIdSchema = uuidSchema<ServiceId>();
export const DeveloperProfileIdSchema = uuidSchema<DeveloperProfileId>();
export const DeveloperProjectItemIdSchema = uuidSchema<DeveloperProjectItemId>();
export const DeveloperServiceIdSchema = uuidSchema<DeveloperServiceId>();
export const DeveloperSettingsIdSchema = uuidSchema<DeveloperSettingsId>();
export const VerificationRecordIdSchema = uuidSchema<VerificationRecordId>();
export const CompanyUserPermissionTokenIdSchema = uuidSchema<CompanyUserPermissionTokenId>();
export const RepositoryUserPermissionTokenIdSchema = uuidSchema<RepositoryUserPermissionTokenId>();

// ============================================
// Branded string types (not UUIDs)
// ============================================

export type StripeCustomerId = string & { readonly __brand: "StripeCustomer" };
export type StripePriceId = string & { readonly __brand: "StripePrice" };
export type StripeProductId = string & { readonly __brand: "StripeProduct" };
export type StripeInvoiceId = string & { readonly __brand: "StripeInvoice" };
export type StripeInvoiceLineId = string & { readonly __brand: "StripeInvoiceLine" };

export const StripeCustomerIdSchema = brandedStringSchema<StripeCustomerId>();
export const StripePriceIdSchema = brandedStringSchema<StripePriceId>();
export const StripeProductIdSchema = brandedStringSchema<StripeProductId>();
export const StripeInvoiceIdSchema = brandedStringSchema<StripeInvoiceId>();
export const StripeInvoiceLineIdSchema = brandedStringSchema<StripeInvoiceLineId>();

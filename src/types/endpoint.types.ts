import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";

/**
 * All standard HTTP 4xx client error status codes
 */
type ClientErrorCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451;

/**
 * All standard HTTP 5xx server error status codes
 */
type ServerErrorCode = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

/**
 * All HTTP error status codes (4xx and 5xx)
 */
type ErrorStatusCode = ClientErrorCode | ServerErrorCode;

/**
 * Type for error responses - enforces all errors use RFC 7807 ProblemDetails
 */
type ErrorResponses = Partial<Record<ErrorStatusCode, typeof ProblemDetailsSchema>>;

/**
 * GET endpoint definition
 */
export interface GetEndpointDefinition<
  TParams extends z.ZodTypeAny | undefined = z.ZodTypeAny | undefined,
  TQuery extends z.ZodTypeAny | undefined = z.ZodTypeAny | undefined,
  TResponse extends z.ZodTypeAny = z.ZodTypeAny,
  TErrors extends ErrorResponses = ErrorResponses,
> {
  method: "GET";
  path: string;
  pathParams?: TParams;
  query?: TQuery;
  responses: { 200: TResponse } & TErrors;
  summary: string;
}

/**
 * POST endpoint definition
 */
export interface PostEndpointDefinition<
  TParams extends z.ZodTypeAny | undefined = z.ZodTypeAny | undefined,
  TQuery extends z.ZodTypeAny | undefined = z.ZodTypeAny | undefined,
  TBody extends z.ZodTypeAny = z.ZodTypeAny,
  TResponse extends z.ZodTypeAny = z.ZodTypeAny,
  TErrors extends ErrorResponses = ErrorResponses,
> {
  method: "POST";
  path: string;
  pathParams?: TParams;
  query?: TQuery;
  body: TBody;
  responses: { 201: TResponse } & TErrors;
  summary: string;
}

/**
 * PUT endpoint definition
 */
export interface PutEndpointDefinition<
  TParams extends z.ZodTypeAny = z.ZodTypeAny,
  TQuery extends z.ZodTypeAny | undefined = z.ZodTypeAny | undefined,
  TBody extends z.ZodTypeAny = z.ZodTypeAny,
  TResponse extends z.ZodTypeAny = z.ZodTypeAny,
  TErrors extends ErrorResponses = ErrorResponses,
> {
  method: "PUT";
  path: string;
  pathParams: TParams;
  query?: TQuery;
  body: TBody;
  responses: { 200: TResponse } & TErrors;
  summary: string;
}

/**
 * PATCH endpoint definition
 */
export interface PatchEndpointDefinition<
  TParams extends z.ZodTypeAny = z.ZodTypeAny,
  TQuery extends z.ZodTypeAny | undefined = z.ZodTypeAny | undefined,
  TBody extends z.ZodTypeAny = z.ZodTypeAny,
  TResponse extends z.ZodTypeAny = z.ZodTypeAny,
  TErrors extends ErrorResponses = ErrorResponses,
> {
  method: "PATCH";
  path: string;
  pathParams: TParams;
  query?: TQuery;
  body: TBody;
  responses: { 200: TResponse } & TErrors;
  summary: string;
}

/**
 * DELETE endpoint definition
 */
export interface DeleteEndpointDefinition<
  TParams extends z.ZodTypeAny = z.ZodTypeAny,
  TQuery extends z.ZodTypeAny | undefined = z.ZodTypeAny | undefined,
  TErrors extends ErrorResponses = ErrorResponses,
> {
  method: "DELETE";
  path: string;
  pathParams: TParams;
  query?: TQuery;
  body: null;
  responses: { 204: null } & TErrors;
  summary: string;
}

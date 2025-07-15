# MobX-TK

## Table of Contents
- [MobX-TK](#mobx-tk)
  - [Table of Contents](#table-of-contents)
  - [Dependencies](#dependencies)
  - [Description](#description)

## Dependencies
- [Authorizer](https://github.com/azarov-serge/authorizer)

## Description
- `/src/core/rest-service.ts` - service that allows making network requests and storing statuses in the local state of the service. Status is an instance of the class `/src/core/queries/query-status.ts`. Stores states:
  - `isFetching` - loading in progress (`true`/`false`)
  - `isFetched` - loading completed (`true`/`false`)
  - `data` - received data
  - `error` - error. Instance of the class `/src/core/queries/query-error.ts`
- `/src/core/queries` - set of classes for working with network requests.
  - `/src/core/queries/query.ts` - class for simple network requests. Contains:
    - `key` - unique request key.
    - `id` - unique id for POST, PATCH, PUT, DELETE requests. Will be used to form a unique request key.
    - `url` - URL for request with search parameters
    - `urlParam` - needed as a parameter for GET / DELETE requests (get / delete element). Can be used as a unique key.
    - `baseUrl` - base `url` without `search params` and `url param`
    - `method` - `GET` | `POST` | `PUT` | `PATCH` | `DELETE`
    - `params` - `search params` (`{ key: value }`)
  - `/src/core/queries/pagination-query.ts` - class for network requests with pagination. Contains:
    - `key` - unique request key.
    - `keys` - array of unique request keys.
    - `id` - unique id for POST, PATCH, PUT, DELETE requests. Will be used to form a unique request key.
    - `url` - URL - for request with search parameters
    - `urls` - array of page URLs for requests with search parameters.
    - `baseUrl` - base `url` without `search params` and `url param`
    - `method` - `GET` | `POST` | `PUT` | `PATCH` | `DELETE`
    - `params` - `search params` - `{ key: value }`
    - `page` - current page
    - `pageParams` - page parameters - `{ page: { key: value } }`;
    - `pageLimit` - page limits - `{ page: { key: value } }`;
    - `limit` - current page limit
    - `nextPage` - set next page
    - `setParams` - set `search params`
- `/src/shared/utils` - net utils, type guards, and fetch with interceptors
  
[to table of contents](#mobx-tk)


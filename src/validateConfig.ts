// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import createJsonSchemaValidator = require("is-my-json-valid");


const webreedConfigSchemaValidator = createJsonSchemaValidator(
    require("../schema/webreed-config"),
    { verbose: true }
  );


/**
 * Validates a given webreed project configuration against schema.
 *
 * @param config
 *   The webreed project configuration.
 *
 * @throws {Error}
 * - with the code `WEBREED_INVALID_CONFIG` when argument 'config' is not a valid webreed
 *   project configuration. Error object is augmented with:
 *     * `err.issues` - Lists the validation error(s).
 */
export function validateConfig(config: any): void {
  if (typeof config !== "object" || config === null) {
    throw new TypeError("argument 'config' must be a non-null object");
  }

  if (!webreedConfigSchemaValidator(config)) {
    let err = new Error("Webreed configuration is invalid.");
    err["code"] = "WEBREED_INVALID_CONFIG";
    err["issues"] = webreedConfigSchemaValidator.errors;
    throw err;
  }
}

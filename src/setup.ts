// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import {Environment} from "webreed-core/lib/Environment";

import {applyConfigToEnvironment} from "./applyConfigToEnvironment";


/**
 * Setup a webreed environment for a given webreed project path.
 *
 * @projectRootPath
 *   Path to the root directory of a webreed project.
 * @config
 *   Webreed project configuration.
 *
 * @returns
 *   An environment representing the webreed project.
 *
 * @throws {Error}
 * - with the code `WEBREED_INVALID_CONFIG` when argument 'config' is not a valid webreed
 *   project configuration. Error object is augmented with:
 *     * `err.issues` - Lists the validation error(s).
 *
 * - with the code `WEBREED_PLUGIN_NOT_FOUND` when a plugin package cannot be located.
 *   Error object is augmented with:
 *     * `err.packageName` - Identifies the webreed plugin package that was being loaded.
 *
 * - with the code `WEBREED_PLUGIN_MISSING_SETUP_FUNCTION` when a plugin package does not
 *   expose a setup function. Error object is augmented with:
 *     * `err.packageName` - Identifies the webreed plugin package that was being loaded.
 */
export default function setup(projectRootPath: string, config: any = null): Environment {
  if (typeof projectRootPath !== "string") {
    throw new TypeError("argument 'projectRootPath' must be a string");
  }
  if (projectRootPath.trim() === "") {
    throw new Error("argument 'projectRootPath' must be a non-empty string");
  }
  if (typeof config !== "object") {
    throw new TypeError("argument 'config' must be `null` or an object");
  }

  let env = new Environment();
  env.projectRootPath = projectRootPath;

  applyBaseConfigToEnvironment(env);

  if (config) {
    applyConfigToEnvironment(env, config);
  }

  return env;
}


function applyBaseConfigToEnvironment(env: Environment): void {
  applyConfigToEnvironment(env, {
    "baseUrl": "/",
    "defaultGeneratorName": "standard",
    "defaultModeName": "text",
    "resourceTypes": {
      "*": {
        "mode": "binary"
      }
    },
    "plugins": [
      { "package": "webreed-binary-mode" },
      { "package": "webreed-text-mode" },
      { "package": "webreed-standard-generator" },
      { "package": "webreed-markdown-transformer" },
      { "package": "webreed-template-transformer" },
      { "package": "webreed-json-handler" },
      { "package": "webreed-yaml-handler" },
      { "package": "webreed-nunjucks-template-engine" }
    ]
  });
}

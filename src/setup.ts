// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


// Webreed Packages
import {Environment} from "webreed-core/lib/Environment";
import {ResourceType} from "webreed-core/lib/ResourceType";

// Webreed Plugins
import setupBinaryMode from "webreed-binary-mode";
import setupTextMode from "webreed-text-mode";


export default function setup(): Environment {
  let env = new Environment();

  setupFallbackResourceType(env);
  setupDefaultPlugins(env);

  return env;
}


function setupFallbackResourceType(env: Environment): void {
  let fallbackResourceType = new ResourceType();
  fallbackResourceType.mode = "binary";
  env.resourceTypes.set("*", fallbackResourceType);
}

function setupDefaultPlugins(env: Environment): void {
  setupBinaryMode(env, { });
  setupTextMode(env, { });
}

// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import {Environment} from "webreed-core/lib/Environment";
import {ResourceType} from "webreed-core/lib/ResourceType";

import setupBinaryMode from "webreed-binary-mode";
import setupJsonHandler from "webreed-json-handler";
import setupStandardGenerator from "webreed-standard-generator";
import setupTemplateTransformer from "webreed-template-transformer";
import setupTextMode from "webreed-text-mode";
import setupYamlHandler from "webreed-yaml-handler";


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
  setupStandardGenerator(env, { });
  setupTemplateTransformer(env, { });
  setupJsonHandler(env, { });
  setupYamlHandler(env, { });
}

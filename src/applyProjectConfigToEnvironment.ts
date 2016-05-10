// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import {Environment} from "webreed-core/lib/Environment";
import {PluginContext} from "webreed-core/lib/PluginContext";
import {ResourceType} from "webreed-core/lib/ResourceType";

import {validateProjectConfig} from "./validateProjectConfig";


/**
 * Apply a webreed project configuration to a given webreed environment.
 *
 * @param env
 *   The webreed environment that is being configured.
 * @param config
 *   The webreed project configuration.
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
export function applyProjectConfigToEnvironment(env: Environment, config: any): void {
  if (!(env instanceof Environment)) {
    throw new TypeError("argument 'env' must be a webreed environment");
  }

  validateProjectConfig(config);

  if (config.baseUrl) {
    env.baseUrl = config.baseUrl;
  }

  if (config.defaultGeneratorName) {
    env.defaultGeneratorName = config.defaultGeneratorName;
  }
  if (config.defaultModeName) {
    env.defaultModeName = config.defaultModeName;
  }

  if (config.hiddenUrlExtensions) {
    env.hiddenUrlExtensions.clear();
    for (let ext of config.hiddenUrlExtensions) {
      env.hiddenUrlExtensions.add(ext);
    }
  }
  if (config.hiddenUrlFileNames) {
    env.hiddenUrlFileNames.clear();
    for (let ext of config.hiddenUrlFileNames) {
      env.hiddenUrlFileNames.add(ext);
    }
  }

  if (config.paths) {
    for (let pathName of Object.keys(config.paths)) {
      env.setPath(pathName, config.paths[pathName]);
    }
  }

  if (config.resourceTypes) {
    for (let key of Object.keys(config.resourceTypes)) {
      let resourceTypeConfig = config.resourceTypes[key] || {};

      let resourceType = new ResourceType();

      if (resourceTypeConfig.conversions) {
        for (let targetKey of Object.keys(resourceTypeConfig.conversions)) {
          resourceType.conversions[targetKey] = pluginContextFromConfigMany(
              "transformer",
              resourceTypeConfig.conversions[targetKey]
            );
        }
      }

      if (resourceTypeConfig.custom) {
        Object.assign(resourceType.custom, resourceTypeConfig.custom);
      }

      if (resourceTypeConfig.encoding) {
        resourceType.encoding = resourceTypeConfig.encoding;
      }
      if (resourceTypeConfig.parseFrontmatter) {
        resourceType.parseFrontmatter = resourceTypeConfig.parseFrontmatter;
      }
      if (resourceTypeConfig.targetExtension) {
        resourceType.targetExtension = resourceTypeConfig.targetExtension;
      }
      if (resourceTypeConfig.mode) {
        resourceType.mode = resourceTypeConfig.mode;
      }
      if (resourceTypeConfig.handler) {
        resourceType.handler = pluginContextFromConfig("name", resourceTypeConfig.handler);
      }
      if (resourceTypeConfig.generator) {
        resourceType.generator = pluginContextFromConfig("name", resourceTypeConfig.generator);
      }
      if (resourceTypeConfig.process) {
        resourceType.process = pluginContextFromConfigMany("transformer", resourceTypeConfig.process);
      }
      if (resourceTypeConfig.templateEngine) {
        resourceType.templateEngine = pluginContextFromConfig("name", resourceTypeConfig.templateEngine);
      }

      env.resourceTypes.set(key, resourceType);
    }
  }

  if (config.plugins) {
    for (let plugin of config.plugins) {
      let pluginModule = requirePlugin(env, plugin.package);
      if (typeof pluginModule.default !== "function") {
        let err = new Error(`Webreed plugin package '${plugin.package}' does not export a default setup function!`);
        err["code"] = "WEBREED_PLUGIN_MISSING_SETUP_FUNCTION";
        err["packageName"] = plugin.package;
        throw err;
      }
      env.use(pluginModule.default, plugin.options);
    }
  }
}


function pluginContextFromConfigMany(keyName: string, config: any): PluginContext[] {
  return (Array.isArray(config) ? config : [ config ])
    .map((pluginContext: any) => pluginContextFromConfig(keyName, pluginContext));
}

function pluginContextFromConfig(keyName: string, config: any): PluginContext {
  return new PluginContext(config[keyName], config.options);
}


function requirePlugin(env: Environment, packageName: string): any {
  let pluginSources = [
    () => require(env.resolvePath("plugins", packageName)),
    () => require(env.resolvePath("node_modules", packageName)),
    require.main.require,
    require
  ];

  for (let requirePlugin of pluginSources) {
    try {
      if (typeof requirePlugin === "function") {
        return requirePlugin(packageName);
      }
    }
    catch (err) {
      if (err.code !== "MODULE_NOT_FOUND") {
        throw err;
      }
    }
  }

  let err = new Error(`Was unable to locate webreed plugin package '${packageName}'.'`);
  err["code"] = "WEBREED_PLUGIN_NOT_FOUND";
  err["packageName"] = packageName;
  throw err;
}

// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import path from "path";

import given from "mocha-testdata";
import should from "should";

import {Environment} from "webreed-core/lib/Environment";

import {applyProjectConfigToEnvironment} from "../../lib/applyProjectConfigToEnvironment";


describe("applyProjectConfigToEnvironment(env, config)", function () {

  beforeEach(function () {
    this.env = new Environment();
  });


  it("is a function", function () {
    applyProjectConfigToEnvironment
      .should.be.a.Function();
  });


  given( undefined, null, 42, "" ).
  it("throws error when argument 'env' is not a webreed environment", function (env) {
    (() => applyProjectConfigToEnvironment(env, null))
      .should.throw("argument 'env' must be a webreed environment");
  });

  given( undefined, null, 42, "" ).
  it("throws error when argument 'config' is `null` or is not an object", function (invalidConfig) {
    (() => applyProjectConfigToEnvironment(this.env, invalidConfig))
      .should.throw("argument 'config' must be a non-null object");
  });

  it("throws error when argument 'config' is not a valid webreed configuration", function () {
    let invalidConfig = { "invalidProperty": 42 };
    (() => applyProjectConfigToEnvironment(this.env, invalidConfig))
      .should.throw({ code: "WEBREED_INVALID_CONFIG" })
  });

  it("throws error for invalid configuration", function () {
    let invalidConfig = { "invalidProperty": 42 };
    (() => applyProjectConfigToEnvironment(this.env, invalidConfig))
      .should.throw({ code: "WEBREED_INVALID_CONFIG" })
  });


  it("assigns expected values to environment properties", function () {
    let config = {
      "baseUrl": "http://example.com",
      "defaultGeneratorName": "default-generator-name",
      "defaultModeName": "default-mode-name",
      "hiddenUrlExtensions": [ ".foo", ".bar", ".baz" ],
      "hiddenUrlFileNames": [ "index.foo", "index.bar", "index.baz" ],
      "paths": {
        "output": "custom-output",
        "plugins": "webreed_plugins"
      },
      "resourceTypes": {
        "*": {
          "generator": { "name": "fallback-resource-generator" }
        },
        ".md": {
          "process": { "transformer": "markdown-transformer" }
        },
        ".html": null
      }
    };

    applyProjectConfigToEnvironment(this.env, config);

    this.env.baseUrl
      .should.be.eql("http://example.com");
    this.env.defaultGeneratorName
      .should.be.eql("default-generator-name");
    this.env.defaultModeName
      .should.be.eql("default-mode-name");
    this.env.hiddenUrlExtensions
      .should.be.eql(new Set([ ".foo", ".bar", ".baz" ]));
    this.env.hiddenUrlFileNames
      .should.be.eql(new Set([ "index.foo", "index.bar", "index.baz" ]));
    this.env.resolvePath("output")
      .should.endWith("custom-output");
    this.env.resolvePath("plugins")
      .should.endWith("webreed_plugins");
    this.env.resourceTypes.get("*").generator.name
      .should.be.eql("fallback-resource-generator");
    this.env.resourceTypes.get(".md").process[0].name
      .should.be.eql("markdown-transformer");
    this.env.resourceTypes.get(".html").mode
      .should.be.eql("text");
  });

  it("loads plugins", function () {
    this.env.setPath("plugins", path.resolve(__dirname, "../fakes/plugins"));

    let config = {
      "plugins": [
        { "package": "fake-plugin" }
      ]
    };

    applyProjectConfigToEnvironment(this.env, config);

    this.env.baseUrl
      .should.be.eql("http://example.com/loaded-fake-plugin");
  });

  it("throws error when plugin package cannot be found", function () {
    let config = {
      "plugins": [
        { "package": "a-package-that-does-not-exist" }
      ]
    };

    (() => applyProjectConfigToEnvironment(this.env, config))
      .should.throw({
        code: "WEBREED_PLUGIN_NOT_FOUND",
        packageName: "a-package-that-does-not-exist"
      })
  });

  it("throws error when plugin modules is missing a setup function", function () {
    this.env.setPath("plugins", path.resolve(__dirname, "../fakes/plugins"));

    let config = {
      "plugins": [
        { "package": "fake-plugin-without-setup" }
      ]
    };

    (() => applyProjectConfigToEnvironment(this.env, config))
      .should.throw({
        code: "WEBREED_PLUGIN_MISSING_SETUP_FUNCTION",
        packageName: "fake-plugin-without-setup"
      })
  });

});

// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

"use strict";


const path = require("path");

const given = require("mocha-testdata");
const should = require("should");

const Environment = require("webreed-core/lib/Environment").Environment;
const ResourceType = require("webreed-core/lib/ResourceType").ResourceType;

const BinaryMode = require("webreed-binary-mode/lib/BinaryMode").BinaryMode;
const JsonHandler = require("webreed-json-handler/lib/JsonHandler").JsonHandler;
const NunjucksTemplateEngine = require("webreed-nunjucks-template-engine/lib/NunjucksTemplateEngine").NunjucksTemplateEngine;
const StandardGenerator = require("webreed-standard-generator/lib/StandardGenerator").StandardGenerator;
const MarkdownTransformer = require("webreed-markdown-transformer/lib/MarkdownTransformer").MarkdownTransformer;
const TemplateTransformer = require("webreed-template-transformer/lib/TemplateTransformer").TemplateTransformer;
const TextMode = require("webreed-text-mode/lib/TextMode").TextMode;
const YamlHandler = require("webreed-yaml-handler/lib/YamlHandler").YamlHandler;

const setup = require("../../lib/setup").default;


describe("setup(projectRootPath, [options])", function () {

  beforeEach(function () {
    this.projectRootPath = path.resolve(__dirname, "../fixtures/example-project");
    this.env = setup(this.projectRootPath);
  });


  it("is a function", function () {
    setup
      .should.be.a.Function();
  });

  it("is named 'setup'", function () {
    setup.name
      .should.be.eql("setup");
  });


  given( undefined, null, 42 ).
  it("throws error when argument 'projectRootPath' is not a string", function (projectRootPath) {
    (() => setup(projectRootPath))
      .should.throw("argument 'projectRootPath' must be a string");
  });

  given( "", "   ", "\t  " ).
  it("throws error when argument 'projectRootPath' is an empty string", function (projectRootPath) {
    (() => setup(projectRootPath))
      .should.throw("argument 'projectRootPath' must be a non-empty string");
  });

  given( 42, "" ).
  it("throws error when argument 'config' is not an object", function (config) {
    (() => setup(this.projectRootPath, config))
      .should.throw("argument 'config' must be `null` or an object");
  });

  it("throws error when 'config' is invalid", function () {
    let invalidConfig = { "invalidProperty": 42 };
    (() => setup(this.projectRootPath, invalidConfig))
      .should.throw({ code: "WEBREED_INVALID_CONFIG" });
  });


  it("returns a webreed environment", function () {
    this.env
      .should.be.instanceOf(Environment);
  });


  it("sets root path of project in environment", function () {
    this.env.projectRootPath
      .should.be.eql(this.projectRootPath);
  });

  it("sets default generator name in environment", function () {
    this.env.defaultGeneratorName
      .should.be.eql("standard");
  });

  it("sets default mode name in environment", function () {
    this.env.defaultModeName
      .should.be.eql("text");
  });


  it("includes the fallback resource type '*'", function () {
    this.env.resourceTypes.get("*")
      .should.be.instanceOf(ResourceType);
  });

  it("fallback resource type '*' assumes 'binary' mode", function () {
    this.env.resourceTypes.get("*").mode
      .should.be.eql("binary");
  });


  it("includes the 'binary' mode by default", function () {
    this.env.modes.get("binary")
      .should.be.instanceOf(BinaryMode);
  });

  it("includes the 'text' mode by default", function () {
    this.env.modes.get("text")
      .should.be.instanceOf(TextMode);
  });

  it("includes the 'standard' generator by default", function () {
    this.env.generators.get("standard")
      .should.be.instanceOf(StandardGenerator);
  });

  it("includes the 'template' transformer by default", function () {
    this.env.transformers.get("template")
      .should.be.instanceOf(TemplateTransformer);
  });

  it("includes the 'json' handler by default", function () {
    this.env.handlers.get("json")
      .should.be.instanceOf(JsonHandler);
  });

  it("includes the 'yaml' handler by default", function () {
    this.env.handlers.get("yaml")
      .should.be.instanceOf(YamlHandler);
  });

  it("includes the 'nunjucks' template engine by default", function () {
    this.env.templateEngines.get("nunjucks")
      .should.be.instanceOf(NunjucksTemplateEngine);
  });


  it("can override and inherit default configuration properties", function () {
    let config = {
      "defaultGeneratorName": "different-default-generator-name"
    };

    let newEnv = setup(this.projectRootPath, config);

    newEnv.defaultGeneratorName
      .should.be.eql("different-default-generator-name");
    newEnv.defaultModeName
      .should.be.eql("text");
  });

});

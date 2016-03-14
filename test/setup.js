// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import path from "path";

import given from "mocha-testdata";
import should from "should";

import {Environment} from "webreed-core/lib/Environment";
import {ResourceType} from "webreed-core/lib/ResourceType";

import {BinaryMode} from "webreed-binary-mode/lib/BinaryMode";
import {JsonHandler} from "webreed-json-handler/lib/JsonHandler";
import {NunjucksTemplateEngine} from "webreed-nunjucks-template-engine/lib/NunjucksTemplateEngine";
import {StandardGenerator} from "webreed-standard-generator/lib/StandardGenerator";
import {TemplateTransformer} from "webreed-template-transformer/lib/TemplateTransformer";
import {TextMode} from "webreed-text-mode/lib/TextMode";
import {YamlHandler} from "webreed-yaml-handler/lib/YamlHandler";

import setup from "../lib/setup";


describe("#setup(projectRootPath, [options])", function () {

  beforeEach(function () {
    this.projectRootPath = path.join(__dirname, "fixtures/example-project");
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
  it("throws error when argument 'options' is not a string", function (options) {
    (() => setup(this.projectRootPath, options))
      .should.throw("argument 'options' must be `null` or an object");
  });


  it("returns a webreed environment", function () {
    this.env
      .should.be.instanceOf(Environment);
  });

  it("sets root path of project in environment", function () {
    this.env.projectRootPath
      .should.be.eql(this.projectRootPath);
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

});

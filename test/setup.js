// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import given from "mocha-testdata";
import should from "should";

import {Environment} from "webreed-core/lib/Environment";
import {ResourceType} from "webreed-core/lib/ResourceType";

import {BinaryMode} from "webreed-binary-mode/lib/BinaryMode";
import {StandardGenerator} from "webreed-standard-generator/lib/StandardGenerator";
import {TemplateTransformer} from "webreed-template-transformer/lib/TemplateTransformer";
import {TextMode} from "webreed-text-mode/lib/TextMode";

import setup from "../lib/setup";


describe("#setup(options)", function () {

  it("is a function", function () {
    setup
      .should.be.a.Function();
  });

  it("is named 'setup'", function () {
    setup.name
      .should.be.eql("setup");
  });


  it("returns a webreed environment", function () {
    let env = setup();
    env
      .should.be.instanceOf(Environment);
  });


  it("includes the fallback resource type '*'", function () {
    let env = setup();
    env.resourceTypes.get("*")
      .should.be.instanceOf(ResourceType);
  });

  it("fallback resource type '*' assumes 'binary' mode", function () {
    let env = setup();
    env.resourceTypes.get("*").mode
      .should.be.eql("binary");
  });


  it("includes the 'binary' mode by default", function () {
    let env = setup();
    env.modes.get("binary")
      .should.be.instanceOf(BinaryMode);
  });

  it("includes the 'text' mode by default", function () {
    let env = setup();
    env.modes.get("text")
      .should.be.instanceOf(TextMode);
  });

  it("includes the 'standard' generator by default", function () {
    let env = setup();
    env.generators.get("standard")
      .should.be.instanceOf(StandardGenerator);
  });

  it("includes the 'template' transformer by default", function () {
    let env = setup();
    env.transformers.get("template")
      .should.be.instanceOf(TemplateTransformer);
  });

});

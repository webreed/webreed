// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

import given from "mocha-testdata";
import should from "should";

import webreed from "../src";

describe("#setup(options)", function () {

  it("is a function", function () {
    webreed
      .should.be.a.Function();
  })

  it("is named 'setup'", function () {
    webreed.name
      .should.be.eql("setup");
  })

})
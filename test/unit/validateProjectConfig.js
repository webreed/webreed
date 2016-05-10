// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import given from "mocha-testdata";
import should from "should";

import {validateProjectConfig} from "../../lib/validateProjectConfig";


describe("validateProjectConfig(config)", function () {

  it("is a function", function () {
    validateProjectConfig
      .should.be.a.Function();
  });


  given( undefined, null, 42, "" ).
  it("throws error when argument 'config' is `null` or is not an object", function (invalidConfig) {
    (() => validateProjectConfig(invalidConfig))
      .should.throw("argument 'config' must be a non-null object");
  });

  it("throws error for invalid configuration", function () {
    let invalidConfig = { "invalidProperty": 42 };
    (() => validateProjectConfig(invalidConfig))
      .should.throw({ code: "WEBREED_INVALID_CONFIG" })
  });

});

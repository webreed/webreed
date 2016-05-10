// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import fs from "fs";
import path from "path";

import given from "mocha-testdata";
import isMyJsonValid from "is-my-json-valid";
import should from "should";
import yaml from "js-yaml";


const schema = require("../../../schema/webreed-project");
const validateWebreedConfig = isMyJsonValid(schema);


describe("Schema: webreed-project", function () {

  for (let testCase of getTestCases("valid")) {
    it(`passes for valid webreed project configuration <${testCase.name}>`, function () {
      let result = validateWebreedConfig(readProjectConfig(testCase.filePath));
      let errors = (validateWebreedConfig.errors || [ ])
        .map(error => `Error with field '${error.field}': ${error.message}`);
      result
        .should.be.exactly(true, JSON.stringify(errors));
    });
  }

  for (let testCase of getTestCases("invalid")) {
    it(`fails for an invalid webreed project configuration <${testCase.name}>`, function () {
      validateWebreedConfig(readProjectConfig(testCase.filePath))
        .should.be.false();
    });
  }

});


function getTestCases(relativeDir) {
  let dirPath = path.resolve(__dirname, relativeDir);
  return fs.readdirSync(dirPath)
    .map(name => Object.assign({
        name: name,
        filePath: path.join(dirPath, name)
      }))
    .filter(testCase => fs.statSync(testCase.filePath).isFile()
        && path.extname(testCase.name) === ".yaml");
}

function readProjectConfig(filePath) {
  let projectConfigStr = fs.readFileSync(filePath, "utf8");
  return yaml.safeLoad(projectConfigStr);
}

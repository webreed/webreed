// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


const fs = require("fs");
const path = require("path");

const jsonSchemaToMarkdown = require("json-schema-to-markdown");


const schemaPath = path.resolve(process.argv[2]);

if (typeof schemaPath !== "string" || schemaPath === "") {
  console.error(`Invalid schema path '${schemaPath}'.`);
  process.exit(1);
}
if (!fs.existsSync(schemaPath)) {
  console.error(`Schema does not exist at path '${schemaPath}'.`);
  process.exit(1);
}

const schema = require(schemaPath);
const markdownDocs = jsonSchemaToMarkdown(schema);

// Write generated markdown documentation to stdout.
process.stdout.write(markdownDocs);

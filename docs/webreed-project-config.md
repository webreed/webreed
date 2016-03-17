# Webreed Project Configuration

The schema defines the following properties:

## `baseUrl` (string)

Base URL of website where output content will be accessible from.

Default: `"/"`

## `defaultGeneratorName` (string)

Name of the generator that should be used to generate output content when not specified by the associated resource type.

Default: `"standard"`

## `defaultModeName` (string)

Name of the mode that should be used to read and write resource files when not specified by the associated resource type.

Default: `"text"`

## `hiddenUrlExtensions` (array)

File extensions that should be hidden from URLs.

The object is an array with all elements of the type `string`.

Additional restrictions:

* Unique items: `true`

## `hiddenUrlFileNames` (array)

File names that should be hidden from generated URLs.

The object is an array with all elements of the type `string`.

Additional restrictions:

* Unique items: `true`

## `paths` (object)

Customize output paths. Paths are resolved relative from the project's root path.

## `resourceTypes` (object)

Map defining the resource types that are used in the project.

## `plugins` (array)

List of webreed plugin packages.

Plugins are used in the order given; although load order is not normally important.

The object is an array with all elements of the type `object`.

The array object has the following properties:

### `package` (string, required)

Name of the package that contains the plugin.

### `options`

Options that are provided to plugin package setup function.

---

# Sub Schemas

The schema defines the following additional types:

## `pluginContext` (object)

References a plugin by its name and can optionally specify options that apply in this context.

Properties of the `pluginContext` object:

### `name` (pluginName, required)

Identifies the plugin.

### `options`

Options that apply for this context of the plugin.

## `pluginName` (string)

Name that identifies a plugin.

## `resourceType` (object)

Defines a type of resource.

Properties of the `resourceType` object:

### `conversions` (object)

Map of conversion transformers from the resource type to zero-or-more target extensions.

### `custom` (object)

A general purpose container of custom properties that can be used by plugins.

### `encoding` (string)

Encoding of the resource; used by 'text' mode.

Default: `"utf8"`

### `parseFrontmatter` (boolean)

Indicates whether frontmatter of source content should be parsed when reading resources of this type.

Default: `true`

### `targetExtension`

Target extension type that should be implied when processing resources of this type. For instance, it could be implied that markdown files are always saved as .html files.

Specify `null` or omit this property when no target extension should be implied.

Default: `null`

Additional restrictions:

* Regex pattern: `^(|\*|\$|\.[A-Za-z0-9\-,_]+)$`

### `mode` (string)

Identifies the mode that will be used to read and write resources of this type.

Default: `"text"`

### `handler` (pluginContext)

Identifies the handler that is used to decode or encode data in the body of resources of this type. This is useful for data formats such as JSON and YAML.

### `generator` (pluginContext)

Identifies the generator that is used to process resources of this type.

Default:

```
{
  "key": "standard",
  "options": {}
}
```

### `process`

Identifies zero-or-more transformers which are in-turn applied to resources of this type.

### `templateEngine` (pluginContext)

Identifies the template engine that is used to render resources of this type. This is applicable when using the 'template' process transformation.

## `transformerPluginContext` (object)

References a transformer plugin by its key and can optionally specify options that apply in this context.

Properties of the `transformerPluginContext` object:

### `transformer` (pluginName, required)

Identifies the transformer plugin.

### `options`

Options that are provided to plugin package setup function.

## `transformerPluginContextMany` (array)

References zero-or-more transformer plugins.
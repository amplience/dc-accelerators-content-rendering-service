# Hosting Content Types externally

Content Types can either be created inside your hub as Content Type Schemas or in more advanced configurations they can be referenced externally from a HTTP/S URL.

This feature is intended to support the following advanced use-cases:

* Referencing the exact same content type from multiple hubs (e.g. across brands)
  * Note: This is only suitable if you will never need to make hub specific changes to a content type and they will strictly always be identical.
* Continuous integration – If you wish to version your content types in source control and create an automated deployment pipeline.

## Steps

Using this features requires you to host the Content Types in an internet facing location. The "id" field in each schema definition must match the URL as well as any references to the schema.

1. Choose where the content types will be hosted and determine what the URL will be

2. Open ".replace.json" and set CONTENT_TYPE_BASEPATH to the base URL of your hosting location.

3. Run the following command which will export the content types to dist/contentTypes with the correct id and reference URLs.

```
gulp buildAll
```

4. Upload the content types to your hosting location (for external) or create internal schemas in Dynamic Content developer tab (recommended)

5. Register the content type in the Dynamic Content developer tab by providing the URL and settings for each content type


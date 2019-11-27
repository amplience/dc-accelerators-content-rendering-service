# Configuring Images

## Add Parameters to images

The current templates have partials (where necessary) for image templates. You can pass various parameters into the image generating template from the calling template, this means you can render images specific to your templates needs.

### Base image parameters

You can use parameters with the `handlebars` partial (?). This basic method passes the `image` object and  a `mediaQueries` array.

```js
{{> acc-template-image-generator
    image=this
    mediaQueries='[
        {"query": 768, "width": 768},
        {"query": 1024, "width": 1024},
        {"query": 1025, "width": 1600}
    ]'
}}
```

Here we are passing an array of queries to our image generator partial. The last item in the array sets the `<source>` elements `media` attribute to `min-width=[query-value]` - all items before the last, set the `media` attribute to `max-width`.

### Advanced image parameters

```js
{{> acc-template-image-generator
    image=bannerImage
    mediaQueries='[
        {"query": 768, "width": 768, "x2": { "w": "{$this.metadata.image.height*2}", "h": "{$this.metadata.image.height*2}"} },
        {"query": 1024, "width": 1024, "x1": {"w": "{$this.metadata.image.width>1024?1024:100%}" ,"h": "100%", "aspect": "16:9"}, "x2": {"w": "{$this.metadata.image.width>1024?2048:200%}" ,"h": "200%", "aspect": "16:9"} },
        {"query": 1025, "width": 1600, "x1": {"w": "{$this.metadata.image.width>1024?1600:100%}" ,"h": "100%", "aspect": "16:9"}, "x2": {"w": "{$this.metadata.image.width>1024?3200:200%}" ,"h": "200%", "aspect": "16:9"} }
    ]'
  classNames='banner'
}}
```

Using these additional properties for the `mediaQueries` we are adding properties to support responsive images: we are adding rendering options that will be dependent on "Device pixel ratio" (DPR) - `x1` supports standard image resolutions and `x2` supports Hi-res DPR. (`x1` and `x2` will be converted to `1x` and `2x` by the image generator). We have not added other higher resolution (`3x`, `4x` etc.) for the sake of simplicity and readability. Anyone using the accelerators can modify the code to support other DPR.

The advanced parameters are also used for `banner-poi` [Transformation Templates (TT)](https://docs.amplience.net/contenthub/tools.html#templates) - passing the `x1` and/or `x2` parameters will add `$banner-poi$` to image request URL.

In the above example, we are also passing in a class via the `className` property - useful if you need to add a specific class for this template type.

## Further considerations and tasks

When adding a banner image you _must_ have a POI "Focal Point" added using the "Point Of Interest" application, this is to ensure we have correct rendering for mobile images.

We need the account to be able to return `metadata` with VSE urls - this is needed for the visualization to work correctly. To do so you should make sure your VSE has the correct "Schema Type" selected for your asset stores. It is suggested that you select _all_ the available types.

Finally, ensure that when provisioning your hub you select the check box to enable the content rendering service on VSE urls.

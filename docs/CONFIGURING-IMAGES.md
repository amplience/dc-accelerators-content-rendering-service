# Configuring Images

The current templates have partials (where necessary) for image templates. You can pass various parameters into the image generating template from the calling template, this means you can render images specific to your templates needs.

## Base image parameters

You can use parameters with the `handlebars` partial (?). This basic method passes the `image` object, a `settings` object  a `mediaQueries` array.

```js
{{> acc-template-image-generator
    image=this.image
    settings=this
    mediaQueries='[
        {"query": 768, "width": 768},
        {"query": 1024, "width": 1024},
        {"query": 1025, "width": 1600}
    ]'
}}
```

Here we are passing an array of queries to our image generator partial. The last item in the array sets the <source> elements `media` attribute to `min-width=[query-value]` - all items before the last set the `media` attribute to `max-width`.

## Advanced image parameters

```js
{{> acc-template-image-generator
    image=bannerImage.image
    settings=bannerImage
    mediaQueries='[
        {"query": 768, "width": 768, "x2": { "w": "{$this.metadata.image.height*2}", "h": "{$this.metadata.image.height*2}"} },
        {"query": 1024, "width": 1024, "x1": {"w": "{$this.metadata.image.width>1024?1024:100%}" ,"h": "100%", "aspect": "16:9"}, "x2": {"w": "{$this.metadata.image.width>1024?2048:200%}" ,"h": "200%", "aspect": "16:9"} },
        {"query": 1025, "width": 1600, "x1": {"w": "{$this.metadata.image.width>1024?1600:100%}" ,"h": "100%", "aspect": "16:9"}, "x2": {"w": "{$this.metadata.image.width>1024?3200:200%}" ,"h": "200%", "aspect": "16:9"} }
    ]'
  classNames='banner'
}}
```

Using these additional properties for the `mediaQueries` we are adding properties to support responsive images: we are adding rendering options that will be dependent on "Device pixel ratio" (DPR) - `x1` support standard image resolutions and `x2` for Hi-res DPR. (`x1` and `x2` will be converted to `1x` and `2x` by the image generator).

The advanced parameters are also used for `banner-poi` [Transformation Templates (TT)](https://docs.amplience.net/contenthub/tools.html#templates) - passing the `x1` and/or `x2` parameters will add `$banner-poi$` to image request URL.

We have not added other higher resolution (`3x`, `4x` etc.) for the sake of simplicity and readability. Anyone using the accelerators can modify the code to support other DPR.

In the above example, we are also passing in a class via the `className` property - useful if you need to add a specific class for this template type. 
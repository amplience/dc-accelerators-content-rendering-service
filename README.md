<div align="center">
    <img src="https://i1.adis.ws/i/ampproduct/Amplience_Dynamic_Content_Identifier" alt="Amplience Content Authoring" title="Amplience" style="margin-left:auto; margin-right:auto; display:block;" height="200px" />
</div>



# Dynamic Content Accelerators with Content Rendering Service


This repository is intended as an accelerated starting point for implementing Amplience Dynamic Content. It contains the front-end render templates required to display the most commonly used content types.

The content rendering service automates the process of combining JSON content with handlebars templates to generate HTML that can then be added to a page on your website.

 
<div align="center">
    <a href="http://amplience.com/">
        <img src="http://i1.adis.ws/i/csdemo/dc-front-end-readme-banner" alt="Amplience Content Authoring" title="Amplience" style="margin-left:auto; margin-right:auto; display:block;" width="800px" height="300px" />
    </a>
</div>



## Table of Contents
- [Configuring the basepath](#configuring-the-basepath)
- [Installation](#installation)
- [Demo](#demo)
- [Render Dependencies](#render-dependencies)
- [Content Packages](#content-packages)
- [Setting up the Transformation Templates](#setting-up-the-transformation-templates)
- [Setting up the Content Types](#setting-up-the-content-types)
- [Locations for Icons, Cards and Visualisations](#locations-for-icons,-cards-and-visualisations)
- [Generated Builds](#generated-builds)
- [Dependencies](#dependencies)
    - [Helper scripts](#helper-scripts)
    - [3rd-party libs](#3rd-party-libs)
- [Building minified and concatenated files](#building-minified-and-concatenated-files)
- [Development](#development)
- [Bug / Feature Request](#bug-/-feature-request)
- [Contacts](#contacts)
    
## Configuring the Basepath

Before building the project, the basepath for the content types needs to be defined. This will be the location where the content types are stored. To configure this, open up the `.replace.json` file and change the content type basepath to the root URL where you are storing the content types.

In the file there is also a visualization basepath. This will be the location where you place the content in your dist folder after the project has been built. The visualization files are using this basepath to reference the correct css and javascript files in the project. The company tag can remain as "any", or be specified to a certain company store tag.

If you can't view the .replace.json file, you need to activate the feature to view hidden files in your operating system. Information on how to show hidden files for Windows, Mac and Unix this is found below:

##### Windows

There are a few options to show hidden files on Windows, but one of the easier ones is to do it from the control panel.

1. Right-click the "Start" button, then select "Control Panel".
2. Go to "Appearance and Personalization", then select "File Explorer Options".
3. Click the "View" tab.
4. Scroll down a bit and change the "Hidden files and folders" setting to "Show hidden files, folders and drives".

This was tested on Windows 10.

##### Mac

For macOS releases since Sierra, there is a shortcut for showing hidden files. To use this simply open the finder window and press `CMD + SHIFT + .`
If you press the command again it will hide the hidden files.

If using macOS older than Sierra, there is another way to show hidden files:

1. Open the Terminal found in Finder > Applications > Utilities.
2. In the Terminal, paste the following `defaults write com.apple.finder AppleShowAllFiles YES` and press enter.
3. Hold the "Option/alt" key, then right click on the finder icon in the dock and click "Relaunch"

##### Unix

For Unix-based systems, go to the directory where you want to view hidden files and press `ctrl + h`
    
## Installation - Standard Accelerators

Note that the installation requires Node version 6.14.3 or higher.


```bash
# Install dependencies 
$ npm install
$ npm install --global gulp-cli

# Build project
$ gulp
```
Open a page with desired render, e.g. localhost:9100/dist/renders/image/index.html

## Installation - Salesforce Commerce Cloud Accelerators

Salesforce Commerce Cloud (SFCC) accelerators can be installed in addition to the standard accelerators using the following commands:

```bash
# Install dependencies 
$ npm install
$ npm install --global gulp-cli

# Build project
$ gulp sfcc
```

On top of the standard build, the following files will be generated that can be used with the Amplience Dynamic Content SFCC Integration:
* ##### dist/contentTypes/sfcc-slot-accelerators.json

  slot content type schema
* ##### dist/templates/sfcc-contentWrapper.html

  rendering service 'wrapper' template
  
As accelerators need some post-rendering processes to be done, add this script to trigger them to the head section of the page, please:
```html
<script>
    function bindReady(handler) {
      var isReady = false;
    
      function ready() {
        if (isReady) {
          return;
        }
        isReady = true;
        handler();
      }
    
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', ready, false);
      } else if (window.attachEvent) {
        window.attachEvent('onload', ready);
      } else {
        var fn = window.onload;
        window.onload = function() {
          fn && fn();
          ready();
        };
      }
    }
    
    bindReady(function() {
      AmpCa.utils = new AmpCa.Utils();
      AmpCa.utils.postProcessing.execHtmlService('homepage', {});
      loryHelpers.initSliders(document.querySelectorAll('.js_slider'));
    });
</script>
```
Make sure AmpCa is already reachable, include script after connecting libs.min.js file.

For more information see <a href="https://docs.amplience.net/integration/sfccsetup.html">docs.amplience.net/integration/sfccsetup.html</a>

## Demo
Here you can find the Dynamic Content Inventory, where all the accelerator modules are shown:

<a href="http://dev-solutions.s3.amazonaws.com/dc-renders-wireframe/dist/index.html?c=ab78c8be-9f03-4a52-bde0-4ebde03b79a3"> Dynamic Content Inventory</a>

We have also created a demo page using these modules, with some added styling and functionalities. It can be found here:

<a href="https://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/homepage/index.html?c=d8b929ee-214d-48f0-90c0-4e121ca55a6f&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114"> Demo page </a>

## Render Depencencies

This diagram shows all the content types needed for the renders included in a homepage. The arrows indicate the dependencies of the different content types.

<div align="center">
    <a href="http://amplience.com/">
        <img src="http://i1.adis.ws/i/csdemo/dc-readme-homepage-2" alt="Amplience Content Authoring" title="Amplience" style="margin-left:auto; margin-right:auto; display:block;" width="900px" height="500px" />
    </a>
</div>

This diagram shows all the content types needed for the renders included in a blog. The arrows indicate the dependencies of the different content types.

<div align="center">
    <a href="http://amplience.com/">
        <img src="http://i1.adis.ws/i/csdemo/dc-readme-blog-2" alt="Amplience Content Authoring" title="Amplience" style="margin-left:auto; margin-right:auto; display:block;" width="630px" height="350px" />
    </a>
</div>

## Content Packages
Commonly used content type templates have been split up into separate packages.
Individual packages can be found in `dist/renders`, here you can edit any render templates or styling prior to running a build. Note that the actual content types are stored in a different repository, which can be found here:

https://github.com/amplience/dc-accelerators-content-types

When the project is built using gulp, the content types will be pulled from Github and placed in `dist/contentTypes`. The IDs of these content types will be the same as the basepath configured in .replace.json. For example, the image.json content type will have the ID `YOUR_BASEPATH_URL + /image.json`

To use the content rendering service, the handlebars templates need to be placed in a repository in the Amplience Content Hub so that they can be requested by the API. All of the templates can be found in `dist/templates`.
For more information on using the content rendering service, visit our documentation site <a href="https://docs.amplience.net/integration/contentrenderingservice.html"> here </a>

## Setting up the Transformation Templates

Before setting up transformation templates, you need to add an empty image to the account. This image will act as a background for the layers in the transformation templates, before they are populated with images. The empty image `empty.png` can be found in the root repository.

To display image content correctly with roundels, the handlebars template makes use of a transformation template. This needs to be set up within your Amplience account before the renders will work properly.

- Log in to Amplience OnDemand and open up the "tools" menu.
- Select the "Transformation Templates" option in the menu.
- Click the "new" button in the top right of the screen.
- Set both the "Friendly Name" and "Template Name" to be "roundel".
- In the "Additional Parameters" box, enter these parameters:

```
myasset=empty&p1_img=empty&p2_img=empty&p3_img=empty&p4_img=empty&qlt=90&roundelRatio=1&layer0=[src=/i//{$prod_img}&w=1350]&layer1=[src=/i//{$p1_img}&w={376*$roundelRatio}&right=10&bottom=10&anchor=BR&visible={$p1_img!=$myasset}&img404=roundel_fallback]&layer2=[src=/i//{$p2_img}&w={376*$roundelRatio}&left=10&bottom=10&anchor=BL&visible={$p2_img!=$myasset}]&layer3=[src=/i//{$p3_img}&w={376*$roundelRatio}&left=10&top=10&anchor=TL&visible={$p3_img!=$myasset}]&layer4=[src=/i//{$p4_img}&w={376*$roundelRatio}&right=10&top=10&anchor=TR&visible={$p4_img!=$myasset}]  
```

- Click "Create".
- Go back to your newly created transformation template in the menu, click on the cogwheel icon and select "Publish".

To add a point of interest transformation template, follow the same instructions with "Friendly Name" and "Template Name" set to "poi", and with these parameters in the "Additional Parameters" box:

```
scaleFit=poi&poi={$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h}
```

To add a roundel transformation template for the banner accelerator, follow the same instructions with "Friendly Name" and "Template Name" set to "banner-roundel", and with these parameters in the "Additional Parameters" box:

```
myasset=empty&p1_img=empty&p2_img=empty&p3_img=empty&p4_img=empty&qlt=90&roundelRatio1=1&roundelRatio2=1&roundelRatio3=1&roundelRatio4=1&layer1=[src=/i//{$p1_img}&w={$root.layer0.info.canvas.width*$roundelRatio1}&left={$root.layer0.info.canvas.width-10}&bottom=10&anchor=BR&visible={$p1_img!=$myasset}&img404=roundel_fallback]&layer2=[src=/i//{$p2_img}&w={$root.layer0.info.canvas.width*$roundelRatio2}&left=10&bottom=10&anchor=BL&visible={$p2_img!=$myasset}]&layer3=[src=/i//{$p3_img}&w={$root.layer0.info.canvas.width*$roundelRatio3}&left=10&top=10&anchor=TL&visible={$p3_img!=$myasset}]&layer4=[src=/i//{$p4_img}&w={$root.layer0.info.canvas.width*$roundelRatio4}&left={$root.layer0.info.canvas.width-10}&top=10&anchor=TR&visible={$p4_img!=$myasset}]
```

To add a point of interest transformation template for the banner accelerator, follow the same instructions with "Friendly Name" and "Template Name" set to "banner-poi", and with these parameters in the "Additional Parameters" box:

```
layer0=[scaleFit=poi&poi={$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h}&sm=c&aspect=1:1&w=768&h=768]
```

## Setting up the Content Types

When the content types have been placed at the same basepath URL as you built the project with (see section "configuring the basebath"), you can start the process of registering the content types in Dynamic Content:

- Log in to the Amplience Dynamic Content platform and navigate to the development tab.
- Click on the button "Register content type".
- Add the content type URL and the content type label. It's important that the URL is the same as the URL where the content type is hosted. Using the image content type as an example again, the URL for it would be `YOUR_BASEPATH_URL + /image.json`. You can also add icons, cards, visualisations and associated repositories if needed.
- Add a content type icon. You can either choose one from Amplience or enter the URL where your own icon is located. The URLs for the icons can be found below.
- Add a content type card. You can either choose one from Amplience or enter the URL where your own card is located. The values for the cards can be found below.
- Choose associated repositories for the content types. The content type needs to be associated with a repository for you to be able to create content there. Content types should not be associated with slot repositories.
- Add a visualisation. The visualisation files for each specific render can be found in their respective render folders in `dist/renders`, located inside the package folder. For example, the image visualisation file is located in `dist/renders/image/package`. The render folders need to be hosted at your basepath location as well. When that has been done you need to add the URL for the visualisation.html file followed by the parameters "vse" and "content", i.e. 

	```?vse={{vse.domain}}&content={{content.sys.id}}```

	For example, if the basepath for the visualisation is 

	```YOUR_BASEPATH/dist/renders/image/package/visualisation.html```

	then the URL for the visualisation would be

	```YOUR_BASEPATH/dist/renders/image/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}```
	You also need to add a label for the visualisation.

- Click save.
- Repeat this process for all the content types needed for your render.
- Navigate to the production tab and select "Create content".
- Select the content type you wish to use for your content, fill out the content form and click save.
- Enter the name of the content and which folder to save it in and click save.
- Navigate back to the production tab. You can now view the content GUID. By clicking on the icon in the top right corner of the content you can, among other things, view the content or select the content ID.

## Locations for Icons, Cards and Visualisations

#### Roundel
- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-imagewithroundel.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.

- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /roundelPosition
	- image0: /roundel

#### Link
- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-link.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.

- ##### Card

	Choose the text card. The pointer you need to add for the card is:
	- headline: /label

#### Image

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-image.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
- ##### Card

	Choose the photo card. The pointers you need to add for the card are:
	- image: /image
	- imageAlt: /imageAltText
- ##### Visualisation
	The visualisation file is located in `dist/renders/image/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/image/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`
	
#### Text

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-text.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
- ##### Card

	Choose the text card. The pointer you need to add for the card is:
	- headline: /text
	
- ##### Visualisation
	The visualisation file is located in `dist/renders/text/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/text/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`

#### Video

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-video.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
	
- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /video
- ##### Visualisation

	The visualisation file is located in `dist/renders/video/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/video/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`
	
#### Card

- ##### Icon
	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-card.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
	
- ##### Card
	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /cardName
	- image0: /cardImage/image
- ##### Visualisation
	The visualisation file is located in `dist/renders/card/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/card/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`

#### Card list

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-cardlist.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /header
	- image0: /cards/0/cardImage/image	
	- image1: /cards/1/cardImage/image
	- image2: /cards/2/cardImage/image
	- image3: /cards/3/cardImage/image
- ##### Visualisation
	The visualisation file is located in `dist/renders/cardList/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/cardList/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`
	
#### Banner
- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-banner.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.

- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /header
	- image: /bannerImage/0/image
	
- ##### Visualisation
	The visualisation file is located in `dist/renders/banner/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/banner/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`
	
#### Slider
- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-slider.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
- ##### Card

	Choose the gallery card. Examples of the pointers you need to add for the card are:
	- headline: /_title
	- image0: /slides/0/bannerImage/0/image
	- image1: /slides/1/bannerImage/0/image
	- image2: /slides/2/bannerImage/0/image	- image3: /slides/3/bannerImage/0/image
- ##### Visualisation
	The visualisation file is located in `dist/renders/slider/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/slider/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`

#### Split block

- ##### Icon
	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-splitblock.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
	
- ##### Card
	Choose the gallery card. Examples of pointers you need to add for the card are:
	- headline: /content/0/text
	- image0: /content/0/image
	- image1: /content/1/image
	- image2: /content/0/video
	- image3: /content/1/video
	
- ##### Visualisation
	The visualisation file is located in `dist/renders/splitBlock/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/splitBlock/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`
	
#### Promo banner section
- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-promobannersection.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.

- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /icon

- ##### Visualisation
	The visualisation file is located in `dist/renders/promoBannerSection/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/promoBannerSection/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`

#### Promo banner

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-promobanner.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
- ##### Card
	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /bannerSection/0/icon
	- image1: /bannerSection/1/icon
	- image2: /bannerSection/2/icon
- ##### Visualisation
	The visualisation file is located in `dist/renders/promoBanner/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/promoBanner/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`

#### External block

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-externalblock.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
- ##### Card
	Choose the text card. The pointer you need to add for the card is:
	- headline: /external
- ##### Visualisation
	The visualisation file is located in `dist/renders/externalBlock/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/externalBlock/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`

#### Snippet
- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-blogsnippet.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.

- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /title
	- image0: /image/image

#### Blog

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-blogpost.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.
- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /title
	- image0: /snippet/image/image
- ##### Visualisation

	The visualisation file is located in `dist/renders/blog/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/blog/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`

#### Homepage

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-page.png`
	
	The icons can also be found in `/dist/icons` if you want to host them somewhere yourself.

- ##### Visualisation

	The visualisation file is located in `dist/renders/homepage/package`
	Put the render folder in your basepath that you defined in .replace.json. The url for the 	visualisation to register the content type with will then be `BASEPATH + /renders/homepage/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}`

#### Slot-accelerators

This content type contains the references to assign all the other content types to slots within the Dynamic Content platform. It is registered the same way as other content types in the development tab in Dynamic Content, but is associated with a slot repository rather than a content repository.

## Generated Builds
Built renders are located in `dist/renders` folder.
Here you can find unminified and minified css, handlebars templates and the visualisation html page.
The `libs` folder contains JS dependencies for the render. Most of the files in the `libs` folder are taken from the `dist/reusable` folder, described below.
## Dependencies
All JS dependencies for renders can be found in the `dist/reusable` folder.
JS dependencies are composed of helper scripts and 3d party libs.
### Helper Script

- `utils.js` is needed to make AJAX requests to retrieve render data. It also has several methods to troubleshoot the renders.


### 3rd-party Libs
All 3d-party libs are pulled as npm dependencies and can be found in package.json

- `cms-javascript-sdk.min.js` is used to format the requested JSON content. Example usage: 

```javascript
amp.inlineContent(JSON.parse(data));
```
- `showdown.min.js` is used to parse text with markdown and convert it into semantic html.
- `lory.min.js` is a slider library and is used for slider renders.
## Building Minified and Concatenated Files
```bash
# Install dependencies 
$ npm install
$ npm install --global gulp-cli

# Build minified project
$ gulp buildAllMin
```
This will build minified and concatenated files for all renders.
 
## Development
Want to contribute? Great!
To fix a bug or enhance an existing module, follow these steps:

- Fork the repository
- Create a new branch on your fork (`git checkout -b feature/improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request to the develop branch


## Bug / Feature Request
If you find a bug, kindly contact tc@amplience.com and include your steps to reproduce the bug and the expected result.
If you’d like to request a new function, feel free to do so by emailing the same address.

## Contacts
If you have any problems, questions or comments please email tc@amplience.com or contact your customer success manager. 


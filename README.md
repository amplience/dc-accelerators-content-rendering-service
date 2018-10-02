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
    
## Installation

```bash
# Install dependencies 
$ npm install
$ npm install --global gulp-cli

# Build project
$ gulp
```
Open page with desired render, e.g. localhost:9100/dist/renders/image/index.html
## Demo
Here you can find the Dynamic Content inventory, where all the accelerator modules are shown:

```http://dev-solutions.s3.amazonaws.com/dc-renders-wireframe/dist/index.html?c=ab78c8be-9f03-4a52-bde0-4ebde03b79a3```

We have also created a demo page using these modules, with some added styling and functionalities. It can be found here:

```https://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/homepage/index.html?c=d8b929ee-214d-48f0-90c0-4e121ca55a6f&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114```

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
Individual packages can be found in `src/renders`, here you can edit any render templates or styling prior to running a build. Note that the actual content types are stored in a different repository, which can be found here:

https://github.com/amplience/dc-accelerators-content-types

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

To add a point of interest transformation template, follow the same instructions with "Friendly Name" and "Template Name" set to poi, and with these parameters in the "Additional Parameters" box:

```
scaleFit=poi&poi={$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h}
```

## Setting up the Content Types

When the content types have been placed at the same basepath URL as you built the project with (see section "configuring the basebath"), you can start the process of registering the content types in Dynamic Content:

- Log in to the Amplience Dynamic Content platform and navigate to the development tab.
- Click on the button "Register content type".
- Add the content type URL and the content type label. It's important that the URL is the same as the URL where the content type is hosted. You can also add icons, cards, visualisations and associated repositories if needed.
- Add a content type icon. You can either choose one from Amplience or enter the URL where your own icon is located. The URLs for the icons can be found below.
- Add a content type card. You can either choose one from Amplience or enter the URL where your own card is located. The URLs for the cards can be found below.
- Choose associated repositories for the content types. Content types should not be associated with slot repositories.
- Add a visualisation. The visualisation files for each specific render can be found in their respective folders in `src/renders`. The visualisation files need to be hosted at an http location as well. When that has been done you need to add the URL for the visualisation followed by the parameters "vse" and "content", i.e. 

	```?vse={{vse.domain}}&content={{content.sys.id}}```

	For example, if the basepath for the visualisation is 

	```https://dev-solutions.s3.amazonaws.com/dc-renders/dist/renders/image/package/visualisation.html```

	then the URL for the visualisation would be

	```https://dev-solutions.s3.amazonaws.com/dc-renders/dist/renders/image/package/visualisation.html?vse={{vse.domain}}&content={{content.sys.id}}```

	You also need to add a label for the visualisation.

- Click save.
- Repeat this process for all the content types needed for your render (dependencies are listed below).
- Navigate to the production tab and select "Create content".
- Select the content type you wish to use for your content, fill out the content form and click save.
- Enter the name of the content and which folder to save it in and click save.
- Navigate back to the production tab. You can now view the content GUID. By clicking on the icon in the top right corner of the content you can, among other things, view the content or select the content ID.

## Locations for Icons, Cards and Visualisations

#### Roundel
- ##### Icon

	`https://apps.dev-artifacts.adis.ws/cms-icons/develop/latest/256/ca-types-image.png`

- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /roundelPosition
	- image0: /image

#### Link
- ##### Icon

	`https://apps.dev-artifacts.adis.ws/cms-icons/master/latest/256/ca-types-cta.png`

- ##### Card


	Choose the text card. The pointer you need to add for the card is:
	- headline: /label

#### Image

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-image.png`
- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /image
- ##### Visualisation
	The visualisation file is located in `src/renders/image`
	
#### Text

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-text.png`
- ##### Card

	Choose the text card. The pointer you need to add for the card is:
	- headline: /text
	
- ##### Visualisation
	The visualisation file is located in `src/renders/text`

#### Video

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-video.png`
	
- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /video
- ##### Visualisation

	The visualisation file is located in `src/renders/video`
	
#### Card

- ##### Icon
	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-card.png`
	
- ##### Card
	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /image/image
- ##### Visualisation
	The visualisation file is located in `src/renders/card`

#### Card List

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-cardlist.png`
- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /cards/0/image/image
	- image1: /cards/1/image/image
	- image2: /cards/2/image/image
- ##### Visualisation
	The visualisation file is located in `src/renders/cardList`
	
#### Banner
- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-banner.png`

- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /image/image
	
- ##### Visualisation
	The visualisation file is located in `src/renders/banner`
	
#### Slider
- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-slider.png`
- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /slides/0/image
	- image1: /slides/1/image
	- image2: /slides/2/image
- ##### Visualisation
	The visualisation file is located in `src/renders/slider`

#### Split block

- ##### Icon
	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-splitblock.png`
	
- ##### Card
	Choose the text card. The pointer you need to add for the card is:
	- headline: /_title
	
- ##### Visualisation
	The visualisation file is located in `src/renders/splitBlock`
	
#### Promobanner section
- ##### Icon

	`http://solutions.adis.ws.s3.amazonaws.com/ca/icons/promobannersectionicon.png`

- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /icon

#### Promobanner

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-promobanner.png`
- ##### Card
	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /bannerSection/0/icon
	- image1: /bannerSection/1/icon
	- image2: /bannerSection/2/icon
- ##### Visualisation
	The visualisation file is located in `src/renders/promoBanner`

#### External Block

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-externalblock.png`
- ##### Card
	Choose the gallery text. The pointer you need to add for the card is:
	- headline: /external
- ##### Visualisation
	The visualisation file is located in `src/renders/externalBlock`

#### Snippet
- ##### Icon

	`http://apps.dev-artifacts.adis.ws/cms-icons/develop/v0.4.0/256/ca-types-splitblock.png`

- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /_title
	- image0: /image

#### Blog

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-blogpost.png`
- ##### Card

	Choose the gallery card. The pointers you need to add for the card are:
	- headline: /title
	- image0: /snippet/image/image
- ##### Visualisation

	The visualisation file is located in `src/renders/blog`

#### Homepage

- ##### Icon

	`https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/icons/icon-page.png`

- ##### Card

	Choose the text card.The pointer you need to add for the card is:
	- headline: /_title

- ##### Visualisation

	The visualisation file is located in `src/renders/homepage`
	
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
If you find a bug, kindly open an issue [here](tc@amplience.com) by including your steps to reproduce and the expected result.
If you’d like to request a new function, feel free to do so by opening an issue [here](tc@amplience.com)

## Contacts
If you have any problems, questions or comments please email tc@amplience.com or contact your customer success manager. 


# Configure Dynamic Content

## Content Types



## Content Rendering Templates

Content Rendering Templates are handlebars templates that convert the JSON content produced by a content author into HTML.

### Steps

1. Login to [Content Hub](https://ondemand.amplience.com)

2. Navigate to the Assets tab

3. Press Upload

4. Drag the template files found in dist/templates into the upload window.

![Upload Templates](../media/configure-templates.jpeg)


## Image Transformation Templates

This project makes use of [Image Transformation Templates](https://docs.amplience.net/contenthub/tools.html#templates). These contain pre-defined image manipulation rules which are used to automatically resize and crop images as well as superimpose buttons and roundels on the fly.

### Templates

Below is a list of transformation templates required by the accelerator components.

| friendly name  | name           | parameters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|----------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| roundel        | roundel        | ``` myasset=empty&p1_img=empty&p2_img=empty&p3_img=empty&p4_img=empty&p5_img=empty&qlt=90&roundelRatio=1&layer0=[src=/i//{$prod_img}&w=1350]&layer1=[src=/i//{$p1_img}&w={376*$roundelRatio}&right=10&bottom=10&anchor=BR&visible={$p1_img!=$myasset}]&layer2=[src=/i//{$p2_img}&w={376*$roundelRatio}&left=10&bottom=10&anchor=BL&visible={$p2_img!=$myasset}]&layer3=[src=/i//{$p3_img}&w={376*$roundelRatio}&left=10&top=10&anchor=TL&visible={$p3_img!=$myasset}]&layer4=[src=/i//{$p4_img}&w={376*$roundelRatio}&right=10&top=10&anchor=TR&visible={$p4_img!=$myasset}]&layer5=[src=/i//{$p5_img}&w={376*$roundelRatio}&right={$root.layer0.info.canvas.width/2-376*$roundelRatio/2}&top={$root.layer0.info.canvas.height/2-376*$roundelRatio/2}&anchor=TR&visible={$p5_img!=$myasset}] ```                                                                                                                                                                                                                                                                                                   |
| poi            | poi            | ``` scaleFit=poi&poi={$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h} ```                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| banner-roundel | banner-roundel | ``` myasset=empty&p1_img=empty&p2_img=empty&p3_img=empty&p4_img=empty&p5_img=empty&qlt=90&roundelRatio1=1&roundelRatio2=1&roundelRatio3=1&roundelRatio4=1&roundelRatio5=1&layer1=[src=/i//{$p1_img}&w={$root.layer0.info.canvas.width*$roundelRatio1}&left={$root.layer0.info.canvas.width-10}&bottom=10&anchor=BR&visible={$p1_img!=$myasset}]&layer2=[src=/i//{$p2_img}&w={$root.layer0.info.canvas.width*$roundelRatio2}&left=10&bottom=10&anchor=BL&visible={$p2_img!=$myasset}]&layer3=[src=/i//{$p3_img}&w={$root.layer0.info.canvas.width*$roundelRatio3}&left=10&top=10&anchor=TL&visible={$p3_img!=$myasset}]&layer4=[src=/i//{$p4_img}&w={$root.layer0.info.canvas.width*$roundelRatio4}&left={$root.layer0.info.canvas.width-10}&top=10&anchor=TR&visible={$p4_img!=$myasset}]?&layer5=[src=/i//{$p5_img}&w={$root.layer0.info.canvas.width*$roundelRatio5}&right={$root.layer0.info.canvas.width/2-$root.layer0.info.canvas.width*$roundelRatio5/2}&top={$root.layer0.info.canvas.height/2-$root.layer0.info.canvas.width*$roundelRatio5/2}&anchor=TR&visible={$p5_img!=$myasset}] ``` |
| banner-poi     | banner-poi     | ``` layer0=[scaleFit=poi&poi={$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h}&sm=c&aspect=1:1&w=768&h=768] ```                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

### Steps:

1. Login to [Content Hub](https://ondemand.amplience.com)

2. Navigate to Tools -> Transformation Templates

3. Press the new button to create a new Transformation Template

4. Fill out the friendly name, name and additional parameters fields

![Create Transformation Template](../media/configure-tt.jpeg)

5. Press Create and Publish

6. Repeat this process for all 4 of the transformation templates

### Upload empty.png

The transformation templates reference an “empty.png” image which must be uploaded in your assets tab and published. This image will act as a background for the layers in the transformation templates, before they are populated with images. The empty image `empty.png` can be found in the root of this project.

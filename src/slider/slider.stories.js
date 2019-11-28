import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import sliderStyles from './slider.scss';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/42041097-5281-4e6d-b506-62b08b85ab80",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/slider.json",
    "name": "accelerator-slider-1"
  },
  "slides": [{
    "@id": "http://content.cms.amplience.com/04125527-a0b0-415e-9b83-0791d7669638",
    "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
    "_meta": {
      "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
      "name": "accelerator-banner-1"
    },
    "button": {
      "label": "Read More",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
      },
      "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/blog/index.html?c=54db7a18-1768-400f-8e96-bbd2e35e4b9c&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114"
    },
    "bannerImage": {
      "@id": "http://content.cms.amplience.com/38476590-9594-4d46-8f5a-c54e293fd094",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
        "name": "accelerator-image-1"
      },
      "image": {
        "@id": "http://image.cms.amplience.com/f46fecc5-945c-451c-879e-5c974a821891",
        "_meta": {
          "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
        },
        "id": "f46fecc5-945c-451c-879e-5c974a821891",
        "name": "blue-and-pink",
        "endpoint": "csdemo",
        "defaultHost": "i1.adis.ws",
        "mediaType": "image"
      },
      "imageAltText": "lady in red",
      "seoText": "lady-in-red"
    },
    "textPositionLeft": "55",
    "textColor": "rgb(255,255,255)",
    "header": "Pretty in Pink",
    "description": "Exploring Spring & Summer Looks in London",
    "stackMobileLayout": true,
    "style": "black",
    "bannerColor": "rgb(0,0,0)",
    "bannerOpacity": 0.5
  },
    {
      "@id": "http://content.cms.amplience.com/724d4494-9f53-42ab-a55f-b328334d49ae",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
        "name": "3-new-2018-looks-banner-v2"
      },
      "button": {
        "label": "Read More",
        "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/blog/index.html?c=54db7a18-1768-400f-8e96-bbd2e35e4b9c&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114",
        "_meta": {
          "schema": "https://csdemo.com/button"
        }
      },
      "textPositionTop": "5",
      "bannerImage": {
        "@id": "http://content.cms.amplience.com/518a5161-b9de-432b-bab7-022557b7e01d",
        "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
        "_meta": {
          "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
          "name": "image-for-homepage-slider-banner-2"
        },
        "image": {
          "@id": "http://image.cms.amplience.com/47384164-dfa0-4164-8220-afbcbbc5d608",
          "_meta": {
            "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          },
          "id": "47384164-dfa0-4164-8220-afbcbbc5d608",
          "name": "yellowbricks",
          "endpoint": "csdemo",
          "defaultHost": "i1.adis.ws",
          "mediaType": "image"
        },
        "imageAltText": "3 new year banner!!",
        "seoText": "3-new-year-banner"
      },
      "textPositionLeft": "20",
      "textColor": "rgb(0,0,0)",
      "header": "3 LOOKS FOR EASTER!",
      "description": "3 ways to look great this Easter",
      "stackMobileLayout": true,
      "style": "black",
      "bannerOpacity": 0.8
    },
    {
      "@id": "http://content.cms.amplience.com/a5735e6d-1fdc-4411-8a94-4efaca4f523b",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
        "name": "head-to-toe-black-banner-v2"
      },
      "button": {
        "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/blog/index.html?c=54db7a18-1768-400f-8e96-bbd2e35e4b9c&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114",
        "label": "Read More",
        "_meta": {
          "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
        }
      },
      "textPositionTop": "0",
      "bannerImage": {
        "@id": "http://content.cms.amplience.com/eaa840ac-c4e9-4b55-8435-5a42afeca9aa",
        "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
        "_meta": {
          "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
          "name": "image-for-homepage-banner"
        },
        "image": {
          "@id": "http://image.cms.amplience.com/1dba8c4b-5625-4221-af0d-ed9583d9a6f0",
          "_meta": {
            "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          },
          "id": "1dba8c4b-5625-4221-af0d-ed9583d9a6f0",
          "name": "anya",
          "endpoint": "csdemo",
          "defaultHost": "i1.adis.ws",
          "mediaType": "image"
        }
      },
      "textPositionLeft": "15",
      "textColor": "rgb(255,255,255)",
      "header": "HEAD TO TOE IN BLACK SALE",
      "description": "What is the best way to wear all black?",
      "stackMobileLayout": true,
      "style": "white",
      "bannerColor": "rgb(0,0,0)",
      "bannerOpacity": 0.6
    },
    {
      "@id": "http://content.cms.amplience.com/38476590-9594-4d46-8f5a-c54e293fd094",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
        "name": "accelerator-image-1"
      },
      "image": {
        "@id": "http://image.cms.amplience.com/f46fecc5-945c-451c-879e-5c974a821891",
        "_meta": {
          "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
        },
        "id": "f46fecc5-945c-451c-879e-5c974a821891",
        "name": "pexels-photo-128939",
        "endpoint": "csdemo",
        "defaultHost": "i1.adis.ws",
        "mediaType": "image"
      },
      "roundel": [{
        "roundelRatio": 0.8636776524387701,
        "roundelPosition": "Top Right",
        "roundel": {
          "id": "cad6cb31-1936-4193-82de-1844a1235c91",
          "name": "pexels-photo-128939",
          "endpoint": "csdemo",
          "defaultHost": "i1.adis.ws",
          "mediaType": "image",
          "_meta": {
            "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          }
        }
      }],
      "imageAltText": "pexels-photo-128939",
      "seoText": "pexels-photo-128939",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json"
    }
  ],
  "navigationDots": true,
  "loop": true,
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/slider.json"
};

const sampleVideoContent = {
  "@id": "http://content.cms.amplience.com/05c1affc-ac26-4f4f-98dc-9f12dc912583",
  "video": {
    "@id": "http://video.cms.amplience.com/39685e7b-3dbe-43f4-aebe-df94474f994e",
    "mediaType": "video",
    "name": "Amplience Overview",
    "endpoint": "csdemo",
    "defaultHost": "i1.adis.ws"
  },
  "_title": "test_video",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/video.json"
};

storiesOf('Slider', module)
  .add('Looping', () => renderContent('acc-template-slider', sampleContent))
  .add('Non-Looping', () => renderContent('acc-template-slider', {
    ...sampleContent,
    loop: false
  }))
  .add('Without Navigation Dots', () => renderContent('acc-template-slider', {
    ...sampleContent,
    navigationDots: false
  }))
  .add('Video Slide', () => renderContent('acc-template-slider', {
    ...sampleContent,
    slides: sampleContent.slides.concat([sampleVideoContent])
  }))
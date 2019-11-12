import {
  storiesOf
} from '@storybook/html';

import addons from '@storybook/addons';
import CoreEvents from '@storybook/core-events';

import {
  renderContent
} from '../../.storybook/rendering-service';

import bannerStyles from './banner.scss';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/04125527-a0b0-415e-9b83-0791d7669638",
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
    "imageAltText": "lady-in-red",
    "seoText": "lady-in-red"
  },
  "textPositionLeft": "55",
  "textPositionTop": "50",
  "textColor": "rgb(255,255,255)",
  "header": "Pretty in Pink",
  "description": "Exploring Spring & Summer Looks in London",
  "stackMobileLayout": true,
  "bannerColor": "rgb(255,0,0)",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json"
};

storiesOf('Banner', module)
  .add('Example Content', () => renderContent('acc-template-banner', sampleContent));
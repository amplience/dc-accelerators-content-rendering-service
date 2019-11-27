import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import cardStyles from './card.scss';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/29bd9901-691f-4f35-adb2-ad93c85cd01b",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
    "name": "accelerator-card-1"
  },
  "cardImage": {
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
    "imageAltText": "pexels-photo-128939",
    "seoText": "pexels-photo-128939",
    "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json"
  },
  "cardName": "Card 1",
  "link": {
    "value": "http://google.com",
    "_meta": {
      "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
    },
    "label": "link card 1"
  },
  "description": "Card 1 description",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json"
};

storiesOf('Card', module)
  .add('Example content', () => renderContent('acc-template-card', sampleContent));
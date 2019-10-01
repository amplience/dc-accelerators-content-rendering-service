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
    "@id": "http://image.cms.amplience.com/293fae56-2d8f-459e-b375-b65e524d3c69",
    "_meta": {
      "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
    },
    "id": "293fae56-2d8f-459e-b375-b65e524d3c69",
    "name": "pexels-photo-128939",
    "endpoint": "csdemo",
    "defaultHost": "i1.adis.ws",
    "mediaType": "image"
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
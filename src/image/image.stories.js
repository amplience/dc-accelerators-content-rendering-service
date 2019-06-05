import {
  storiesOf
} from '@storybook/html';

import { renderContent } from '../../.storybook/rendering-service';

import imageStyles from './image.scss';

const sampleContent = {
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
    "name": "blue-and-pink",
    "endpoint": "csdemo",
    "defaultHost": "i1.adis.ws",
    "mediaType": "image"
  },
  "imageAltText": "lady in red",
  "seoText": "lady in red",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json"
};

storiesOf('Image', module)
  .add('Example content', () => renderContent('acc-template-image', sampleContent));
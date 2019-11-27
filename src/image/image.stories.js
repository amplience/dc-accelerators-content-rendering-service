import {
  storiesOf
} from '@storybook/html';

import { renderContent } from '../../.storybook/rendering-service';

import imageStyles from './image.scss';

export const sampleContent = {
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
    "name": "textwireframe",
    "endpoint": "solutions",
    "defaultHost": "i1.adis.ws",
    "mediaType": "image"
  },
  "roundel": [{
    "roundel": {
      "id": "cad6cb31-1936-4193-82de-1844a1235c91",
      "name": "shutterstock_151174712",
      "endpoint": "solutions",
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
};

storiesOf('Image', module)
  .add('Example content', () => renderContent('acc-template-image', sampleContent));
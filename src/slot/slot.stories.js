import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/a34ec334-0e78-41df-9bf4-5c15209bb266",
  "_meta": {
    "schema": "https://s3-eu-west-1.amazonaws.com/dev-solutions/DC-accelerators-with-CRS-v2.1.0/dist/contentTypes/slot.json",
    "lifecycle": {
      "expiryTime": "2019-06-08T22:59:59.999Z"
    },
    "name": "home-categories-m",
    "edition": {
      "start": "2019-06-07T15:00:00.000Z",
      "end": "2019-06-08T22:59:59.999Z",
      "id": "5cfa578ec9e77c00010cbcd5"
    }
  },
  "content": [{
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
    "seoText": "lady-in-red",
    "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json"
  }, {
    "@id": "http://content.cms.amplience.com/47c6b9bf-c164-4c7f-8087-1a608028108e",
    "_meta": {
      "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/splitblock.json",
      "name": "accelerator-split-block-1"
    },
    "split": "50/50",
    "content": [{
      "@id": "http://content.cms.amplience.com/bc3f11ab-ed9c-4163-8e87-ac64fec19f44",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/text.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/text.json",
        "name": "accelerator-text-1"
      },
      "text": "# Fashion For You\n\nEveryday wear to fit every occasion.\n\nWhether you are lounging or partying you need to look good wherever you are.\n\nBrowse our latest collection and be inspired by the possibilities.\n\nKeeping up with the Jones' has never been this easy."
    },
      {
        "@id": "http://content.cms.amplience.com/30bc433b-9765-4bad-8f89-bfb69da66fcd",
        "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
        "_meta": {
          "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
          "name": "accelerator-image-2"
        },
        "image": {
          "@id": "http://image.cms.amplience.com/b861b445-c05e-4319-8caf-9607b7268f9a",
          "_meta": {
            "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          },
          "id": "b861b445-c05e-4319-8caf-9607b7268f9a",
          "name": "chair-split",
          "endpoint": "csdemo",
          "defaultHost": "i1.adis.ws",
          "mediaType": "image"
        }
      }
    ],
    "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/splitblock.json"
  }],
  "@type": "https://s3-eu-west-1.amazonaws.com/dev-solutions/DC-accelerators-with-CRS-v2.1.0/dist/contentTypes/slot.json"
};

storiesOf('Slot', module)
  .add('Example content', () => renderContent('slotChooser', sampleContent));
import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import cardListStyles from './cardList.scss';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/3d35c8be-22d3-408e-8067-51dd38abaa63",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/cardlist.json",
    "name": "accelerator-card-list-1"
  },
  "heroList": false,
  "cards": [{
    "@id": "http://content.cms.amplience.com/29bd9901-691f-4f35-adb2-ad93c85cd01b",
    "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
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
        "name": "shutterstock_151174712",
        "endpoint": "csdemo",
        "defaultHost": "i1.adis.ws",
        "mediaType": "image"
      },
      "imageAltText": "shutterstock_151174712",
      "seoText": "shutterstock_151174712",
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
    "description": "Card 1 description"
  },
    {
      "@id": "http://content.cms.amplience.com/fa12ddf7-b22b-4757-a318-c9e5f778d526",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
        "name": "accelerator-card-2"
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
          "name": "shutterstock_285640730",
          "endpoint": "csdemo",
          "defaultHost": "i1.adis.ws",
          "mediaType": "image"
        },
        "imageAltText": "shutterstock_285640730",
        "seoText": "shutterstock_285640730",
        "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json"
      },
      "cardName": "Card 2",
      "link": {
        "label": "link card 2",
        "value": "http://google.com",
        "_meta": {
          "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
        }
      },
      "description": "Description card 2"
    },
    {
      "@id": "http://content.cms.amplience.com/29bd9901-691f-4f35-adb2-ad93c85cd01b",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
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
      "description": "Card 1 description"
    },
    {
      "@id": "http://content.cms.amplience.com/fa12ddf7-b22b-4757-a318-c9e5f778d526",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
        "name": "accelerator-card-2"
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
          "name": "shutterstock_285640730",
          "endpoint": "csdemo",
          "defaultHost": "i1.adis.ws",
          "mediaType": "image"
        },
        "imageAltText": "shutterstock_285640730",
        "seoText": "shutterstock_285640730",
        "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json"
      },
      "cardName": "Card 2",
      "link": {
        "label": "link card 2",
        "value": "http://google.com",
        "_meta": {
          "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
        }
      },
      "description": "Description card 2"
    }
  ],
  "header": "Card list 1",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/cardlist.json"
};

storiesOf('Card List', module)
  .add('Example content', () => renderContent('acc-template-cardList', sampleContent));
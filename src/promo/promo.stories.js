import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import promoStyles from './promo.scss';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/3b0db833-ed08-4993-aec8-c24fc0f38c5c",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
    "name": "promo-banner-single-section"
  },
  "topLine": "Click here to score 20% off with your first app order* (t&c’s apply) Click here to score 20% off with your first app order* (t&c’s apply)",
  "link": {
    "_meta": {
      "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
    },
    "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/productlist/index.html?c=f49907fd-99df-4446-85b7-4c3235aac82a&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114"
  },
  "icon": {
    "_meta": {
      "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
    },
    "id": "e028b665-2cc5-4013-b884-765d7f50e58c",
    "name": "promoiconwireframe",
    "endpoint": "csdemo",
    "defaultHost": "i1.adis.ws",
    "@id": "http://image.cms.amplience.com/e028b665-2cc5-4013-b884-765d7f50e58c",
    "mediaType": "image"
  },
  "backgroundColor": "rgb(211,211,211)",
  "toplineColor": "rgb(0,0,0)",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promo.json"
};


export const samplePromoListContent = {
  "@id": "http://content.cms.amplience.com/1b05fb00-e845-412b-80e0-33ee82789913",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobanner.json",
    "name": "accelerator-promo-banner-1"
  },
  "promoItems": [{
    "@id": "http://content.cms.amplience.com/990ecee0-6976-496a-8b77-d23cb4e42976",
    "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
    "_meta": {
      "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
      "name": "accelerator-promo-banner-section-1"
    },
    "topLine": "free next uk day delivery",
    "link": {
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
      },
      "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/productlist/index.html?c=f49907fd-99df-4446-85b7-4c3235aac82a&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114"
    },
    "backgroundColor": "rgb(0,0,0)",
    "bottomLine": "hurry ends in 3 days",
    "bottomlineColor": "rgb(255,255,255)",
    "toplineColor": "rgb(255,255,255)"
  },
    {
      "@id": "http://content.cms.amplience.com/90e694ec-a761-4c32-8581-b6c14ea37690",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
        "name": "accelerator-promo-banner-section-2"
      },
      "topLine": "40% off boots, bags and more",
      "link": {
        "_meta": {
          "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
        },
        "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/productlist/index.html?c=f49907fd-99df-4446-85b7-4c3235aac82a&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114"
      },
      "backgroundColor": "rgb(255,255,255)",
      "bottomLine": "t&c's apply, code: wrapup",
      "bottomlineColor": "rgb(0,0,0)",
      "toplineColor": "rgb(0,0,0)"
    },
    {
      "@id": "http://content.cms.amplience.com/da807558-e551-4ed1-a73a-3530a24abc6b",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
        "name": "promo-banner-section-3"
      },
      "topLine": "30% student discount",
      "link": {
        "_meta": {
          "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
        },
        "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/productlist/index.html?c=f49907fd-99df-4446-85b7-4c3235aac82a&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114"
      },
      "backgroundColor": "rgb(211,211,211)",
      "bottomLine": "excludes sale. t&c's apply",
      "toplineColor": "rgb(0,0,0)"
    }
  ],
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promolist.json"
};

storiesOf('Promo', module)
  .add('Single Promo', () => renderContent('acc-template-promo', sampleContent))
  .add('Promo List', () => renderContent('acc-template-promoList', samplePromoListContent));
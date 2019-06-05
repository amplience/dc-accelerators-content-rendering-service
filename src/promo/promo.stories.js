import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import promoStyles from '../promoList/promoList.scss';

const sampleContent = {
  "@id": "http://content.cms.amplience.com/3b0db833-ed08-4993-aec8-c24fc0f38c5c",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
    "name": "promo-banner-single-section"
  },
  "topLine": "Click here to score 20% off with your first app order* (t&c’s apply)",
  "link": {
    "_meta": {
      "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
    },
    "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/productlist/index.html?c=f49907fd-99df-4446-85b7-4c3235aac82a&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114"
  },
  "backgroundColour": "d3d3d3",
  "toplineColour": "000000",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json"
};

storiesOf('Promo', module)
  .add('Example content', () => renderContent('acc-template-promo', sampleContent));
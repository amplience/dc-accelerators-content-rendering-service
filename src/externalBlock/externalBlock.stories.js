import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import externalBlockStyles from './externalBlock.scss';

const sampleContent = {
  "@id": "http://content.cms.amplience.com/09a41f98-e99e-40b5-8736-dfd10f927e48",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/externalblock.json",
    "name": "accelerator-external-block-1"
  },
  "external": "<div class=\"test\">Parent block<div>Child block</div></div>",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/externalblock.json"
};

storiesOf('External Block', module)
  .add('Example content', () => renderContent('acc-template-externalBlock', sampleContent));
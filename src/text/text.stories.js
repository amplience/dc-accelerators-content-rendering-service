import {
  storiesOf
} from '@storybook/html';

import { renderContent } from '../../.storybook/rendering-service';

import textStyles from './text.scss';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/bc3f11ab-ed9c-4163-8e87-ac64fec19f44",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/text.json",
    "name": "accelerator-text-1"
  },
  "text": "# Fashion For You\n\nEveryday wear to fit every occasion.\n\nWhether you are lounging or partying you need to look good wherever you are.\n\nBrowse our latest collection and be inspired by the possibilities.\n\nKeeping up with the Jones' has never been this easy.",
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/text.json"
};

storiesOf('Text', module)
  .add('Example content', () => renderContent('acc-template-text', sampleContent));
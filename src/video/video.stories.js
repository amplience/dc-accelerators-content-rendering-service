import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import videoStyles from './video.scss';

const sampleContent = {
  "@id": "http://content.cms.amplience.com/05c1affc-ac26-4f4f-98dc-9f12dc912583",
  "video": {
    "@id": "http://video.cms.amplience.com/39685e7b-3dbe-43f4-aebe-df94474f994e",
    "mediaType": "video",
    "name": "Amplience Overview",
    "endpoint": "csdemo",
    "defaultHost": "i1.adis.ws"
  },
  "_title": "test_video",
  "@type": "http://schema.cms.amplience.com/eac8a783-932e-4900-bd96-bcaa84646499"
};

storiesOf('Video', module)
  .add('Example content', () => renderContent('acc-template-video', sampleContent));
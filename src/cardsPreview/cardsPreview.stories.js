import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import styles from './cardsPreview.scss';
import localStyles from './localCardsStyles.scss';

import {sampleContent} from '../slider/slider.stories';
import {sampleContent as samplePageContent} from '../page/page.stories';
import {sampleContent as sampleBlogContent} from '../blogPost/blogPost.stories';
import {sampleContent as sampleBannerContent} from '../banner/banner.stories';
import {sampleContent as sampleCardContent} from '../card/card.stories';
import {sampleContent as sampleCardListContent} from '../cardList/cardList.stories';
import {sampleContent as sampleExternalBlockContent} from '../externalBlock/externalBlock.stories';
import {sampleContent as sampleImageContent} from '../image/image.stories';
import {sampleContent as samplePromoContent} from '../promo/promo.stories';
import {samplePromoListContent as samplePromoListContent} from '../promo/promo.stories';
import {sampleContent as sampleSplitBlockContent} from '../splitBlock/splitBlock.stories';
import {sampleContent as sampleTextContent} from '../text/text.stories';
import {sampleContent as sampleVideoContent} from '../video/video.stories';


storiesOf('Cards Preview', module)
  .add('Banner card', () => renderContent('acc-template-cardsPreview', sampleBannerContent))
  .add('Blog card', () => renderContent('acc-template-cardsPreview', sampleBlogContent))
  .add('Card card', () => renderContent('acc-template-cardsPreview', sampleCardContent))
  .add('Card list card', () => renderContent('acc-template-cardsPreview', sampleCardListContent))
  .add('External block card', () => renderContent('acc-template-cardsPreview', sampleExternalBlockContent))
  .add('Image card', () => renderContent('acc-template-cardsPreview', sampleImageContent))
  .add('Page card', () => renderContent('acc-template-cardsPreview', samplePageContent))
  .add('Promo card', () => renderContent('acc-template-cardsPreview', samplePromoContent))
  .add('Promo list', () => renderContent('acc-template-cardsPreview', samplePromoListContent))
  .add('Slider card', () => renderContent('acc-template-cardsPreview', sampleContent))
  .add('Split block card', () => renderContent('acc-template-cardsPreview', sampleSplitBlockContent))
  .add('Text card', () => renderContent('acc-template-cardsPreview', sampleTextContent))
  .add('Video card', () => renderContent('acc-template-cardsPreview', sampleVideoContent));

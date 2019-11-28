import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import blogPostStyles from './blogPost.scss';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/a232e160-4c8a-4a96-97d1-635dc85bfe38",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/blog.json",
    "name": "accelerator-blog-1"
  },
  "snippet": {
    "image": {
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
        "name": "womanfashion",
        "endpoint": "csdemo",
        "defaultHost": "i1.adis.ws",
        "mediaType": "image"
      },
      "imageAltText": "womanfashion",
      "seoText": "womanfashion",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json"
    },
    "cta": {
      "label": "google",
      "value": "http://google.com",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
      }
    },
    "title": "Test snippet  title",
    "description": "Test snippet description",
    "_meta": {
      "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/snippet.json"
    }
  },
  "keywords": "Fish",
  "title": "Test snippet title",
  "content": [{
    "@id": "http://content.cms.amplience.com/04125527-a0b0-415e-9b83-0791d7669638",
    "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
    "_meta": {
      "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
      "name": "accelerator-banner-1"
    },
    "button": {
      "label": "Read More",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
      },
      "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/blog/index.html?c=54db7a18-1768-400f-8e96-bbd2e35e4b9c&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114"
    },
    "bannerImage": {
      "@id": "http://content.cms.amplience.com/38476590-9594-4d46-8f5a-c54e293fd094",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
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
      "seoText": "lady-in-red"
    },
    "textPositionLeft": "55",
    "textColor": "rgb(255,255,255)",
    "header": "Pretty in Pink",
    "description": "Exploring Spring & Summer Looks in London",
    "stackMobileLayout": true,
    "style": "black",
    "bannerColor": "rgb(0,0,0)",
    "bannerOpacity": 0.5
  },
    {
      "@id": "http://content.cms.amplience.com/38476590-9594-4d46-8f5a-c54e293fd094",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
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
      "seoText": "lady-in-red"
    },
    {
      "@id": "http://content.cms.amplience.com/6474a851-d24d-48b3-be21-599818c0a47a",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/video.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/video.json",
        "name": "accelerator-video-1"
      },
      "video": {
        "@id": "http://video.cms.amplience.com/b5b74bb9-e96a-4f33-a561-cbb560dc50b2",
        "_meta": {
          "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/video-link"
        },
        "id": "b5b74bb9-e96a-4f33-a561-cbb560dc50b2",
        "name": "SampleVideo_1280x720_1mb",
        "endpoint": "csdemo",
        "defaultHost": "i1.adis.ws",
        "mediaType": "video"
      }
    }
  ],
  "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/blogpost.json"
};

storiesOf('Blog Post', module)
  .add('Example content', () => renderContent('acc-template-blogPost', sampleContent));

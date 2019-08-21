import {
  storiesOf
} from '@storybook/html';

import {
  renderContent
} from '../../.storybook/rendering-service';

import pageStyles from './page.scss';

export const sampleContent = {
  "@id": "http://content.cms.amplience.com/d8b929ee-214d-48f0-90c0-4e121ca55a6f",
  "_meta": {
    "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/homepage.json",
    "name": "accelerator-homepage-1"
  },
  "contentTypes": [{
      "@id": "http://content.cms.amplience.com/1b05fb00-e845-412b-80e0-33ee82789913",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobanner.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobanner.json",
        "name": "accelerator-promo-banner-1"
      },
      "bannerSection": [{
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
          "backgroundColor":"rgb(211,211,211)",
          "bottomLine": "excludes sale. t&c's apply",
          "toplineColor": "rgb(0,0,0)"
        }
      ]
    },
    {
      "@id": "http://content.cms.amplience.com/42041097-5281-4e6d-b506-62b08b85ab80",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/slider.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/slider.json",
        "name": "accelerator-slider-1"
      },
      "slides": [{
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
          "bannerImage": [{
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
            "seoText": "lady in red"
          }],
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
          "@id": "http://content.cms.amplience.com/724d4494-9f53-42ab-a55f-b328334d49ae",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
            "name": "3-new-2018-looks-banner-v2"
          },
          "button": {
            "label": "Read More",
            "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/blog/index.html?c=54db7a18-1768-400f-8e96-bbd2e35e4b9c&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114",
            "_meta": {
              "schema": "https://csdemo.com/button"
            }
          },
          "textPositionTop": "5",
          "bannerImage": [{
            "@id": "http://content.cms.amplience.com/518a5161-b9de-432b-bab7-022557b7e01d",
            "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
              "name": "image-for-homepage-slider-banner-2"
            },
            "image": {
              "@id": "http://image.cms.amplience.com/47384164-dfa0-4164-8220-afbcbbc5d608",
              "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id": "47384164-dfa0-4164-8220-afbcbbc5d608",
              "name": "yellowbricks",
              "endpoint": "csdemo",
              "defaultHost": "i1.adis.ws",
              "mediaType": "image"
            },
            "imageAltText": "3 new year banner!!",
            "seoText": "3-new-year-banner"
          }],
          "textPositionLeft": "20",
          "textColor": "rgb(0,0,0)",
          "header": "3 LOOKS FOR EASTER!",
          "description": "3 ways to look great this Easter",
          "stackMobileLayout": true,
          "style": "black",
          "bannerOpacity": 0.8
        },
        {
          "@id": "http://content.cms.amplience.com/a5735e6d-1fdc-4411-8a94-4efaca4f523b",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/banner.json",
            "name": "head-to-toe-black-banner-v2"
          },
          "button": {
            "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/blog/index.html?c=54db7a18-1768-400f-8e96-bbd2e35e4b9c&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114",
            "label": "Read More",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
            }
          },
          "textPositionTop": "0",
          "bannerImage": [{
            "@id": "http://content.cms.amplience.com/eaa840ac-c4e9-4b55-8435-5a42afeca9aa",
            "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
              "name": "image-for-homepage-banner"
            },
            "image": {
              "@id": "http://image.cms.amplience.com/1dba8c4b-5625-4221-af0d-ed9583d9a6f0",
              "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id": "1dba8c4b-5625-4221-af0d-ed9583d9a6f0",
              "name": "anya",
              "endpoint": "csdemo",
              "defaultHost": "i1.adis.ws",
              "mediaType": "image"
            }
          }],
          "textPositionLeft": "15",
          "textColor": "rgb(255,255,255)",
          "header": "HEAD TO TOE IN BLACK SALE",
          "description": "What is the best way to wear all black?",
          "stackMobileLayout": true,
          "style": "white",
          "bannerColor": "rgb(0,0,0)",
          "bannerOpacity": 0.6
        }
      ],
      "navigationDots": true,
      "loop": true
    },
    {
      "@id": "http://content.cms.amplience.com/e77c1f1d-1194-47bd-b652-93fdd8e9b1e5",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobanner.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobanner.json",
        "name": "accelerator-promo-banner-single-section-1"
      },
      "bannerSection": [{
        "@id": "http://content.cms.amplience.com/3b0db833-ed08-4993-aec8-c24fc0f38c5c",
        "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/promobannersection.json",
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
        "backgroundColor": "rgb(211,211,211)",
        "toplineColor": "rgb(0,0,0)"
      }]
    },
    {
      "@id": "http://content.cms.amplience.com/a6fa84fc-6e45-4b80-90c1-08be0d612766",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/cardlist.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/cardlist.json",
        "name": "accelerator-card-list-1"
      },
      "heroList": false,
      "cards": [{
          "@id": "http://content.cms.amplience.com/7951ae04-a386-4e6d-bc38-77bbf6fc78b2",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
            "name": "accelerator-card-1"
          },
          "cardImage": {
            "@id": "http://content.cms.amplience.com/bdcf5474-c3eb-4c1e-a582-a186bf4df1bd",
            "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
              "name": "shop-card-image"
            },
            "image": {
              "@id": "http://image.cms.amplience.com/054c070d-0943-4bd4-aa48-c40fefe9b9c3",
              "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id": "054c070d-0943-4bd4-aa48-c40fefe9b9c3",
              "name": "Fashion_Womens_Collection_SS",
              "endpoint": "csdemo",
              "defaultHost": "i1.adis.ws",
              "mediaType": "image"
            }
          },
          "cardName": "Women Fashion",
          "link": {
            "label": "Shop Now",
            "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/productlist/index.html?c=ea3fdefd-298f-4891-b6f6-31de9a0788b0&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
            }
          },
          "description": "Get the latest products for women"
        },
        {
          "@id": "http://content.cms.amplience.com/0a4bf4a5-e3da-452f-91b0-a4381ccc03e2",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
            "name": "accelerator-card-2"
          },
          "cardImage": {
            "@id": "http://content.cms.amplience.com/927beb58-9ef3-4b81-9864-5a666dc6e762",
            "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
              "name": "accelerator-image-for-card-2"
            },
            "image": {
              "@id": "http://image.cms.amplience.com/e4bd0dcb-e6b0-4cda-b7fd-857ae42cf87e",
              "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id": "e4bd0dcb-e6b0-4cda-b7fd-857ae42cf87e",
              "name": "shopthelook copy",
              "endpoint": "csdemo",
              "defaultHost": "i1.adis.ws",
              "mediaType": "image"
            }
          },
          "cardName": "Shop The Look",
          "textBackgroundColor": "rgb(204,204,204)",
          "link": {
            "label": "Find products as you see them",
            "value": "http://dev-solutions.s3.amazonaws.com/ca-demo-site/dist/shop-the-look/index.html",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
            }
          },
          "description": "Find products as you see them"
        },
        {
          "@id": "http://content.cms.amplience.com/0c809693-bfd5-4310-a968-8f30207ae71b",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
            "name": "accelerator-card-3"
          },
          "cardImage": {
            "@id": "http://content.cms.amplience.com/c22872d2-d3b6-4884-89b9-41438073babb",
            "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
              "name": "accelerator-image-for-card-3"
            },
            "image": {
              "@id": "http://image.cms.amplience.com/5de21dbd-99ee-4e3b-9c0d-16eb64c68c77",
              "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id": "5de21dbd-99ee-4e3b-9c0d-16eb64c68c77",
              "name": "onlineCatalogue copy",
              "endpoint": "csdemo",
              "defaultHost": "i1.adis.ws",
              "mediaType": "image"
            }
          },
          "cardName": "Online Catalogue",
          "link": {
            "label": "View Catalogue",
            "value": "http://dev-solutions.s3.amazonaws.com/ca-demo-site/dist/shoppable-pdf-viewer/main.html?s=e6bdb253-db3c-4458-b5cc-0d90aa02e114",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
            }
          },
          "description": "Make online catalogues shoppable"
        },
        {
          "@id": "http://content.cms.amplience.com/cf98f298-cab2-49c6-ae40-523258ffe896",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
            "name": "accelerator-card-4"
          },
          "cardImage": {
            "@id": "http://content.cms.amplience.com/6d10dd9e-a9d2-4d26-8427-abea31bbbcee",
            "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
              "name": "accelerator-image-for-card-4"
            },
            "image": {
              "@id": "http://image.cms.amplience.com/77eb6cf8-ce22-4548-9822-56f160718a64",
              "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id": "77eb6cf8-ce22-4548-9822-56f160718a64",
              "name": "blog_1",
              "endpoint": "csdemo",
              "defaultHost": "i1.adis.ws",
              "mediaType": "image"
            }
          },
          "cardName": "Blog",
          "textBackgroundColor": "rgb(211,211,211)",
          "link": {
            "label": "Visit Blog",
            "value": "http://dev-solutions.s3.amazonaws.com/ca-demo-site/dist/bloglist/index.html?s=e6bdb253-db3c-4458-b5cc-0d90aa02e114&c=54db7a18-1768-400f-8e96-bbd2e35e4b9c",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
            }
          },
          "description": "Find the latest fashion in our blog"
        }
      ]
    },
    {
      "@id": "http://content.cms.amplience.com/47c6b9bf-c164-4c7f-8087-1a608028108e",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/splitblock.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/splitblock.json",
        "name": "accelerator-split-block-1"
      },
      "split": "30/70",
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
      ]
    },
    {
      "@id": "http://content.cms.amplience.com/428ee62e-5b7b-4603-b2d1-519133728147",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/splitblock.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/splitblock.json",
        "name": "accelerator-split-block---homepage"
      },
      "split": "70/30",
      "content": [{
          "@id": "http://content.cms.amplience.com/b625a9e5-0442-420d-8ad8-4527d945b66d",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "name": "accelerator-image-for-splitblock-1"
          },
          "image": {
            "@id": "http://image.cms.amplience.com/6c5e5186-7028-42d2-b0b6-c6c4d22e0c70",
            "_meta": {
              "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
            },
            "id": "6c5e5186-7028-42d2-b0b6-c6c4d22e0c70",
            "name": "lounging3",
            "endpoint": "csdemo",
            "defaultHost": "i1.adis.ws",
            "mediaType": "image"
          }
        },
        {
          "@id": "http://content.cms.amplience.com/d04fd471-ad26-4daf-902a-ed35db8f1d74",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/text.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/text.json",
            "name": "accelerator-text-for-splitblock-1"
          },
          "text": "## The Latest Looks\n\nGet ahead with the latest looks and trends of 2018 with our new range.\n\nDesign to turn heads and keep you ahead of the curve, our dazzling dresses and glittery garments won't fail to impress.\n\nTaking inspiration from Paris Fashion Week we have pulled together an unforgettable collection."
        }
      ]
    },
    {
      "@id": "http://content.cms.amplience.com/c384a60b-0e83-4fd0-9710-b0ebd584edfe",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/cardlist.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/cardlist.json",
        "name": "accelerator-card-list-2"
      },
      "heroList": false,
      "cards": [{
          "@id": "http://content.cms.amplience.com/c2d44d00-cbbb-4a47-8009-78446e6df52a",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
            "name": "accelerator-card-2-for-cardlist2"
          },
          "cardImage": {
            "@id": "http://content.cms.amplience.com/21d560fb-198e-4c00-a620-5d480c5f8932",
            "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
              "name": "accelerator-image-2-for-card2"
            },
            "image": {
              "@id": "http://image.cms.amplience.com/d998a6d0-276d-4061-a482-b0b7ce2ef3f9",
              "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id": "d998a6d0-276d-4061-a482-b0b7ce2ef3f9",
              "name": "shutterstock_167805908",
              "endpoint": "csdemo",
              "defaultHost": "i1.adis.ws",
              "mediaType": "image"
            }
          },
          "link": {
            "value": "http://dev-solutions.s3.amazonaws.com/ca-demo-site/dist/productlist/index.html?c=ea3fdefd-298f-4891-b6f6-31de9a0788b0&s=53251bf8-98b5-4699-9b03-8cac225de5ff",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
            },
            "label": "View product >>"
          }
        },
        {
          "@id": "http://content.cms.amplience.com/0a7a3e68-48c0-4d27-b842-97b4c3057291",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/card.json",
            "name": "accelerator-card-1-for-cardlist2"
          },
          "cardImage": {
            "@id": "http://content.cms.amplience.com/be803f40-7362-40b6-8231-fcf7354e3e54",
            "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
              "name": "accelerator-image-for-cardlist2"
            },
            "image": {
              "@id": "http://image.cms.amplience.com/f3c78d66-ca8a-4834-82a8-44ed93c08ecc",
              "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id": "f3c78d66-ca8a-4834-82a8-44ed93c08ecc",
              "name": "shutterstock_151174712",
              "endpoint": "csdemo",
              "defaultHost": "i1.adis.ws",
              "mediaType": "image"
            }
          },
          "link": {
            "value": "http://dev-solutions.s3.amazonaws.com/dc-demo-site/dist/productlist/index.html?c=ea3fdefd-298f-4891-b6f6-31de9a0788b0&s=e6bdb253-db3c-4458-b5cc-0d90aa02e114",
            "_meta": {
              "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/link.json"
            },
            "label": "View Product >>"
          }
        }
      ],
      "header": "Shop The Latest Fashion"
    },
    {
      "@id": "http://content.cms.amplience.com/853a3a71-b8e6-494a-950a-87b57ffff797",
      "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/splitblock.json",
      "_meta": {
        "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/splitblock.json",
        "name": "accelerator-split-block-ratio-5050"
      },
      "split": "50/50",
      "content": [{
          "@id": "http://content.cms.amplience.com/fc378ee4-fca9-45f9-a559-c6d0b6cf8a59",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/text.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/text.json",
            "name": "blacktie"
          },
          "text": "It is easy to embrace the all black look. Black is elegant and chic; black is slimming; black looks good on all skin tones; black looks good with all hair colors; black looks as good on men as it does on women. The dress code makes clothes buying and getting dressed in the morning easier. Black, however, can also be one-dimensional and boring, and while it may seem easy to dress in all black, You should always try to change it up a little with different styles."
        },
        {
          "@id": "http://content.cms.amplience.com/6bf2802a-7abe-4b99-b63f-79a15a04a0c8",
          "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
          "_meta": {
            "schema": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json",
            "name": "accelerator-image-1-for-splitblock-ratio-5050"
          },
          "image": {
            "@id": "http://image.cms.amplience.com/47384164-dfa0-4164-8220-afbcbbc5d608",
            "_meta": {
              "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
            },
            "id": "47384164-dfa0-4164-8220-afbcbbc5d608",
            "name": "yellowbricks",
            "endpoint": "csdemo",
            "defaultHost": "i1.adis.ws",
            "mediaType": "image"
          }
        }
      ]
    }
  ],
  "@type": "https://unpkg.com/dc-accelerators-content-rendering-service/dist/contentTypes/page.json"
};

storiesOf('Page', module)
  .add('Example content', () => renderContent('acc-template-page', sampleContent));
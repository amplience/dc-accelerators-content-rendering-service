import {
    storiesOf
} from '@storybook/html';

import {
    renderContent
} from '../../.storybook/rendering-service';

const sampleContent = {
    "@id": "http://content.cms.amplience.com/a34ec334-0e78-41df-9bf4-5c15209bb266",
    "_meta": {
        "schema": "https://s3-eu-west-1.amazonaws.com/dev-solutions/DC-accelerators-with-CRS-v2.1.0/dist/contentTypes/sfcc-slot-accelerators.json",
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
    "_environment": {
        "sfcc_slot": {
            "slot_id": "home-categories-m",
            "_meta": {
                "schema": "https://raw.githubusercontent.com/amplience/dc-integrations-sfcc/master/content-types/sfcc/sfcc-slot.json"
            }
        },
        "sfcc_site": {
            "site_id": "RefArch",
            "_meta": {
                "schema": "https://raw.githubusercontent.com/amplience/dc-integrations-sfcc/master/content-types/sfcc/sfcc-site.json"
            }
        }
    },
    "content": {
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
        "seoText": "lady in red",
        "@type": "https://dev-solutions.s3.amazonaws.com/DynamicContentTypes/Accelerators/image.json"
    },
    "@type": "https://s3-eu-west-1.amazonaws.com/dev-solutions/DC-accelerators-with-CRS-v2.1.0/dist/contentTypes/sfcc-slot-accelerators.json"
};

storiesOf('Salesforce Commerce Cloud Slot', module)
    .add('Example content', () => renderContent('sfcc-contentWrapper', sampleContent));
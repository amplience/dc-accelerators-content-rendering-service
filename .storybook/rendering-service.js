/**
 * This service mirrors the functionality of the Amplience rendering service. 
 * It allows local creating and debugging of templates before deploying them to the Amplience rendering service.
 */

import handlebars from 'handlebars';
import helpers from 'handlebars-helpers';
import poiLib from '../node_modules/poi-js-lib/dist/poi-lib';
import commonUtils from '../dist/utils';

helpers(
    [
        'array',
        'collection',
        'comparison',
        'date',
        'html',
        'math', 
        'misc',
        'number',
        'object',
        'regex',
        'string',
        'url',
        'markdown'
    ],
    {
        handlebars: handlebars
    }
);

let context = require.context('../src', true, /templates\/.*\.(html)$/);
let templates = {};

context.keys().forEach((filename)=>{
  let templateName = filename.split('/templates/')[1];
  templateName = templateName.replace('.html', '');
  const templateBody = context(filename);
  templates[templateName] = templateBody;
  handlebars.registerPartial(templateName, templateBody);
});

export function renderContent(templateName, contentJson) {
    const template = templates[templateName];
    if (!template) {
        throw new Error(`Unable to find template ${templateName}`);
    }
    return handlebars.compile(template)(contentJson);
}

# Extending Storybook

## Overview

This project embeds [Storybook](https://storybook.js.org/) as a component explorer. Storybook provides a mechanism to describe different components and scenarios in story files. These “.stories.js” files map a scenario to the HTML that should be displayed.

Instead of hard coding the HTML fragment for each story, this project also includes a minimal implementation of the Content Rendering Service found in “storybook/rendering-service.js”. Each story can therefore render the template on the fly by calling the following function:

```js
import { renderContent } from '../../.storybook/rendering-service';

renderContent('acc-template-image', sampleContent);
```

## Adding new components

This project is configured to look for any file named “*.stories.js” in the src folder and add them to storybook. This is configured in “.storybook/config.js”.

You can add new story files by simply adding a file and naming it following this convention.

```js
import {
  storiesOf
} from '@storybook/html';

import { renderContent } from '../../.storybook/rendering-service';

storiesOf('<component-name>', module)
    .add('story name', () => renderContent('<template-name>', <content>));
```
## Adding new stories to an existing component

You can add new stories / scenarios to existing components by inserting another “add” call into the .stories.js file for that component.

```js
storiesOf('Image', module)
    .add('story 1', () => renderContent('acc-template-image', story1Content))
    .add('story 2', () => renderContent('acc-template-image', story2Content));
```

## Adding component styles and JavaScript

Storybook will automatically include any CSS or JavaScript you import in your .stories.js file.

```js
import styles from './styleFile.scss';
import script from './scriptFile.js';
```

These resources are processed using webpack which is configured in [.storybook/webpack.config.js](../.storybook/webpack.config.js).

## Adding code to the <head> tag

If you need to include global resources like web fonts, external stylesheets or external scripts you can add these to [.storybook/preview-head.html](../.storybook/preview-head.html).

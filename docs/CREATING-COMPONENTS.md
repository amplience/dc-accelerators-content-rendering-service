# Creating Components

This project is configured to look for components that follow a specific file naming convention. The developer tools (Storybook) and the build tools (gulp) apply these conventions as follows:

## Component Layout

| convention                      | description               | build steps                                         |
|---------------------------------|---------------------------|-----------------------------------------------------|
| /src/component/templates/*.html | Handlebars Template Files | Exported to dist/templates                          |
| /src/component/*.scss           | Sass styles               | Concatenated and minified into styles.min.css       |
| /src/component/*.stories.js     | Storybook stories         | Automatically added to storybook component explorer |

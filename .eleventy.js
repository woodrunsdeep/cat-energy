const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const safeLinks = require('@sardine/eleventy-plugin-external-links');
const { DateTime } = require("luxon");
const { srcset, src } = require("./_11ty/shortcodes");


module.exports = function(config) {
    config.addPassthroughCopy('src/manifest.json');
    config.addPassthroughCopy('src/admin/*');

    config.addPlugin(eleventyNavigationPlugin);
    config.addPlugin(safeLinks);

    config.addTransform('htmlmin', (content, outputPath) => {
        if(outputPath && outputPath.endsWith('.html')) {
            let htmlmin = require('html-minifier');
            let result = htmlmin.minify(
                content, {
                    removeComments: true,
                    collapseWhitespace: true
                }
            );
            return result;
        }
        return content;
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: '_includes',
            layouts: '_layouts',
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        templateFormats: [
            'md', 'njk'
        ],
    };
}

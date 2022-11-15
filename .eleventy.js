const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const safeLinks = require('@sardine/eleventy-plugin-external-links');
const { DateTime } = require("luxon");
const capitalizeTitle = require('./src/_11ty/filters/capitalizeTitle.js')

module.exports = function (config) {
    config.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { locale: "ru" }).toFormat("d MMMM yyyy");
    });

    config.addPassthroughCopy('src/manifest.json');
    config.addPassthroughCopy('src/admin/*');
    config.addPassthroughCopy({ './node_modules/leaflet/dist/leaflet.css': 'css/leaflet.css' });

    config.addPlugin(eleventyNavigationPlugin);
    config.addPlugin(safeLinks);

    config.addFilter('ruDate', (value) => {
        return value.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).replace(' г.', '');
    });

    config.addFilter('capitalizeTitle', capitalizeTitle);

    config.addTransform('htmlmin', (content, outputPath) => {
        if (outputPath && outputPath.endsWith('.html')) {
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

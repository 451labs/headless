const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Hooks!
 *
 * Lifecycle hooks are the backbone of how you can have complete control over the output of your site.
 * Hooks are enforced via the hookInterface 'contract' defined here:
        https://github.com/Elderjs/elderjs/blob/master/src/hookInterface/hookInterface.ts
 *
 * If you read the hookInterface spec closely you'll see that each defined hook gets specific 'props' along with which of those props is 'mutable'.
 *
 * If you're a fan of 'pure' functions in JS, mutating props will probably set off alarm bells in your head. Fear not, instead of burying
 * what is mutating things deep in your application, you'll know it is probably in this file.
 *
 * Also, to help keep mutation predictable each 'hook' limits which 'props' can be manipulated and where.
 *
 */

const hooks = [
  {
    hook: 'bootstrap',
    name: 'copyAssetsToPublic',
    description:
      'Copies ./assets/ to the "distDir" defined in the elder.config.js. This function helps support the live reload process.',
    run: ({ settings }) => {
      // note that this function doesn't manipulate any props or return anything.
      // It is just executed on the 'bootstrap' hook which runs once when Elder.js is starting.

      // copy assets folder to public destination
      glob.sync(path.resolve(settings.rootDir, './assets/**/*')).forEach((file) => {
        const parsed = path.parse(file);
        // Only write the file/folder structure if it has an extension
        if (parsed.ext && parsed.ext.length > 0) {
          const relativeToAssetsFolder = path.relative(path.join(settings.rootDir, './assets'), file);
          const outputPath = path.resolve(settings.distDir, relativeToAssetsFolder);
          fs.ensureDirSync(path.parse(outputPath).dir);
          fs.outputFileSync(outputPath, fs.readFileSync(file));
        }
      });
    },
  },

  {
    hook: 'bootstrap',
    name: 'addFetchHandler',
    description: 'Add a fetch handler on the query object (available at `query.apiFetch`)',
    run: async ({ query }) => {

      const USER = process.env.WP_USER
      const PASS = process.env.WP_PASS
      const AUTH = 'Basic ' + Buffer.from(USER + ":" + PASS).toString('base64')

      const headers = new fetch.Headers()
      headers.append('Authorization', AUTH)

      const apiFetch = async function( path, querystring='' ) {
        return await fetch(`https://headless.marceloomens.com/wp-json/${path}/?context=edit&${querystring}`, {headers}).then((response) =>
          response.json()
        )
      }

      return {
        query: { ...query, apiFetch }
      }
    },
  },

  {
    hook: 'request',
    name: 'addParserObject',
    description: 'Add a cheeriojs parser object to request data on routes that may require it.',
    priority: 50,
    run: async ({ request, data }) => {
      if (request.route === 'post') {
        return {
          data: {
            ...data,
            parser: cheerio,
          },
        };
      }
    },
  },

  // If you'd like to see specific examples of how to do things that you think could help improve the template please create a GH issue.
];
module.exports = hooks;

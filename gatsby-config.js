require("dotenv").config({
  path: `.env.GATSBY_CONCURRENT_DOWNLOAD`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby WP GraphQL Apollo`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby WP GraphQL Apollo`,
        short_name: `Gatsby WPGQL A`,
        start_url: `/`,
        background_color: `#205D86`,
        theme_color: `#205D86`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: process.env.WPGRAPHQL_URL || `https://on-its-way.com/graphql`,
        verbose: true,
        schema: {
          queryDepth: 5,
          typePrefix: `Wp`,
          timeout: 30000,
        },
        develop: {
          nodeUpdateInterval: 3000,
          hardCacheMediaFiles: false,
        },
        production: {
          hardCacheMediaFiles: false,
        },
        debug: {
          // these settings are all the defaults,
          // remove them if you'd like
          graphql: {
            showQueryOnError: false,
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true,
            // a critical error is a WPGraphQL query that returns an error and no response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: true,
          },
        },
        auth: {
          htaccess: {
            username: null,
            password: null,
          },
        },
        // fields can be excluded globally.
        // this example is for wp-graphql-gutenberg.
        // since we can get block data on the `block` field
        // we don't need these fields
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
          // this shows how to exclude entire types from the schema
          // these examples are for wp-graphql-gutenberg
          CoreParagraphBlockAttributes: {
            exclude: true,
          },
          CoreParagraphBlockAttributesV2: {
            exclude: true,
          },
          CorePullquoteBlockAttributes: {
            exclude: true,
          },
        },
      },
    },
    `gatsby-plugin-offline`,
  ],
}

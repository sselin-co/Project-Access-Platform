const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  images: {
    domains: ["dl.airtable.com"],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

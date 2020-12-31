const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = {
    images: {
    domains: ["dl.airtable.com"],
  },
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
        config.plugins.push(
            new webpack.EnvironmentPlugin(localEnv)
        )

        return config
    }
}

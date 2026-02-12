const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join, dirname } = require('path');

const swaggerUiDistPath = dirname(require.resolve('swagger-ui-dist/package.json'));

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [
        './src/assets',
        './src/openapi',
        {
          input: swaggerUiDistPath,
          glob: '**/*',
          output: 'swagger-ui',
        },
      ],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
      sourceMap: true,
    }),
  ],
};

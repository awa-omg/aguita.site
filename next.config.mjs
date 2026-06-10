import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  transpilePackages: ['@huggingface/transformers'],

  webpack: (config, { isServer }) => {
    // Force browser version of transformers.js
    config.resolve.alias = {
      ...config.resolve.alias,
      '@huggingface/transformers': path.resolve(
        __dirname,
        'node_modules/@huggingface/transformers/dist/transformers.web.js'
      ),
    };

    // Ignore native node modules from onnxruntime-node
    config.externals.push({
      'onnxruntime-node': 'commonjs onnxruntime-node',
    });

    return config;
  },
}

export default nextConfig

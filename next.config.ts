import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to skip ESLint checks during the build process.

  eslint: {
    ignoreDuringBuilds: true,
  },
  // This tells Next.js to ignore TypeScript errors during the build process.

  typescript: {
    ignoreBuildErrors: true,
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports.
    // We explicitly type 'rule' as 'any' to help TypeScript.
    const fileLoaderRule = config.module.rules.find(
      (rule: any) => rule.test && rule.test.test && rule.test.test('.svg')
    );

    // Modify the file loader rule to ignore SVGs.
    // This ensures our custom SVGR loader takes precedence.
    if (fileLoaderRule) {
      // Ensure 'exclude' is an array before pushing to it, or assign if not.
      if (Array.isArray(fileLoaderRule.exclude)) {
        fileLoaderRule.exclude.push(/\.svg$/i);
      } else {
        fileLoaderRule.exclude = /\.svg$/i;
      }
    }

    // Add SVGR loader for SVG handling.
    // This transforms SVG files into React components.
    config.module.rules.push({
      test: /\.svg$/i, // Apply this rule to files ending with .svg
      issuer: /\.[jt]sx?$/, // Apply only when imported from JS/TS/JSX/TSX files
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
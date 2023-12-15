import { defineConfig } from "@pandacss/dev";
import { layerStyles } from "./style-config/layer-styles";
import { textStyles } from "./style-config/text-styles";

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  outExtension: "js",

  // Where to look for your css declarations
  // include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  include: ["./app/**/*.{ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      layerStyles,
      // scrollable: {
      //   description: 'A container that allows for scrolling',
      //   properties: {
      //     // The direction of the scroll
      //     direction: { type: 'enum', value: ['horizontal', 'vertical'] },
      //     // Whether to hide the scrollbar
      //     hideScrollbar: { type: 'boolean' }
      //   },
      //   // disallow the `overflow` property (in TypeScript)
      //   blocklist: ['overflow'],
      //   transform(props) {
      //     const { direction, hideScrollbar, ...rest } = props
      //     return {
      //       overflow: 'auto',
      //       height: direction === 'horizontal' ? '100%' : 'auto',
      //       width: direction === 'vertical' ? '100%' : 'auto',
      //       scrollbarWidth: hideScrollbar ? 'none' : 'auto',
      //       WebkitOverflowScrolling: 'touch',
      //       '&::-webkit-scrollbar': {
      //         display: hideScrollbar ? 'none' : 'auto'
      //       },
      //       ...rest
      //     }
      //   }
      // },

      tokens: {
        colors: {
          primary: { value: "#0FEE0F" },
          secondary: { value: "#EE0F0F" },
        },
        fonts: {
          body: { value: "system-ui, sans-serif" },
        },
      },
      textStyles,
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});

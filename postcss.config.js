/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // Enable CSS cascade layers support
    '@csstools/postcss-cascade-layers': {},
    
    // Enable modern color functions
    '@csstools/postcss-oklab-function': { preserve: true },
    '@csstools/postcss-color-mix-function': { preserve: true },
    
    // Enable CSS nesting (draft standard)
    'postcss-nesting': {},
    
    // PostCSS Preset Env for modern CSS features
    'postcss-preset-env': {
      stage: 2, // More stable features
      features: {
        // Enable specific modern features
        'custom-properties': false, // Already supported by browsers
        'oklab-function': true,
        'color-mix': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'cascade-layers': false, // Handled by separate plugin above
        'nesting-rules': false, // Handled by postcss-nesting
        // Advanced features that are well supported
        'logical-properties-and-values': true,
        'focus-visible-pseudo-class': true,
        'focus-within-pseudo-class': true,
        'gap-properties': true,
        'place-properties': true,
        'image-set-function': true,
        // Stable features
        'double-position-gradients': true,
        'any-link-pseudo-class': true,
        'is-pseudo-class': true,
      },
      // Browser support targets
      browsers: [
        'defaults',
        'not IE 11',
        'not IE_Mob 11',
        'maintained node versions'
      ],
      // Autoprefixer configuration
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace'
      }
    }
  }
}
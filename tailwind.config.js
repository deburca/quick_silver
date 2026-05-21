/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // SDC component templates, scripts, and styles.
    "./components/**/*.{twig,js,css}",
    // Theme template overrides.
    "./templates/**/*.twig",
    // Theme JavaScript.
    "./lib/**/*.js",
    // CSS source (catches @apply usage).
    "./src/**/*.css",
    // SDC components from contrib and custom modules.
    "../../../modules/contrib/*/components/**/*.{twig,js,css}",
    "../../../modules/custom/*/components/**/*.{twig,js,css}",
    "../../../modules/hivelog/components/**/*.{twig,js,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

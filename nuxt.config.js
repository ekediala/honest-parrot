export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Honest Parrot',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'text/javascript',
        src: 'https://kit.fontawesome.com/26466c8eb9.js'
      }
    ]
  },

  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    [
      'nuxt-validate',
      {
        lang: 'en',
        nuxti18n: {
          locale: {
            'en-GB': 'en-GB'
          }
        }
        // regular vee-validate options
      }
    ]
  ],
  /*
   ** Build configuration
   */

  toast: {
    position: 'top-right',
    duration: 2000
  },

  axios: {
    baseURL: 'https://www.parrot.konetweb.com.ng'
  },

  loading: {
    name: 'chasing-dots',
    color: 'transparent',
    background: 'white',
    height: '4px'
  },

  auth: {
    strategies: {
      redirect: {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: '/dashboard'
      },
      local: {
        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: { url: '/api/logout', method: 'get' },
          user: false
        }
      }
    }
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

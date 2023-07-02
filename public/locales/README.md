# Information

This is the documentation for the [internationalization (i18n)](https://www.w3.org/International/questions/qa-i18n.en#Internationalization) of the website, using [next-i18next](https://github.com/i18next/next-i18next).

## Contents

### Step 1: Installation of the package `next-i18next`

In your terminal, run the following command: `npm i next-i18next react-i18next i18next`

Once it's done, you will have on your file `package.json` the installed packages.

### Step 2: Pre-configurations

You will create a new file at the root of your project named `next-i18next.config.js`.

In this file, put the following code:

```js
/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
  },
}
```

It could be any languages, and you can have as many as you want, as long as you add them in the array `locales`.

Then, in your file `next.config.js`, add the following code:

```js
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
}
```

In your `module.export`, you must add `i18n` in order to implement i18n in the project.

### Step 3: Configuration of the `_app.jsx` file

In your `_app.jsx` file, you will integrate in the import the function `appWithTranslation`, then integrate this function in your app as is:

```js
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default appWithTranslation(App)
```

### Step 4: Configuration of files to translate

There will be two functions to add in your pages that you want to translate. First, there will be the function `serverSideTranslations`. This function will display the translation from the server side.

In the files to be translated, you will add the following code:

```js
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'footer',
      ])),
    },
  }
}
```

It is possible to add the name of translation files to several pages at the same time, in order to have them translated on those pages.

This is particularly useful when you want to translate a component that is used on several pages, like in the example below.

Finally, there is the function `useTranslation` to translates the chunks of texts you want, then use it as is:

```js
import { useTranslation } from 'next-i18next'

export const Navbar = () => {
  const { t } = useTranslation('navbar')

  return (
    <Navbar>
      <p>{t('description')}</p>
    </Navbar>
  )
}
```

The function `t` will enable use of the `useTranslation` function and ('description') will be the term to be used in the `.json` files contained in the chosen languages folders.

### Step 5: Configuration of the translation files

To translate pages into several languages, you will first need to create a folder named `locales` in the `public` folder.

```
.
└── public
    └── locales
        ├── en
        |   └── common.json
        ├── es
        |   └── common.json
        └── fr
            └── common.json
```

In this folder, you will add all the sub-folders for the selected languages, named after their diminutives like the example above. In these sub-folders, you will put the same files for each translated page with the same name.

When you want to add a new file for a new page, simply create it in all the folders for the selected languages.
# Information

The only file in this directory is the accessibility (a11y) reporter for one or multiple pages. The script runs with [axe](https://www.deque.com/axe/core-documentation/api-documentation/) and the references from [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) in level AAA.

## Run

Run the following command to check pages that are potentially not accessible: `npm run a11y`

The script will then show what is missing to make them accessible, along  with links on how to fix these issues.

## Contents

In order to check one or multiple pages, add a new value in the variable `urls`.

Example:

```js
const urls = [
  pa11y("http://localhost:3000/", options),
  pa11y("http://localhost:3000/products", options),  
  pa11y("http://localhost:3000/categories", options),  
];
```

The reporter will verify the pages Home, Products, and Categories, then show what accessibility are missing for each pages.
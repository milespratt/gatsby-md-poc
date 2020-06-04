# A bare bones, Gatsby-powered, markdown-based, GitHub Pages hosted site generator

This repository is home to the source code and static files that power and supply the content for a [GitHub Pages](https://pages.github.com/) hosted static site. Creating and editing the content of the site only requires knowledge of [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

[View the demo site here](https://milespratt.github.io/gatsby-md-poc/)

## How does this work?

### Setup

1. Clone the repository
   `git clone https://github.com/milespratt/gatsby-md-poc.git`
2. Install dependencies
   `npm install`

### Managing Content

1. Start the development environment
   `npm start`
2. Open the local development site in your browser at http://localhost:8000
3. Add Markdown (.md) files to the content/pages directory to create new pages. The development site will refresh automatically, and your new pages will be added to the nav bar.

The markdown files require a minimum amount of [frontmatter](https://jekyllrb.com/docs/front-matter/). Begin each new page with the following code:

```
---
slug: "/"
title: "Home"
order: 1
type: "page"
---
```

- slug: the path the page will be served from
- title: the title of the page
- order: where the page appears in the nav bar
- type: the type of content. The currently supported types are page, event, and blogpost.

4. Add any additional content you wish using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

### Publishing Changes

This project uses the [gh-pages](https://github.com/tschaub/gh-pages) package to build and publish the static Gatsby-generated files to GitHub Pages. By default, it will publish your static content to the gh-pages branch. You can edit your repository settings to [serve this branch](https://guides.github.com/features/pages/) on GitHub Pages.

To publish your content simply run `npm run deploy`

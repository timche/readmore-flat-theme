# Contributing

## Requirements

The following dependencies should be installed on your machine:
* Git
* Node
* npm
* gulp.js – `npm install gulp -g`

## Installation

1. Fork this repository.
1. Clone your forked repository.
1. Install all dependencies with `npm install`.

## Building

This project uses gulp.js for the build process.

### gulp.js Tasks

#### `gulp`

`gulp` is our main task and will be used during the development. It compiles all files from `src/` into a `dist/` folder and watches our files on changes and re-compiles them automatically.

### `gulp build`

`gulp build` generates a production-ready build. All files are going to be minified and a .zip file will be created of the `dist/` folder that can be used to be submitted in the Chrome Web Store.

## Extension Testing

### Google Chrome
1. Open `Extensions`.
2. Activate `Developer mode`.
3. Move the `dist` folder into Chrome with the `Extensions` window opened.

## Contributing

1. Create a new branch based on `master`.
1. Do your changes.
1. Commit your changes.
1. Create a pull request.
1. Wait for Travis CI.
1. If everything went fine, your changes are maybe released in the next version.

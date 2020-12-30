## 7.css

[![npm](https://img.shields.io/npm/v/7.css)](http://npm.im/7.css)
[![gzip size](https://img.shields.io/bundlephobia/minzip/7.css)](https://unpkg.com/7.css)

A design system for building faithful recreations of old UIs.

<img alt="a screenshot of a window with the title 'My First Program' and two buttons OK and Cancel, styled like a Windows XP dialog" src="https://github.com/khang-nd/7.css/blob/main/docs/window.png?raw=true" height="133">

**7.css** is an extension of [XP.css](https://github.com/botoxparty/XP.css), which is an extension of [98.CSS](https://github.com/jdan/98.css). A CSS file that takes semantic HTML and makes it look pretty.
It does not ship with any JavaScript, so it is compatible with your frontend framework of choice.

### Installation / Usage

The easiest way to use 7.css is to import it from [unpkg](https://unpkg.com/).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>7.css example</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://unpkg.com/7.css" />
  </head>

  <body>
    <div class="window" style="margin: 32px; width: 250px">
      <div class="title-bar">
        <div class="title-bar-text">My First Program</div>
      </div>
      <div class="window-body">
        <p>Hello, world!</p>
      </div>
    </div>
  </body>
</html>
```

Alternatively, you can grab 7.css from [npm](https://www.npmjs.com/package/7.css).
```
npm install 7.css
```

Usage:
```
import "7.css/dist/7.css";
```

<!-- Here is an example of [7.css being used with React](https://codesandbox.io/s/silly-bas-dln9t?file=/src/index.js), and [an example with vanilla JavaScript](https://codesandbox.io/s/vigilant-night-2jkz3?file=/index.html). -->

Refer to the [documentation page](https://khang-nd.github.io/7.css/) for specific instructions on this library's components.

### Developing

Clone the repo and run `npm install`.

The core styles are managed in [`gui`](https://github.com/khang-nd/7.css/tree/main/gui).

You can use `npm start` to start a development environment that will watch for file changes and rebuild the files, reloading your browser in the process.

You can run a build manually with `npm run build`. This will write to the `dist/` directory.

### Issues, Contributing, etc.

I would love to see other people's work on gui.css, if anyone else if up for creating a theme for another OS using this framework. Also new components and bugs/issues are also welcome! Feel free to contribute in whatever way you like!

### License

[MIT](https://github.com/khang-nd/7.css/blob/main/LICENSE)

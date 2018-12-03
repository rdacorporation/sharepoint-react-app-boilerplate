let fs = require('fs-jetpack'),
  path = require('path'),
  inline = require('inline-css');

// This inlines the css of the HTML coverage output as VSTS
// strips all external CSS files

const CODE_COVERAGE_DIRECTORY = './coverage';

const files = fs.find(CODE_COVERAGE_DIRECTORY, { matching: '*.html' });
files.forEach(filePath => {
  let options = {
    url: 'file://' + path.resolve(filePath),
    extraCss:
      '.wrapper {height: initial;} .clearfix { display: inline-block; } table {width: 1px;} .cline-any, .line-count {font-size: 12px;line-height: 16px;}'
  };

  const data = fs.read(path.resolve(filePath));
  inline(data, options)
    .then(html => {
      let outputFile = path.resolve(filePath);
      fs.write(outputFile, html);
    })
    .catch(err => {
      console.log(err);
    });
});

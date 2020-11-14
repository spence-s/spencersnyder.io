module.exports = {
  "*.md": [
    filenames => filenames.map(filename => `prettier --write ${filename}`),
    filenames => filenames.map(filename => `remark ${filename} -qfo`)
  ],
  'package.json': 'fixpack',
  '*.js': 'xo --fix'
};

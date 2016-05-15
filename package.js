Package.describe({
  name: 'romejiang:wechat-pay',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'This is a library to use weixin pay',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/romejiang/wechat-pay',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({"MD5": "1.2.1"});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'underscore',
    'http',
    'service-configuration',
    'peerlibrary:xml2js',
    "jparker:crypto-md5"
  ]);

  api.addFiles([
    'wxpay.js',
    'wxPayUtil.js'
  ],'server');

  if (api.export){
    api.export('WXPay','server');
    api.export('WxPayUtil','server');
  }
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('hanagm:wxpay');
  api.addFiles('wxpay-tests.js');
});

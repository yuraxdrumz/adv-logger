# adv-logger

[![Build Status](https://travis-ci.org/yuraxdrumz/adv-logger.svg?branch=master)](https://travis-ci.org/yuraxdrumz/adv-logger)

A simple utility method for logging similar to *console.log* , but
shows filename where it was called and line number. every argument
will be printed on a different line with its type and a random color
using chalk npm package.

this utility only uses 2 dependencies and writes using process.stdout.write,
which allows you to overwrite your console.log if you desire.


## Usage

First, install the package using npm:

`npm install adv-logger --save`

Then, require it and use it like so:

`const log = require('adv-logger');`

![alt text](https://i.imgsafe.org/ba9cec6e8a.png)


### Output
from 1.2.1 logger will show type of every argument and color randomly, for faster debugging of course :)
the output is exactly what you would expect.
from 1.2.4 added multiline support for es2015's backticks.
1.2.82 features - if you log nothing, console will output no arguments passed.
1.2.84 features - everything is returned stringified already no need for `JSON.stringify();`

1.2.85 features - added comments, if you want to override default console.log with this logger you
can simply do this:

![alt text](https://i.imgsafe.org/e7cf4ed101.png)

![alt text](https://i.imgsafe.org/ba9c47e1d0.png)
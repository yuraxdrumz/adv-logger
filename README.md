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

everything except functions and multi lines is returned stringified.


1.2.85 features - added comments, if you want to override default console.log with this logger you
can simply do this:
![alt text](https://i.imgsafe.org/e7cf4ed101.png)

![alt text](https://i.imgsafe.org/ba9c47e1d0.png)
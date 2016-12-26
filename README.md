# adv-logger

[![Build Status](https://travis-ci.org/yuraxdrumz/adv-logger.svg?branch=master)](https://travis-ci.org/yuraxdrumz/adv-logger)

A simple utility method for logging similar to *console.log* , but
with file name, line number, custom typeof and random color.

this utility only uses 2 dependencies and writes using process.stdout.write,
which allows you to overwrite your console.log if you desire.


![alt text](https://i.imgsafe.org/e7cf4ed101.png)

## Usage

the logger will automatically stringify everything for you except functions and multi-lines.
the logger automatically resolves paths for you if they exist in your system,
note that on files you have to write the extension for it to work, otherwise it will evaluate to a string!.
First, install the package using npm:

`npm install adv-logger --save`

Then, require it and use it like so:

`const log = require('adv-logger');`

![alt text](https://i.imgsafe.org/19a450d1ac.png)


### Output

logger will return one the next types for easier debugging:


``` ['number','string','object','array','multi-line','date','null','undefined','path']```

![alt text](https://i.imgsafe.org/19a628f0fa.png)

# adv-logger

[![Build Status](https://travis-ci.org/yuraxdrumz/adv-logger.svg?branch=master)](https://travis-ci.org/yuraxdrumz/adv-logger)

A simple utility method for logging similar to *console.log* , but
with file name, line number, custom typeof and random color.

this utility writes using process.stdout.write,
which allows you to overwrite your console.log if you desire.

it is only 125 lines long and uses 0 dependencies


![alt text](https://i.imgsafe.org/e7cf4ed101.png)

## Usage
1.3.2 - features : 0 dependencies, only 125 lines long!.
1.3.27 - features : removed path resolving and added boolean type.
the logger will automatically stringify everything for you except functions and multi-lines.
First, install the package using npm:

`npm install adv-logger --save`

Then, require it and use it like so:

`const log = require('adv-logger');`

![alt text](https://i.imgsafe.org/19a450d1ac.png)


### Output

logger will return one the next types for easier debugging:


``` ['number','string','object','array','multi-line','date','null','undefined','boolean','error']```

![alt text](https://i.imgsafe.org/19a628f0fa.png)

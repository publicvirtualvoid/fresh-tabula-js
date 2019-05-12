# fresh-tabula-js
> Convert tables inside PDFs to CSV. Node wrapper for [`tabular-java`](https://github.com/tabulapdf/tabula-java).

This is a maintained fork of the [`tabula-js`](https://github.com/ezodude/tabula-js) package.

## Contents

- [Contents](#contents)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installing](#installing)
  - [Usage](#usage)
  - [Options](#options)
  - [Examples](#examples)
    - [extractCsv no options](#extractcsv-no-options)
    - [extractCsv with options](#extractcsv-with-options)
    - [streamCsv](#streamcsv)
    - [streamCsv uses highland streams](#streamcsv-uses-highland-streams)
- [Acknowledgements](#acknowledgements)

## Getting Started

### Requirements

- Java Development Kit (JDK) with `java` available on command-line
- Node.js/npm

### Installing

To install as a dependency via `npm`:

```
$ npm install --save fresh-tabula-js
```

### Usage

Simply import the module:

```javascript
const tabula = require('fresh-tabula-js');
const table = tabula('data/foobar.pdf');
table.extractCsv((err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

### Options

Not all [tabula-java options](https://github.com/tabulapdf/tabula-java#usage-examples) are exposed. Particularly wirting to file but any extracted data is available through a callback or a stream.

Here are the options (for options with no value, pass `true` as the value):

```
Options:

area <AREA>           Portion of the page to analyze (top,left,bottom,right).
                       Example: "269.875,12.75,790.5,561". Default is entire page.
                       If there are multiple areas to analyze:
                       Example: ["269.875,12.75,790.5,561", "132.45,23.2,256.3,534"]

columns <COLUMNS>     X coordinates of column boundaries. Example 
                      "10.1,20.2,30.3"

debug                 Print detected table areas instead ofprocessing.

guess                 Guess the portion of the page to analyze per page.

silent                Suppress all stderr output.

noSpreadsheet        Force PDF not to be extracted using spreadsheet-style 
                     extraction 
                      (if there are ruling lines separating each cell, as in a PDF of an Excel spreadsheet)

pages <PAGES>        Comma separated list of ranges, or all.
                      Examples: pages: "1-3,5-7", pages: "3" or pages: "all". Default is pages: "1"

spreadsheet          Force PDF to be extracted using spreadsheet-style  
                     extraction
                     (if there are ruling lines separating each cell, as in a PDF of an Excel spreadsheet)

password <PASSWORD>  Password to decrypt document. Default is empty

useLineReturns       Use embedded line returns in cells. (Only in spreadsheet 
                     mode.)
```

### Examples

#### extractCsv no options

This is the simplest use case. It's uses a classic node style callback ```(err, data)```. The extracted CSV is an array of all rows found in the data table including any headers.

``` js
const tabula = require('tabula-js');
const t = tabula(source.pdf);
t.extractCsv((err, data) => console.log(data));
```

#### extractCsv with options

Here we use the ```area``` option to zero in on the data.

``` js
const tabula = require('tabula-js');
const t = tabula(source.pdf, {area: "269.875,150,690,545"});
t.extractCsv((err, data) => console.log(data));
```

#### streamCsv

Is similar to the callback version but with data extracted as a stream.

``` js
const tabula = require('tabula-js');
const stream = tabula(source.pdf).streamCsv();
stream.pipe(process.stdout);
```

#### streamCsv uses highland streams

In reality the library is built on the notion of streams all the way down. [Highland.js](http://highlandjs.org/) is used to make this a breeze.

This also means the returned stream can readily perform [highland.js](http://highlandjs.org/) style transformations and operations.

``` js
const tabula = require('tabula-js');
const stream = tabula(source.pdf).streamCsv();
stream
.split()
.doto(console.log)
.done(() => console.log('ALL DONE!'));
```

## Acknowledgements

* [Ezo Saleh](https://github.com/ezodude), [original author](https://github.com/ezodude/tabula-js)
* [tabula-java](https://github.com/tabulapdf/tabula-java) team

# achecker
A wrapper for the achecker.ca API.

## Install via NPM!
```
npm install achecker
```

## Example usage
```js
var achecker = require('achecker');

var checker = new achecker({
    key: 'YOUR_API_KEY',
    uri: 'URI_OF_PAGE_TO_CHECK'
}, function (result){
   console.log(result);
});

```

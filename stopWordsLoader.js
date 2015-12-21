var fs = require('fs');

var readline = require('readline');
var stream = require('stream');

var importStopWordsOneFile = function(file, index, callback) {
  var instream = fs.createReadStream(file);
  var outstream = new stream;
  
  var rl = readline.createInterface(instream, outstream);

  rl.on('line', function(line) {
    line = line.toLowerCase();
    if (index[line] === undefined) {
      index[line] = 1;
    }
  });

  rl.on('close', function() {
    callback();
  });
}

var importStopWords = exports.importStopWords = function(arrayOfFiles, index, callback) {
  var callbacksDone = [];
  arrayOfFiles.forEach(function(file, i) {
    importStopWordsOneFile(file, index, function() {
      callbacksDone.push(i);
      if (callbacksDone.length === arrayOfFiles.length) {
        callback();
      }
    })
  });
}
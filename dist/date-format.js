'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var test = __dirname + '/files-to-format/l.txt';

// fs.readFile(test, e => console.log(e));

_fs2.default.readFile(test, 'utf8', function (e, t) {
  var text = _iconvLite2.default.encode(t, 'utf8').toString();

  var test = text.split('\n').slice(3).reduce(function (acc, currentStr, index) {

    var restStr = currentStr.slice(24);
    var currentDate = (0, _moment2.default)(currentStr.slice(0, 22));
    var formattedDate = currentDate.format('YYYY-MM-DD hh:mm:ss');
    // console.log(currentDate.format('YYYY-MM-DD hh:mm:ss') + 'firtns')
    if (index === 0) return [].concat(_toConsumableArray(acc), [formattedDate + '  ' + restStr]);

    var prevDate = (0, _moment2.default)(acc[acc.length - 1].substr(0, 19));

    if (!currentStr) return acc;
    // console.log(currentDate.add(1, 'days').format('YYYY-MM-DD hh:mm:ss'));
    return [].concat(_toConsumableArray(acc), [(currentDate.date() >= prevDate.date() ? formattedDate : currentDate.add(1, 'days').format('YYYY-MM-DD hh:mm:ss')) + '   ' + restStr]);

    // console.log(moment(currentStr.slice(0, 22)).format('  YYYY-MM-DD hh:mm:ss'), currentStr.slice(0, 22));

    // console.log(prevDate);
    // return [...acc, `${ moment(currentStr.slice(0, 22)).format('  YYYY-MM-DD hh:mm:ss') }  ${ restStr }`];
  }, []);
  _fs2.default.writeFile('test.txt', test.join('\n'), function (e, t) {
    return console.log(e, t);
  });
});
import fs from 'fs';
import iconv from 'iconv-lite';
import moment from 'moment';

const test = `${ __dirname }/files-to-format/l.txt`;

// fs.readFile(test, e => console.log(e));

fs.readFile(test, 'utf8', (e, t) => {
  const text = iconv.encode(t, 'utf8').toString();

  const test = text.split('\n').slice(3).reduce((acc, currentStr, index) => {

    const restStr = currentStr.slice(24);
    const currentDate = moment(currentStr.slice(0, 22));
    const formattedDate = currentDate.format('YYYY-MM-DD hh:mm:ss');
    // console.log(currentDate.format('YYYY-MM-DD hh:mm:ss') + 'firtns')
    if (index === 0) return [...acc, `${ formattedDate }  ${ restStr }`];

    const prevDate = moment(acc[acc.length - 1].substr(0, 19));

    if (!currentStr) return acc;
    // console.log(currentDate.add(1, 'days').format('YYYY-MM-DD hh:mm:ss'));
    return [...acc, `${ currentDate.date() >= prevDate.date() ? formattedDate : currentDate.add(1, 'days').format('YYYY-MM-DD hh:mm:ss') }   ${ restStr }`];

    // console.log(moment(currentStr.slice(0, 22)).format('  YYYY-MM-DD hh:mm:ss'), currentStr.slice(0, 22));

    // console.log(prevDate);
    // return [...acc, `${ moment(currentStr.slice(0, 22)).format('  YYYY-MM-DD hh:mm:ss') }  ${ restStr }`];
  }, []);
  fs.writeFile('test.txt', test.join('\n'), (e, t) => console.log(e, t));
});

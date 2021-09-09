'use strict';

let exec = require('child_process').exec;

exec('npm outdated --json', (err, stdout, sdterr) => {
  if (!stdout) {
    process.exit();
  }
  console.log('---------------------------------------------');
  console.log('To see the results locally use: npm run depend');
  console.log(':::::::::::::::::::::::::::::::::::::::::::::');
  const json = JSON.parse(stdout);
  let fail = false;

  for (const property in json) {
    let majorChange = true;
    try {
      if (hasBreakingChange(json, property) && isNotUpdate(json, property)) {
        fail = true;
        majorChange = false;
      }
    } catch (error) {
      console.log(error);
    }

    if (majorChange) {
      console.log(
        `Warning: ${property}: Current: ${json[property].current} -> Wanted: ${json[property].wanted} -> Suggested: ${json[property].latest}`
      );
    } else {
      console.log(
        `Please update: ${property}: Current: ${json[property].current} -> Wanted: ${json[property].wanted}`
      );
    }
    console.log('---------------------------------------------');
  }

  process.exit(fail ? 1 : 0);
});

const hasBreakingChange = (json, property) =>
  parseInt(json[property].latest.split('.')[0]) <=
  parseInt(json[property].current.split('.')[0]);

const isNotUpdate = (json, property) =>
  !(
    parseInt(json[property].latest.split('.')[0]) ===
      parseInt(json[property].wanted.split('.')[0]) &&
    (parseInt(json[property].latest.split('.')[1]) <
      parseInt(json[property].wanted.split('.')[1]) ||
      parseInt(json[property].latest.split('.')[2]) <
        parseInt(json[property].wanted.split('.')[2]))
  );

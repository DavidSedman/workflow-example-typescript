'use strict';

let exec = require('child_process').exec;

exec('npm outdated --json', (err, stdout, sdterr) => {
    if (!stdout) {
        process.exit();
    }

    const json = JSON.parse(stdout);
    let fail = false;

    for (const property in json) {
        let majorChange=true;
        try {
            if(parseInt(json[property].latest.split('.')[0]) <= parseInt(json[property].current.split('.')[0])) {
                fail = true;
                majorChange = false;
            }
        } catch (error) {
            console.log(error);
        }

        if (majorChange) {
            console.log('---------------------------------------------');
            console.log(`Warning: ${property}: Current: ${json[property].current} -> Suggested: ${json[property].latest}`);
        } else {
            console.log('---------------------------------------------');
            console.log(`Please update: ${property}: Current: ${json[property].current} -> Wanted: ${json[property].wanted}`);
        }
    }        
    console.log('---------------------------------------------');

    process.exit(fail? 1 : 0);
});
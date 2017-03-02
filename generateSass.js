'use strict';

let fs = require('fs');

const DIST_DIR = './dist/';
const DIST_FILE = 'measure.scss';
const UNIT_NAME = 'u';
const MULTIPLE_LIMIT = 10;

const DIVISIONS = {
    'h' : 0.5, // Half
    'q' : 0.25, // Quarter
    'qqq' : 0.75, // Three quarters
    't': 1/3, // One third
    'tt': 2/3 // Two thirds
};

const BASE_UNIT = '12';
const PROPORTIONAL_BASE_UNIT = '1';
const UNIT = 'px';
const PROPORTIONAL_UNIT = 'rem';


function getDivisions (isProportional) {
    let prop = isProportional ? 'p' : '';
    return Object.keys(DIVISIONS).map((key) => {
        return `$${key}${isProportional ? 'p' : ''}${UNIT_NAME}: $${prop}u * ${DIVISIONS[key]};`;
    }).join('\n');
}

function getMultiplications (isProportional) {

    let multiplications = '';

    let prop = isProportional ? 'p' : '';

    for (let i = 2;i <= MULTIPLE_LIMIT; i++) {
        multiplications += `$${prop}${UNIT_NAME}${i}: $${prop}u * ${i};\n`;
    };

    return multiplications;
}


function getFibonnaciSequence (base) {
    let i;
    let fib = [];

    fib[0] = +base*2;
    fib[1] = fib[0]+(+base);

    for(i=2; i<=10; i++) {
        fib[i] = fib[i-2] + fib[i-1];
    }
    return fib.map((n, i) => `$f${i}: ${n}px;`).join('\n');
}

let templateString = `/*
*   MEASURE
*   Generated ${new Date()}
*/

/*
*   Units
*/

$u: ${BASE_UNIT + UNIT};

/* Unit divisions */

${ getDivisions() }

/* Unit multiplications */

$uh: $u * 1.5;
${ getMultiplications() }
/*
*   Proportional units
*/

$pu: ${PROPORTIONAL_BASE_UNIT + PROPORTIONAL_UNIT};

/* Proportional unit divisions */

${ getDivisions(true) }

/* Proportional unit multiplications */

$puh: $pu * 1.5;
${ getMultiplications(true) }
/* Misc measurements */

@function sqrt($r) {
  $x0: 1;
  $x1: $x0;

  @for $i from 1 through 10 {
    $x1: $x0 - ($x0 * $x0 - abs($r)) / (2 * $x0);
    $x0: $x1;
  }

  @return $x1;
}

$golden_ratio: (1+sqrt(5))/2;
$silver_ratio: sqrt(2);

/* Fibonnaci Sequence */

${ getFibonnaciSequence(BASE_UNIT) }

`;

fs.writeFile(DIST_DIR + DIST_FILE, templateString, (err, resp) => {
    console.log(resp);
});
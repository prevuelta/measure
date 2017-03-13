/* eslint-env node, global process */

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

const RATIOS = {
    golden: (1+Math.sqrt(5))/2,
    silver: Math.sqrt(2),
    third: 4/3
}

const BASE_UNIT = 12;
const TYPE_SCALE_RATIO = RATIOS.golden
const LAYOUT_SCALE_RATIO = RATIOS.silver; // Silver ratio
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

    let multiplications = [];

    let prop = isProportional ? 'p' : '';

    for (let i = 2;i <= MULTIPLE_LIMIT; i++) {
        multiplications.push(`$${prop}${UNIT_NAME}${i}: $${prop}u * ${i};`);
    }

    return multiplications.join('\n')
}


function getFibonnaciSequence (base) {
    let i;
    let fib = [];

    fib[0] = +base*2;
    fib[1] = fib[0]+(+base);

    for(i = 2; i <= 10; i++) {
        fib[i] = fib[i-2] + fib[i-1];
    }
    return fib.map((n, i) => `$f${i+1}: ${n}px;`).join('\n');
}

function getTypeScale (ratio, limit = 10) {
    let base = 1 / ratio / ratio / ratio;
    return getScale('t', base, ratio, 'rem', false, limit);
}

function getScale (prefix, base, ratio, unit, round, limit = 10) {
    let scale = [];
    let prev = base

    for (let i = 0; i < limit; i++) {
        let current = prev * ratio;
        scale.push(`$${prefix}${i+1}: ${round ? Math.round(current) : Math.round(current * 1000)/1000}${unit};`);
        prev = current;
    }

    return scale.join('\n');
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

/* Ratios */

${Object.keys(RATIOS).map(k => `$${k}: ${RATIOS[k]};`).join('\n')}

/* Type scale (Default 16px) */

${ getTypeScale(TYPE_SCALE_RATIO) }

/* Layout scale */

${ getScale('l', BASE_UNIT, LAYOUT_SCALE_RATIO, 'px', true) }

/* Fibonnaci series */

${ getFibonnaciSequence(BASE_UNIT) }

`;

fs.writeFile(DIST_DIR + DIST_FILE, templateString, (err) => {
    process.stdout.write = err || 'File write successful';
});
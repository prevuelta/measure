## Measure
A quick tool for creating a measure.scss file that includes unit & proportional unit measurements, divisions and multiplications to be used in sass layout / typography.

**To generate sass file (measure.scss):**

```
node generateSass.js
```

*Voila!*

Include the measure.scss in your main sass file.

**Usage:**

```
.h3 {
    font-size: $pu;
}
section {
    margin: $u;
    width: $f6;
}
```

**Generated sass example:**

```
/*
*   MEASURE
*   Generated Fri Mar 03 2017 10:11:25 GMT+1300 (NZDT)
*/

/*
*   Units
*/

$u: 12px;

/* Unit divisions */

$hu: $u * 0.5;
$qu: $u * 0.25;
$qqqu: $u * 0.75;
$tu: $u * 0.3333333333333333;
$ttu: $u * 0.6666666666666666;

/* Unit multiplications */

$uh: $u * 1.5;
$u2: $u * 2;
$u3: $u * 3;
$u4: $u * 4;
$u5: $u * 5;
$u6: $u * 6;
$u7: $u * 7;
$u8: $u * 8;
$u9: $u * 9;
$u10: $u * 10;

/*
*   Proportional units
*/

$pu: 1rem;

/* Proportional unit divisions */

$hpu: $pu * 0.5;
$qpu: $pu * 0.25;
$qqqpu: $pu * 0.75;
$tpu: $pu * 0.3333333333333333;
$ttpu: $pu * 0.6666666666666666;

/* Proportional unit multiplications */

$puh: $pu * 1.5;
$pu2: $pu * 2;
$pu3: $pu * 3;
$pu4: $pu * 4;
$pu5: $pu * 5;
$pu6: $pu * 6;
$pu7: $pu * 7;
$pu8: $pu * 8;
$pu9: $pu * 9;
$pu10: $pu * 10;

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

$f0: 24px;
$f1: 36px;
$f2: 60px;
$f3: 96px;
$f4: 156px;
$f5: 252px;
$f6: 408px;
$f7: 660px;
$f8: 1068px;
$f9: 1728px;
$f10: 2796px;


```

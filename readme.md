# gs1-key

GS1 key generation and validation.
Formats: GTIN-8, GTIN-12, GTIN-13, GTIN-14, GSIN, SSCC

> Validates GS1 key according to [GS1](https://www.gs1.org/services/how-calculate-check-digit-manually)

## Usage
```javascript
var gs1 = require( 'gs1-key');

// Get GS1 key
console.log(gs1('01234567890')); 
//012345678905

// Get check digit
console.log(gs1.create('01234567890')); 
//5

// Valiadte
console.log(gs1.validate('012345678905'));
//true

// Get format type
console.log(gs1.formatType('012345678905'));
//GTIN-12

```
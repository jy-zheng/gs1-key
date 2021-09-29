var gs1 = require( './');
var test = require('tape');

test('GS1 Key test', function(t){
    t.equal(gs1('01234567890'),'012345678905'); //GTIN-12
    t.equal(gs1('0123456789'),'INVALID');
    t.equal(gs1('012345678'),'INVALID');
    t.equal(gs1('01234567'),'INVALID');
    t.equal(gs1('0123456'),'01234565'); //GTIN-8
  
    t.equal(gs1('48648634487'),'486486344874');
    t.equal(gs1('4864863448740'),'48648634487400');

    t.ok(gs1.validate('312348618800'));
    t.ok(gs1.validate('34345465435460'));
    t.ok(gs1.validate('34345465435463564'));
    t.ok(gs1.validate('234576345654656560'));

    t.notOk(gs1.validate('123456'));
    t.notOk(gs1.validate('1234567'));
    t.notOk(gs1.validate('12345678'));
    t.notOk(gs1.validate('234576345654656569'));
    t.notOk(gs1.validate('234576345654656564'));

    t.equal(gs1.formatType('01234567890'),'INVALID'); 
    t.equal(gs1.formatType('012345678905'),'GTIN-12');
    t.equal(gs1.formatType('012345678906'),'INVALID');

    t.equal(gs1.formatType('00015455'),'GTIN-8');
    t.equal(gs1.formatType('0001545113446'),'GTIN-13');
    t.equal(gs1.formatType('00015451134495'),'GTIN-14');
    t.equal(gs1.formatType('00015451134494111'),'GSIN');
    t.equal(gs1.formatType('000154511344941176'),'SSCC');

    t.equal(gs1.create('0123456789'),-1); // INVALID format return -1
    t.equal(gs1.create('01234567890'),5);
    
    t.end();
});
const { isErrored } = require('stream');
const { add, subtract, multiply, divide } = require('./script.js');

describe('add()', function() {
    test('adds 1 + 2 to equal 3', function(){
        expect(add(1,2)).toEqual(3);
    });
    test('adds 1 + -2 to equal -1', function(){
        expect(add(1,-2)).toEqual(-1);
    });
    test('adds 1.5 + 2.5 to equal 4', function() {
        expect(add(1.5,2.5)).toEqual(4);
    });
    test('adds b + 7 to return an error', function() {
        expect(add('b',7)).isErrored;
    });
});
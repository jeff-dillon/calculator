// const { default: test } = require('node:test');
// const { isErrored } = require('stream');
// const { describe } = require('yargs');
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
        expect( () =>add('b',7)).toThrow('Arguments must be numbers.');
    });
});

describe('subtract()', function(){
    test('subtracts 2 - 1 to equal 1', function(){
        expect(subtract(2,1)).toEqual(1);
    });
    test('subtracts 1 - -2 to equal 1', function(){
        expect(subtract(-1,-2)).toEqual(1);
    });
    test('subtracts 2.5 - 1.5 to equal 1', function() {
        expect(subtract(2.5,1.5)).toEqual(1);
    });
    test('subtracts b - 7 to return an error', function() {
        expect( () =>subtract('b',7)).toThrow('Arguments must be numbers.');
    });
});

describe('multiply()', function(){
    test('multiplies 2 x 1 to equal 1', function(){
        expect(multiply(2,1)).toEqual(2);
    });
    test('multiplies 1 x -2 to equal 1', function(){
        expect(multiply(1,-2)).toEqual(-2);
    });
    test('multiplies 2.5 x 1.5 to equal 1', function() {
        expect(multiply(2.5,1.5)).toEqual(3.75);
    });
    test('multiplies b x 7 to return an error', function() {
        expect( () =>multiply('b',7)).toThrow('Arguments must be numbers.');
    });
});

describe('divide()', function(){
    test('divides 2 / 1 to equal 1', function(){
        expect(divide(2,1)).toEqual(2);
    });
    test('divides 1 / -2 to equal 1', function(){
        expect(divide(1,-2)).toEqual(-0.5);
    });
    test('divides 2.5 / 1.5 to equal 1', function() {
        expect(divide(2.5,1.5)).toBeCloseTo(1.666);
    });
    test('divides b / 7 to return an error', function() {
        expect( () =>divide('b',7)).toThrow('Arguments must be numbers.');
    });
});
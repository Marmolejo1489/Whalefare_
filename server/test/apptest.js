/* import { assert } from 'chai'
import { test } from  */
const assert = require('chai').assert
const test = require('../keys').test

describe('App', () => {
    it('app should return something', () => {
        assert.equal(test(), 'hello')
    })
})
"use strict";
exports.__esModule = true;
exports.useCounterStore = void 0;
var vue_1 = require("vue");
var pinia_1 = require("pinia");
exports.useCounterStore = pinia_1.defineStore('counter', function () {
    var count = vue_1.ref(0);
    var doubleCount = vue_1.computed(function () { return count.value * 2; });
    function increment() {
        count.value++;
    }
    return { count: count, doubleCount: doubleCount, increment: increment };
});

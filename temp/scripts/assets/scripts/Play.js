"use strict";
cc._RFpush(module, '3c28eCaBsFG+5EU5Y6byA57', 'Play');
// scripts\Play.js

cc.Class({
    'extends': cc.Component,

    properties: {},

    bindClickControl: function bindClickControl() {
        this.node.on('mousedown', function () {
            cc.director.loadScene('Game');
        }, this);
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.bindClickControl();
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
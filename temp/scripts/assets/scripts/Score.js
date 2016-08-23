"use strict";
cc._RFpush(module, '62cc95oUf1Cv7f4TIn7z+oO', 'Score');
// scripts\Score.js

cc.Class({
    'extends': cc.Component,

    properties: {
        score: 0
    },
    gainScore: function gainScore() {
        this.score++;
        this.scoreLabel.string = 'Score:' + this.score;
    },
    getInitialState: function getInitialState(init) {
        this.scoreLabel = this.node.getComponent(cc.Label);
        this.scoreLabel.string = 'Score:' + init;
    },
    onLoad: function onLoad() {
        this.getInitialState(0);
    }
});

cc._RFpop();
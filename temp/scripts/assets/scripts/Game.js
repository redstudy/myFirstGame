"use strict";
cc._RFpush(module, '70296bpfdRCRLea3HexDfvS', 'Game');
// scripts\Game.js

cc.Class({
    'extends': cc.Component,
    properties: {
        star: {
            'default': null,
            type: cc.Prefab
        },
        ground: {
            'default': null,
            type: cc.Node
        },
        player: {
            'default': null,
            type: cc.Node
        },
        score: {
            'default': null,
            type: cc.Label
        },
        minStarDuration: 0,
        maxStarDuration: 0
    },
    getInitialState: function getInitialState() {
        this.score.getComponent('Score').game = this;
        this.player.getComponent('Player').game = this;
        this.timer = 0;
        this.starDuration = 0;
    },
    spawnStar: function spawnStar() {
        this.timer = 0;
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        var star = cc.instantiate(this.star);
        star.getComponent('Star').game = this;
        this.node.addChild(star);
    },
    spawnNode: function spawnNode() {
        this.spawnStar();
    },
    update: function update(dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }

        this.timer += dt;
    },
    gameOver: function gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('Play');
    },
    onLoad: function onLoad() {
        this.getInitialState();
        this.spawnNode();
    }
});

cc._RFpop();
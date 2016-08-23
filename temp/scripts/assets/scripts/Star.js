"use strict";
cc._RFpush(module, 'b9109skmbREILKnE8PmGzO2', 'Star');
// scripts\Star.js

cc.Class({
    'extends': cc.Component,
    properties: {
        pickRadius: 0
    },
    getDistance: function getDistance() {
        var other = this.game.player;
        var otherPos = other.getPosition();
        var dist = cc.pDistance(this.node.position, otherPos);
        return dist;
    },
    getStarPosition: function getStarPosition() {
        var game = this.game;
        var randY = this.groundT + cc.random0To1() * game.player.getComponent('Player').jumpHeight + 50;
        var randX = cc.randomMinus1To1() * game.node.width / 2;
        return {
            x: randX,
            y: randY
        };
    },
    getInitialState: function getInitialState() {
        this.groundT = this.game.ground.y + this.game.ground.height / 2;
        this.node.attr(this.getStarPosition());
    },
    onPicked: function onPicked() {
        this.game.spawnStar();
        this.node.destroy();
        this.game.score.getComponent('Score').gainScore();
    },
    picked: function picked() {
        if (this.getDistance() < this.pickRadius) {
            this.onPicked();
        }
    },
    setOpacity: function setOpacity() {
        var opacity = 50 + (1 - this.game.timer / this.game.starDuration) * (255 - 50);
        this.node.attr({
            opacity: opacity
        });
    },
    update: function update() {
        this.picked();
        this.setOpacity();
    },
    onLoad: function onLoad() {
        this.getInitialState();
    }
});

cc._RFpop();
cc.Class({
    extends: cc.Component,
    properties: {
        star: {
            default: null,
            type: cc.Prefab
        },
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        score: {
            default: null,
            type: cc.Label
        },
        minStarDuration: 0,
        maxStarDuration: 0
    },
    getInitialState: function() {
        this.score.getComponent('Score').game = this;
        this.player.getComponent('Player').game = this;
        this.timer = 0;
        this.starDuration = 0;
    },
    spawnStar: function() {
        this.timer = 0;
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        var star = cc.instantiate(this.star);
        star.getComponent('Star').game = this;
        this.node.addChild(star);
    },
    spawnNode: function() {
        this.spawnStar();
    },
    update: function(dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }

        this.timer += dt;
    },
    gameOver: function() {
        this.player.stopAllActions();
        cc.director.loadScene('Play');
    },
    onLoad: function() {
        this.getInitialState();
        this.spawnNode();
    }
});
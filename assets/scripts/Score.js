cc.Class({
    extends: cc.Component,

    properties: {
        score: 0
    },
    gainScore: function() {
        this.score++;
        this.scoreLabel.string = 'Score:' + this.score;
    },
    getInitialState: function(init) {
        this.scoreLabel = this.node.getComponent(cc.Label);
        this.scoreLabel.string = 'Score:' + init;
    },
    onLoad: function() {
        this.getInitialState(0);
    }
});
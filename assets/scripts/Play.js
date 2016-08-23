cc.Class({
    extends: cc.Component,

    properties: {

    },

    bindClickControl: function() {
        this.node.on('mousedown', function() {
            cc.director.loadScene('Game');
        }, this);
    },

    // use this for initialization
    onLoad: function() {
        this.bindClickControl();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
"use strict";
cc._RFpush(module, 'cdc9fbawOxI+JkLH2I1xIob', 'Player');
// scripts\Player.js

cc.Class({
    "extends": cc.Component,
    properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        accLeft: false,
        accRight: false,
        xSpeed: 0,
        accel: 0
    },
    createJumpAction: function createJumpAction() {
        var jumpUpAction = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDownAction = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var jump = cc.sequence(jumpUpAction, jumpDownAction);
        return cc.repeatForever(jump);
    },
    bindKeyboardControl: function bindKeyboardControl() {
        var that = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        that.accLeft = true;
                        that.accRight = false;
                        break;
                    case cc.KEY.d:
                        that.accLeft = false;
                        that.accRight = true;
                        break;

                }
            },
            onKeyReleased: function onKeyReleased(keyCode) {
                that.accLeft = that.accRight = false;
            }
        }, this.node);
    },
    bindEvent: function bindEvent() {
        this.bindKeyboardControl();
    },
    bindAction: function bindAction() {
        this.node.runAction(this.createJumpAction());
    },
    updateX: function updateX(dt) {
        var width = this.game.width / 2;
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        this.node.x += this.xSpeed * dt;
        if (this.node.x < -width || this.node > width) {
            this.node.x = 0;
            this.xSpeed *= -1;
        }
    },
    update: function update(dt) {
        this.updateX(dt);
    },
    onLoad: function onLoad() {
        this.bindAction();
        this.bindEvent();
    }
});

cc._RFpop();
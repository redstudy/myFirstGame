cc.Class({
    extends: cc.Component,
    properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        accLeft: false,
        accRight: false,
        xSpeed: 0,
        accel: 0
    },
    createJumpAction: function() {
        var jumpUpAction = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDownAction = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var jump = cc.sequence(jumpUpAction, jumpDownAction);
        return cc.repeatForever(jump);
    },
    bindKeyboardControl: function() {
        var that = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
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
            onKeyReleased: function(keyCode) {
                that.accLeft = that.accRight = false;
            }
        }, this.node);
    },
    bindEvent: function() {
        this.bindKeyboardControl();
    },
    bindAction: function() {
        this.node.runAction(this.createJumpAction());
    },
    updateX: function(dt) {
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
    update: function(dt) {
        this.updateX(dt);
    },
    onLoad: function() {
        this.bindAction();
        this.bindEvent();
    }
});
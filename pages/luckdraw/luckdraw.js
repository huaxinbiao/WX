var Draw = require('../../resources/js/draw.js');

Page({
    data: {
        share: [{
            color: '#f5871f',
            text: '奖品1',
            background: '#ffffff',
            icon: '../../resources/images/1.png'
        }, {
            color: '#1AAD16',
            text: '奖品2',
            background: '#cccccc',
            icon: '../../resources/images/2.png'
        }, {
            color: '#000000',
            text: '奖品3',
            background: '#eeeeee',
            icon: '../../resources/images/1.png'
        }, {
            color: '#333333',
            text: '奖品4',
            background: '#ffffff',
            icon: '../../resources/images/2.png'
        }, {
            color: '#666666',
            text: '奖品5',
            background: '#cccccc',
            icon: '../../resources/images/1.png'
        }, {
            color: '#999999',
            text: '奖品6',
            background: '#eeeeee',
            icon: '../../resources/images/2.png'
        }],
        angle: 0,
        anotherLength: 300,
        loops :5*360,
        animationData: {},
        i: 1,
        end: false
    },
    onLoad: function(){
        var everyAngle = 360 / this.data.share.length; //每一个圆弧的角度
        var sideLength = 300;
        // var anotherTwo = (180 - everyAngle) / 2; //圆弧的另外两个角的角度
        // var sb = 2 * sideLength * Math.cos(anotherTwo * Math.PI / 180); //三角形第三边的长度
        var theta = (everyAngle / 2 * Math.PI) / 180;
        var tn = Math.tan(theta);
        var ans1 = sideLength * tn;
        this.setData({
            anotherLength: Math.ceil(ans1),
            angle: everyAngle
        })
    },
    onReady: function (e) {
        var self = this;
    },
    start: function(){
        if (this.data.end){
            return false;
        }
        var winning = this.random();
        var animation = wx.createAnimation({
            duration: 6000,
            timingFunction: "ease"
        })
        animation.rotate((this.data.i * 2520) + (360 - (winning * this.data.angle))).step();
        this.setData({
            i: ++this.data.i,
            animationData: animation.export(),
            end: true
        })
        setTimeout(function () {
            var self = this;
            wx.showModal({
                title: '恭喜',
                content: '获得' + this.data.share[winning].text,
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        var animation1 = wx.createAnimation({
                            duration: 100,
                            timingFunction: "step-start"
                        })
                        animation1.rotate(0).step()
                        self.setData({
                            i: 1,
                            animationData: animation1.export(),
                            end: false
                        })
                    }
                }
            })
        }.bind(this), 6000)
    },
    random: function(){
        let f = length => Array.from({ length }).map((v, k) => k);
        var prize = f(this.data.share.length);
        let randomItem = items => items[Math.random() * items.length | 0];
        return randomItem(prize);
    }
})
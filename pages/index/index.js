//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        systemInfo: wx.getSystemInfoSync(),
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        x: 190,
        y: 70,
        boxHeight: 0,
        BoxArray: []
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.init();
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    init: function(){
        let BoxArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        BoxArray = [BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray, BoxArray];
        var boxHeight = this.data.systemInfo.windowHeight - 130;
        this.setData({
            boxHeight: boxHeight,
            BoxArray: BoxArray
        })
        this.start();
    },
    start: function(){
        var i = 0;
        var newShape = this.process(1);
        var timer = setInterval(function () {
            var data = {};
            for (let key in newShape) {
                if (newShape[key][0] + (i - 1) >= 0) {
                    var k = newShape[key][0] + (i - 1)
                    data['BoxArray[' + k + '][' + newShape[key][1] + ']'] = 0;
                }
                data['BoxArray[' + (newShape[key][0] + i) + '][' + newShape[key][1] + ']'] = 1;
                // if (newShape[key][0] - 1 >= 0) {
                //     let j = newShape[key][0] - 1;
                //     data['BoxArray[' + j + '][0]'] = 0;
                // }
                // data['BoxArray[' + newShape[key][0] + '][0]'] = 1;
            }
            console.log(data)
            this.setData(data);
            i++;
            if(i>=20){
                clearInterval(timer);
            }
        }.bind(this), 1000)
    },
    randomShape: function(){
        // 随机生成一种形状
        // “长条”、“左一三形”、“中一三形”、“右一三形”、“左二二形”、“四方形”和“右二二形”一共是七种形状
        var shape = [0, 1, 2, 3, 4, 5, 6]; // 七种形状
        // 每一种形状，对应着4种变化状态
        var state = [0, 1, 2, 3];
        // 随机取数组中的值
        let randomItem = items => items[Math.random() * items.length | 0];
        return [randomItem(shape), randomItem(state)]; //返回形状与对应的状态
    },
    process: function(i){
        var coordinate = [];
        switch(i){
            case 1:
                coordinate = [
                    [0, 3],
                    [0, 4],
                    [0, 5],
                    [0, 6]
                ];
                break;
            default:
        }
        return coordinate;
    }
})

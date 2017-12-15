var Draw = require('../../resources/js/draw.js');

Page({
    data: {
        wholeWidth: '',
        wholeHeight: '',
        LuckDraw: null
    },
    canvasIdErrorCallback: function (e) {
        console.error(e.detail.errMsg)
    },
    onReady: function (e) {
        var self = this;
        this.LuckDraw = new Draw({
            elem: 'firstCanvas',
            share: [{
                color: '#f5871f',
                text: '文字内容1',
                background: '#ffffff',
                icon: '../../resources/images/1.png'
            }, {
                color: '#1AAD16',
                text: '文字内容2',
                background: '#cccccc',
                icon: '../../resources/images/2.png'
            }, {
                color: '#000000',
                text: '文字内容3',
                background: '#eeeeee',
                icon: '../../resources/images/1.png'
            }, {
                color: '#333333',
                text: '文字内容4',
                background: '#ffffff',
                icon: '../../resources/images/2.png'
            }, {
                color: '#666666',
                text: '文字内容5',
                background: '#cccccc',
                icon: '../../resources/images/1.png'
            }, {
                color: '#999999',
                text: '文字内容6',
                background: '#eeeeee',
                icon: '../../resources/images/2.png'
            }],
            initsize: function (width, height, callback) {
                self.setData({
                    wholeWidth: width + 'px',
                    wholeHeight: height + 'px'
                }, function () {
                    //画布初始化
                    callback();
                })
            }
        });
    },
    start(e){
        //画布被点击
        this.LuckDraw.tap(e);
    }
})
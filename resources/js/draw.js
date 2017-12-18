var res = wx.getSystemInfoSync(); //获取系统信息同步接口

function Draw(options) {
    //默认参数
    var defaults = {
        elem: null, //画布对象
        wholeWidth: res.windowWidth * 0.8 * 0.5 * 2, //画布宽
        wholeHeight: res.windowWidth * 0.8 * 0.5 * 2, //画布高
        wholeBg: 'red', //整体背景色或图
        r: res.windowWidth * 0.8 * 0.5, //转盘的半径
        x: res.windowWidth * 0.8 * 0.5, //圆心坐标点
        y: res.windowWidth * 0.8 * 0.5, //圆心坐标点
        share: [], //转盘份数，json数组，[{color:'颜色',text:'文字内容'，background:'背景色'，icon:'图标'}]
        time: 5, //转动一圈的时间秒
        several: 1, //转动圈数
        angle: 1 //转动速度
    }
    var ctx = null;
    //用于对象的合并，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
    options = Object.assign(defaults, options)
    //console.log(options)
    //初始化页面
    this.init = function () {
        if (!options.elem) {
            console.log('画布对象不存在')
            return false
        }

        //获取画布操作对象
        ctx = wx.createCanvasContext(options.elem)

        //画布背景绘制
        if (options.wholeBg) {
            //绘制背景
            ctx.rect(0, 0, options.wholeWidth, options.wholeHeight)
            ctx.setFillStyle(options.wholeBg)
            ctx.fill()
        }
        //绘制转盘
        ctx.beginPath()
        ctx.arc(options.x, options.y, options.r, 0, 2 * Math.PI)
        ctx.setFillStyle('#eeeeee')
        ctx.fill()
        //绘制转盘背景图
        ctx.drawImage('../../resources/images/turnplate-bg.png', options.x - options.r, options.y - options.r, options.r * 2, options.r * 2);
        //份数分割
        if (options.share.length < 1 || typeof (options.share) != 'object') {
            console.log('选项不能为空')
            return false
        }
        Animated();
    };
    this.start = function (i) {
        //开始转动,i为中奖数值
        if (i < 0 || i > options.share.length || !i) {
            i = random(1, options.share.length);
        }
    }
    //转动动画
    var Animated = function () {
        //重新定义原点
        ctx.translate(options.x, options.y)
        //绘制份数
        for (let i = 0; i < options.share.length; i++) {
            ctx.beginPath()
            var start = 1.5;
            ctx.arc(0, 0, options.r - 12, start * Math.PI, (start + (2 / options.share.length)) * Math.PI)
            ctx.setStrokeStyle(options.share[i].background)
            ctx.setFillStyle(options.share[i].background)
            //连接圆心
            ctx.lineTo(0, 0)
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
            //旋转出多个
            ctx.rotate((360 / options.share.length) * Math.PI / 180)
        }
        for (let i = 0; i < options.share.length; i++) {
            //绘制文字
            ctx.beginPath()
            ctx.setFontSize(12)
            ctx.setFillStyle(options.share[i].color)
            ctx.setTextAlign('center')
            if (i == 0) {
                ctx.rotate((2 / options.share.length / 2 * 180) * Math.PI / 180)
            }
            ctx.fillText(options.share[i].text, 0, -options.r + 40)
            ctx.rotate((360 / options.share.length) * Math.PI / 180)
            //绘制图标
            if (!options.share[i].icon) {
                options.share[i].icon = '../../resources/images/1.png'
            }
            ctx.drawImage(options.share[i].icon, -15, options.r - 80, 30, 30)
            ctx.closePath()
        }
        //ctx.rotate((-(360 / options.share.length) / 2) * Math.PI / 180)
        //ctx.drawImage('../../resources/images/turnplate-pointer.png', -37, -62, 74, 100)
        ctx.draw(true)
    }
    //产生随机中奖数
    var random = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        var num = min + Math.round(Rand * Range); //四舍五入
        return num;
    }
    //初始化页面尺寸
    if (typeof (options.initsize) == "function") {
        options.initsize(options.wholeWidth, options.wholeHeight, this.init)
    }
}


module.exports = Draw;
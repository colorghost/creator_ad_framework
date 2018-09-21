cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = '广告组件测试 720x60';
    },

    //广告控制测试
    ctrl_show_or_hidden:function(event, customEventData){

        if (customEventData == "adopen") {
            //开启广告
            cc.find("admanager").active = true;
        }
        else if (customEventData == "adclose") {
            //关闭广告
            cc.find("admanager").active = false;
        }else if(customEventData == "adrand"){
            if(cc.find("admanager").active == false){
                return;
            }
            //随机切换广告
            cc.find("admanager").getComponent("admanager").rand_ad_vew();
        }else if(customEventData == "advideo"){
            if(cc.find("admanager").active == false){
                return;
            }
            //视频广告
            cc.find("admanager").getComponent("admanager").videoView();
        }
    },

    // called every frame
    update: function (dt) {

    },
});

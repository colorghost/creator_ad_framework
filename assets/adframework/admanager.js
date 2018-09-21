
cc.Class({
    extends: cc.Component,

    properties: {
        ad_height:90,//广告高度
        ad_1:cc.Node,
        ad_2:cc.VideoPlayer,
        close:cc.Node,
        tiplabel:cc.Label,
        adtest:{
            default: [],
            type: cc.SpriteFrame,
        },
        adtest2:{
            default: [],
            type: cc.SpriteFrame,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.width = cc.winSize.width;
        this.node.height = this.ad_height;

        this.ad_1.position = cc.v2(this.node.width/2,this.node.height/2);
        this.ad_1.active = true;
        this.ad_2.node.active = false;
        this.tiplabel.node.active = false;
        this.close.active = false;
        this.close.zIndex = 101;


        this.ad_2.node.on("clicked",function(event){
            //视频广告
            cc.sys.openURL("https://www.27ki.com");
        });
    },

    start () {
        //广告类型
        this.adtype = 0;//0横幅广告 1是视频广告
        //标记当前广告id 0是无广告 大于0才是广告id
        this.adid = 0;
        //广告id 物料数组大小
        this.addata = [];
        //视频广告 广告链接
        this.advideo = "https://qncdn.miaopai.com/static20131031/miaopai20140729/pc-static/video_01/topvideo1_03.mp4";
        
        
        
        //测试
        this.set_this_ad(1,this.adtest);

        //3秒随机切换
        //this.scheduleOnce(this.rand_ad_vew,3.0);
    },

    //设置当前广告
    set_this_ad:function(id,data){

        this.adid = id;
        this.addata =data;
        //调用广告刷新
        this.update_ad_view();
    },

    //随机广告显示
    rand_ad_vew:function(){
        //测试广告切换随机显示
        let number =  parseInt(Math.random()*100) % 2; //
        if(number == 0){
            this.addata = this.adtest;
        }else{
            this.addata = this.adtest2;
        }

          //调用广告刷新
          this.update_ad_view();
    },
    //视频广告组件
    videoView:function(){

        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
        console.log("width:",this.node.width," height:",this.node.height);
        //this.ad_2.node.width =  this.node.width;
       // this.ad_2.node.height =  this.node.height;
        this.ad_2.node.active = true;
        this.tiplabel.node.active = true;
        this.close.active = true;
        this.ad_1.active = false;
        this.ad_2.node.position = cc.v2(this.node.width/2,this.node.height/2);

        //远程视频网址
        this.ad_2.remoteURL = this.advideo;
        this.ad_2.currentTime = 0;
        this.ad_2.play();

    },
    //关闭视频广告组件
    close_videoView:function(){
        this.node.width = cc.winSize.width;
        this.node.height = this.ad_height;
        this.close.active = false;
        this.ad_2.node.active = false;
        this.ad_1.active = true;
        this.tiplabel.node.active = false;
    },
    //更新广告显示
    update_ad_view:function(){
        if(this.adid == 0){
            //无广告则隐藏广告组件
            this.node.active = false;
        }else{
             //1是图片广告 则隐藏其它广告组件
             this.node.active = true;

             //清空残留元素
             this.ad_1.getComponent("frame_anim").sprite_frames.splice(0,this.ad_1.getComponent("frame_anim").sprite_frames.length);
             //
             for(let i = 0;i< this.addata.length;i++){
                 this.ad_1.getComponent("frame_anim").sprite_frames[i] = this.addata[i];
             }
        }
       
    },
    //广告被点击走此流程
    click_ad:function(event, customEventData){
        console.log("广告被点击了啊");
        //无广告id验证
        if(this.adid == 0){
            return;
        }else if(this.adid > 0){
            //广告被点击了做跳转处理
            if (customEventData == "ad1") {
                //横幅广告
                cc.sys.openURL("https://www.byjth.com");
            }
            else if (customEventData == "ad2") {
                //视频广告
                cc.sys.openURL("https://www.27ki.com");
            }
           
        }
    },

    update (dt) {
        if(this.ad_2.node.active == true){
            this.tiplabel.string = "视频广告剩余 " + Math.floor(this.ad_2.getDuration() - this.ad_2.currentTime) + " 秒";
            
            //如果不在播放 
            if(Math.floor(this.ad_2.getDuration() - this.ad_2.currentTime) == 0){
                this.close_videoView();
            }
        }
        
    },
});

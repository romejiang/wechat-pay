// Write your package code here!
var md5 = Npm.require('MD5');
WXPay = (function buildAPI(){

    return {
        //创建统一支付订单
        createUnifiedOrder:function(opts, fn){
            var config = ServiceConfiguration.configurations.findOne({
                service: 'wechatpay'
            });
            if (!config) throw new ServiceConfiguration.ConfigError();
            this.partnerKey = config.partnerKey;
            this.wxpayID = {
             appid:config.appId, mch_id: config.mchId 
            }

            //this.showConfig();
            var unifiedorderUrl="https://api.mch.weixin.qq.com/pay/unifiedorder";
            opts.nonce_str = opts.nonce_str || WxPayUtil.generateNonceString();
            
            _.extend(opts,this.wxpayID);
            opts.sign = this.sign(opts);
           
            var postXml= WxPayUtil.buildXML({xml:opts});
            // console.log(postXml);
            Meteor.http.post(unifiedorderUrl, {content :postXml},function(error,response){
                if ( response.statusCode === 200 ){
                    WxPayUtil.parseXML(response.content, fn);
                }
            })
        },
		//根据微信订单号查询支付订单
		queryOrder:function(query, fn){
			var wxUrl="https://api.mch.weixin.qq.com/pay/orderquery";
			if (!(query.transaction_id || query.out_trade_no)) { 		
					fn(null, { return_code: 'FAIL', return_msg:'缺少参数' });
			}
            _.extend(query,this.wxpayID);
			query.sign = this.sign(query);
			var postXml= WxPayUtil.buildXML({xml:query});
			 Meteor.http.post(wxUrl, {content :postXml},function(error,response){
                if ( response.statusCode === 200 ){
                    WxPayUtil.parseXML(response.content, fn);
                }
            })
		},
        GetJsApiParameters: function (UnifiedOrderResult )
        {
            var jsapi = {
                appId: UnifiedOrderResult.appid,
                nonceStr: WxPayUtil.generateNonceString(),
                package:"prepay_id=" + UnifiedOrderResult.prepay_id,
                signType:"MD5",
                timeStamp: "" + Math.round(+new Date()/1000) + "",
            }
            jsapi.paySign = this.sign(jsapi);

            return jsapi;
        },
	
        //weixin sign
        sign:function(param){
            var querystring = Object.keys(param).filter(function(key){
                    return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key)<0;
                }).sort().map(function(key){
                    return key + '=' + param[key];
                }).join("&") + "&key=" + this.partnerKey;

            var hash= md5(querystring).toUpperCase();
            return hash
        }
    };
})();
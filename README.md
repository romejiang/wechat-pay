Meteor 微信支付 package，根据https://github.com/tvrcgo/weixin-pay 改造而来


1.需设置process.env.环境变量，设置的微信支付相关参数如下
WECHAT_APP_ID=xxx
WECHAT_APP_SECRET=xxx
PARTNER_KEY=xxx
MCH_ID=xx

2、统一下单接口
    WXPay.createUnifiedOrder(
      {
        body: '扫描支付',
        out_trade_no: '20140703'+Math.random().toString().substr(2, 10),
        total_fee: 100,
        spbill_create_ip: '19.168.1.101',
        notify_url: 'http://wxpay.weixin.qq.com/pub_v2/pay/notify.v2.php',
        trade_type: 'NATIVE',
        attach:"hahfdasfsd"},
        function(error,result){
			console.log(result);
             return result;
        }
		)

3、查询订单
    WXPay.queryOrder({ transaction_id:"1003990545201602243488060900" }, function(err, order){
            console.log(order);
    })
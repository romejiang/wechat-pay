Meteor 微信支付 package，根据 https://github.com/hanagm/meteor-wxpay 改造而来


1.配置使用 service-configuration 组件，设置的微信支付相关参数如下
 
```javascript
ServiceConfiguration.configurations.remove({
    service: "wechatpay"
});
ServiceConfiguration.configurations.insert({
    service: "wechatpay",
    
    partnerKey : "xxxx",
    mchId : "xxx",
    appId: "xxxx",
    secret: "xxxx"
});
```

2、统一下单接口
 
```javascript
    WXPay.createUnifiedOrder(
        {
            body: '趣分享', 
            openid: openid, 
            out_trade_no: '20140703'+Math.random().toString().substr(2, 10),
            total_fee: 1, 
            time_start: now.format("YYYYMMDDHHmmss"), 
            time_expire: now.add(30, 'm').format("YYYYMMDDHHmmss"), 
            notify_url: 'http://wxpay.weixin.qq.com/pub_v2/pay/notify.v2.php' , 
            trade_type: 'JSAPI', 
            spbill_create_ip: this.connection.clientAddress, 
            
        },
        function(error,result){
			console.log(result);
             return result;
        }
		);
```

3、查询订单

 
```javascript
    WXPay.queryOrder({ transaction_id:"1003990545201602243488060900" }, function(err, order){
            console.log(order);
    });
```


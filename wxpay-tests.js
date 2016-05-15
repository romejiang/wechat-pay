// Write your tests here!
// Here is an example.
Tinytest.add('wxpay --createUnifiedOrder', function (test) {

  test.isNotNull(

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
  );

});

Tinytest.add('wxpay --queryOrder', function (test) {
    test.isNotNull(
        WXPay.queryOrder({ transaction_id:"1003990545201602243488060900" }, function(err, order){
            console.log(order);
            return order;
        })
    );

});
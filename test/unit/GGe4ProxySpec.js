(function () {
   'use strict';
	describe('GGe4Proxy', function() {
		var GGe4Proxy = require('../../lib/GGe4Proxy');
		
		function buildCharge () {
			return {
				amount:100.00, 
				creditCard: { //Visa
					name:'Test Customer', 
					number:'4111111111111111', 
					expirationMonth:'06', 
					expirationYear:'18'
				}
			};
		}
		function buildGGe4Config () {
			return {
				hmacKey: '_Jcn8wvSqrqKlhCUdId2Xpl5hO6bINMG',
				hmacKeyId: '137288',
				serviceUri: '/transaction/v13',
				serviceEndPoint: 'api.demo.globalgatewaye4.firstdata.com',
				gatewayId: 'AF0663-05',
				password: '452q7pob'
			};
		}
				
		it('Should charge a credit card', function(done){
			
			//Given
			var charge = buildCharge();
			var gge4Config = buildGGe4Config();
			var gge4Proxy = new GGe4Proxy(gge4Config);
			
			//When
			var promise = gge4Proxy.purchase(charge);
			
			//Then
			promise.then(
				function successfulPurchaseCallback(response){
					expect(true).toBe(true);
					done();
				},
				function failedPurchaseCallback(response){
					expect(true).toBe(false);
					done();
				});
			
		}, 5000);
		
		it('Should decline an expired card number', function(done){
			
			//Given
			var charge = buildCharge();
			var gge4Config = buildGGe4Config();
			var gge4Proxy = new GGe4Proxy(gge4Config);
			charge.creditCard.expirationYear='00';
			//When
			var promise = gge4Proxy.purchase(charge);
			
			//Then
			promise.then(
				function successfulPurchaseCallback(response){
					expect(true).toBe(false);
					done();
				},
				function failedPurchaseCallback(response){
					expect(true).toBe(true);
					done();
				});
			
		}, 5000);
		
	});
	
}());
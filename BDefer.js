
function BDefer(ctx) {
	
	if (this === window) {
		
		return new BDefer(ctx);
		
	}
	
	var defer = this;
	
	defer.ctx = ctx || {};
	
	defer.data = {};
	
	defer.cbs = [];
	
	defer.err_cbs = [];
	
	defer.state = 0;
	
	defer.promiseProxy = {
		
		state : function () {
			
			return defer.state;
			
		},
		
		then : function (fn, errFn) {
			return defer.then(fn, errFn);
			
		},
		
		done : function (fn) {
			
			return defer.then(fn, null);
			
		},
		
		fail : function (errFn) {
			
			return defer.then(null, errFn);
			
		}
		
	};
	
}

BDefer.prototype.fire = function (cbs, data) {
	
	this.data = data;
	
	var fn;
	while ((fn = cbs.shift())) {
		
		if (typeof fn === 'function') {
			
			fn.call(this.ctx, this.data);
			
		}
		
	}
	
};

BDefer.prototype.resolve = function (data) {
	
	if (this.state === 0) {
		
		this.state = 1;
		
		this.fire(this.cbs, data);
		
	}
	
};

BDefer.prototype.reject = function (data) {
	
	if (this.state === 0) {
		
		this.state = 2;
		
		this.fire(this.err_cbs, data);
		
	}
	
};

BDefer.prototype.then = function (resolveFn, errFn) {
	
	if (this.state === 0) {
		
		resolveFn && this.cbs.push(resolveFn);
		
		errFn && this.err_cbs.push(errFn);
		
	} else if (this.state === 1 && resolveFn) {
		
		resolveFn.call(this.ctx, this.data);
		
	} else if (this.state === 2 && errFn) {
		
		errFn.call(this.ctx, this.data);
		
	}
	
	return this.promise();
	
};

BDefer.prototype.promise = function () {
	
	return this.promiseProxy;
	
};

BDefer.when = function (promises, fn, err, proxy) {
	
	proxy = proxy || BDefer.whenProxy(promises);
	
	var setDone = function (data) {

			data = proxy.data(data);

			if (data.length === promises.length) {
				
				if (~proxy.state().indexOf(2)) {
					
					err && err.apply(this, data);
					
				} else {
				
					fn && fn.apply(this, data);
				
				}
				
			}
		
	};

	for (var i = 0, j = promises.length; i < j; i++) {
		
		var promise = promises[i];
		
		if (fn) {
			
			promise.then(setDone, null);
			
		}
		
		if (err) {
			
			promise.then(null, setDone);
			
		}
		
	}
	
	return proxy;
	
};

BDefer.whenProxy = function (promises) {
	var args = [];
	return {
		data: function(a){
			if (a) {
			
				args.push(a);
				
			}
			
			return args;

		},
		state : function () {
		
			var states = []; 
			
			for (var i = 0, j = promises.length; i < j; i += 1) {
			
				states[i] = promises[i].state();
				
			}
			
			return states;
		},
		
		then : function (fn, err) {
			
			return BDefer.when(promises, fn, err, this);
			
		},
		
		done : function (fn) {
			
			return BDefer.when(promises, fn, null, this);
			
		},
		
		fail : function (err) {
			
			return BDefer.when(promises, null, err, this);
			
		},
		
	};
	
};



/* use case */


function ajaxDemo(time, fail) {
	
	ctx = {type:'ajaxObj'};
	
	var de = BDefer(ctx);
	
	setTimeout(function(){
	
		if (fail) {

			de.reject({
				status : 'rejected'
			});		
		
		} else {
		
			de.resolve({
				status : 'resolved'
			});
			
		}
		
	}, time);
	
	return de.promise();
};


BDefer.when([ajaxDemo(500), ajaxDemo(200), ajaxDemo(1000, true)]).then(function (e, d, t) {
	
	console.log(this, e, d, t);
	
}).fail(function(e, d, t) {

	console.log(this, e, d, t)
	
	console.log(123);
	
});


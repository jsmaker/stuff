(function () {
	
	var WWF = {};
	
	WWF.fn = Wrap;
	
	WWF.trollReg = [/^_?g|set\w/i, /^_?qwe/i];
	
	WWF.visited = [];
	
	WWF.functions = [];
	
	WWF.functionsPropNames = [];
	
	WWF.time = 1;
	
	
	var fnWrap = {};
	
	fnWrap.active = true;
	
	fnWrap.calls = [];
	
	fnWrap.maxDataMem = 200;
	
	fnWrap.data = [];
	
	fnWrap.addData = function (dataKeeper) {
	
		var i = dataKeeper.id,
		
		this.calls[i] = dataKeeper.calls;
		
		var aData = this.data[i];
		
		if (aData) {
			
			aData.push(dataKeeper);
			
			if (aData.length > this.maxDataMem) {
				
				aData.shift();
				
			}
			
		} else {
			
			this.data[i] = [dataKeeper];
			
		}
	};
	
	function Wrap(o) {
		
		var wrapedFunction = function () {
			
			if (fnWrap.active) {
				
				var obj = o.obj,
				
				originalFn = o.fn,
				
				iOf = WWF.functions.indexOf(originalFn),
				
				propName = WWF.functionsPropNames[iOf],
				
				stop = stopper(),
				
				returnValue = originalFn.apply(this, arguments),
				
				elps = stop(),
				
				calls = (+fnWrap.calls[iOf] + 1) || 0,
				
				data = new DataKeeper(propName, iOf, calls, elps, arguments, this);
				
				fnWrap.addData(data);
				
				if (elps > 0) {
					console.log(data.toString(), arguments, this);
				}
				
				return returnValue;
				
			} else {
				console.log('Not Active', fnWrap.calls);
				return fn.apply(this, arguments);
			}
			
		};
		
		for (var p in o.fn) {
			
			wrapedFunction[p] = o.fn[p];
			
		}
		
		return wrapedFunction;
	}
	
	function wrapAll(obj, limit, count) {
		
		count = count || 0;
		
		var prop,
		v,
		obwrap,
		tv;
		
		if (~WWF.visited.indexOf(obj)) {
			
			return;
			
		} else {
			
			if (count) {
				
				WWF.visited.push(obj);
				
			}
			
			for (prop in obj) {
				
				v = obj[prop];
				
				tv = typeof v;
				
				if (tv === 'function' && !(~WWF.functions.indexOf(v)) && testAllReg(prop)) {
					
					obwrap = {
						fn : v,
						obj : obj
					};
					
					obj[prop] = Wrap.call(obj, obwrap);
					
					WWF.functions.push(v);
					
					WWF.functionsPropNames.push(prop);
					
				} else if (tv === 'object' && count < limit) {
					
					wrapAll(v, limit, count += 1);
					
				}
				
			}
		}
	}
	
	function testAllReg(p) {
		
		for (var i = 0, j = WWF.trollReg.length; i < j; i += 1) {
			
			if (WWF.trollReg[i].test(p)) {
				
				return true;
				
			}
			
		}
		
		return false;
		
	}
	
	function stopper() {
		
		var start = (+new Date());
		
		return function () {
			
			return (+new Date()) - start;
			
		};
		
	}
	
	function DataKeeper(name, id, calls, elps, data, obj) {
		this.obj = obj;
		this.data = data;
		this.name = name;
		this.id = id;
		this.calls = calls;
		this.elps = elps;
	}
	
	DataKeeper.prototype.toString = function () {
		return 'Name: ' + this.name +
		' id:' + this.id +
		' calls:' + this.calls +
		' elps:' + this.elps + ' ms';
	};
	
	this.wrapObj = function (obj, trolls, limit) {
		
		if (trolls && trolls.length) {
			
			WWF.trollReg.push.apply(WWF.trollReg, trolls);
			
		}
		
		wrapAll(obj, limit || 1000, 0);
		
		return WWF;
		
	};
	
}());

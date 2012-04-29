//logs functions call
function wOF() {
	
	if (this === window) { return new wOF(); }
	
	var WWF = {
		
		fn: Wrap,
		
		notTrollRegDef: [/^\d+$/],
		
		notTrollReg: [],
		
		trollRegDef: [/^_?g|set\w/i],
		
		trollReg: [],
		
		visited: [],
		
		functions: [],
		
		functionsPropNames: [],
		
		time: 1
		
	};
	
	var fnWrap = {
		
		active: true,
		
		calls: [],
		
		maxDataMem: 200,
		
		data: []
	
	};
	
	WWF.data = fnWrap;
	
	fnWrap.addData = function (dataKeeper) {
		
		var i = dataKeeper.id;
		
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
				
				data = new DataKeeper(propName, originalFn, iOf, calls, elps, arguments, this);
					
				fnWrap.addData(data);

				if (elps > 0 && elps < 30) {
				
					console.log([data.toString(), arguments, this]);
					
				} else if (elps >= 30) {
					console.log('********Long Function*********');
					console.warn([data.toString(), arguments, this]);
					console.log('******************************');
				
				}

				return returnValue;
				
			} else {

				return  o.fn.apply(this, arguments);
				
			}
		
			
		};
		
		wrapedFunction.___wrapedFunction___ = true;
		
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
				
				if (tv === 'function' && !v.___wrapedFunction___ && !(~WWF.functions.indexOf(v)) && testAllReg(WWF.trollReg,prop) && !testAllReg(WWF.notTrollReg,prop)) {
					
					obwrap = {
						fn : v,
						obj : obj,
						prop : prop
					};
					
					WWF.functions.push(v);
					
					WWF.functionsPropNames.push(prop);
					
					
					obj[prop] = Wrap.call(obj, obwrap);


					
				} else if (tv === 'object' && count < limit) {
					
					wrapAll(v, limit, count += 1);
					
				}
				
			}
		}
	}
	
	
	function testAllReg(Regs, p) {
		
		for (var i = 0, j = Regs.length; i < j; i += 1) {
			
			if (Regs[i].test(p)) {
				
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
	
	
	function DataKeeper(name, originalFn, id, calls, elps, data, obj) {
		this.obj = obj;
		this.data = data;
		this.originalFn = originalFn;
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
	
	
	var w_O_F = function (obj, trolls, excludes, limit) {
		
		if (trolls && trolls.length) {
		
		}
	
		WWF.trollReg = ([].concat(WWF.trollRegDef, trolls));
		WWF.notTrollReg = ([].concat(WWF.notTrollRegDef, excludes));
		
		/* WWF.trollReg.push.apply(WWF.trollReg, trolls); */
		
		
		if (obj && !(obj instanceof Array)) {
		
			obj = [obj];
			
		}
		
		for (var i = 0, j = obj.length; i < j; i += 1) {
			
			wrapAll(obj[i], limit || 1000, 0);
			
		}
		
		w_O_F.data = WWF;
		
		return WWF;
		
	};
	
	w_O_F.active = function(active){
	
		if (active === false || active === null) {
		
			return (fnWrap.active = false);
			
		}
		
		return (fnWrap.active = true);
	};
	
	return w_O_F;
	
};

var wof = wOF();
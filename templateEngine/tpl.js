
var getTpl = function (selector) {
	
	var el;
	var tch = getTpl.TemplatesElm.childNodes;
	
	if (selector[0] === '#') {
		
		selector = selector.substr(1);
		
	}
	
	for (var i = tch.length; i--; ) {
		
		if (tch[i].id === selector) {
			
			el = tch[i];
			
		}
	}
	
	//var el = getTpl.TemplatesElm.querySelector(selector);
	
	if (el) {
		
		return el.innerHTML.replace(/\s\s+/gm, ' ');
		
	}
	
	return false;
}
getTpl.TemplatesElm = document.createElement('div');
getTpl.tplHolder = document.getElementById('Templates');
if (getTpl.tplHolder) {
	
	getTpl.TemplatesElm.innerHTML = getTpl.tplHolder.innerHTML;
	
} else {
	
	getTpl.TemplatesElm = {
		childNodes : []
	}
}

function STpl(settings) {
	
	if (this === window) {
		
		return new STpl();
		
	}
	
	var templateReg = /[$%]{?{([^}]*)}?}/gm,
	
	templateRegStrict = /[$%]{{([^}]*)}}/gm,
	
	ifTemplateReg = /%{?{([^}]*)}?}/gm,
	
	templateStartsWithThis = /^this/,
	
	insideIf = createIfChecker(),
	
	cid = 0,
	
	gards = [],
	
	modifiers = {
		
		'-b' : function (innerdata) {
			var obj = innerdata.data.obj;
			var locId = gards.indexOf(obj);
			var warp;
			
			if (locId === -1) {
				
				locId = gards.push(innerdata.data.obj) - 1;
				
			}
			
			var pre = '<span class="gard_' + locId + '-' + innerdata.prop + '">';
			
			var tail = '</span>';
			
			if (innerdata.tpl) {
				
				innerdata.tpl = pre + innerdata.tpl + tail;
				
			} else {
				
				innerdata.tpl = pre + '${this}' + tail;
				
			}
			
			/* innerdata.data = innerdata.data; */
			
			cid += 1;
			
			return innerdata;
			
			/* return this.sTpl(innerdata); */
			
		},
		'-eurl' : function (innerdata) {
			
			innerdata.data = encodeURI(innerdata.data);
			
			innerdata.tpl = innerdata.tpl || '${this}';
			
			return this.sTpl(innerdata);
			
		},
		'-e' : function (innerdata) {
			
			innerdata.data = escape(innerdata.data);
			
			innerdata.tpl = innerdata.tpl || '${this}';
			
			return innerdata;
			
		},
		'-wrap' : function (innerdata) {
			
			innerdata.tpl = '<h1>' + (innerdata.tpl || '${this}') + '</h1>';
			
			return innerdata;
			
		}
	};
	
	function extend(obj) {
		Array.prototype.slice.call(arguments, 1).forEach(function (source) {
			var prop;
			for (prop in source) {
				if (source[prop] !== void 0) {
					obj[prop] = source[prop];
				}
			}
		});
		return obj;
	}
	
	function createIfChecker() {
		
		var insideIf = [];
		
		insideIf.data = [];
		
		insideIf.getData = function () {
			return this.data[this.length - 1];
		};
		
		insideIf.inject = function (key, data) {
			this.push(key);
			this.data.push(data);
		};
		
		insideIf.remove = function (key) {
			this.splice(key, 1);
			this.data.splice(key, 1);
		};
		
		insideIf.add = function (key, data) {
			var cIf = this.lastIndexOf(key);
			if (~cIf) {
				this.remove(cIf);
			} else {
				this.inject(key, data);
			}
		};
		
		insideIf.getProp = function () {
			return this[this.length - 1];
		};
		
		insideIf.yi = function (ifProp) {
			
			if (!ifProp) {
				return false;
			}
			
			if (ifProp[0] === '!') {
				
				return !!getObjProp(this.getData(), ifProp.substr(1)).value; //!!this.getData()[ifProp.substr(1)];
				
			} else {
				
				return !!!getObjProp(this.getData(), ifProp).value; //!!!this.getData()[ifProp];
				
			}
			
		};
		
		return insideIf;
		
	}
	
	function ObjectScoop(obj, prop) {
		this.obj = obj;
		this.prop = prop;
		this.value = obj[prop];
	}
	
	function getObjProp(obj, selector) {
		var ss;
		if (getObjProp.lastSelector !== selector) {
			getObjProp.lastSelector = selector;
			getObjProp.lastSelectorA = ss = selector.split('.');
		}
		ss = ss || getObjProp.lastSelectorA;
		
		var value = {};
		var i,
		j;
		for (i = 0, j = ss.length; i < j; i += 1) {
			if (value.value) {
				value = new ObjectScoop(value.obj[ss[i - 1]], ss[i]);
			} else {
				if (i > 0) {
					return false;
				}
				value = new ObjectScoop(obj, ss[i]);
			}
		}
		return value;
	}
	
	function dataOfSelector(data, selector) {
		//var val = data[selector];
		var val = getObjProp(data, selector);
		return val;
	}
	
	function checkForAntherTpl(templates, selector) {
		var val = templates[selector];
		//var val = getObjProp(templates, selector).value;
		if (val === undefined) {
			
			var tpl = getTpl('#_' + selector);
			templates[selector] = val = tpl;
		}
		return val;
	}
	
	function handleDataAarry(obj, data, templator) {
		var aCon = [];
		var i,
		j;
		for (i = 0, j = data.length; i < j; i++) {
			
			obj.data = data[i];
			
			aCon[aCon.length] = templator.sTpl(obj);
			
		}
		
		obj.data = data;
		
		return aCon.join(' ');
	}
	
	function getInnerdata(modifier, innerdata, i, templates, that) {
		var resurceTpl;
		if (typeof modifier === 'function') {
			
			resurceTpl = checkForAntherTpl(templates, i);
			//return the template value
			return modifier.call(that, {
				prop : i,
				data : innerdata.value,
				tpl : resurceTpl
			});
			
		} else if (modifier) {
			
			resurceTpl = checkForAntherTpl(templates, modifier);
			
		} else {
			
			resurceTpl = checkForAntherTpl(templates, i);
			
		}
		
		innerdata = innerdata && innerdata.value;
		
		//builds the innerdata
		if (resurceTpl && innerdata) {
			innerdata = {
				prop : i,
				tpl : resurceTpl,
				data : innerdata
			};
		}
		
		innerdata = innerdata !== undefined ? innerdata : '';
		
		return innerdata;
	}
	
	function set(obj, prop, value) {
		var gard;
		for (var i = 0, j = gards.length; i < j; i++) {
			
			gard = gards[i];
			
			if (gard === obj && obj[prop]) {
				
				obj[prop] = value;
				
				var els = document.querySelectorAll('.gard_' + [i, prop].join('-'));
				
				for (var x = els.length; x--; ) {
					
					els[x].innerHTML = value;
					
				}
				
			}
		}
		
	}
	
	function testModifier(modifier) {
		
		return modifiers[modifier] || modifier;
		
	}
	
	function compileTpl(obj, unbind) {
		
		obj = extend({}, settings, obj);
		
		var tpl = obj.tpl,
		
		templates = obj.templates || {},
		
		that = this,
		
		data = obj.data,
		
		reg = templateReg,
		
		ifReg = ifTemplateReg,
		
		regStrict = templateRegStrict,
		
		startsWithThis = templateStartsWithThis;
		
		if (data instanceof Array) {
			
			return handleDataAarry(obj, data, that);
			
		}
		
		compileTpl.shots += 1;
		
		var compliedTpl = tpl.replace(reg, function (o, i) {
				
				var oRegStrict = regStrict;
				
				var innerdata = data;
				
				var resurceTpl;
				
				var modifier;
				
				var isIfState = o[0] === '%';
				
				if (isIfState) {
					
					insideIf.add(i, innerdata);
					
				}
				
				if (isIfState || insideIf.yi()) {
					
					return '';
					
				}
				
				i = i.split(':');
				
				modifier = testModifier(i[1]);
				
				i = i[0];
				
				if (startsWithThis.test(i) || oRegStrict.test(o)) {
					
					i = i.split('.');
					
					if (i[0] === 'this') {
						
						i.shift();
						
						i = i.join('.');
						
					} else {
						
						i = i[0];
						
						i = innerdata[i];
						
					}
					
					if (typeof innerdata[i] === 'function') {
						
						innerdata = innerdata[i]();
						
					}
					
					innerdata = {
						value : innerdata
					};
					
				} else {
					
					innerdata = dataOfSelector(data, i);
					
				}
				
				innerdata = getInnerdata(modifier, innerdata, i, templates, that);
				
				var ty = (innerdata instanceof Object);
				
				if (ty && innerdata.tpl && innerdata.data) {
					
					innerdata.templates = innerdata.templates || templates;
					
					return that.sTpl(innerdata);
					
				} else if (ty) {
					
					return 'Cant find template for "' + i + '", ';
					
				}
				
				return innerdata;
				
			});
		
		var ifProp = insideIf.getProp();
		
		if (insideIf.yi(ifProp)) {
			
			compliedTpl = '';
			
		}
		
		compileTpl.shots -= 1;
		
		// 0 for true last one
		if (compileTpl.shots === -1) {
			
			console.log(compileTpl.shots);
			var elm = document.createElement('section');
			elm.innerHTML = compliedTpl;
			console.log(elm, data);
			
		}
		
		return compliedTpl;
		
	};
	
	getObjProp.lastSelector;
	getObjProp.lastSelectorA;
	
	compileTpl.shots = 0;
	compileTpl.gards = gards;
	
	gards.ids = [];
	
	this.sTpl = compileTpl;
	
	this.set = set;
	
}

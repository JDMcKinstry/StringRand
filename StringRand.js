/*	String.[rand, getRandomLowerCaseChar, getRandomUpperCaseChar, getRandomNumberChar, getRandomSymbolChar]	*/
;(function() {
	function getDefaultOptions() {
		return {
			min: 8,
			max: 24,
			lower: true,
			upper: true,
			numbers: true,
			symbols: true,
			enforce: true
		};
	}
	
	function getRandomInt(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }
	
	function getRandomLowerCaseChar() { return String.fromCharCode(getRandomInt(97,122)); }
	
	function getRandomUpperCaseChar() { return String.fromCharCode(getRandomInt(65,90)); }
	
	function getRandomNumberChar() { return String.fromCharCode(getRandomInt(48,57)); }
	
	function getRandomSymbolChar() {
		var a = [
				String.fromCharCode(getRandomInt(33,47)),
				String.fromCharCode(getRandomInt(58,64)),
				String.fromCharCode(getRandomInt(91,96)),
				String.fromCharCode(getRandomInt(123,126))
			];
		return a[getRandomInt(0,a.length-1)];
	}
	
	function shuffleArray(a) {
		for (var b = a.length - 1; 0 < b; b--) {
			var c = Math.floor(Math.random() * (b + 1)),
				d = a[b];
			a[b] = a[c];
			a[c] = d;
		}
		return a;
	};
	
	function randomString() {
		var args = Array.prototype.slice.call(arguments, 0),
			opts = getDefaultOptions(),
			len;
		
		for (var x in args) {
			switch (typeof args[x]) {
				case 'number':
					//	if a number was passed through in args,
					//	then that number takes priority
					//	however, under the right circumstance
					//	checking that min == max won't do,
					//	so assign a temp value to [number]
					len = args[x];
					break;
				case 'object':
					for (var y in args[x])  if (opts.hasOwnProperty(y))  opts[y] = args[x][y];
					if (args[x]['custom']) {
						if (args[x]['custom'] instanceof Array && args[x]['custom'].length > 1) opts.custom = args[x]['custom'];
						else if (typeof args[x]['custom'] == 'string' && args[x]['custom'].length > 1) opts.custom = args[x]['custom'].split('');
					}
					break;
				case 'string':
					opts.string = args[x];
					break;
			}
		}
		
		if (opts.min > opts.max) {
			var a = opts.max,
				b = opts.min;
			opts.min = a;
			opts.max = b;
		}
		
		if (void 0 == len) len = opts.min == opts.max ? opts.min : getRandomInt(opts.min, opts.max);
		else opts.min = opts.max = len;
		
		var reqs = [], s = "";
		
		if (opts.enforce) {
			//	ensures there's at least one of each required
			if (opts.lower) {
				s += getRandomLowerCaseChar();
				reqs.push('lower');
			}
			if (opts.upper) {
				s += getRandomUpperCaseChar();
				reqs.push('upper');
			}
			if (opts.numbers) {
				s += getRandomNumberChar();
				reqs.push('numbers');
			}
			if (opts.symbols) {
				s += getRandomSymbolChar();
				reqs.push('symbols');
			}
			if (opts.custom) {
				s += opts.custom[getRandomInt(0, opts.custom.length-1)];
				reqs.push('custom');
			}
		}
		
		while (s.length < len) {
			switch (reqs[getRandomInt(0, reqs.length-1)]) {
				case 'lower':
					s += getRandomLowerCaseChar();
					break;
				case 'upper':
					s += getRandomUpperCaseChar();
					break;
				case 'numbers':
					s += getRandomNumberChar();
					break;
				case 'symbols':
					//	if statement helps to "possibly" reduce the amount of symbols added
					if (reqs.length > 2) { if (!(s.length%2)) s += getRandomSymbolChar(); }
					else s += getRandomSymbolChar();
					break;
				case 'custom':
					if (reqs.length > 2) { if (!(s.length%2)) s += opts.custom[getRandomInt(0, opts.custom.length-1)]; }
					else s += opts.custom[getRandomInt(0, opts.custom.length-1)];
					break;
			}
		}
		
		s = shuffleArray(s.split('')).join('');
		return s.length > opts.max ? s.substring(0, opts.max) : s;
	}
	
	//	add as global variable
	window.hasOwnProperty("randomString")||(window.randomString=randomString);
	
	var a = [
			{ name: "rand", method: randomString },
			{ name: "randDefaults", method: getDefaultOptions },
			{ name: "randLower", method: getRandomLowerCaseChar },
			{ name: "randUpper", method: getRandomUpperCaseChar },
			{ name: "randNumber", method: getRandomNumberChar },
			{ name: "randSymbol", method: getRandomSymbolChar }
		];
	for (var b in a) {
		var c = a[b];
		Object['defineProperty'] && !String.hasOwnProperty(c.name)
			? Object.defineProperty(String, c.name, { value: c.method }) : String[c.name] = c.method;
	}
})();

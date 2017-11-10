/*	String.[rand, getRandomLowerCaseChar, getRandomUpperCaseChar, getRandomNumberChar, getRandomSymbolChar]	*/
;(function() {
	/**	getDefaultOptions()
	 *	return basic defaults for main operation
	 **/
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
	
	function objMerge(){
		var a = [].slice.call( arguments ), i = 0;
        while( a[i] )a[i] = JSON.stringify( a[i++] ).slice( 1,-1 );
        return JSON.parse( "{"+ a.join() +"}" );
    }
	
	function getRandom(wat) {
		var args = Array.prototype.slice.call(arguments, 1);
		switch (wat) {
			case 0:
			case 'int':
				var min = 0, max = 1;
				if (args) {
					if (typeof args[0] == 'object') {
						if (args[0]['min']) min = args[0]['min'];
						if (args[0]['max']) max = args[0]['max'];
					}
					else {
						if (/number|string/.test(typeof args[0])) min = args[0];
						if (/number|string/.test(typeof args[1])) max = args[1];
					}
				}
				return Math.floor(Math.random()*(max-min+1))+min;
			case 1:
			case 'alpha':
				var charCase;
				
				if (args[0] && typeof args[0] == 'string') charCase = args[0];
				else if (args[0] == 0 || args [0] == 1) charCase = args[0];
				
				switch(charCase) {
					case 0:
					case 'low':
					case 'lower':
						return String.fromCharCode(getRandom(0, 97,122));
					case 1:
					case 'up':
					case 'upper':
						return String.fromCharCode(getRandom(0, 65,90));
					default:
						var ara = [ String.fromCharCode(getRandom(0, 97,122)), String.fromCharCode(getRandom(0, 65,90)) ];
						return ara[getRandom(0)];
				}
				break;
			case 2:
			case 'numb':
			case 'number':
				return String.fromCharCode(getRandom(0,48,57));
			case 3:
			case 'sym':
			case 'symbol':
				return [
					String.fromCharCode(getRandom(0,33,47)),
					String.fromCharCode(getRandom(0,58,64)),
					String.fromCharCode(getRandom(0,91,96)),
					String.fromCharCode(getRandom(0,123,126))
				][getRandom(0,0,3)];
		}
		return getRandom(getRandom(0,0,3));
	}
	
	function shuffleArray(a) {
		for (var b = a.length - 1; 0 < b; b--) {
			var c = Math.floor(Math.random() * (b + 1)),
				d = a[b];
			a[b] = a[c];
			a[c] = d;
		}
		return a;
	}
	
	/**	randomString(length, {options})
	 * 
	 * **/
	function randomString() {
		var args = Array.prototype.slice.call(arguments, 0),
			opts = getDefaultOptions();
		
		if (args.length == 1 && typeof args[0] == 'object') opts = objMerge(opts, args[0]);
		else if (args.length == 1 && /^number|string$/.test(typeof args[0]) && parseInt(args[0])) opts.length = parseInt(args[0]);
		else if (args.length == 1 && /^string$/.test(typeof args[0]) && args[0].length > 1) opts.custom = args[0];
		else if (args.length == 2) {
			for (var x in args) {
				if (typeof args[x] == 'object') opts = objMerge(opts, args[x]);
				else if (/^number|string$/.test(typeof args[x]) && parseInt(args[x])) opts.length = parseInt(args[x]);
				else if (/^string$/.test(typeof args[x]) && args[x].length > 1) opts.custom = args[x];
			}
		}
		
		if (!opts['length'] || opts.length < 1) {
			if (opts.min == opts.max) opts.length = opts.min;
			else if (opts.min < opts.max) opts.length = getRandom(0, opts.min, opts.max);
			else if (opts.max > opts.max) opts.length = getRandom(0, opts.max, opts.min);
		}
		
		if (opts.length && opts.length > 0) {
			delete opts['min'];
			delete opts['max'];
			
			var str = '',	//	string to build with
				reqs = [];
			
			if (opts.custom) {	//	 use only characters from custom passed string
				if (opts.enforce) str = opts.custom;
				if (str.length < opts.length) while (str.length < opts.length) str += str[getRandom(0, 0, str.length-1)];
			}
			else {
				if (opts.enforce) {	//	ensures there's at least one of each required
					if (opts.lower) {
						reqs.push('lower');
						str += getRandom(1, 0); //	gets a random lowercase char
					}
					if (opts.upper) {
						reqs.push('upper');
						str += getRandom(1, 1); //	gets a random uppercase char
					}
					if (opts.numbers) {
						reqs.push('numbers');
						str += getRandom(2); //	gets a random digit char
					}
					if (opts.symbols) {
						reqs.push('symbols');
						str += getRandom(3); //	gets a random symbol char
					}
				}
				else {
					if (opts.lower) reqs.push('lower');
					if (opts.upper) reqs.push('upper');
					if (opts.numbers) reqs.push('numbers');
					if (opts.symbols) reqs.push('symbols');
				}
				
				if (str.length < opts.length) {
					while (str.length < opts.length) {
						switch (reqs[getRandom(0, 0, reqs.length-1)]) {
							case 'lower':
								str += getRandom(1, 0); //	gets a random lowercase char
								break;
							case 'upper':
								str += getRandom(1, 1); //	gets a random uppercase char
								break;
							case 'numbers':
								str += getRandom(2); //	gets a random digit char
								break;
							case 'symbols':
								//	if statement helps to "possibly" reduce the amount of symbols added
								if (reqs.length > 2) { if (!(str.length%2)) str += getRandom(3); }
								else str += getRandom(3); //	gets a random symbol char
								break;
						}
					}
				}
			}
			
			if (str.length > opts.length) str = shuffleArray(str.split('')).join('').substring(0, opts.length);
			
			return shuffleArray(str.split('')).join('');
		}
		//	TODO: write error throws
		
		return void 0;
	}
	
	//	add as global variable
	window.hasOwnProperty("randomString")||(window.randomString=randomString);
	
	var a = [
			{ name: "rand", method: randomString },
			{ name: "randDefaults", method: getDefaultOptions }/*,
			{ name: "randLower", method: getRandomLowerCaseChar },
			{ name: "randUpper", method: getRandomUpperCaseChar },
			{ name: "randNumber", method: getRandomNumberChar },
			{ name: "randSymbol", method: getRandomSymbolChar }*/
		];
	for (var b in a) {
		var c = a[b];
		Object['defineProperty'] && !String.hasOwnProperty(c.name)
			? Object.defineProperty(String, c.name, { value: c.method }) : String[c.name] = c.method;
	}
})();

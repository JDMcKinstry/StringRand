function StringRand() {
	function f(a) {
		for (var c = (Math.random() * eval("1e" + ~~(50 * Math.random() + 50))).toString(36).split(""), b = 3; b < c.length; b++) b == ~~(Math.random() * b) + 1 && c[b].match(/[a-z]/) && (c[b] = c[b].toUpperCase());
		c = c.join("");
		c = c.substr(~~(Math.random() * ~~(c.length / 3)), ~~(Math.random() * (c.length - ~~(c.length / 3 * 2) + 1)) + ~~(c.length / 3 * 2));
		if (24 > a) return a ? c.substr(c, a) : c;
		c = c.substr(c, a);
		if (c.length == a) return c;
		for (; c.length < a;) c += f();
		return c.substr(0, a)
	}
	var d = arguments,
		a, e;
	if (!d.length) return f();
	for (var b = 0; b < d.length; b++) "string" == typeof d[b] && d[b].length && !a && (a = d[b]), "number" == typeof d[b] && d[b] && !e && (e = d[b]);
	if (!a && !e) return f();
	if (!a) return f(e);
	if (!e) {
		a = window.btoa(escape(encodeURIComponent(a))).replace(/[^\w]/g, "");
		a = a.split("");
		for (b = a.length - 1; 0 < b; b--) {
			var d = Math.floor(Math.random() * (b + 1)),
				g = a[b];
			a[b] = a[d];
			a[d] = g
		}
		return a.join("")
	}
	a = window.btoa(escape(encodeURIComponent(a))).replace(/[^\w]/g, "");
	b = f(e - a.length);
	a = (a + b).split("");
	for (b = a.length - 1; 0 < b; b--) d = Math.floor(Math.random() * (b + 1)), g = a[b], a[b] = a[d], a[d] = g;
	a = a.join("");
	return a.length == e ? a : a.substr(0, e)
}
Object['defineProperty'] && !String.hasOwnProperty('rand') ? Object.defineProperty(String, "rand", { value: StringRand }) : String.prototype.rand = StringRand;

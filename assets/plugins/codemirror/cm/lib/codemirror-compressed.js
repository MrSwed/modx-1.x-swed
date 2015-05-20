window.CodeMirror = function(){
	function m(a, b){
		if (!(this instanceof m))return new m(a, b);
		this.options = b = b || {};
		for (var c in Nb)!b.hasOwnProperty(c) && Nb.hasOwnProperty(c) && (b[c] = Nb[c]);
		Ob(b);
		c = "string" == typeof b.value ? 0 : b.value.first;
		var d = {}, e = d.input = p("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none; font-size: 4px;");
		P ? e.style.width = "1000px" : e.setAttribute("wrap", "off");
		Fa && (e.style.border = "1px solid black");
		e.setAttribute("autocorrect", "off");
		e.setAttribute("autocapitalize",
			"off");
		e.setAttribute("spellcheck", "false");
		d.inputDiv = p("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
		d.scrollbarH = p("div", [p("div", null, null, "height: 1px")], "CodeMirror-hscrollbar");
		d.scrollbarV = p("div", [p("div", null, null, "width: 1px")], "CodeMirror-vscrollbar");
		d.scrollbarFiller = p("div", null, "CodeMirror-scrollbar-filler");
		d.gutterFiller = p("div", null, "CodeMirror-gutter-filler");
		d.lineDiv = p("div", null, "CodeMirror-code");
		d.selectionDiv = p("div", null, null, "position: relative; z-index: 1");
		d.cursor = p("div", "\u00a0", "CodeMirror-cursor");
		d.otherCursor = p("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor");
		d.measure = p("div", null, "CodeMirror-measure");
		d.lineSpace = p("div", [d.measure, d.selectionDiv, d.lineDiv, d.cursor, d.otherCursor], null, "position: relative; outline: none");
		d.mover = p("div", [p("div", [d.lineSpace], "CodeMirror-lines")], null, "position: relative");
		d.sizer = p("div", [d.mover], "CodeMirror-sizer");
		d.heightForcer = p("div", null, null, "position: absolute; height: " + oa + "px; width: 1px;");
		d.gutters = p("div", null, "CodeMirror-gutters");
		d.lineGutter = null;
		d.scroller = p("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
		d.scroller.setAttribute("tabIndex", "-1");
		d.wrapper = p("div", [d.inputDiv, d.scrollbarH, d.scrollbarV, d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
		pa && (d.gutters.style.zIndex = -1, d.scroller.style.paddingRight = 0);
		a.appendChild ? a.appendChild(d.wrapper) : a(d.wrapper);
		Fa && (e.style.width = "0px");
		P || (d.scroller.draggable = !0);
		Pb ? (d.inputDiv.style.height = "1px", d.inputDiv.style.position =
			"absolute") : pa && (d.scrollbarH.style.minWidth = d.scrollbarV.style.minWidth = "18px");
		d.viewOffset = d.lastSizeC = 0;
		d.showingFrom = d.showingTo = c;
		d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
		d.prevInput = "";
		d.alignWidgets = !1;
		d.pollingFast = !1;
		d.poll = new Qb;
		d.cachedCharWidth = d.cachedTextHeight = null;
		d.measureLineCache = [];
		d.measureLineCachePos = 0;
		d.inaccurateSelection = !1;
		d.maxLine = null;
		d.maxLineLength = 0;
		d.maxLineChanged = !1;
		d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
		c = this.display = d;
		c.wrapper.CodeMirror =
			this;
		Jc(this);
		b.autofocus && !Rb && M(this);
		this.state = {
			keyMaps: [],
			overlays: [],
			modeGen: 0,
			overwrite: !1,
			focused: !1,
			suppressEdits: !1,
			pasteIncoming: !1,
			draggingText: !1,
			highlight: new Qb
		};
		Kc(this);
		b.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
		d = b.value;
		"string" == typeof d && (d = new L(b.value, b.mode));
		x(this, Lc)(this, d);
		F && setTimeout(Q(aa, this, !0), 20);
		var f = this, d = function(){
			f.state.focused && setTimeout(Q(M, f), 0)
		}, g = function(){
			null == l && (l = setTimeout(function(){
				l = null;
				j.cachedCharWidth = j.cachedTextHeight =
					null;
				qa(f);
				Sb(f, Q(A, f))
			}, 100))
		}, h = function(){
			for (var a = j.wrapper.parentNode; a && a != document.body; a = a.parentNode);
			a ? setTimeout(h, 5E3) : Y(window, "resize", g)
		}, e = function(a){
			(!f.options.onDragEvent || !f.options.onDragEvent(f, Ga(a))) && Ha(a)
		}, k = function(){
			j.inaccurateSelection && (j.prevInput = "", j.inaccurateSelection = !1, j.input.value = f.getSelection(), Mc(j.input))
		}, j = f.display;
		q(j.scroller, "mousedown", x(f, Ud));
		F ? q(j.scroller, "dblclick", x(f, function(a){
			var b = Ia(f, a);
			b && (!Oc(f, a) && !fa(f.display, a)) && (B(a), a = Tb(w(f.doc,
				b.line).text, b), H(f.doc, a.from, a.to))
		})) : q(j.scroller, "dblclick", B);
		q(j.lineSpace, "selectstart", function(a){
			fa(j, a) || B(a)
		});
		Ub || q(j.scroller, "contextmenu", function(a){
			Pc(f, a)
		});
		q(j.scroller, "scroll", function(){
			j.scroller.clientHeight && (Ja(f, j.scroller.scrollTop), ra(f, j.scroller.scrollLeft, !0), J(f, "scroll", f))
		});
		q(j.scrollbarV, "scroll", function(){
			j.scroller.clientHeight && Ja(f, j.scrollbarV.scrollTop)
		});
		q(j.scrollbarH, "scroll", function(){
			j.scroller.clientHeight && ra(f, j.scrollbarH.scrollLeft)
		});
		q(j.scroller,
			"mousewheel", function(a){
				Qc(f, a)
			});
		q(j.scroller, "DOMMouseScroll", function(a){
			Qc(f, a)
		});
		q(j.scrollbarH, "mousedown", d);
		q(j.scrollbarV, "mousedown", d);
		q(j.wrapper, "scroll", function(){
			j.wrapper.scrollTop = j.wrapper.scrollLeft = 0
		});
		var l;
		q(window, "resize", g);
		setTimeout(h, 5E3);
		q(j.input, "keyup", x(f, function(a){
			if ((!f.options.onKeyEvent || !f.options.onKeyEvent(f, Ga(a))) && 16 == a.keyCode)f.doc.sel.shift = !1
		}));
		q(j.input, "input", Q(Ka, f));
		q(j.input, "keydown", x(f, Rc));
		q(j.input, "keypress", x(f, Vd));
		q(j.input, "focus",
			Q(ga, f));
		q(j.input, "blur", Q(Vb, f));
		f.options.dragDrop && (q(j.scroller, "dragstart", function(a){
			if (F && !f.state.draggingText)Ha(a); else if (!fa(f.display, a)) {
				var b = f.getSelection();
				a.dataTransfer.setData("Text", b);
				a.dataTransfer.setDragImage && (b = p("img", null, null, "position: fixed; left: 0; top: 0;"), T && (b.width = b.height = 1, f.display.wrapper.appendChild(b), b._top = b.offsetTop), Wb && (f.display.dragImg ? b = f.display.dragImg : (f.display.dragImg = b, b.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
					f.display.wrapper.appendChild(b))), a.dataTransfer.setDragImage(b, 0, 0), T && b.parentNode.removeChild(b))
			}
		}), q(j.scroller, "dragenter", e), q(j.scroller, "dragover", e), q(j.scroller, "drop", x(f, Wd)));
		q(j.scroller, "paste", function(a){
			fa(j, a) || (M(f), Ka(f))
		});
		q(j.input, "paste", function(){
			f.state.pasteIncoming = !0;
			Ka(f)
		});
		q(j.input, "cut", k);
		q(j.input, "copy", k);
		Pb && q(j.sizer, "mouseup", function(){
			document.activeElement == j.input && j.input.blur();
			M(f)
		});
		var u;
		try {
			u = document.activeElement == c.input
		} catch (t) {
		}
		u || b.autofocus &&	!Rb ? setTimeout(Q(ga, this), 20) : Vb(this);
		x(this, function(){
			for (var a in sa)if (sa.propertyIsEnumerable(a))sa[a](this, b[a], Sc);
			for (a = 0; a < Xb.length; ++a)Xb[a](this)
		})()
	}

	function La(a){
		a.doc.mode = m.getMode(a.options, a.doc.modeOption);
		a.doc.iter(function(a){
			a.stateAfter && (a.stateAfter = null);
			a.styles && (a.styles = null)
		});
		a.doc.frontier = a.doc.first;
		eb(a, 100);
		a.state.modeGen++;
		a.curOp && A(a)
	}

	function Tc(a){
		var b = Ma(a.display), c = a.options.lineWrapping, d = c && Math.max(5, a.display.scroller.clientWidth / Uc(a.display) -
				3);
		return function(e){
			return ha(a.doc, e) ? 0 : c ? (Math.ceil(e.text.length / d) || 1) * b : b
		}
	}

	function Vc(a){
		var b = a.doc, c = Tc(a);
		b.iter(function(a){
			var b = c(a);
			b != a.height && R(a, b)
		})
	}

	function Kc(a){
		a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
		qa(a)
	}

	function Na(a){
		Jc(a);
		A(a);
		setTimeout(function(){
			Yb(a)
		}, 20)
	}

	function Jc(a){
		var b = a.display.gutters, c = a.options.gutters;
		fb(b);
		for (var d = 0; d < c.length; ++d) {
			var e = c[d], f = b.appendChild(p("div",
				null, "CodeMirror-gutter " + e));
			"CodeMirror-linenumbers" == e && (a.display.lineGutter = f, f.style.width = (a.display.lineNumWidth || 1) + "px")
		}
		b.style.display = d ? "" : "none"
	}

	function gb(a, b){
		if (0 == b.height)return 0;
		for (var c = b.text.length, d, e = b; d = ia(e, -1);)d = d.find(), e = w(a, d.from.line), c += d.from.ch - d.to.ch;
		for (e = b; d = Oa(e);)d = d.find(), c -= e.text.length - d.from.ch, e = w(a, d.to.line), c += e.text.length - d.to.ch;
		return c
	}

	function Zb(a){
		var b = a.display, c = a.doc;
		b.maxLine = w(c, c.first);
		b.maxLineLength = gb(c, b.maxLine);
		b.maxLineChanged =	!0;
		c.iter(function(a){
			var e = gb(c, a);
			e > b.maxLineLength && (b.maxLineLength = e, b.maxLine = a)
		})
	}

	function Ob(a){
		for (var b = !1, c = 0; c < a.gutters.length; ++c)"CodeMirror-linenumbers" == a.gutters[c] && (a.lineNumbers ? b = !0 : a.gutters.splice(c--, 1));
		!b && a.lineNumbers && a.gutters.push("CodeMirror-linenumbers")
	}

	function $b(a){
		var b = a.display, c = a.doc.height + (b.mover.offsetHeight - b.lineSpace.offsetHeight);
		b.sizer.style.minHeight = b.heightForcer.style.top = c + "px";
		b.gutters.style.height = Math.max(c, b.scroller.clientHeight - oa) +
			"px";
		var c = Math.max(c, b.scroller.scrollHeight), d = b.scroller.scrollWidth > b.scroller.clientWidth, e = c > b.scroller.clientHeight;
		e ? (b.scrollbarV.style.display = "block", b.scrollbarV.style.bottom = d ? Pa(b.measure) + "px" : "0", b.scrollbarV.firstChild.style.height = c - b.scroller.clientHeight + b.scrollbarV.clientHeight + "px") : b.scrollbarV.style.display = "";
		d ? (b.scrollbarH.style.display = "block", b.scrollbarH.style.right = e ? Pa(b.measure) + "px" : "0", b.scrollbarH.firstChild.style.width = b.scroller.scrollWidth - b.scroller.clientWidth +
			b.scrollbarH.clientWidth + "px") : b.scrollbarH.style.display = "";
		d && e ? (b.scrollbarFiller.style.display = "block", b.scrollbarFiller.style.height = b.scrollbarFiller.style.width = Pa(b.measure) + "px") : b.scrollbarFiller.style.display = "";
		d && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (b.gutterFiller.style.display = "block", b.gutterFiller.style.height = Pa(b.measure) + "px", b.gutterFiller.style.width = b.gutters.offsetWidth + "px") : b.gutterFiller.style.display = "";
		Xd && 0 === Pa(b.measure) && (b.scrollbarV.style.minWidth =
			b.scrollbarH.style.minHeight = Yd ? "18px" : "12px")
	}

	function ac(a, b, c){
		var d = a.scroller.scrollTop, e = a.wrapper.clientHeight;
		"number" == typeof c ? d = c : c && (d = c.top, e = c.bottom - c.top);
		d = Math.floor(d - a.lineSpace.offsetTop);
		a = Math.ceil(d + e);
		return {from: hb(b, d), to: hb(b, a)}
	}

	function Yb(a){
		var b = a.display;
		if (b.alignWidgets || b.gutters.firstChild && a.options.fixedGutter) {
			for (var c = bc(b) - b.scroller.scrollLeft + a.doc.scrollLeft, d = b.gutters.offsetWidth, e = c + "px", f = b.lineDiv.firstChild; f; f = f.nextSibling)if (f.alignable)for (var g =
				0, h = f.alignable; g < h.length; ++g)h[g].style.left = e;
			a.options.fixedGutter && (b.gutters.style.left = c + d + "px")
		}
	}

	function bc(a){
		return D(a.scroller).left - D(a.sizer).left
	}

	function ib(a, b, c){
		for (var d = a.display.showingFrom, e = a.display.showingTo, f, g = ac(a.display, a.doc, c); Zd(a, b, g);) {
			f = !0;
			cc(a);
			$b(a);
			c && (c = Math.min(a.display.scroller.scrollHeight - a.display.scroller.clientHeight, "number" == typeof c ? c : c.top));
			g = ac(a.display, a.doc, c);
			if (g.from >= a.display.showingFrom && g.to <= a.display.showingTo)break;
			b = []
		}
		f && (U(a,
			"update", a), (a.display.showingFrom != d || a.display.showingTo != e) && U(a, "viewportChange", a, a.display.showingFrom, a.display.showingTo));
		return f
	}

	function Zd(a, b, c){
		var d = a.display, e = a.doc;
		if (d.wrapper.clientWidth) {
			if (!(0 == b.length && c.from > d.showingFrom && c.to < d.showingTo)) {
				var f;
				if (a.options.lineNumbers) {
					f = a.doc;
					f = String(a.options.lineNumberFormatter(f.first + f.size - 1 + a.options.firstLineNumber));
					var g = a.display;
					if (f.length != g.lineNumChars) {
						var h = g.measure.appendChild(p("div", [p("div", f)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
							k = h.firstChild.offsetWidth, h = h.offsetWidth - k;
						g.lineGutter.style.width = "";
						g.lineNumInnerWidth = Math.max(k, g.lineGutter.offsetWidth - h);
						g.lineNumWidth = g.lineNumInnerWidth + h;
						g.lineNumChars = g.lineNumInnerWidth ? f.length : -1;
						g.lineGutter.style.width = g.lineNumWidth + "px";
						f = !0
					} else f = !1
				} else f = !1;
				f && (b = [{from: e.first, to: e.first + e.size}]);
				f = d.sizer.style.marginLeft = d.gutters.offsetWidth + "px";
				d.scrollbarH.style.left = a.options.fixedGutter ? f : "0";
				g = Infinity;
				if (a.options.lineNumbers)for (k = 0; k < b.length; ++k)if (b[k].diff) {
					g =
						b[k].from;
					break
				}
				k = e.first + e.size;
				f = Math.max(c.from - a.options.viewportMargin, e.first);
				c = Math.min(k, c.to + a.options.viewportMargin);
				d.showingFrom < f && 20 > f - d.showingFrom && (f = Math.max(e.first, d.showingFrom));
				d.showingTo > c && 20 > d.showingTo - c && (c = Math.min(k, d.showingTo));
				if (Qa)for (f = N(ta(e, w(e, f))); c < k && ha(e, w(e, c));)++c;
				h = [{from: Math.max(d.showingFrom, e.first), to: Math.min(d.showingTo, k)}];
				if (h[0].from >= h[0].to)h = []; else {
					for (var k = h, h = 0, j = b.length || 0; h < j; ++h) {
						for (var l = b[h], u = [], t = l.diff || 0, s = 0, m = k.length; s <
						m; ++s) {
							var n = k[s];
							l.to <= n.from && l.diff ? u.push({
								from: n.from + t,
								to: n.to + t
							}) : l.to <= n.from || l.from >= n.to ? u.push(n) : (l.from > n.from && u.push({
								from: n.from,
								to: l.from
							}), l.to < n.to && u.push({from: l.to + t, to: n.to + t}))
						}
						k = u
					}
					h = k
				}
				if (Qa)for (k = 0; k < h.length; ++k)for (b = h[k]; j = Oa(w(e, b.to - 1));)if (j = j.find().from.line, j > b.from)b.to = j; else {
					h.splice(k--, 1);
					break
				}
				for (k = e = 0; k < h.length; ++k)b = h[k], b.from < f && (b.from = f), b.to > c && (b.to = c), b.from >= b.to ? h.splice(k--, 1) : e += b.to - b.from;
				if (e == c - f && f == d.showingFrom && c == d.showingTo)Wc(a); else {
					h.sort(function(a,
																					b){
						return a.from - b.from
					});
					try {
						var E = document.activeElement
					} catch (ue) {
					}
					e < 0.7 * (c - f) && (d.lineDiv.style.display = "none");
					e = f;
					b = c;
					for (var r = h, x = g, dc = function(b){
						var c = b.nextSibling;
						P && ua && a.display.currentWheelTarget == b ? (b.style.display = "none", b.lineObj = null) : b.parentNode.removeChild(b);
						return c
					}, q, g = a.display, k = {}, h = {}, j = g.gutters.firstChild, l = 0; j; j = j.nextSibling, ++l)k[a.options.gutters[l]] = j.offsetLeft, h[a.options.gutters[l]] = j.offsetWidth;
					q = {
						fixedPos: bc(g), gutterTotalWidth: g.gutters.offsetWidth, gutterLeft: k,
						gutterWidth: h, wrapperWidth: g.wrapper.clientWidth
					};
					var g = a.display, G = a.options.lineNumbers;
					!r.length && (!P || !a.display.currentWheelTarget) && fb(g.lineDiv);
					var v = g.lineDiv, C = v.firstChild, z = r.shift(), y = e;
					for (a.doc.iter(e, b, function(b){
						z && z.to == y && (z = r.shift());
						if (ha(a.doc, b)) {
							if (0 != b.height && R(b, 0), b.widgets && C.previousSibling)for (var c = 0; c < b.widgets.length; ++c)if (b.widgets[c].showIfHidden) {
								var d = C.previousSibling;
								if (/pre/i.test(d.nodeName)) {
									var e = p("div", null, null, "position: relative");
									d.parentNode.replaceChild(e,
										d);
									e.appendChild(d);
									d = e
								}
								e = d.appendChild(p("div", [b.widgets[c].node], "CodeMirror-linewidget"));
								ec(b.widgets[c], e, d, q)
							}
						} else if (z && z.from <= y && z.to > y) {
							for (; C.lineObj != b;)C = dc(C);
							G && (x <= y && C.lineNumber) && Yc(C.lineNumber, String(a.options.lineNumberFormatter(y + a.options.firstLineNumber)));
							C = C.nextSibling
						} else {
							if (b.widgets)for (var f = 0, g = C; g && 20 > f; ++f, g = g.nextSibling)if (g.lineObj == b && /div/i.test(g.nodeName)) {
								c = g;
								break
							}
							var h = y, g = c, f = fc(a, b), j = b.gutterMarkers, k = a.display;
							if (!a.options.lineNumbers && !j && !b.bgClass &&	!b.wrapClass && !b.widgets)d = f; else {
								if (g) {
									g.alignable = null;
									for (var l = !0, u = 0, t = g.firstChild, s; t; t = s)if (s = t.nextSibling, /\bCodeMirror-linewidget\b/.test(t.className)) {
										for (var n = 0, m = !0; n < b.widgets.length; ++n) {
											var E = b.widgets[n], Nc = !1;
											E.above || (Nc = m, m = !1);
											if (E.node == t.firstChild) {
												ec(E, t, g, q);
												++u;
												Nc && g.insertBefore(f, t);
												break
											}
										}
										if (n == b.widgets.length) {
											l = !1;
											break
										}
									} else g.removeChild(t);
									l && u == b.widgets.length && (d = g, g.className = b.wrapClass || "")
								}
								d || (d = p("div", null, b.wrapClass, "position: relative"), d.appendChild(f));
								b.bgClass && d.insertBefore(p("div", null, b.bgClass + " CodeMirror-linebackground"), d.firstChild);
								if (a.options.lineNumbers || j) {
									e = d.insertBefore(p("div", null, null, "position: absolute; left: " + (a.options.fixedGutter ? q.fixedPos : -q.gutterTotalWidth) + "px"), d.firstChild);
									a.options.fixedGutter && (d.alignable || (d.alignable = [])).push(e);
									if (a.options.lineNumbers && (!j || !j["CodeMirror-linenumbers"]))d.lineNumber = e.appendChild(p("div", String(a.options.lineNumberFormatter(h + a.options.firstLineNumber)), "CodeMirror-linenumber CodeMirror-gutter-elt",
										"left: " + q.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + k.lineNumInnerWidth + "px"));
									if (j)for (n = 0; n < a.options.gutters.length; ++n)E = a.options.gutters[n], (h = j.hasOwnProperty(E) && j[E]) && e.appendChild(p("div", [h], "CodeMirror-gutter-elt", "left: " + q.gutterLeft[E] + "px; width: " + q.gutterWidth[E] + "px"))
								}
								pa && (d.style.zIndex = 2);
								if (b.widgets && d != g) {
									n = 0;
									for (g = b.widgets; n < g.length; ++n)E = g[n], j = p("div", [E.node], "CodeMirror-linewidget"), ec(E, j, d, q), E.above ? d.insertBefore(j, a.options.lineNumbers && 0 != b.height ?
										e : f) : d.appendChild(j), U(E, "redraw")
								}
							}
							if (d != c)v.insertBefore(d, C); else {
								for (; C != c;)C = dc(C);
								C = C.nextSibling
							}
							d.lineObj = b
						}
						++y
					}); C;)C = dc(C);
					d.lineDiv.style.display = "";
					E && (document.activeElement != E && E.offsetHeight) && E.focus();
					if (f != d.showingFrom || c != d.showingTo || d.lastSizeC != d.wrapper.clientHeight)d.lastSizeC = d.wrapper.clientHeight;
					d.showingFrom = f;
					d.showingTo = c;
					eb(a, 100);
					E = d.lineDiv.offsetTop;
					for (f = d.lineDiv.firstChild; f; f = f.nextSibling)if (f.lineObj && (pa ? (c = f.offsetTop + f.offsetHeight, e = c - E, E = c) : (e = D(f),
							e = e.bottom - e.top), c = f.lineObj.height - e, 2 > e && (e = Ma(d)), 0.001 < c || -0.001 > c))if (R(f.lineObj, e), e = f.lineObj.widgets)for (k = 0; k < e.length; ++k)e[k].height = e[k].node.offsetHeight;
					Wc(a);
					return !0
				}
			}
		} else d.showingFrom = d.showingTo = e.first, d.viewOffset = 0
	}

	function Wc(a){
		var b = a.display.viewOffset = va(a, w(a.doc, a.display.showingFrom));
		a.display.mover.style.top = b + "px"
	}

	function ec(a, b, c, d){
		a.noHScroll && ((c.alignable || (c.alignable = [])).push(b), c = d.wrapperWidth, b.style.left = d.fixedPos + "px", a.coverGutter || (c -= d.gutterTotalWidth,
			b.style.paddingLeft = d.gutterTotalWidth + "px"), b.style.width = c + "px");
		a.coverGutter && (b.style.zIndex = 5, b.style.position = "relative", a.noHScroll || (b.style.marginLeft = -d.gutterTotalWidth + "px"))
	}

	function cc(a){
		var b = a.display, c = z(a.doc.sel.from, a.doc.sel.to);
		if (c || a.options.showCursorWhenSelecting) {
			var d = a.display, e = V(a, a.doc.sel.head, "div");
			d.cursor.style.left = e.left + "px";
			d.cursor.style.top = e.top + "px";
			d.cursor.style.height = Math.max(0, e.bottom - e.top) * a.options.cursorHeight + "px";
			d.cursor.style.display = "";
			e.other ? (d.otherCursor.style.display = "", d.otherCursor.style.left = e.other.left + "px", d.otherCursor.style.top = e.other.top + "px", d.otherCursor.style.height = 0.85 * (e.other.bottom - e.other.top) + "px") : d.otherCursor.style.display = "none"
		} else b.cursor.style.display = b.otherCursor.style.display = "none";
		if (c)b.selectionDiv.style.display = "none"; else {
			var f = function(a, b, c, d){
				0 > b && (b = 0);
				h.appendChild(p("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px; top: " + b + "px; width: " + (null == c ? k - a : c) + "px; height: " +
					(d - b) + "px"))
			}, d = function(b, c, d, e){
				var h = w(g, b), l = h.text.length, u = e ? Infinity : -Infinity;
				var t = W(h), s = c || 0, m = null == d ? l : d, p = function(g, t, s){
					var m = jb(a, n(b, g), "div", h), p, r;
					g == t ? (p = m, s = r = m.left) : (p = jb(a, n(b, t - 1), "div", h), "rtl" == s && (s = m, m = p, p = s), s = m.left, r = p.right);
					3 < p.top - m.top && (f(s, m.top, null, m.bottom), s = j, m.bottom < p.top && f(s, m.bottom, null, p.top));
					null == d && t == l && (r = k);
					null == c && 0 == g && (s = j);
					u = e ? Math.min(p.top, u) : Math.max(p.bottom, u);
					s < j + 1 && (s = j);
					f(s, p.top, r - s, p.bottom)
				};
				if (t)for (var q = 0; q < t.length; ++q) {
					var r =
						t[q];
					if (r.from < m && r.to > s || s == m && r.to == s)p(Math.max(r.from, s), Math.min(r.to, m), 1 == r.level ? "rtl" : "ltr")
				} else p(s, m, "ltr");
				return u
			}, c = a.display, g = a.doc, e = a.doc.sel, h = document.createDocumentFragment(), k = c.lineSpace.offsetWidth, j = X(a.display.measure, p("pre", null, null, "text-align: left")).appendChild(p("span", "x")).offsetLeft;
			if (e.from.line == e.to.line)d(e.from.line, e.from.ch, e.to.ch); else {
				for (var l = w(g, e.from.line), u = l, t = [e.from.line, e.from.ch], s; u = Oa(u);) {
					u = u.find();
					t.push(u.from.ch, u.to.line, u.to.ch);
					if (u.to.line == e.to.line) {
						t.push(e.to.ch);
						s = !0;
						break
					}
					u = w(g, u.to.line)
				}
				if (s)for (s = 0; s < t.length; s += 3)d(t[s], t[s + 1], t[s + 2]); else t = w(g, e.to.line), s = e.from.ch ? d(e.from.line, e.from.ch, null, !1) : va(a, l) - c.viewOffset, d = e.to.ch ? d(e.to.line, ia(t, -1) ? null : 0, e.to.ch, !0) : va(a, t) - c.viewOffset, s < d && f(j, s, null, d)
			}
			X(c.selectionDiv, h);
			c.selectionDiv.style.display = ""
		}
		a.options.moveInputWithCursor && (c = V(a, a.doc.sel.head, "div"), d = D(b.wrapper), s = D(b.lineDiv), b.inputDiv.style.top = Math.max(0, Math.min(b.wrapper.clientHeight -
				10, c.top + s.top - d.top)) + "px", b.inputDiv.style.left = Math.max(0, Math.min(b.wrapper.clientWidth - 10, c.left + s.left - d.left)) + "px")
	}

	function kb(a){
		if (a.state.focused) {
			var b = a.display;
			clearInterval(b.blinker);
			var c = !0;
			b.cursor.style.visibility = b.otherCursor.style.visibility = "";
			b.blinker = setInterval(function(){
				b.cursor.style.visibility = b.otherCursor.style.visibility = (c = !c) ? "" : "hidden"
			}, a.options.cursorBlinkRate)
		}
	}

	function eb(a, b){
		a.doc.mode.startState && a.doc.frontier < a.display.showingTo && a.state.highlight.set(b,
			Q($d, a))
	}

	function $d(a){
		var b = a.doc;
		b.frontier < b.first && (b.frontier = b.first);
		if (!(b.frontier >= a.display.showingTo)) {
			var c = +new Date + a.options.workTime, d = wa(b.mode, Ra(a, b.frontier)), e = [], f;
			b.iter(b.frontier, Math.min(b.first + b.size, a.display.showingTo + 500), function(g){
				if (b.frontier >= a.display.showingFrom) {
					var h = g.styles;
					g.styles = Zc(a, g, d);
					for (var k = !h || h.length != g.styles.length, j = 0; !k && j < h.length; ++j)k = h[j] != g.styles[j];
					k && (f && f.end == b.frontier ? f.end++ : e.push(f = {start: b.frontier, end: b.frontier + 1}));
					g.stateAfter = wa(b.mode, d)
				} else $c(a, g, d), g.stateAfter = 0 == b.frontier % 5 ? wa(b.mode, d) : null;
				++b.frontier;
				if (+new Date > c)return eb(a, a.options.workDelay), !0
			});
			e.length && x(a, function(){
				for (var a = 0; a < e.length; ++a)A(this, e[a].start, e[a].end)
			})()
		}
	}

	function Ra(a, b){
		var c = a.doc, d = a.display;
		if (!c.mode.startState)return !0;
		var e;
		a:{
			for (var f, g, h = a.doc, k = b, j = b - 100; k > j; --k) {
				if (k <= h.first) {
					e = h.first;
					break a
				}
				var l = w(h, k - 1);
				if (l.stateAfter) {
					e = k;
					break a
				}
				l = xa(l.text, null, a.options.tabSize);
				if (null == g || f > l)g = k - 1, f = l
			}
			e =
				g
		}
		var u = e > c.first && w(c, e - 1).stateAfter, u = u ? wa(c.mode, u) : ad(c.mode);
		c.iter(e, b, function(f){
			$c(a, f, u);
			f.stateAfter = e == b - 1 || 0 == e % 5 || e >= d.showingFrom && e < d.showingTo ? wa(c.mode, u) : null;
			++e
		});
		return u
	}

	function gc(a, b, c, d){
		var e = -1;
		d = d || hc(a, b);
		for (a = c; ; a += e) {
			var f = d[a];
			if (f)break;
			0 > e && 0 == a && (e = 1)
		}
		return {left: a < c ? f.right : f.left, right: a > c ? f.left : f.right, top: f.top, bottom: f.bottom}
	}

	function ic(a, b){
		for (var c = a.display.measureLineCache, d = 0; d < c.length; ++d) {
			var e = c[d];
			if (e.text == b.text && e.markedSpans == b.markedSpans &&
				a.display.scroller.clientWidth == e.width && e.classes == b.textClass + "|" + b.bgClass + "|" + b.wrapClass)return e
		}
	}

	function hc(a, b){
		var c = ic(a, b);
		if (c)return c.measure;
		var d = a.display, e = bd(b.text.length), f = fc(a, b, e);
		if (F && !pa && !a.options.lineWrapping && 100 < f.childNodes.length) {
			for (var g = document.createDocumentFragment(), h = f.childNodes.length, c = 0, k = Math.ceil(h / 10); c < k; ++c) {
				for (var j = p("div", null, null, "display: inline-block"), l = 0; 10 > l && h; ++l)j.appendChild(f.firstChild), --h;
				g.appendChild(j)
			}
			f.appendChild(g)
		}
		X(d.measure,
			f);
		k = D(d.lineDiv);
		h = [];
		g = bd(b.text.length);
		j = f.offsetHeight;
		O && d.measure.first != f && X(d.measure, f);
		for (c = 0; c < e.length; ++c)if (d = e[c]) {
			for (var f = D(d), u = Math.max(0, f.top - k.top), t = Math.min(f.bottom - k.top, j), l = 0; l < h.length; l += 2) {
				var s = h[l], n = h[l + 1];
				if (!(s > t || n < u))if (s <= u && n >= t || u <= s && t >= n || Math.min(t, n) - Math.max(u, s) >= t - u >> 1) {
					h[l] = Math.min(u, s);
					h[l + 1] = Math.max(t, n);
					break
				}
			}
			l == h.length && h.push(u, t);
			u = f.right;
			d.measureRight && (u = D(d.measureRight).left);
			g[c] = {left: f.left - k.left, right: u - k.left, top: l}
		}
		for (c = 0; c <
		g.length; ++c)if (d = g[c])e = d.top, d.top = h[e], d.bottom = h[e + 1];
		c = a.display.measureLineCache;
		e = {
			text: b.text,
			width: a.display.scroller.clientWidth,
			markedSpans: b.markedSpans,
			measure: g,
			classes: b.textClass + "|" + b.bgClass + "|" + b.wrapClass
		};
		16 == c.length ? c[++a.display.measureLineCachePos % 16] = e : c.push(e);
		return g
	}

	function qa(a){
		a.display.measureLineCache.length = a.display.measureLineCachePos = 0;
		a.display.cachedCharWidth = a.display.cachedTextHeight = null;
		a.options.lineWrapping || (a.display.maxLineChanged = !0);
		a.display.lineNumChars =
			null
	}

	function cd(a, b, c, d){
		if (b.widgets)for (var e = 0; e < b.widgets.length; ++e)if (b.widgets[e].above) {
			var f = lb(b.widgets[e]);
			c.top += f;
			c.bottom += f
		}
		if ("line" == d)return c;
		d || (d = "local");
		b = va(a, b);
		"local" != d && (b -= a.display.viewOffset);
		"page" == d && (a = D(a.display.lineSpace), b += a.top + (window.pageYOffset || (document.documentElement || document.body).scrollTop), a = a.left + (window.pageXOffset || (document.documentElement || document.body).scrollLeft), c.left += a, c.right += a);
		c.top += b;
		c.bottom += b;
		return c
	}

	function jb(a, b, c, d){
		d ||
		(d = w(a.doc, b.line));
		return cd(a, d, gc(a, d, b.ch), c)
	}

	function V(a, b, c, d, e){
		function f(b, f){
			var g = gc(a, d, b, e);
			f ? g.left = g.right : g.right = g.left;
			return cd(a, d, g, c)
		}

		function g(a, b){
			var c = h[b], d = c.level % 2;
			a == (c.level % 2 ? c.to : c.from) && b && c.level < h[b - 1].level ? (c = h[--b], a = jc(c) - (c.level % 2 ? 0 : 1), d = !0) : a == jc(c) && (b < h.length - 1 && c.level < h[b + 1].level) && (c = h[++b], a = (c.level % 2 ? c.to : c.from) - c.level % 2, d = !1);
			return d && a == c.to && a > c.from ? f(a - 1) : f(a, d)
		}

		d = d || w(a.doc, b.line);
		e || (e = hc(a, d));
		var h = W(d);
		b = b.ch;
		if (!h)return f(b);
		var k = kc(h, b), k = g(b, k);
		null != ya && (k.other = g(b, ya));
		return k
	}

	function mb(a, b, c){
		a = new n(a, b);
		c && (a.outside = !0);
		return a
	}

	function lc(a, b, c){
		var d = a.doc;
		c += a.display.viewOffset;
		if (0 > c)return mb(d.first, 0, !0);
		var e = hb(d, c), f = d.first + d.size - 1;
		if (e > f)return mb(d.first + d.size - 1, w(d, f).text.length, !0);
		for (0 > b && (b = 0); ;) {
			var f = w(d, e), e = ae(a, f, e, b, c), g = (f = Oa(f)) && f.find();
			if (f && e.ch >= g.from.ch)e = g.to.line; else return e
		}
	}

	function ae(a, b, c, d, e){
		function f(d){
			d = V(a, n(c, d), "line", b, j);
			h = !0;
			if (g > d.bottom)return d.left -
				k;
			if (g < d.top)return d.left + k;
			h = !1;
			return d.left
		}

		var g = e - va(a, b), h = !1, k = 2 * a.display.wrapper.clientWidth, j = hc(a, b), l = W(b), u = b.text.length, t = nb(b), s = ob(b), m = f(t);
		e = h;
		var p = f(s), E = h;
		if (d > p)return mb(c, s, E);
		for (; ;) {
			if (l ? s == t || s == mc(b, t, 1) : 1 >= s - t) {
				for (t = (d = d - m < p - d) ? t : s; nc.test(b.text.charAt(t));)++t;
				e = mb(c, t, d ? e : E);
				e.after = d;
				return e
			}
			var r = Math.ceil(u / 2), q = t + r;
			if (l)for (var q = t, w = 0; w < r; ++w)q = mc(b, q, 1);
			w = f(q);
			if (w > d) {
				s = q;
				p = w;
				if (E = h)p += 1E3;
				u = r
			} else t = q, m = w, e = h, u -= r
		}
	}

	function Ma(a){
		if (null != a.cachedTextHeight)return a.cachedTextHeight;
		if (null == ja) {
			ja = p("pre");
			for (var b = 0; 49 > b; ++b)ja.appendChild(document.createTextNode("x")), ja.appendChild(p("br"));
			ja.appendChild(document.createTextNode("x"))
		}
		X(a.measure, ja);
		b = ja.offsetHeight / 50;
		3 < b && (a.cachedTextHeight = b);
		fb(a.measure);
		return b || 1
	}

	function Uc(a){
		if (null != a.cachedCharWidth)return a.cachedCharWidth;
		var b = p("span", "x"), c = p("pre", [b]);
		X(a.measure, c);
		b = b.offsetWidth;
		2 < b && (a.cachedCharWidth = b);
		return b || 10
	}

	function za(a){
		a.curOp = {
			changes: [], updateInput: null, userSelChange: null, textChanged: null,
			selectionChanged: !1, cursorActivity: !1, updateMaxLine: !1, updateScrollPos: !1, id: ++be
		};
		pb++ || (ba = [])
	}

	function Aa(a){
		var b = a.curOp, c = a.doc, d = a.display;
		a.curOp = null;
		b.updateMaxLine && Zb(a);
		if (d.maxLineChanged && !a.options.lineWrapping && d.maxLine) {
			var e;
			e = d.maxLine;
			var f = !1;
			if (e.markedSpans)for (var g = 0; g < e.markedSpans; ++g) {
				var h = e.markedSpans[g];
				if (h.collapsed && (null == h.to || h.to == e.text.length))f = !0
			}
			(f = !f && ic(a, e)) ? e = gc(a, e, e.text.length, f.measure).right : (e = fc(a, e), f = e.appendChild(qb(a.display.measure)), X(a.display.measure,
				e), e = D(f).right - D(a.display.lineDiv).left);
			d.sizer.style.minWidth = Math.max(0, e + 3 + oa) + "px";
			d.maxLineChanged = !1;
			e = Math.max(0, d.sizer.offsetLeft + d.sizer.offsetWidth - d.scroller.clientWidth);
			e < c.scrollLeft && !b.updateScrollPos && ra(a, Math.min(d.scroller.scrollLeft, e), !0)
		}
		var k, j;
		b.updateScrollPos ? k = b.updateScrollPos : b.selectionChanged && d.scroller.clientHeight && (k = V(a, c.sel.head), k = rb(a, k.left, k.top, k.left, k.bottom));
		if (b.changes.length || k && null != k.scrollTop)j = ib(a, b.changes, k && k.scrollTop), a.display.scroller.offsetHeight &&
		(a.doc.scrollTop = a.display.scroller.scrollTop);
		!j && b.selectionChanged && cc(a);
		if (b.updateScrollPos)d.scroller.scrollTop = d.scrollbarV.scrollTop = c.scrollTop = k.scrollTop, d.scroller.scrollLeft = d.scrollbarH.scrollLeft = c.scrollLeft = k.scrollLeft, Yb(a), b.scrollToPos && dd(a, r(a.doc, b.scrollToPos), b.scrollToPosMargin); else if (k && (c = dd(a, a.doc.sel.head, a.options.cursorScrollMargin), a.state.focused)) {
			d = a.display;
			k = D(d.sizer);
			j = null;
			e = a.display.lineSpace.offsetTop;
			if (0 > c.top + e + k.top)j = !0; else if (c.bottom + e + k.top >
				(window.innerHeight || document.documentElement.clientHeight))j = !1;
			if (null != j && !ce) {
				if (k = "none" == d.cursor.style.display)d.cursor.style.display = "", d.cursor.style.left = c.left + "px", d.cursor.style.top = c.top - d.viewOffset + "px";
				d.cursor.scrollIntoView(j);
				k && (d.cursor.style.display = "none")
			}
		}
		b.selectionChanged && kb(a);
		a.state.focused && b.updateInput && aa(a, b.userSelChange);
		c = b.maybeHiddenMarkers;
		d = b.maybeUnhiddenMarkers;
		if (c)for (j = 0; j < c.length; ++j)c[j].lines.length || J(c[j], "hide");
		if (d)for (j = 0; j < d.length; ++j)d[j].lines.length &&
		J(d[j], "unhide");
		var l;
		--pb || (l = ba, ba = null);
		b.textChanged && J(a, "change", a, b.textChanged);
		b.cursorActivity && J(a, "cursorActivity", a);
		if (l)for (j = 0; j < l.length; ++j)l[j]()
	}

	function x(a, b){
		return function(){
			var c = a || this, d = !c.curOp;
			d && za(c);
			try {
				var e = b.apply(c, arguments)
			} finally {
				d && Aa(c)
			}
			return e
		}
	}

	function Sa(a){
		return function(){
			var b = this.cm && !this.cm.curOp, c;
			b && za(this.cm);
			try {
				c = a.apply(this, arguments)
			} finally {
				b && Aa(this.cm)
			}
			return c
		}
	}

	function Sb(a, b){
		var c = !a.curOp, d;
		c && za(a);
		try {
			d = b()
		} finally {
			c && Aa(a)
		}
		return d
	}

	function A(a, b, c, d){
		null == b && (b = a.doc.first);
		null == c && (c = a.doc.first + a.doc.size);
		a.curOp.changes.push({from: b, to: c, diff: d})
	}

	function sb(a){
		a.display.pollingFast || a.display.poll.set(a.options.pollInterval, function(){
			oc(a);
			a.state.focused && sb(a)
		})
	}

	function Ka(a){
		function b(){
			!oc(a) && !c ? (c = !0, a.display.poll.set(60, b)) : (a.display.pollingFast = !1, sb(a))
		}

		var c = !1;
		a.display.pollingFast = !0;
		a.display.poll.set(20, b)
	}

	function oc(a){
		var b = a.display.input, c = a.display.prevInput, d = a.doc, e = d.sel;
		if (!a.state.focused ||
			de(b) || Ta(a))return !1;
		var f = b.value;
		if (f == c && z(e.from, e.to))return !1;
		if (F && !O && a.display.inputHasSelection === f)return aa(a, !0), !1;
		var g = !a.curOp;
		g && za(a);
		e.shift = !1;
		for (var h = 0, k = Math.min(c.length, f.length); h < k && c.charCodeAt(h) == f.charCodeAt(h);)++h;
		k = e.from;
		e = e.to;
		h < c.length ? k = n(k.line, k.ch - (c.length - h)) : a.state.overwrite && (z(k, e) && !a.state.pasteIncoming) && (e = n(e.line, Math.min(w(d, e.line).text.length, e.ch + (f.length - h))));
		c = a.curOp.updateInput;
		Ba(a.doc, {
			from: k, to: e, text: ka(f.slice(h)), origin: a.state.pasteIncoming ?
				"paste" : "+input"
		}, "end");
		a.curOp.updateInput = c;
		1E3 < f.length || -1 < f.indexOf("\n") ? b.value = a.display.prevInput = "" : a.display.prevInput = f;
		g && Aa(a);
		a.state.pasteIncoming = !1;
		return !0
	}

	function aa(a, b){
		var c, d, e = a.doc;
		z(e.sel.from, e.sel.to) ? b && (a.display.prevInput = a.display.input.value = "", F && !O && (a.display.inputHasSelection = null)) : (a.display.prevInput = "", d = (c = tb && (100 < e.sel.to.line - e.sel.from.line || 1E3 < (d = a.getSelection()).length)) ? "-" : d || a.getSelection(), a.display.input.value = d, a.state.focused && Mc(a.display.input),
		F && !O && (a.display.inputHasSelection = d));
		a.display.inaccurateSelection = c
	}

	function M(a){
		"nocursor" != a.options.readOnly && (!Rb || document.activeElement != a.display.input) && a.display.input.focus()
	}

	function Ta(a){
		return a.options.readOnly || a.doc.cantEdit
	}

	function fa(a, b){
		for (var c = b.target || b.srcElement; c != a.wrapper; c = c.parentNode)if (!c || /\bCodeMirror-(?:line)?widget\b/.test(c.className) || c.parentNode == a.sizer && c != a.mover)return !0
	}

	function Ia(a, b, c){
		var d = a.display;
		if (!c && (c = b.target || b.srcElement, c == d.scrollbarH ||
			c == d.scrollbarH.firstChild || c == d.scrollbarV || c == d.scrollbarV.firstChild || c == d.scrollbarFiller || c == d.gutterFiller))return null;
		var e, f, d = D(d.lineSpace);
		try {
			e = b.clientX, f = b.clientY
		} catch (g) {
			return null
		}
		return lc(a, e - d.left, f - d.top)
	}

	function Ud(a){
		function b(a){
			var c = ++v, g = Ia(d, a, !0);
			if (g)if (z(g, u)) {
				var k = a.clientY < E.top ? -20 : a.clientY > E.bottom ? 20 : 0;
				k && setTimeout(x(d, function(){
					v == c && (e.scroller.scrollTop += k, b(a))
				}), 50)
			} else {
				d.state.focused || ga(d);
				u = g;
				if (!z(p, g))if (p = g, "single" == j)H(d.doc, r(f, h), g); else if (s =
						r(f, s), m = r(f, m), "double" == j) {
					var l = Tb(w(f, g.line).text, g);
					y(g, s) ? H(d.doc, l.from, m) : H(d.doc, s, l.to)
				} else"triple" == j && (y(g, s) ? H(d.doc, m, r(f, n(g.line, 0))) : H(d.doc, s, r(f, n(g.line + 1, 0))));
				l = ac(e, f);
				(g.line >= l.to || g.line < l.from) && setTimeout(x(d, function(){
					v == c && b(a)
				}), 150)
			}
		}

		function c(a){
			v = Infinity;
			B(a);
			M(d);
			Y(document, "mousemove", A);
			Y(document, "mouseup", Xc)
		}

		var d = this, e = d.display, f = d.doc, g = f.sel;
		g.shift = a.shiftKey;
		if (fa(e, a))P || (e.scroller.draggable = !1, setTimeout(function(){
			e.scroller.draggable = !0
		}, 100));
		else if (!Oc(d, a)) {
			var h = Ia(d, a);
			switch (ed(a)) {
				case 3:
					Ub && Pc.call(d, d, a);
					return;
				case 2:
					h && H(d.doc, h);
					setTimeout(Q(M, d), 20);
					B(a);
					return
			}
			if (h) {
				d.state.focused || ga(d);
				var k = +new Date, j = "single";
				if (ub && ub.time > k - 400 && z(ub.pos, h)) {
					j = "triple";
					B(a);
					setTimeout(Q(M, d), 20);
					var k = d, l = h.line;
					H(k.doc, n(l, 0), r(k.doc, n(l + 1, 0)))
				} else vb && vb.time > k - 400 && z(vb.pos, h) ? (j = "double", ub = {
					time: k,
					pos: h
				}, B(a), k = Tb(w(f, h.line).text, h), H(d.doc, k.from, k.to)) : vb = {time: k, pos: h};
				var u = h;
				if (d.options.dragDrop && pc && !Ta(d) && !z(g.from,
						g.to) && !y(h, g.from) && !y(g.to, h) && "single" == j) {
					var t = x(d, function(b){
						P && (e.scroller.draggable = !1);
						d.state.draggingText = !1;
						Y(document, "mouseup", t);
						Y(e.scroller, "drop", t);
						10 > Math.abs(a.clientX - b.clientX) + Math.abs(a.clientY - b.clientY) && (B(b), H(d.doc, h), M(d))
					});
					P && (e.scroller.draggable = !0);
					d.state.draggingText = t;
					e.scroller.dragDrop && e.scroller.dragDrop();
					q(document, "mouseup", t);
					q(e.scroller, "drop", t)
				} else {
					B(a);
					"single" == j && H(d.doc, r(f, h));
					var s = g.from, m = g.to, p = h, E = D(e.wrapper), v = 0, A = x(d, function(a){
						!F &&	!ed(a) ? c(a) : b(a)
					}), Xc = x(d, c);
					q(document, "mousemove", A);
					q(document, "mouseup", Xc)
				}
			} else(a.target || a.srcElement) == e.scroller && B(a)
		}
	}

	function Wd(a){
		var b = this;
		if (!(fa(b.display, a) || b.options.onDragEvent && b.options.onDragEvent(b, Ga(a)))) {
			B(a);
			var c = Ia(b, a, !0), d = a.dataTransfer.files;
			if (c && !Ta(b))if (d && d.length && window.FileReader && window.File) {
				var e = d.length, f = Array(e), g = 0;
				a = function(a, d){
					var h = new FileReader;
					h.onload = function(){
						f[d] = h.result;
						++g == e && (c = r(b.doc, c), Ba(b.doc, {
							from: c, to: c, text: ka(f.join("\n")),
							origin: "paste"
						}, "around"))
					};
					h.readAsText(a)
				};
				for (var h = 0; h < e; ++h)a(d[h], h)
			} else if (b.state.draggingText && !y(c, b.doc.sel.from) && !y(b.doc.sel.to, c))b.state.draggingText(a), setTimeout(Q(M, b), 20); else try {
				if (f = a.dataTransfer.getData("Text")) {
					var h = b.doc.sel.from, k = b.doc.sel.to;
					ca(b.doc, c, c);
					b.state.draggingText && da(b.doc, "", h, k, "paste");
					b.replaceSelection(f, null, "paste");
					M(b);
					ga(b)
				}
			} catch (j) {
			}
		}
	}

	function Oc(a, b){
		var c = a.display;
		try {
			var d = b.clientX, e = b.clientY
		} catch (f) {
			return !1
		}
		if (d >= Math.floor(D(c.gutters).right))return !1;
		B(b);
		if (!ea(a, "gutterClick"))return !0;
		var g = D(c.lineDiv);
		if (e > g.bottom)return !0;
		e -= g.top - c.viewOffset;
		for (g = 0; g < a.options.gutters.length; ++g) {
			var h = c.gutters.childNodes[g];
			if (h && D(h).right >= d) {
				c = hb(a.doc, e);
				U(a, "gutterClick", a, c, a.options.gutters[g], b);
				break
			}
		}
		return !0
	}

	function Ja(a, b){
		2 > Math.abs(a.doc.scrollTop - b) || (a.doc.scrollTop = b, Ca || ib(a, [], b), a.display.scroller.scrollTop != b && (a.display.scroller.scrollTop = b), a.display.scrollbarV.scrollTop != b && (a.display.scrollbarV.scrollTop = b), Ca && ib(a, []))
	}

	function ra(a, b, c){
		if (!(c ? b == a.doc.scrollLeft : 2 > Math.abs(a.doc.scrollLeft - b)))b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth), a.doc.scrollLeft = b, Yb(a), a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b), a.display.scrollbarH.scrollLeft != b && (a.display.scrollbarH.scrollLeft = b)
	}

	function Qc(a, b){
		var c = b.wheelDeltaX, d = b.wheelDeltaY;
		null == c && (b.detail && b.axis == b.HORIZONTAL_AXIS) && (c = b.detail);
		null == d && b.detail && b.axis == b.VERTICAL_AXIS ? d = b.detail : null == d && (d = b.wheelDelta);
		var e = a.display, f = e.scroller;
		if (c && f.scrollWidth > f.clientWidth || d && f.scrollHeight > f.clientHeight) {
			if (d && ua && P)for (var g = b.target; g != f; g = g.parentNode)if (g.lineObj) {
				a.display.currentWheelTarget = g;
				break
			}
			if (c && !Ca && !T && null != S)d && Ja(a, Math.max(0, Math.min(f.scrollTop + d * S, f.scrollHeight - f.clientHeight))), ra(a, Math.max(0, Math.min(f.scrollLeft + c * S, f.scrollWidth - f.clientWidth))), B(b), e.wheelStartX = null; else {
				if (d && null != S) {
					var g = d * S, h = a.doc.scrollTop, k = h + e.wrapper.clientHeight;
					0 > g ? h = Math.max(0, h + g - 50) : k = Math.min(a.doc.height,
						k + g + 50);
					ib(a, [], {top: h, bottom: k})
				}
				20 > wb && (null == e.wheelStartX ? (e.wheelStartX = f.scrollLeft, e.wheelStartY = f.scrollTop, e.wheelDX = c, e.wheelDY = d, setTimeout(function(){
					if (null != e.wheelStartX) {
						var a = f.scrollLeft - e.wheelStartX, b = f.scrollTop - e.wheelStartY, a = b && e.wheelDY && b / e.wheelDY || a && e.wheelDX && a / e.wheelDX;
						e.wheelStartX = e.wheelStartY = null;
						a && (S = (S * wb + a) / (wb + 1), ++wb)
					}
				}, 200)) : (e.wheelDX += c, e.wheelDY += d))
			}
		}
	}

	function xb(a, b, c){
		if ("string" == typeof b && (b = qc[b], !b))return !1;
		a.display.pollingFast && oc(a) && (a.display.pollingFast =	!1);
		var d = a.doc, e = d.sel.shift, f = !1;
		try {
			Ta(a) && (a.state.suppressEdits = !0), c && (d.sel.shift = !1), f = b(a) != fd
		} finally {
			d.sel.shift = e, a.state.suppressEdits = !1
		}
		return f
	}

	function gd(a){
		var b = a.state.keyMaps.slice(0);
		a.options.extraKeys && b.push(a.options.extraKeys);
		b.push(a.options.keyMap);
		return b
	}

	function hd(a, b){
		var c = rc(a.options.keyMap), d = c.auto;
		clearTimeout(id);
		d && !jd(b) && (id = setTimeout(function(){
			rc(a.options.keyMap) == c && (a.options.keyMap = d.call ? d.call(null, a) : d)
		}, 50));
		var e = kd(b, !0), f = !1;
		if (!e)return !1;
		f = gd(a);
		f = b.shiftKey ? Ua("Shift-" + e, f, function(b){
			return xb(a, b, !0)
		}) || Ua(e, f, function(b){
			if ("string" == typeof b && /^go[A-Z]/.test(b))return xb(a, b)
		}) : Ua(e, f, function(b){
			return xb(a, b)
		});
		"stop" == f && (f = !1);
		f && (B(b), kb(a), O && (b.oldKeyCode = b.keyCode, b.keyCode = 0));
		return f
	}

	function Rc(a){
		this.state.focused || ga(this);
		F && 27 == a.keyCode && (a.returnValue = !1);
		if (!this.options.onKeyEvent || !this.options.onKeyEvent(this, Ga(a))) {
			var b = a.keyCode;
			this.doc.sel.shift = 16 == b || a.shiftKey;
			var c = hd(this, a);
			T && (sc = c ? b : null,
			!c && (88 == b && !tb && (ua ? a.metaKey : a.ctrlKey)) && this.replaceSelection(""))
		}
	}

	function Vd(a){
		var b = this;
		if (!b.options.onKeyEvent || !b.options.onKeyEvent(b, Ga(a))) {
			var c = a.keyCode, d = a.charCode;
			if (T && c == sc)sc = null, B(a); else if (!(T && (!a.which || 10 > a.which) || Pb) || !hd(b, a)) {
				c = String.fromCharCode(null == d ? c : d);
				this.options.electricChars && (this.doc.mode.electricChars && this.options.smartIndent && !Ta(this) && -1 < this.doc.mode.electricChars.indexOf(c)) && setTimeout(x(b, function(){
					yb(b, b.doc.sel.to.line, "smart")
				}), 75);
				if (c =
						Ua("'" + c + "'", gd(b), function(a){
							return xb(b, a, !0)
						}))B(a), kb(b);
				c || (F && !O && (b.display.inputHasSelection = null), Ka(b))
			}
		}
	}

	function ga(a){
		"nocursor" != a.options.readOnly && (a.state.focused || (J(a, "focus", a), a.state.focused = !0, -1 == a.display.wrapper.className.search(/\bCodeMirror-focused\b/) && (a.display.wrapper.className += " CodeMirror-focused"), aa(a, !0)), sb(a), kb(a))
	}

	function Vb(a){
		a.state.focused && (J(a, "blur", a), a.state.focused = !1, a.display.wrapper.className = a.display.wrapper.className.replace(" CodeMirror-focused",
			""));
		clearInterval(a.display.blinker);
		setTimeout(function(){
			a.state.focused || (a.doc.sel.shift = !1)
		}, 150)
	}

	function Pc(a, b){
		function c(){
			if (null != e.input.selectionStart) {
				var a = e.input.value = " " + (z(f.from, f.to) ? "" : e.input.value);
				e.prevInput = " ";
				e.input.selectionStart = 1;
				e.input.selectionEnd = a.length
			}
		}

		function d(){
			e.inputDiv.style.position = "relative";
			e.input.style.cssText = k;
			O && (e.scrollbarV.scrollTop = e.scroller.scrollTop = h);
			sb(a);
			if (null != e.input.selectionStart) {
				(!F || O) && c();
				clearTimeout(tc);
				var b = 0, d =
					function(){
						" " == e.prevInput && 0 == e.input.selectionStart ? x(a, qc.selectAll)(a) : 10 > b++ ? tc = setTimeout(d, 500) : aa(a)
					};
				tc = setTimeout(d, 200)
			}
		}

		var e = a.display, f = a.doc.sel;
		if (!fa(e, b)) {
			var g = Ia(a, b), h = e.scroller.scrollTop;
			if (g && !T) {
				(z(f.from, f.to) || y(g, f.from) || !y(g, f.to)) && x(a, ca)(a.doc, g, g);
				var k = e.input.style.cssText;
				e.inputDiv.style.position = "absolute";
				e.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (b.clientY - 5) + "px; left: " + (b.clientX - 5) + "px; z-index: 1000; background: white; outline: none;border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);";
				M(a);
				aa(a, !0);
				z(f.from, f.to) && (e.input.value = e.prevInput = " ");
				F && !O && c();
				if (Ub) {
					Ha(b);
					var j = function(){
						Y(window, "mouseup", j);
						setTimeout(d, 20)
					};
					q(window, "mouseup", j)
				} else setTimeout(d, 50)
			}
		}
	}

	function uc(a){
		return !a.text ? a.to : n(a.from.line + a.text.length - 1, K(a.text).length + (1 == a.text.length ? a.from.ch : 0))
	}

	function ld(a, b, c){
		if (!y(b.from, c))return r(a, c);
		var d = b.text.length - 1 - (b.to.line - b.from.line);
		if (c.line > b.to.line + d)return b = c.line - d, d = a.first + a.size - 1, b > d ? n(d, w(a, d).text.length) : zb(c, w(a, b).text.length);
		if (c.line == b.to.line + d)return zb(c, K(b.text).length + (1 == b.text.length ? b.from.ch : 0) + w(a, b.to.line).text.length - b.to.ch);
		a = c.line - b.from.line;
		return zb(c, b.text[a].length + (a ? 0 : b.from.ch))
	}

	function vc(a, b, c){
		if (c && "object" == typeof c)return {anchor: ld(a, b, c.anchor), head: ld(a, b, c.head)};
		if ("start" == c)return {anchor: b.from, head: b.from};
		var d = uc(b);
		if ("around" == c)return {anchor: b.from, head: d};
		if ("end" == c)return {anchor: d, head: d};
		c = function(a){
			if (y(a, b.from))return a;
			if (!y(b.to, a))return d;
			var c = a.line + b.text.length -
				(b.to.line - b.from.line) - 1, g = a.ch;
			a.line == b.to.line && (g += d.ch - b.to.ch);
			return n(c, g)
		};
		return {anchor: c(a.sel.anchor), head: c(a.sel.head)}
	}

	function md(a, b, c){
		b = {
			canceled: !1, from: b.from, to: b.to, text: b.text, origin: b.origin, cancel: function(){
				this.canceled = !0
			}
		};
		c && (b.update = function(b, c, f, g){
			b && (this.from = r(a, b));
			c && (this.to = r(a, c));
			f && (this.text = f);
			void 0 !== g && (this.origin = g)
		});
		J(a, "beforeChange", a, b);
		a.cm && J(a.cm, "beforeChange", a.cm, b);
		return b.canceled ? null : {from: b.from, to: b.to, text: b.text, origin: b.origin}
	}

	function Ba(a, b, c, d){
		if (a.cm) {
			if (!a.cm.curOp)return x(a.cm, Ba)(a, b, c, d);
			if (a.cm.state.suppressEdits)return
		}
		if (ea(a, "beforeChange") || a.cm && ea(a.cm, "beforeChange"))if (b = md(a, b, !0), !b)return;
		var e;
		if (e = nd) {
			if (d = !d) {
				d = b.from;
				e = b.to;
				var f = null;
				a.iter(d.line, e.line + 1, function(a){
					if (a.markedSpans)for (var b = 0; b < a.markedSpans.length; ++b) {
						var c = a.markedSpans[b].marker;
						if (c.readOnly && (!f || -1 == Z(f, c)))(f || (f = [])).push(c)
					}
				});
				if (f) {
					d = [{from: d, to: e}];
					for (e = 0; e < f.length; ++e)for (var g = f[e], h = g.find(), k = 0; k < d.length; ++k) {
						var j =
							d[k];
						if (!y(j.to, h.from) && !y(h.to, j.from)) {
							var l = [k, 1];
							(y(j.from, h.from) || !g.inclusiveLeft && z(j.from, h.from)) && l.push({from: j.from, to: h.from});
							(y(h.to, j.to) || !g.inclusiveRight && z(j.to, h.to)) && l.push({from: h.to, to: j.to});
							d.splice.apply(d, l);
							k += l.length - 1
						}
					}
				} else d = null
			}
			e = d
		}
		if (d = e) {
			for (e = d.length - 1; 1 <= e; --e)wc(a, {from: d[e].from, to: d[e].to, text: [""]});
			d.length && wc(a, {from: d[0].from, to: d[0].to, text: b.text}, c)
		} else wc(a, b, c)
	}

	function wc(a, b, c){
		c = vc(a, b, c);
		od(a, b, c, a.cm ? a.cm.curOp.id : NaN);
		Va(a, b, c, xc(a, b));
		var d = [];
		Da(a, function(a, c){
			!c && -1 == Z(d, a.history) && (pd(a.history, b), d.push(a.history));
			Va(a, b, null, xc(a, b))
		})
	}

	function qd(a, b){
		if (!a.cm || !a.cm.state.suppressEdits) {
			var c = a.history, d = ("undo" == b ? c.done : c.undone).pop();
			if (d) {
				c.dirtyCounter += "undo" == b ? -1 : 1;
				var e = {
					changes: [],
					anchorBefore: d.anchorAfter,
					headBefore: d.headAfter,
					anchorAfter: d.anchorBefore,
					headAfter: d.headBefore
				};
				("undo" == b ? c.undone : c.done).push(e);
				for (var f = ea(a, "beforeChange") || a.cm && ea(a.cm, "beforeChange"), g = d.changes.length - 1; 0 <= g; --g) {
					var h =
						d.changes[g];
					h.origin = b;
					if (f && !md(a, h, !1)) {
						("undo" == b ? c.done : c.undone).length = 0;
						break
					}
					e.changes.push(yc(a, h));
					var k = g ? vc(a, h, null) : {anchor: d.anchorBefore, head: d.headBefore};
					Va(a, h, k, rd(a, h));
					var j = [];
					Da(a, function(a, b){
						!b && -1 == Z(j, a.history) && (pd(a.history, h), j.push(a.history));
						Va(a, h, null, rd(a, h))
					})
				}
			}
		}
	}

	function sd(a, b){
		function c(a){
			return n(a.line + b, a.ch)
		}

		a.first += b;
		a.cm && A(a.cm, a.first, a.first, b);
		a.sel.head = c(a.sel.head);
		a.sel.anchor = c(a.sel.anchor);
		a.sel.from = c(a.sel.from);
		a.sel.to = c(a.sel.to)
	}

	function Va(a, b, c, d){
		if (a.cm && !a.cm.curOp)return x(a.cm, Va)(a, b, c, d);
		if (b.to.line < a.first)sd(a, b.text.length - 1 - (b.to.line - b.from.line)); else if (!(b.from.line > a.lastLine())) {
			if (b.from.line < a.first) {
				var e = b.text.length - 1 - (a.first - b.from.line);
				sd(a, e);
				b = {from: n(a.first, 0), to: n(b.to.line + e, b.to.ch), text: [K(b.text)], origin: b.origin}
			}
			e = a.lastLine();
			b.to.line > e && (b = {from: b.from, to: n(e, w(a, e).text.length), text: [b.text[0]], origin: b.origin});
			b.removed = zc(a, b.from, b.to);
			c || (c = vc(a, b, null));
			if (a.cm) {
				a = a.cm;
				var f =
					a.doc, g = a.display, e = b.from, h = b.to, k = !1, j = e.line;
				a.options.lineWrapping || (j = N(ta(f, w(f, e.line))), f.iter(j, h.line + 1, function(a){
					if (a == g.maxLine)return k = !0
				}));
				!y(f.sel.head, b.from) && !y(b.to, f.sel.head) && (a.curOp.cursorActivity = !0);
				Ac(f, b, d, c, Tc(a));
				a.options.lineWrapping || (f.iter(j, e.line + b.text.length, function(a){
					var b = gb(f, a);
					b > g.maxLineLength && (g.maxLine = a, g.maxLineLength = b, g.maxLineChanged = !0, k = !1)
				}), k && (a.curOp.updateMaxLine = !0));
				f.frontier = Math.min(f.frontier, e.line);
				eb(a, 400);
				A(a, e.line, h.line +
					1, b.text.length - (h.line - e.line) - 1);
				if (ea(a, "change"))if (d = {
						from: e,
						to: h,
						text: b.text,
						removed: b.removed,
						origin: b.origin
					}, a.curOp.textChanged) {
					for (a = a.curOp.textChanged; a.next; a = a.next);
					a.next = d
				} else a.curOp.textChanged = d
			} else Ac(a, b, d, c)
		}
	}

	function da(a, b, c, d, e){
		d || (d = c);
		if (y(d, c)) {
			var f = d;
			d = c;
			c = f
		}
		"string" == typeof b && (b = ka(b));
		Ba(a, {from: c, to: d, text: b, origin: e}, null)
	}

	function n(a, b){
		if (!(this instanceof n))return new n(a, b);
		this.line = a;
		this.ch = b
	}

	function z(a, b){
		return a.line == b.line && a.ch == b.ch
	}

	function y(a,
												b){
		return a.line < b.line || a.line == b.line && a.ch < b.ch
	}

	function la(a){
		return n(a.line, a.ch)
	}

	function r(a, b){
		if (b.line < a.first)return n(a.first, 0);
		var c = a.first + a.size - 1;
		return b.line > c ? n(c, w(a, c).text.length) : zb(b, w(a, b.line).text.length)
	}

	function zb(a, b){
		var c = a.ch;
		return null == c || c > b ? n(a.line, b) : 0 > c ? n(a.line, 0) : a
	}

	function Ea(a, b){
		return b >= a.first && b < a.first + a.size
	}

	function H(a, b, c, d){
		if (a.sel.shift || a.sel.extend) {
			var e = a.sel.anchor;
			if (c) {
				var f = y(b, e);
				f != y(c, e) ? (e = b, b = c) : f != y(b, c) && (b = c)
			}
			ca(a, e, b, d)
		} else ca(a,
			b, c || b, d);
		a.cm && (a.cm.curOp.userSelChange = !0)
	}

	function ca(a, b, c, d, e){
		if (!e && ea(a, "beforeSelectionChange") || a.cm && ea(a.cm, "beforeSelectionChange"))b = {
			anchor: b,
			head: c
		}, J(a, "beforeSelectionChange", a, b), a.cm && J(a.cm, "beforeSelectionChange", a.cm, b), b.anchor = r(a, b.anchor), b.head = r(a, b.head), c = b.head, b = b.anchor;
		var f = a.sel;
		f.goalColumn = null;
		if (e || !z(b, f.anchor))b = Ab(a, b, d, "push" != e);
		if (e || !z(c, f.head))c = Ab(a, c, d, "push" != e);
		if (!z(f.anchor, b) || !z(f.head, c))f.anchor = b, f.head = c, d = y(c, b), f.from = d ? c : b, f.to = d ?
			b : c, a.cm && (a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = a.cm.curOp.cursorActivity = !0), U(a, "cursorActivity", a)
	}

	function td(a){
		ca(a.doc, a.doc.sel.from, a.doc.sel.to, null, "push")
	}

	function Ab(a, b, c, d){
		var e = !1, f = b, g = c || 1;
		a.cantEdit = !1;
		a:for (; ;) {
			var h = w(a, f.line);
			if (h.markedSpans)for (var k = 0; k < h.markedSpans.length; ++k) {
				var j = h.markedSpans[k], l = j.marker;
				if ((null == j.from || (l.inclusiveLeft ? j.from <= f.ch : j.from < f.ch)) && (null == j.to || (l.inclusiveRight ? j.to >= f.ch : j.to > f.ch))) {
					if (d && (J(l, "beforeCursorEnter"),
							l.explicitlyCleared))if (h.markedSpans) {
						--k;
						continue
					} else break;
					if (l.atomic) {
						k = l.find()[0 > g ? "from" : "to"];
						if (z(k, f) && (k.ch += g, 0 > k.ch ? k = k.line > a.first ? r(a, n(k.line - 1)) : null : k.ch > h.text.length && (k = k.line < a.first + a.size - 1 ? n(k.line + 1, 0) : null), !k)) {
							if (e) {
								if (!d)return Ab(a, b, c, !0);
								a.cantEdit = !0;
								return n(a.first, 0)
							}
							e = !0;
							k = b;
							g = -g
						}
						f = k;
						continue a
					}
				}
			}
			return f
		}
	}

	function dd(a, b, c){
		for (null == c && (c = 0); ;) {
			var d = !1, e = V(a, b), f = rb(a, e.left, e.top - c, e.left, e.bottom + c), g = a.doc.scrollTop, h = a.doc.scrollLeft;
			null != f.scrollTop &&
			(Ja(a, f.scrollTop), 1 < Math.abs(a.doc.scrollTop - g) && (d = !0));
			null != f.scrollLeft && (ra(a, f.scrollLeft), 1 < Math.abs(a.doc.scrollLeft - h) && (d = !0));
			if (!d)return e
		}
	}

	function rb(a, b, c, d, e){
		var f = a.display, g = f.lineSpace.offsetTop;
		c += g;
		e += g;
		0 > c && (c = 0);
		var h = f.scroller.clientHeight - oa, k = f.scroller.scrollTop, j = {};
		a = a.doc.height + (f.mover.offsetHeight - f.lineSpace.offsetHeight);
		var l = c < g + 10, g = e + g > a - 10;
		c < k ? j.scrollTop = l ? 0 : c : e > k + h && (c = Math.min(c, (g ? a : e) - h), c != k && (j.scrollTop = c));
		k = f.scroller.clientWidth - oa;
		c = f.scroller.scrollLeft;
		b += f.gutters.offsetWidth;
		d += f.gutters.offsetWidth;
		f = f.gutters.offsetWidth;
		e = b < f + 10;
		b < c + f || e ? (e && (b = 0), j.scrollLeft = Math.max(0, b - 10 - f)) : d > k + c - 3 && (j.scrollLeft = d + 10 - k);
		return j
	}

	function Bb(a, b, c){
		a.curOp.updateScrollPos = {scrollLeft: null == b ? a.doc.scrollLeft : b, scrollTop: null == c ? a.doc.scrollTop : c}
	}

	function ud(a, b, c){
		var d = a.curOp.updateScrollPos || (a.curOp.updateScrollPos = {
				scrollLeft: a.doc.scrollLeft,
				scrollTop: a.doc.scrollTop
			});
		a = a.display.scroller;
		d.scrollTop = Math.max(0, Math.min(a.scrollHeight - a.clientHeight,
			d.scrollTop + c));
		d.scrollLeft = Math.max(0, Math.min(a.scrollWidth - a.clientWidth, d.scrollLeft + b))
	}

	function yb(a, b, c, d){
		var e = a.doc;
		c || (c = "add");
		if ("smart" == c)if (a.doc.mode.indent)var f = Ra(a, b); else c = "prev";
		var g = a.options.tabSize, h = w(e, b), k = xa(h.text, null, g), j = h.text.match(/^\s*/)[0], l;
		if ("smart" == c && (l = a.doc.mode.indent(f, h.text.slice(j.length), h.text), l == fd)) {
			if (!d)return;
			c = "prev"
		}
		"prev" == c ? l = b > e.first ? xa(w(e, b - 1).text, null, g) : 0 : "add" == c ? l = k + a.options.indentUnit : "subtract" == c && (l = k - a.options.indentUnit);
		l = Math.max(0, l);
		c = "";
		d = 0;
		if (a.options.indentWithTabs)for (e = Math.floor(l / g); e; --e)d += g, c += "\t";
		d < l && (c += vd(l - d));
		c != j && da(a.doc, c, n(b, 0), n(b, j.length), "+input");
		h.stateAfter = null
	}

	function Cb(a, b, c){
		var d = b, e = b, f = a.doc;
		"number" == typeof b ? e = w(f, Math.max(f.first, Math.min(b, f.first + f.size - 1))) : d = N(b);
		if (null != d && c(e, d))A(a, d, d + 1); else return null;
		return e
	}

	function Bc(a, b, c, d, e){
		function f(b){
			var d = (e ? mc : wd)(k, h, c, !0);
			if (null == d) {
				if (b = !b)b = g + c, b < a.first || b >= a.first + a.size ? b = j = !1 : (g = b, b = k = w(a, b));
				if (b)h =
					e ? (0 > c ? ob : nb)(k) : 0 > c ? k.text.length : 0; else return j = !1
			} else h = d;
			return !0
		}

		var g = b.line, h = b.ch;
		b = c;
		var k = w(a, g), j = !0;
		if ("char" == d)f(); else if ("column" == d)f(!0); else if ("word" == d || "group" == d) {
			var l = null;
			d = "group" == d;
			for (var u = !0; !(0 > c) || f(!u); u = !1) {
				var t = k.text.charAt(h) || "\n", t = Db(t) ? "w" : !d ? null : /\s/.test(t) ? null : "p";
				if (l && l != t) {
					0 > c && (c = 1, f());
					break
				}
				t && (l = t);
				if (0 < c && !f(!u))break
			}
		}
		b = Ab(a, n(g, h), b, !0);
		j || (b.hitSide = !0);
		return b
	}

	function xd(a, b, c, d){
		var e = a.doc, f = b.left, g;
		"page" == d ? (d = Math.min(a.display.wrapper.clientHeight,
			window.innerHeight || document.documentElement.clientHeight), g = b.top + c * (d - (0 > c ? 1.5 : 0.5) * Ma(a.display))) : "line" == d && (g = 0 < c ? b.bottom + 3 : b.top - 3);
		for (; ;) {
			var h = lc(a, f, g);
			if (!h.outside)break;
			if (0 > c ? 0 >= g : g >= e.height) {
				h.hitSide = !0;
				break
			}
			g += 5 * c
		}
		return h
	}

	function Tb(a, b){
		var c = b.ch, d = b.ch;
		if (a) {
			!1 === b.after || d == a.length ? --c : ++d;
			for (var e = a.charAt(c), e = Db(e) ? Db : /\s/.test(e) ? function(a){
				return /\s/.test(a)
			} : function(a){
				return !/\s/.test(a) && !Db(a)
			}; 0 < c && e(a.charAt(c - 1));)--c;
			for (; d < a.length && e(a.charAt(d));)++d
		}
		return {
			from: n(b.line,
				c), to: n(b.line, d)
		}
	}

	function v(a, b, c, d){
		m.defaults[a] = b;
		c && (sa[a] = d ? function(a, b, d){
			d != Sc && c(a, b, d)
		} : c)
	}

	function wa(a, b){
		if (!0 === b)return b;
		if (a.copyState)return a.copyState(b);
		var c = {}, d;
		for (d in b) {
			var e = b[d];
			e instanceof Array && (e = e.concat([]));
			c[d] = e
		}
		return c
	}

	function ad(a, b, c){
		return a.startState ? a.startState(b, c) : !0
	}

	function rc(a){
		return "string" == typeof a ? $[a] : a
	}

	function Ua(a, b, c){
		function d(b){
			b = rc(b);
			var e = b[a];
			if (!1 === e)return "stop";
			if (null != e && c(e))return !0;
			if (b.nofallthrough)return "stop";
			b = b.fallthrough;
			if (null == b)return !1;
			if ("[object Array]" != Object.prototype.toString.call(b))return d(b);
			for (var e = 0, f = b.length; e < f; ++e) {
				var j = d(b[e]);
				if (j)return j
			}
			return !1
		}

		for (var e = 0; e < b.length; ++e) {
			var f = d(b[e]);
			if (f)return f
		}
	}

	function jd(a){
		a = ma[a.keyCode];
		return "Ctrl" == a || "Alt" == a || "Shift" == a || "Mod" == a
	}

	function kd(a, b){
		if (T && 34 == a.keyCode && a["char"])return !1;
		var c = ma[a.keyCode];
		if (null == c || a.altGraphKey)return !1;
		a.altKey && (c = "Alt-" + c);
		if (yd ? a.metaKey : a.ctrlKey)c = "Ctrl-" + c;
		if (yd ? a.ctrlKey : a.metaKey)c =
			"Cmd-" + c;
		!b && a.shiftKey && (c = "Shift-" + c);
		return c
	}

	function Wa(a, b){
		this.pos = this.start = 0;
		this.string = a;
		this.tabSize = b || 8;
		this.lastColumnPos = this.lastColumnValue = 0
	}

	function na(a, b){
		this.lines = [];
		this.type = b;
		this.doc = a
	}

	function Xa(a, b, c, d, e){
		if (d && d.shared) {
			var f = d, f = Eb(f);
			f.shared = !1;
			var g = [Xa(a, b, c, f, e)], h = g[0], k = f.replacedWith;
			Da(a, function(a){
				k && (f.replacedWith = k.cloneNode(!0));
				g.push(Xa(a, r(a, b), r(a, c), f, e));
				for (var d = 0; d < a.linked.length; ++d)if (a.linked[d].isParent)return;
				h = K(g)
			});
			return new Fb(g,
				h)
		}
		if (a.cm && !a.cm.curOp)return x(a.cm, Xa)(a, b, c, d, e);
		var j = new na(a, e);
		if ("range" == e && !y(b, c))return j;
		d && Eb(d, j);
		j.replacedWith && (j.collapsed = !0, j.replacedWith = p("span", [j.replacedWith], "CodeMirror-widget"));
		j.collapsed && (Qa = !0);
		j.addToHistory && od(a, {from: b, to: c, origin: "markText"}, {head: a.sel.head, anchor: a.sel.anchor}, NaN);
		var l = b.line, u = 0, t, m, n = a.cm, w;
		a.iter(l, c.line + 1, function(d){
			n && (j.collapsed && !n.options.lineWrapping && ta(a, d) == n.display.maxLine) && (w = !0);
			var e = {from: null, to: null, marker: j};
			u +=
				d.text.length;
			l == b.line && (e.from = b.ch, u -= b.ch);
			l == c.line && (e.to = c.ch, u -= d.text.length - c.ch);
			j.collapsed && (l == c.line && (m = ia(d, c.ch)), l == b.line ? t = ia(d, b.ch) : R(d, 0));
			d.markedSpans = d.markedSpans ? d.markedSpans.concat([e]) : [e];
			e.marker.attachLine(d);
			++l
		});
		j.collapsed && a.iter(b.line, c.line + 1, function(b){
			ha(a, b) && R(b, 0)
		});
		j.clearOnEnter && q(j, "beforeCursorEnter", function(){
			j.clear()
		});
		j.readOnly && (nd = !0, (a.history.done.length || a.history.undone.length) && a.clearHistory());
		if (j.collapsed) {
			if (t != m)throw Error("Inserting collapsed marker overlapping an existing one");
			j.size = u;
			j.atomic = !0
		}
		n && (w && (n.curOp.updateMaxLine = !0), (j.className || j.startStyle || j.endStyle || j.collapsed) && A(n, b.line, c.line + 1), j.atomic && td(n));
		return j
	}

	function Fb(a, b){
		this.markers = a;
		this.primary = b;
		for (var c = 0, d = this; c < a.length; ++c)a[c].parent = this, q(a[c], "clear", function(){
			d.clear()
		})
	}

	function Ya(a, b){
		if (a)for (var c = 0; c < a.length; ++c) {
			var d = a[c];
			if (d.marker == b)return d
		}
	}

	function xc(a, b){
		var c = Ea(a, b.from.line) && w(a, b.from.line).markedSpans, d = Ea(a, b.to.line) && w(a, b.to.line).markedSpans;
		if (!c &&	!d)return null;
		var e = b.from.ch, f = b.to.ch, g = z(b.from, b.to);
		if (c)for (var h = 0, k; h < c.length; ++h) {
			var j = c[h], l = j.marker;
			if (null == j.from || (l.inclusiveLeft ? j.from <= e : j.from < e) || "bookmark" == l.type && j.from == e && (!g || !j.marker.insertLeft)) {
				var n = null == j.to || (l.inclusiveRight ? j.to >= e : j.to > e);
				(k || (k = [])).push({from: j.from, to: n ? null : j.to, marker: l})
			}
		}
		c = k;
		if (d)for (var h = 0, m; h < d.length; ++h)if (k = d[h], j = k.marker, null == k.to || (j.inclusiveRight ? k.to >= f : k.to > f) || "bookmark" == j.type && k.from == f && (!g || k.marker.insertLeft))l =
			null == k.from || (j.inclusiveLeft ? k.from <= f : k.from < f), (m || (m = [])).push({
			from: l ? null : k.from - f,
			to: null == k.to ? null : k.to - f,
			marker: j
		});
		d = m;
		g = 1 == b.text.length;
		m = K(b.text).length + (g ? e : 0);
		if (c)for (f = 0; f < c.length; ++f)h = c[f], null == h.to && ((k = Ya(d, h.marker)) ? g && (h.to = null == k.to ? null : k.to + m) : h.to = e);
		if (d)for (f = 0; f < d.length; ++f)h = d[f], null != h.to && (h.to += m), null == h.from ? (k = Ya(c, h.marker), k || (h.from = m, g && (c || (c = [])).push(h))) : (h.from += m, g && (c || (c = [])).push(h));
		e = [c];
		if (!g) {
			var g = b.text.length - 2, p;
			if (0 < g && c)for (f = 0; f <
			c.length; ++f)null == c[f].to && (p || (p = [])).push({from: null, to: null, marker: c[f].marker});
			for (f = 0; f < g; ++f)e.push(p);
			e.push(d)
		}
		return e
	}

	function rd(a, b){
		var c;
		if (c = b["spans_" + a.id]) {
			for (var d = 0, e = []; d < b.text.length; ++d)e.push(ee(c[d]));
			c = e
		} else c = null;
		d = xc(a, b);
		if (!c)return d;
		if (!d)return c;
		for (e = 0; e < c.length; ++e) {
			var f = c[e], g = d[e];
			if (f && g) {
				var h = 0;
				a:for (; h < g.length; ++h) {
					for (var k = g[h], j = 0; j < f.length; ++j)if (f[j].marker == k.marker)continue a;
					f.push(k)
				}
			} else g && (c[e] = g)
		}
		return c
	}

	function ia(a, b){
		var c = Qa &&
			a.markedSpans, d;
		if (c)for (var e, f = 0; f < c.length; ++f)if (e = c[f], e.marker.collapsed && (null == e.from || e.from < b) && (null == e.to || e.to > b) && (!d || d.width < e.marker.width))d = e.marker;
		return d
	}

	function Oa(a){
		return ia(a, a.text.length + 1)
	}

	function ta(a, b){
		for (var c; c = ia(b, -1);)b = w(a, c.find().from.line);
		return b
	}

	function ha(a, b){
		var c = Qa && b.markedSpans;
		if (c)for (var d, e = 0; e < c.length; ++e)if (d = c[e], d.marker.collapsed && (null == d.from || 0 == d.from && d.marker.inclusiveLeft && Cc(a, b, d)))return !0
	}

	function Cc(a, b, c){
		if (null == c.to)return b =
			c.marker.find().to, b = w(a, b.line), Cc(a, b, Ya(b.markedSpans, c.marker));
		if (c.marker.inclusiveRight && c.to == b.text.length)return !0;
		for (var d, e = 0; e < b.markedSpans.length; ++e)if (d = b.markedSpans[e], d.marker.collapsed && d.from == c.to && (d.marker.inclusiveLeft || c.marker.inclusiveRight) && Cc(a, b, d))return !0
	}

	function zd(a){
		var b = a.markedSpans;
		if (b) {
			for (var c = 0; c < b.length; ++c)b[c].marker.detachLine(a);
			a.markedSpans = null
		}
	}

	function Ad(a, b){
		if (b) {
			for (var c = 0; c < b.length; ++c)b[c].marker.attachLine(a);
			a.markedSpans = b
		}
	}

	function Bd(a){
		return function(){
			var b =
				!this.cm.curOp;
			b && za(this.cm);
			try {
				var c = a.apply(this, arguments)
			} finally {
				b && Aa(this.cm)
			}
			return c
		}
	}

	function lb(a){
		if (null != a.height)return a.height;
		(!a.node.parentNode || 1 != a.node.parentNode.nodeType) && X(a.cm.display.measure, p("div", [a.node], null, "position: relative"));
		return a.height = a.node.offsetHeight
	}

	function Za(a, b, c){
		a = {text: a};
		Ad(a, b);
		a.height = c ? c(a) : 1;
		return a
	}

	function Cd(a, b, c, d, e){
		var f = c.flattenSpans;
		null == f && (f = a.options.flattenSpans);
		var g = "", h = null, k = new Wa(b, a.options.tabSize), j;
		for ("" ==
							b && c.blankLine && c.blankLine(d); !k.eol();) {
			k.pos > a.options.maxHighlightLength ? (f = !1, k.pos = Math.min(b.length, k.start + 5E4), j = null) : j = c.token(k, d);
			var l = k.current();
			k.start = k.pos;
			!f || h != j ? (g && e(g, h), g = l, h = j) : g += l
		}
		g && e(g, h)
	}

	function Zc(a, b, c){
		var d = [a.state.modeGen];
		Cd(a, b.text, a.doc.mode, c, function(a, b){
			d.push(a, b)
		});
		for (c = 0; c < a.state.overlays.length; ++c) {
			var e = a.state.overlays[c], f = 1;
			Cd(a, b.text, e.mode, !0, function(a, b){
				for (var c = f, j = a.length; j;) {
					var l = d[f], m = l.length;
					m <= j ? j -= m : (d.splice(f, 1, l.slice(0,
						j), d[f + 1], l.slice(j)), j = 0);
					f += 2
				}
				if (b)if (e.opaque)d.splice(c, f - c, a, b), f = c + 2; else for (; c < f; c += 2)l = d[c + 1], d[c + 1] = l ? l + " " + b : b
			})
		}
		return d
	}

	function $c(a, b, c){
		var d = a.doc.mode, e = new Wa(b.text, a.options.tabSize);
		for ("" == b.text && d.blankLine && d.blankLine(c); !e.eol() && e.pos <= a.options.maxHighlightLength;)d.token(e, c), e.start = e.pos
	}

	function Dd(a){
		return !a ? null : Ed[a] || (Ed[a] = "cm-" + a.replace(/ +/g, " cm-"))
	}

	function fc(a, b, c){
		for (var d, e = b, f, g, h = !0; d = ia(e, -1);)h = !1, e = w(a.doc, d.find().from.line), f || (f = e);
		d = {
			pre: p("pre"),
			col: 0, pos: 0, display: !c, measure: null, addedOne: !1, cm: a
		};
		e.textClass && (d.pre.className = e.textClass);
		do {
			d.measure = e == b && c;
			d.pos = 0;
			d.addToken = d.measure ? fe : Fd;
			if ((F || P) && a.getOption("lineWrapping"))d.addToken = ge(d.addToken);
			c && (g && e != b && !d.addedOne) && (c[0] = d.pre.appendChild(qb(a.display.measure)), d.addedOne = !0);
			var k = e;
			g = d;
			var j = e;
			if (!j.styles || j.styles[0] != a.state.modeGen)j.styles = Zc(a, j, j.stateAfter = Ra(a, N(j)));
			a:{
				var l = k, j = j.styles;
				if (k = l.markedSpans)for (var l = l.text.length, m = 0, n = 1, s = "", r = void 0, q = 0,
																																v = void 0, x = void 0, z = void 0, y = void 0; ;) {
					if (q == m) {
						for (var v = x = z = "", y = null, q = Infinity, A = null, D = 0; D < k.length; ++D) {
							var G = k[D], B = G.marker;
							if (G.from <= m && (null == G.to || G.to > m)) {
								if (null != G.to && q > G.to && (q = G.to, x = ""), B.className && (v += " " + B.className), B.startStyle && G.from == m && (z += " " + B.startStyle), B.endStyle && G.to == q && (x += " " + B.endStyle), B.collapsed && (!y || y.marker.width < B.width))y = G
							} else G.from > m && q > G.from && (q = G.from);
							"bookmark" == B.type && (G.from == m && B.replacedWith) && (A = B.replacedWith)
						}
						if (y && (y.from || 0) == m)if (Gd(g,
								(null == y.to ? l : y.to) - m, null != y.from && y.marker.replacedWith), null == y.to) {
							j = y.marker.find();
							break a
						}
						A && !y && Gd(g, 0, A)
					}
					if (m >= l)break;
					for (A = Math.min(l, q); ;) {
						if (s) {
							D = m + s.length;
							y || (G = D > A ? s.slice(0, A - m) : s, g.addToken(g, G, r ? r + v : v, z, m + G.length == q ? x : ""));
							if (D >= A) {
								s = s.slice(A - m);
								m = A;
								break
							}
							m = D;
							z = ""
						}
						s = j[n++];
						r = Dd(j[n++])
					}
				} else for (var n = 1; n < j.length; n += 2)g.addToken(g, j[n], Dd(j[n + 1]));
				j = void 0
			}
			g = e == f;
			j && (e = w(a.doc, j.to.line), h = !1)
		} while (j);
		c && !d.addedOne && (c[0] = d.pre.appendChild(h ? p("span", "\u00a0") : qb(a.display.measure)));
		!d.pre.firstChild && !ha(a.doc, b) && d.pre.appendChild(document.createTextNode("\u00a0"));
		var C;
		if (c && F && (C = W(e)))if (f = C.length - 1, C[f].from == C[f].to && --f, e = C[f], C = C[f - 1], e.from + 1 == e.to && (C && e.level < C.level) && (c = c[d.pos - 1]))c.parentNode.insertBefore(c.measureRight = qb(a.display.measure), c.nextSibling);
		J(a, "renderLine", a, b, d.pre);
		return d.pre
	}

	function Fd(a, b, c, d, e){
		if (b) {
			if (Dc.test(b))for (var f = document.createDocumentFragment(), g = 0; ;) {
				Dc.lastIndex = g;
				var h = Dc.exec(b), k = h ? h.index - g : b.length - g;
				k && (f.appendChild(document.createTextNode(b.slice(g,
					g + k))), a.col += k);
				if (!h)break;
				g += k + 1;
				"\t" == h[0] ? (h = a.cm.options.tabSize, h -= a.col % h, f.appendChild(p("span", vd(h), "cm-tab")), a.col += h) : (k = p("span", "\u2022", "cm-invalidchar"), k.title = "\\u" + h[0].charCodeAt(0).toString(16), f.appendChild(k), a.col += 1)
			} else {
				a.col += b.length;
				var f = document.createTextNode(b)
			}
			if (c || d || e || a.measure)return b = c || "", d && (b += d), e && (b += e), a.pre.appendChild(p("span", [f], b));
			a.pre.appendChild(f)
		}
	}

	function fe(a, b, c, d, e){
		for (var f = a.cm.options.lineWrapping, g = 0; g < b.length; ++g) {
			var h = b.charAt(g),
				k = 0 == g;
			"\ud800" <= h && "\udbff" > h && g < b.length - 1 ? (h = b.slice(g, g + 2), ++g) : g && (f && Gb(b, g)) && a.pre.appendChild(p("wbr"));
			k = a.measure[a.pos] = Fd(a, h, c, k && d, g == b.length - 1 && e);
			F && (f && " " == h && g && !/\s/.test(b.charAt(g - 1)) && g < b.length - 1 && !/\s/.test(b.charAt(g + 1))) && (k.style.whiteSpace = "normal");
			a.pos += h.length
		}
		b.length && (a.addedOne = !0)
	}

	function ge(a){
		function b(a){
			for (var b = " ", e = 0; e < a.length - 2; ++e)b += e % 2 ? " " : "\u00a0";
			return b + " "
		}

		return function(c, d, e, f, g){
			return a(c, d.replace(/ {3,}/, b), e, f, g)
		}
	}

	function Gd(a,
													b, c){
		c && (a.display || (c = c.cloneNode(!0)), a.pre.appendChild(c), a.measure && b && (a.measure[a.pos] = c, a.addedOne = !0));
		a.pos += b
	}

	function Ac(a, b, c, d, e){
		function f(a, c, d){
			var f = e;
			a.text = c;
			a.stateAfter && (a.stateAfter = null);
			a.styles && (a.styles = null);
			null != a.order && (a.order = null);
			zd(a);
			Ad(a, d);
			c = f ? f(a) : 1;
			c != a.height && R(a, c);
			U(a, "change", a, b)
		}

		var g = b.from, h = b.to, k = b.text, j = w(a, g.line), l = w(a, h.line), m = K(k), n = c ? c[k.length - 1] : null, p = h.line - g.line;
		if (0 == g.ch && 0 == h.ch && "" == m) {
			for (var q = 0, r = k.length - 1, v = []; q < r; ++q)v.push(Za(k[q],
				c ? c[q] : null, e));
			f(l, l.text, n);
			p && a.remove(g.line, p);
			v.length && a.insert(g.line, v)
		} else if (j == l)if (1 == k.length)f(j, j.text.slice(0, g.ch) + m + j.text.slice(h.ch), n); else {
			v = [];
			q = 1;
			for (r = k.length - 1; q < r; ++q)v.push(Za(k[q], c ? c[q] : null, e));
			v.push(Za(m + j.text.slice(h.ch), n, e));
			f(j, j.text.slice(0, g.ch) + k[0], c ? c[0] : null);
			a.insert(g.line + 1, v)
		} else if (1 == k.length)f(j, j.text.slice(0, g.ch) + k[0] + l.text.slice(h.ch), c ? c[0] : null), a.remove(g.line + 1, p); else {
			f(j, j.text.slice(0, g.ch) + k[0], c ? c[0] : null);
			f(l, m + l.text.slice(h.ch),
				n);
			q = 1;
			r = k.length - 1;
			for (v = []; q < r; ++q)v.push(Za(k[q], c ? c[q] : null, e));
			1 < p && a.remove(g.line + 1, p - 1);
			a.insert(g.line + 1, v)
		}
		U(a, "change", a, b);
		ca(a, d.anchor, d.head, null, !0)
	}

	function Hb(a){
		this.lines = a;
		this.parent = null;
		for (var b = 0, c = a.length, d = 0; b < c; ++b)a[b].parent = this, d += a[b].height;
		this.height = d
	}

	function $a(a){
		this.children = a;
		for (var b = 0, c = 0, d = 0, e = a.length; d < e; ++d) {
			var f = a[d], b = b + f.chunkSize(), c = c + f.height;
			f.parent = this
		}
		this.size = b;
		this.height = c;
		this.parent = null
	}

	function Da(a, b, c){
		function d(a, f, g){
			if (a.linked)for (var h =
				0; h < a.linked.length; ++h) {
				var k = a.linked[h];
				if (k.doc != f) {
					var j = g && k.sharedHist;
					if (!c || j)b(k.doc, j), d(k.doc, a, j)
				}
			}
		}

		d(a, null, !0)
	}

	function Lc(a, b){
		if (b.cm)throw Error("This document is already in use.");
		a.doc = b;
		b.cm = a;
		Vc(a);
		La(a);
		a.options.lineWrapping || Zb(a);
		a.options.mode = b.modeOption;
		A(a)
	}

	function w(a, b){
		for (b -= a.first; !a.lines;)for (var c = 0; ; ++c) {
			var d = a.children[c], e = d.chunkSize();
			if (b < e) {
				a = d;
				break
			}
			b -= e
		}
		return a.lines[b]
	}

	function zc(a, b, c){
		var d = [], e = b.line;
		a.iter(b.line, c.line + 1, function(a){
			a = a.text;
			e == c.line && (a = a.slice(0, c.ch));
			e == b.line && (a = a.slice(b.ch));
			d.push(a);
			++e
		});
		return d
	}

	function Ec(a, b, c){
		var d = [];
		a.iter(b, c, function(a){
			d.push(a.text)
		});
		return d
	}

	function R(a, b){
		for (var c = b - a.height, d = a; d; d = d.parent)d.height += c
	}

	function N(a){
		if (null == a.parent)return null;
		var b = a.parent;
		a = Z(b.lines, a);
		for (var c = b.parent; c; b = c, c = c.parent)for (var d = 0; c.children[d] != b; ++d)a += c.children[d].chunkSize();
		return a + b.first
	}

	function hb(a, b){
		var c = a.first;
		a:do {
			for (var d = 0, e = a.children.length; d < e; ++d) {
				var f = a.children[d],
					g = f.height;
				if (b < g) {
					a = f;
					continue a
				}
				b -= g;
				c += f.chunkSize()
			}
			return c
		} while (!a.lines);
		d = 0;
		for (e = a.lines.length; d < e; ++d) {
			f = a.lines[d].height;
			if (b < f)break;
			b -= f
		}
		return c + d
	}

	function va(a, b){
		b = ta(a.doc, b);
		for (var c = 0, d = b.parent, e = 0; e < d.lines.length; ++e) {
			var f = d.lines[e];
			if (f == b)break; else c += f.height
		}
		for (f = d.parent; f; d = f, f = d.parent)for (e = 0; e < f.children.length; ++e) {
			var g = f.children[e];
			if (g == d)break; else c += g.height
		}
		return c
	}

	function W(a){
		var b = a.order;
		null == b && (b = a.order = Hd(a.text));
		return b
	}

	function Ib(){
		return {
			done: [],
			undone: [], undoDepth: Infinity, lastTime: 0, lastOp: null, lastOrigin: null, dirtyCounter: 0
		}
	}

	function Id(a, b, c, d){
		var e = b["spans_" + a.id], f = 0;
		a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function(c){
			c.markedSpans && ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans);
			++f
		})
	}

	function yc(a, b){
		var c = {from: b.from, to: uc(b), text: zc(a, b.from, b.to)};
		Id(a, c, b.from.line, b.to.line + 1);
		Da(a, function(a){
			Id(a, c, b.from.line, b.to.line + 1)
		}, !0);
		return c
	}

	function od(a, b, c, d){
		var e = a.history;
		e.undone.length = 0;
		var f = +new Date,
			g = K(e.done);
		if (g && (e.lastOp == d || e.lastOrigin == b.origin && b.origin && ("+" == b.origin.charAt(0) && a.cm && e.lastTime > f - a.cm.options.historyEventDelay || "*" == b.origin.charAt(0)))) {
			var h = K(g.changes);
			z(b.from, b.to) && z(b.from, h.to) ? h.to = uc(b) : g.changes.push(yc(a, b));
			g.anchorAfter = c.anchor;
			g.headAfter = c.head
		} else {
			g = {
				changes: [yc(a, b)],
				anchorBefore: a.sel.anchor,
				headBefore: a.sel.head,
				anchorAfter: c.anchor,
				headAfter: c.head
			};
			for (e.done.push(g); e.done.length > e.undoDepth;)e.done.shift();
			0 > e.dirtyCounter ? e.dirtyCounter =
				NaN : e.dirtyCounter++
		}
		e.lastTime = f;
		e.lastOp = d;
		e.lastOrigin = b.origin
	}

	function ee(a){
		if (!a)return null;
		for (var b = 0, c; b < a.length; ++b)a[b].marker.explicitlyCleared ? c || (c = a.slice(0, b)) : c && c.push(a[b]);
		return !c ? a : c.length ? c : null
	}

	function Jb(a, b){
		for (var c = 0, d = []; c < a.length; ++c) {
			var e = a[c], f = e.changes, g = [];
			d.push({
				changes: g,
				anchorBefore: e.anchorBefore,
				headBefore: e.headBefore,
				anchorAfter: e.anchorAfter,
				headAfter: e.headAfter
			});
			for (e = 0; e < f.length; ++e) {
				var h = f[e], k;
				g.push({from: h.from, to: h.to, text: h.text});
				if (b)for (var j in h)if ((k =
						j.match(/^spans_(\d+)$/)) && -1 < Z(b, Number(k[1])))K(g)[j] = h[j], delete h[j]
			}
		}
		return d
	}

	function Kb(a, b, c, d){
		c < a.line ? a.line += d : b < a.line && (a.line = b, a.ch = 0)
	}

	function Jd(a, b, c, d){
		for (var e = 0; e < a.length; ++e) {
			for (var f = a[e], g = !0, h = 0; h < f.changes.length; ++h) {
				var k = f.changes[h];
				f.copied || (k.from = la(k.from), k.to = la(k.to));
				if (c < k.from.line)k.from.line += d, k.to.line += d; else if (b <= k.to.line) {
					g = !1;
					break
				}
			}
			f.copied || (f.anchorBefore = la(f.anchorBefore), f.headBefore = la(f.headBefore), f.anchorAfter = la(f.anchorAfter), f.readAfter =
				la(f.headAfter), f.copied = !0);
			g ? (Kb(f.anchorBefore), Kb(f.headBefore), Kb(f.anchorAfter), Kb(f.headAfter)) : (a.splice(0, e + 1), e = 0)
		}
	}

	function pd(a, b){
		var c = b.from.line, d = b.to.line, e = b.text.length - (d - c) - 1;
		Jd(a.done, c, d, e);
		Jd(a.undone, c, d, e)
	}

	function he(){
		Ha(this)
	}

	function Ga(a){
		a.stop || (a.stop = he);
		return a
	}

	function B(a){
		a.preventDefault ? a.preventDefault() : a.returnValue = !1
	}

	function Kd(a){
		a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
	}

	function Ha(a){
		B(a);
		Kd(a)
	}

	function ed(a){
		var b = a.which;
		null == b &&
		(a.button & 1 ? b = 1 : a.button & 2 ? b = 3 : a.button & 4 && (b = 2));
		ua && (a.ctrlKey && 1 == b) && (b = 3);
		return b
	}

	function q(a, b, c){
		a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : (a = a._handlers || (a._handlers = {}), (a[b] || (a[b] = [])).push(c))
	}

	function Y(a, b, c){
		if (a.removeEventListener)a.removeEventListener(b, c, !1); else if (a.detachEvent)a.detachEvent("on" + b, c); else if (a = a._handlers && a._handlers[b])for (b = 0; b < a.length; ++b)if (a[b] == c) {
			a.splice(b, 1);
			break
		}
	}

	function J(a, b){
		var c = a._handlers && a._handlers[b];
		if (c)for (var d = Array.prototype.slice.call(arguments, 2), e = 0; e < c.length; ++e)c[e].apply(null, d)
	}

	function U(a, b){
		function c(a){
			return function(){
				a.apply(null, e)
			}
		}

		var d = a._handlers && a._handlers[b];
		if (d) {
			var e = Array.prototype.slice.call(arguments, 2);
			ba || (++pb, ba = [], setTimeout(ie, 0));
			for (var f = 0; f < d.length; ++f)ba.push(c(d[f]))
		}
	}

	function ie(){
		--pb;
		var a = ba;
		ba = null;
		for (var b = 0; b < a.length; ++b)a[b]()
	}

	function ea(a, b){
		var c = a._handlers && a._handlers[b];
		return c && 0 < c.length
	}

	function Qb(){
		this.id = null
	}

	function xa(a,
													b, c, d, e){
		null == b && (b = a.search(/[^\s\u00a0]/), -1 == b && (b = a.length));
		d = d || 0;
		for (e = e || 0; d < b; ++d)"\t" == a.charAt(d) ? e += c - e % c : ++e;
		return e
	}

	function vd(a){
		for (; Lb.length <= a;)Lb.push(K(Lb) + " ");
		return Lb[a]
	}

	function K(a){
		return a[a.length - 1]
	}

	function Mc(a){
		Fa ? (a.selectionStart = 0, a.selectionEnd = a.value.length) : a.select()
	}

	function Z(a, b){
		if (a.indexOf)return a.indexOf(b);
		for (var c = 0, d = a.length; c < d; ++c)if (a[c] == b)return c;
		return -1
	}

	function Ld(a, b){
		function c(){
		}

		c.prototype = a;
		var d = new c;
		b && Eb(b, d);
		return d
	}

	function Eb(a,
													b){
		b || (b = {});
		for (var c in a)a.hasOwnProperty(c) && (b[c] = a[c]);
		return b
	}

	function bd(a){
		for (var b = [], c = 0; c < a; ++c)b.push(void 0);
		return b
	}

	function Q(a){
		var b = Array.prototype.slice.call(arguments, 1);
		return function(){
			return a.apply(null, b)
		}
	}

	function Db(a){
		return /\w/.test(a) || "\u0080" < a && (a.toUpperCase() != a.toLowerCase() || je.test(a))
	}

	function Md(a){
		for (var b in a)if (a.hasOwnProperty(b) && a[b])return !1;
		return !0
	}

	function p(a, b, c, d){
		a = document.createElement(a);
		c && (a.className = c);
		d && (a.style.cssText = d);
		if ("string" ==	typeof b)Yc(a, b); else if (b)for (c = 0; c < b.length; ++c)a.appendChild(b[c]);
		return a
	}

	function fb(a){
		for (var b = a.childNodes.length; 0 < b; --b)a.removeChild(a.firstChild);
		return a
	}

	function X(a, b){
		return fb(a).appendChild(b)
	}

	function Yc(a, b){
		O ? (a.innerHTML = "", a.appendChild(document.createTextNode(b))) : a.textContent = b
	}

	function D(a){
		return a.getBoundingClientRect()
	}

	function Gb(){
		return !1
	}

	function Pa(a){
		if (null != Mb)return Mb;
		var b = p("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
		X(a, b);
		b.offsetWidth &&
		(Mb = b.offsetHeight - b.clientHeight);
		return Mb || 0
	}

	function qb(a){
		if (null == Fc) {
			var b = p("span", "\u200b");
			X(a, p("span", [b, document.createTextNode("x")]));
			0 != a.firstChild.offsetHeight && (Fc = 1 >= b.offsetWidth && 2 < b.offsetHeight && !pa)
		}
		return Fc ? p("span", "\u200b") : p("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px")
	}

	function jc(a){
		return a.level % 2 ? a.from : a.to
	}

	function nb(a){
		return (a = W(a)) ? a[0].level % 2 ? a[0].to : a[0].from : 0
	}

	function ob(a){
		var b = W(a);
		return !b ? a.text.length : jc(K(b))
	}

	function Nd(a,
													b){
		var c = w(a.doc, b), d = ta(a.doc, c);
		d != c && (b = N(d));
		c = W(d);
		d = !c ? 0 : c[0].level % 2 ? ob(d) : nb(d);
		return n(b, d)
	}

	function ke(a, b){
		for (var c, d; c = Oa(d = w(a.doc, b));)b = c.find().to.line;
		c = W(d);
		d = !c ? d.text.length : c[0].level % 2 ? nb(d) : ob(d);
		return n(b, d)
	}

	function kc(a, b){
		for (var c = 0, d; c < a.length; ++c) {
			var e = a[c];
			if (e.from < b && e.to > b)return ya = null, c;
			if (e.from == b || e.to == b)if (null == d)d = c; else {
				var e = e.level, f = a[d].level, g = a[0].level, e = e == g ? !0 : f == g ? !1 : e < f;
				if (e)return ya = d, c;
				ya = c;
				return d
			}
		}
		ya = null;
		return d
	}

	function Gc(a, b,
													c, d){
		if (!d)return b + c;
		do b += c; while (0 < b && nc.test(a.text.charAt(b)));
		return b
	}

	function mc(a, b, c, d){
		var e = W(a);
		if (!e)return wd(a, b, c, d);
		var f = kc(e, b), g = e[f];
		for (b = Gc(a, b, g.level % 2 ? -c : c, d); ;) {
			if (b > g.from && b < g.to)return b;
			if (b == g.from || b == g.to) {
				if (kc(e, b) == f)return b;
				g = e[f + c];
				return 0 < c == g.level % 2 ? g.to : g.from
			}
			g = e[f += c];
			if (!g)return null;
			b = 0 < c == g.level % 2 ? Gc(a, g.to, -1, d) : Gc(a, g.from, 1, d)
		}
	}

	function wd(a, b, c, d){
		b += c;
		if (d)for (; 0 < b && nc.test(a.text.charAt(b));)b += c;
		return 0 > b || b > a.text.length ? null : b
	}

	var Ca =
			/gecko\/\d/i.test(navigator.userAgent), F = /MSIE \d/.test(navigator.userAgent), pa = F && (null == document.documentMode || 8 > document.documentMode), O = F && (null == document.documentMode || 9 > document.documentMode), P = /WebKit\//.test(navigator.userAgent), le = P && /Qt\/\d+\.\d+/.test(navigator.userAgent), me = /Chrome\//.test(navigator.userAgent), T = /Opera\//.test(navigator.userAgent), Wb = /Apple Computer/.test(navigator.vendor), Pb = /KHTML\//.test(navigator.userAgent), Xd = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
		Yd = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent), ce = /PhantomJS/.test(navigator.userAgent), Fa = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), Rb = Fa || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent), ua = Fa || /Mac/.test(navigator.platform), ne = /windows/i.test(navigator.platform), ab = T && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
	ab && (ab = Number(ab[1]));
	var yd = ua && (le || T && (null == ab || 12.11 > ab)), Ub = Ca || F && !O, nd = !1, Qa = !1, ja,
		be = 0, vb, ub, wb = 0, S = null;
	F ? S = -0.53 : Ca ? S = 15 : me ? S = -0.7 : Wb && (S = -1 / 3);
	var id, sc = null, tc;
	m.Pos = n;
	m.prototype = {
		constructor: m, focus: function(){
			window.focus();
			M(this);
			ga(this);
			Ka(this)
		}, setOption: function(a, b){
			var c = this.options, d = c[a];
			c[a] == b && "mode" != a || (c[a] = b, sa.hasOwnProperty(a) && x(this, sa[a])(this, b, d))
		}, getOption: function(a){
			return this.options[a]
		}, getDoc: function(){
			return this.doc
		}, addKeyMap: function(a, b){
			this.state.keyMaps[b ? "push" : "unshift"](a)
		}, removeKeyMap: function(a){
			for (var b = this.state.keyMaps,
									c = 0; c < b.length; ++c)if (("string" == typeof a ? b[c].name : b[c]) == a)return b.splice(c, 1), !0
		}, addOverlay: x(null, function(a, b){
			var c = a.token ? a : m.getMode(this.options, a);
			if (c.startState)throw Error("Overlays may not be stateful.");
			this.state.overlays.push({mode: c, modeSpec: a, opaque: b && b.opaque});
			this.state.modeGen++;
			A(this)
		}), removeOverlay: x(null, function(a){
			for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
				var d = b[c].modeSpec;
				if (d == a || "string" == typeof a && d.name == a) {
					b.splice(c, 1);
					this.state.modeGen++;
					A(this);
					break
				}
			}
		}), indentLine: x(null, function(a, b, c){
			"string" != typeof b && (b = null == b ? this.options.smartIndent ? "smart" : "prev" : b ? "add" : "subtract");
			Ea(this.doc, a) && yb(this, a, b, c)
		}), indentSelection: x(null, function(a){
			var b = this.doc.sel;
			if (z(b.from, b.to))return yb(this, b.from.line, a);
			for (var c = b.to.line - (b.to.ch ? 0 : 1), b = b.from.line; b <= c; ++b)yb(this, b, a)
		}), getTokenAt: function(a){
			var b = this.doc;
			a = r(b, a);
			for (var c = Ra(this, a.line), d = this.doc.mode, b = w(b, a.line), b = new Wa(b.text, this.options.tabSize); b.pos < a.ch && !b.eol();) {
				b.start =
					b.pos;
				var e = d.token(b, c)
			}
			return {start: b.start, end: b.pos, string: b.current(), className: e || null, type: e || null, state: c}
		}, getStateAfter: function(a){
			var b = this.doc;
			a = Math.max(b.first, Math.min(null == a ? b.first + b.size - 1 : a, b.first + b.size - 1));
			return Ra(this, a + 1)
		}, cursorCoords: function(a, b){
			var c;
			c = this.doc.sel;
			c = null == a ? c.head : "object" == typeof a ? r(this.doc, a) : a ? c.from : c.to;
			return V(this, c, b || "page")
		}, charCoords: function(a, b){
			return jb(this, r(this.doc, a), b || "page")
		}, coordsChar: function(a, b){
			var c = b || "page";
			if ("div" !=
				c) {
				var d = a.left, e = a.top;
				"page" == c && (d -= window.pageXOffset || (document.documentElement || document.body).scrollLeft, e -= window.pageYOffset || (document.documentElement || document.body).scrollTop);
				var f = D(this.display.lineSpace), d = d - f.left, e = e - f.top;
				if ("local" == c || !c)c = D(this.display.wrapper), d += c.left, e += c.top;
				a = {left: d, top: e}
			}
			return lc(this, a.left, a.top)
		}, defaultTextHeight: function(){
			return Ma(this.display)
		}, defaultCharWidth: function(){
			return Uc(this.display)
		}, setGutterMarker: x(null, function(a, b, c){
			return Cb(this,
				a, function(a){
					var e = a.gutterMarkers || (a.gutterMarkers = {});
					e[b] = c;
					!c && Md(e) && (a.gutterMarkers = null);
					return !0
				})
		}), clearGutter: x(null, function(a){
			var b = this, c = b.doc, d = c.first;
			c.iter(function(c){
				c.gutterMarkers && c.gutterMarkers[a] && (c.gutterMarkers[a] = null, A(b, d, d + 1), Md(c.gutterMarkers) && (c.gutterMarkers = null));
				++d
			})
		}), addLineClass: x(null, function(a, b, c){
			return Cb(this, a, function(a){
				var e = "text" == b ? "textClass" : "background" == b ? "bgClass" : "wrapClass";
				if (a[e]) {
					if (RegExp("\\b" + c + "\\b").test(a[e]))return !1;
					a[e] += " " + c
				} else a[e] = c;
				return !0
			})
		}), removeLineClass: x(null, function(a, b, c){
			return Cb(this, a, function(a){
				var e = "text" == b ? "textClass" : "background" == b ? "bgClass" : "wrapClass", f = a[e];
				if (f)if (null == c)a[e] = null; else {
					var g = f.replace(RegExp("^" + c + "\\b\\s*|\\s*\\b" + c + "\\b"), "");
					if (g == f)return !1;
					a[e] = g || null
				} else return !1;
				return !0
			})
		}), addLineWidget: x(null, function(a, b, c){
			var d = this, e = new Hc(d, b, c);
			e.noHScroll && (d.display.alignWidgets = !0);
			Cb(d, a, function(a){
				(a.widgets || (a.widgets = [])).push(e);
				e.line = a;
				if (!ha(d.doc,
						a) || e.showIfHidden) {
					var b = va(d, a) < d.display.scroller.scrollTop;
					R(a, a.height + lb(e));
					b && ud(d, 0, e.height)
				}
				return !0
			});
			return e
		}), removeLineWidget: function(a){
			a.clear()
		}, lineInfo: function(a){
			if ("number" == typeof a) {
				if (!Ea(this.doc, a))return null;
				var b = a;
				a = w(this.doc, a);
				if (!a)return null
			} else if (b = N(a), null == b)return null;
			return {
				line: b,
				handle: a,
				text: a.text,
				gutterMarkers: a.gutterMarkers,
				textClass: a.textClass,
				bgClass: a.bgClass,
				wrapClass: a.wrapClass,
				widgets: a.widgets
			}
		}, getViewport: function(){
			return {
				from: this.display.showingFrom,
				to: this.display.showingTo
			}
		}, addWidget: function(a, b, c, d, e){
			var f = this.display;
			a = V(this, r(this.doc, a));
			var g = a.bottom, h = a.left;
			b.style.position = "absolute";
			f.sizer.appendChild(b);
			if ("over" == d)g = a.top; else if ("above" == d || "near" == d) {
				var k = Math.max(f.wrapper.clientHeight, this.doc.height), j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
				("above" == d || a.bottom + b.offsetHeight > k) && a.top > b.offsetHeight ? g = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= k && (g = a.bottom);
				h + b.offsetWidth > j && (h = j - b.offsetWidth)
			}
			b.style.top =
				g + f.lineSpace.offsetTop + "px";
			b.style.left = b.style.right = "";
			"right" == e ? (h = f.sizer.clientWidth - b.offsetWidth, b.style.right = "0px") : ("left" == e ? h = 0 : "middle" == e && (h = (f.sizer.clientWidth - b.offsetWidth) / 2), b.style.left = h + "px");
			c && (a = rb(this, h, g, h + b.offsetWidth, g + b.offsetHeight), null != a.scrollTop && Ja(this, a.scrollTop), null != a.scrollLeft && ra(this, a.scrollLeft))
		}, triggerOnKeyDown: x(null, Rc), execCommand: function(a){
			return qc[a](this)
		}, findPosH: function(a, b, c, d){
			var e = 1;
			0 > b && (e = -1, b = -b);
			var f = 0;
			for (a = r(this.doc,
				a); f < b && !(a = Bc(this.doc, a, e, c, d), a.hitSide); ++f);
			return a
		}, moveH: x(null, function(a, b){
			var c = this.doc.sel, c = c.shift || c.extend || z(c.from, c.to) ? Bc(this.doc, c.head, a, b, this.options.rtlMoveVisually) : 0 > a ? c.from : c.to;
			H(this.doc, c, c, a)
		}), deleteH: x(null, function(a, b){
			var c = this.doc.sel;
			z(c.from, c.to) ? da(this.doc, "", c.from, Bc(this.doc, c.head, a, b, !1), "+delete") : da(this.doc, "", c.from, c.to, "+delete");
			this.curOp.userSelChange = !0
		}), findPosV: function(a, b, c, d){
			var e = 1;
			0 > b && (e = -1, b = -b);
			var f = 0;
			for (a = r(this.doc, a); f <
			b && !(a = V(this, a, "div"), null == d ? d = a.left : a.left = d, a = xd(this, a, e, c), a.hitSide); ++f);
			return a
		}, moveV: x(null, function(a, b){
			var c = this.doc.sel, d = V(this, c.head, "div");
			null != c.goalColumn && (d.left = c.goalColumn);
			var e = xd(this, d, a, b);
			"page" == b && ud(this, 0, jb(this, e, "div").top - d.top);
			H(this.doc, e, e, a);
			c.goalColumn = d.left
		}), toggleOverwrite: function(a){
			null != a && a == this.state.overwrite || (this.display.cursor.className = (this.state.overwrite = !this.state.overwrite) ? this.display.cursor.className + " CodeMirror-overwrite" :
				this.display.cursor.className.replace(" CodeMirror-overwrite", ""))
		}, hasFocus: function(){
			return this.state.focused
		}, scrollTo: x(null, function(a, b){
			Bb(this, a, b)
		}), getScrollInfo: function(){
			var a = this.display.scroller, b = oa;
			return {
				left: a.scrollLeft,
				top: a.scrollTop,
				height: a.scrollHeight - b,
				width: a.scrollWidth - b,
				clientHeight: a.clientHeight - b,
				clientWidth: a.clientWidth - b
			}
		}, scrollIntoView: x(null, function(a, b){
			"number" == typeof a && (a = n(a, 0));
			b || (b = 0);
			var c = a;
			if (!a || null != a.line)this.curOp.scrollToPos = a ? r(this.doc,
				a) : this.doc.sel.head, this.curOp.scrollToPosMargin = b, c = V(this, this.curOp.scrollToPos);
			c = rb(this, c.left, c.top - b, c.right, c.bottom + b);
			Bb(this, c.scrollLeft, c.scrollTop)
		}), setSize: function(a, b){
			function c(a){
				return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a
			}

			null != a && (this.display.wrapper.style.width = c(a));
			null != b && (this.display.wrapper.style.height = c(b));
			this.refresh()
		}, on: function(a, b){
			q(this, a, b)
		}, off: function(a, b){
			Y(this, a, b)
		}, operation: function(a){
			return Sb(this, a)
		}, refresh: x(null, function(){
			qa(this);
			Bb(this, this.doc.scrollLeft, this.doc.scrollTop);
			A(this)
		}), swapDoc: x(null, function(a){
			var b = this.doc;
			b.cm = null;
			Lc(this, a);
			qa(this);
			aa(this, !0);
			Bb(this, a.scrollLeft, a.scrollTop);
			return b
		}), getInputField: function(){
			return this.display.input
		}, getWrapperElement: function(){
			return this.display.wrapper
		}, getScrollerElement: function(){
			return this.display.scroller
		}, getGutterElement: function(){
			return this.display.gutters
		}
	};
	var sa = m.optionHandlers = {}, Nb = m.defaults = {}, Sc = m.Init = {
		toString: function(){
			return "CodeMirror.Init"
		}
	};
	v("value", "", function(a, b){
		a.setValue(b)
	}, !0);
	v("mode", null, function(a, b){
		a.doc.modeOption = b;
		La(a)
	}, !0);
	v("indentUnit", 2, La, !0);
	v("indentWithTabs", !1);
	v("smartIndent", !0);
	v("tabSize", 4, function(a){
		La(a);
		qa(a);
		A(a)
	}, !0);
	v("electricChars", !0);
	v("rtlMoveVisually", !ne);
	v("theme", "default", function(a){
		Kc(a);
		Na(a)
	}, !0);
	v("keyMap", "default", function(a){
		var b = $[a.options.keyMap].style;
		a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (b ? " cm-keymap-" + b : "")
	});
	v("extraKeys",
		null);
	v("onKeyEvent", null);
	v("onDragEvent", null);
	v("lineWrapping", !1, function(a){
		a.options.lineWrapping ? (a.display.wrapper.className += " CodeMirror-wrap", a.display.sizer.style.minWidth = "") : (a.display.wrapper.className = a.display.wrapper.className.replace(" CodeMirror-wrap", ""), Zb(a));
		Vc(a);
		A(a);
		qa(a);
		setTimeout(function(){
			$b(a)
		}, 100)
	}, !0);
	v("gutters", [], function(a){
		Ob(a.options);
		Na(a)
	}, !0);
	v("fixedGutter", !0, function(a, b){
		a.display.gutters.style.left = b ? bc(a.display) + "px" : "0";
		a.refresh()
	}, !0);
	v("coverGutterNextToScrollbar",
		!1, $b, !0);
	v("lineNumbers", !1, function(a){
		Ob(a.options);
		Na(a)
	}, !0);
	v("firstLineNumber", 1, Na, !0);
	v("lineNumberFormatter", function(a){
		return a
	}, Na, !0);
	v("showCursorWhenSelecting", !1, cc, !0);
	v("readOnly", !1, function(a, b){
		"nocursor" == b ? (Vb(a), a.display.input.blur()) : b || aa(a, !0)
	});
	v("dragDrop", !0);
	v("cursorBlinkRate", 530);
	v("cursorScrollMargin", 0);
	v("cursorHeight", 1);
	v("workTime", 100);
	v("workDelay", 100);
	v("flattenSpans", !0);
	v("pollInterval", 100);
	v("undoDepth", 40, function(a, b){
		a.doc.history.undoDepth = b
	});
	v("historyEventDelay", 500);
	v("viewportMargin", 10, function(a){
		a.refresh()
	}, !0);
	v("maxHighlightLength", 1E4, function(a){
		La(a);
		a.refresh()
	}, !0);
	v("moveInputWithCursor", !0, function(a, b){
		b || (a.display.inputDiv.style.top = a.display.inputDiv.style.left = 0)
	});
	v("tabindex", null, function(a, b){
		a.display.input.tabIndex = b || ""
	});
	v("autofocus", null);
	var Od = m.modes = {}, bb = m.mimeModes = {};
	m.defineMode = function(a, b){
		!m.defaults.mode && "null" != a && (m.defaults.mode = a);
		if (2 < arguments.length) {
			b.dependencies = [];
			for (var c = 2; c <
			arguments.length; ++c)b.dependencies.push(arguments[c])
		}
		Od[a] = b
	};
	m.defineMIME = function(a, b){
		bb[a] = b
	};
	m.resolveMode = function(a){
		if ("string" == typeof a && bb.hasOwnProperty(a))a = bb[a]; else if (a && "string" == typeof a.name && bb.hasOwnProperty(a.name)) {
			var b = bb[a.name];
			a = Ld(b, a);
			a.name = b.name
		} else if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a))return m.resolveMode("application/xml");
		return "string" == typeof a ? {name: a} : a || {name: "null"}
	};
	m.getMode = function(a, b){
		b = m.resolveMode(b);
		var c = Od[b.name];
		if (!c)return m.getMode(a,
			"text/plain");
		c = c(a, b);
		if (cb.hasOwnProperty(b.name)) {
			var d = cb[b.name], e;
			for (e in d)d.hasOwnProperty(e) && (c.hasOwnProperty(e) && (c["_" + e] = c[e]), c[e] = d[e])
		}
		c.name = b.name;
		return c
	};
	m.defineMode("null", function(){
		return {
			token: function(a){
				a.skipToEnd()
			}
		}
	});
	m.defineMIME("text/plain", "null");
	var cb = m.modeExtensions = {};
	m.extendMode = function(a, b){
		var c = cb.hasOwnProperty(a) ? cb[a] : cb[a] = {};
		Eb(b, c)
	};
	m.defineExtension = function(a, b){
		m.prototype[a] = b
	};
	m.defineDocExtension = function(a, b){
		L.prototype[a] = b
	};
	m.defineOption =
		v;
	var Xb = [];
	m.defineInitHook = function(a){
		Xb.push(a)
	};
	m.copyState = wa;
	m.startState = ad;
	m.innerMode = function(a, b){
		for (; a.innerMode;) {
			var c = a.innerMode(b);
			b = c.state;
			a = c.mode
		}
		return c || {mode: a, state: b}
	};
	var qc = m.commands = {
		selectAll: function(a){
			a.setSelection(n(a.firstLine(), 0), n(a.lastLine()))
		}, killLine: function(a){
			var b = a.getCursor(!0), c = a.getCursor(!1), d = !z(b, c);
			!d && a.getLine(b.line).length == b.ch ? a.replaceRange("", b, n(b.line + 1, 0), "+delete") : a.replaceRange("", b, d ? c : n(b.line), "+delete")
		}, deleteLine: function(a){
			var b =
				a.getCursor().line;
			a.replaceRange("", n(b, 0), n(b), "+delete")
		}, undo: function(a){
			a.undo()
		}, redo: function(a){
			a.redo()
		}, goDocStart: function(a){
			a.extendSelection(n(a.firstLine(), 0))
		}, goDocEnd: function(a){
			a.extendSelection(n(a.lastLine()))
		}, goLineStart: function(a){
			a.extendSelection(Nd(a, a.getCursor().line))
		}, goLineStartSmart: function(a){
			var b = a.getCursor(), c = Nd(a, b.line), d = a.getLineHandle(c.line), e = W(d);
			!e || 0 == e[0].level ? (d = Math.max(0, d.text.search(/\S/)), a.extendSelection(n(c.line, b.line == c.line && b.ch <=
			d && b.ch ? 0 : d))) : a.extendSelection(c)
		}, goLineEnd: function(a){
			a.extendSelection(ke(a, a.getCursor().line))
		}, goLineRight: function(a){
			var b = a.charCoords(a.getCursor(), "div").top + 5;
			a.extendSelection(a.coordsChar({left: a.display.lineDiv.offsetWidth + 100, top: b}, "div"))
		}, goLineLeft: function(a){
			var b = a.charCoords(a.getCursor(), "div").top + 5;
			a.extendSelection(a.coordsChar({left: 0, top: b}, "div"))
		}, goLineUp: function(a){
			a.moveV(-1, "line")
		}, goLineDown: function(a){
			a.moveV(1, "line")
		}, goPageUp: function(a){
			a.moveV(-1, "page")
		},
		goPageDown: function(a){
			a.moveV(1, "page")
		}, goCharLeft: function(a){
			a.moveH(-1, "char")
		}, goCharRight: function(a){
			a.moveH(1, "char")
		}, goColumnLeft: function(a){
			a.moveH(-1, "column")
		}, goColumnRight: function(a){
			a.moveH(1, "column")
		}, goWordLeft: function(a){
			a.moveH(-1, "word")
		}, goGroupRight: function(a){
			a.moveH(1, "group")
		}, goGroupLeft: function(a){
			a.moveH(-1, "group")
		}, goWordRight: function(a){
			a.moveH(1, "word")
		}, delCharBefore: function(a){
			a.deleteH(-1, "char")
		}, delCharAfter: function(a){
			a.deleteH(1, "char")
		}, delWordBefore: function(a){
			a.deleteH(-1,
				"word")
		}, delWordAfter: function(a){
			a.deleteH(1, "word")
		}, delGroupBefore: function(a){
			a.deleteH(-1, "group")
		}, delGroupAfter: function(a){
			a.deleteH(1, "group")
		}, indentAuto: function(a){
			a.indentSelection("smart")
		}, indentMore: function(a){
			a.indentSelection("add")
		}, indentLess: function(a){
			a.indentSelection("subtract")
		}, insertTab: function(a){
			a.replaceSelection("\t", "end", "+input")
		}, defaultTab: function(a){
			a.somethingSelected() ? a.indentSelection("add") : a.replaceSelection("\t", "end", "+input")
		}, transposeChars: function(a){
			var b =
				a.getCursor(), c = a.getLine(b.line);
			0 < b.ch && b.ch < c.length - 1 && a.replaceRange(c.charAt(b.ch) + c.charAt(b.ch - 1), n(b.line, b.ch - 1), n(b.line, b.ch + 1))
		}, newlineAndIndent: function(a){
			x(a, function(){
				a.replaceSelection("\n", "end", "+input");
				a.indentLine(a.getCursor().line, null, !0)
			})()
		}, toggleOverwrite: function(a){
			a.toggleOverwrite()
		}
	}, $ = m.keyMap = {};
	$.basic = {
		Left: "goCharLeft",
		Right: "goCharRight",
		Up: "goLineUp",
		Down: "goLineDown",
		End: "goLineEnd",
		Home: "goLineStartSmart",
		PageUp: "goPageUp",
		PageDown: "goPageDown",
		Delete: "delCharAfter",
		Backspace: "delCharBefore",
		Tab: "defaultTab",
		"Shift-Tab": "indentAuto",
		Enter: "newlineAndIndent",
		Insert: "toggleOverwrite"
	};
	$.pcDefault = {
		"Ctrl-A": "selectAll",
		"Ctrl-D": "deleteLine",
		"Ctrl-Z": "undo",
		"Shift-Ctrl-Z": "redo",
		"Ctrl-Y": "redo",
		"Ctrl-Home": "goDocStart",
		"Alt-Up": "goDocStart",
		"Ctrl-End": "goDocEnd",
		"Ctrl-Down": "goDocEnd",
		"Ctrl-Left": "goGroupLeft",
		"Ctrl-Right": "goGroupRight",
		"Alt-Left": "goLineStart",
		"Alt-Right": "goLineEnd",
		"Ctrl-Backspace": "delGroupBefore",
		"Ctrl-Delete": "delGroupAfter",
		"Ctrl-S": "save",
		"Ctrl-F": "find",
		"Ctrl-G": "findNext",
		"Shift-Ctrl-G": "findPrev",
		"Shift-Ctrl-F": "replace",
		"Shift-Ctrl-R": "replaceAll",
		"Ctrl-[": "indentLess",
		"Ctrl-]": "indentMore",
		fallthrough: "basic"
	};
	$.macDefault = {
		"Cmd-A": "selectAll",
		"Cmd-D": "deleteLine",
		"Cmd-Z": "undo",
		"Shift-Cmd-Z": "redo",
		"Cmd-Y": "redo",
		"Cmd-Up": "goDocStart",
		"Cmd-End": "goDocEnd",
		"Cmd-Down": "goDocEnd",
		"Alt-Left": "goGroupLeft",
		"Alt-Right": "goGroupRight",
		"Cmd-Left": "goLineStart",
		"Cmd-Right": "goLineEnd",
		"Alt-Backspace": "delGroupBefore",
		"Ctrl-Alt-Backspace": "delGroupAfter",
		"Alt-Delete": "delGroupAfter",
		"Cmd-S": "save",
		"Cmd-F": "find",
		"Cmd-G": "findNext",
		"Shift-Cmd-G": "findPrev",
		"Cmd-Alt-F": "replace",
		"Shift-Cmd-Alt-F": "replaceAll",
		"Cmd-[": "indentLess",
		"Cmd-]": "indentMore",
		fallthrough: ["basic", "emacsy"]
	};
	$["default"] = ua ? $.macDefault : $.pcDefault;
	$.emacsy = {
		"Ctrl-F": "goCharRight",
		"Ctrl-B": "goCharLeft",
		"Ctrl-P": "goLineUp",
		"Ctrl-N": "goLineDown",
		"Alt-F": "goWordRight",
		"Alt-B": "goWordLeft",
		"Ctrl-A": "goLineStart",
		"Ctrl-E": "goLineEnd",
		"Ctrl-V": "goPageDown",
		"Shift-Ctrl-V": "goPageUp",
		"Ctrl-D": "delCharAfter",
		"Ctrl-H": "delCharBefore",
		"Alt-D": "delWordAfter",
		"Alt-Backspace": "delWordBefore",
		"Ctrl-K": "killLine",
		"Ctrl-T": "transposeChars"
	};
	m.lookupKey = Ua;
	m.isModifierKey = jd;
	m.keyName = kd;
	m.fromTextArea = function(a, b){
		function c(){
			a.value = j.getValue()
		}

		b || (b = {});
		b.value = a.value;
		!b.tabindex && a.tabindex && (b.tabindex = a.tabindex);
		!b.placeholder && a.placeholder && (b.placeholder = a.placeholder);
		if (null == b.autofocus) {
			var d = document.body;
			try {
				d = document.activeElement
			} catch (e) {
			}
			b.autofocus = d == a || null !=
				a.getAttribute("autofocus") && d == document.body
		}
		if (a.form && (q(a.form, "submit", c), !b.leaveSubmitMethodAlone)) {
			var f = a.form, g = f.submit;
			try {
				var h = f.submit = function(){
					c();
					f.submit = g;
					f.submit();
					f.submit = h
				}
			} catch (k) {
			}
		}
		a.style.display = "none";
		var j = m(function(b){
			a.parentNode.insertBefore(b, a.nextSibling)
		}, b);
		j.save = c;
		j.getTextArea = function(){
			return a
		};
		j.toTextArea = function(){
			c();
			a.parentNode.removeChild(j.getWrapperElement());
			a.style.display = "";
			a.form && (Y(a.form, "submit", c), "function" == typeof a.form.submit &&
			(a.form.submit = g))
		};
		return j
	};
	Wa.prototype = {
		eol: function(){
			return this.pos >= this.string.length
		}, sol: function(){
			return 0 == this.pos
		}, peek: function(){
			return this.string.charAt(this.pos) || void 0
		}, next: function(){
			if (this.pos < this.string.length)return this.string.charAt(this.pos++)
		}, eat: function(a){
			var b = this.string.charAt(this.pos);
			if ("string" == typeof a ? b == a : b && (a.test ? a.test(b) : a(b)))return ++this.pos, b
		}, eatWhile: function(a){
			for (var b = this.pos; this.eat(a););
			return this.pos > b
		}, eatSpace: function(){
			for (var a =
				this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;
			return this.pos > a
		}, skipToEnd: function(){
			this.pos = this.string.length
		}, skipTo: function(a){
			a = this.string.indexOf(a, this.pos);
			if (-1 < a)return this.pos = a, !0
		}, backUp: function(a){
			this.pos -= a
		}, column: function(){
			this.lastColumnPos < this.start && (this.lastColumnValue = xa(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start);
			return this.lastColumnValue
		}, indentation: function(){
			return xa(this.string,
				null, this.tabSize)
		}, match: function(a, b, c){
			if ("string" == typeof a) {
				var d = this.string.substr(this.pos, a.length);
				if ((c ? d.toLowerCase() : d) == (c ? a.toLowerCase() : a))return !1 !== b && (this.pos += a.length), !0
			} else {
				if ((a = this.string.slice(this.pos).match(a)) && 0 < a.index)return null;
				a && !1 !== b && (this.pos += a[0].length);
				return a
			}
		}, current: function(){
			return this.string.slice(this.start, this.pos)
		}
	};
	m.StringStream = Wa;
	m.TextMarker = na;
	na.prototype.clear = function(){
		if (!this.explicitlyCleared) {
			var a = this.doc.cm, b = a && !a.curOp;
			b && za(a);
			for (var c = null, d = null, e = 0; e < this.lines.length; ++e) {
				var f = this.lines[e], g = Ya(f.markedSpans, this);
				null != g.to && (d = N(f));
				for (var h = f, k = f.markedSpans, j = g, l = void 0, m = 0; m < k.length; ++m)k[m] != j && (l || (l = [])).push(k[m]);
				h.markedSpans = l;
				null != g.from ? c = N(f) : this.collapsed && (!ha(this.doc, f) && a) && R(f, Ma(a.display))
			}
			if (a && this.collapsed && !a.options.lineWrapping)for (e = 0; e < this.lines.length; ++e)f = ta(a.doc, this.lines[e]), g = gb(a.doc, f), g > a.display.maxLineLength && (a.display.maxLine = f, a.display.maxLineLength =
				g, a.display.maxLineChanged = !0);
			null != c && a && A(a, c, d + 1);
			this.lines.length = 0;
			this.explicitlyCleared = !0;
			this.collapsed && this.doc.cantEdit && (this.doc.cantEdit = !1, a && td(a));
			b && Aa(a);
			U(this, "clear")
		}
	};
	na.prototype.find = function(){
		for (var a, b, c = 0; c < this.lines.length; ++c) {
			var d = this.lines[c], e = Ya(d.markedSpans, this);
			if (null != e.from || null != e.to)d = N(d), null != e.from && (a = n(d, e.from)), null != e.to && (b = n(d, e.to))
		}
		return "bookmark" == this.type ? a : a && {from: a, to: b}
	};
	na.prototype.changed = function(){
		var a = this.find(), b = this.doc.cm;
		if (a && b) {
			var c = w(this.doc, a.from.line), d = ic(b, c);
			d && (d.text = d.measure = d.markedSpans = null);
			if (a.from.line >= b.display.showingFrom && a.from.line < b.display.showingTo) {
				for (a = b.display.lineDiv.firstChild; a; a = a.nextSibling)if (a.lineObj == c) {
					a.offsetHeight != c.height && R(c, a.offsetHeight);
					break
				}
				Sb(b, function(){
					b.curOp.selectionChanged = !0
				})
			}
		}
	};
	na.prototype.attachLine = function(a){
		if (!this.lines.length && this.doc.cm) {
			var b = this.doc.cm.curOp;
			if (!b.maybeHiddenMarkers || -1 == Z(b.maybeHiddenMarkers, this))(b.maybeUnhiddenMarkers ||
			(b.maybeUnhiddenMarkers = [])).push(this)
		}
		this.lines.push(a)
	};
	na.prototype.detachLine = function(a){
		this.lines.splice(Z(this.lines, a), 1);
		!this.lines.length && this.doc.cm && (a = this.doc.cm.curOp, (a.maybeHiddenMarkers || (a.maybeHiddenMarkers = [])).push(this))
	};
	m.SharedTextMarker = Fb;
	Fb.prototype.clear = function(){
		if (!this.explicitlyCleared) {
			this.explicitlyCleared = !0;
			for (var a = 0; a < this.markers.length; ++a)this.markers[a].clear();
			U(this, "clear")
		}
	};
	Fb.prototype.find = function(){
		return this.primary.find()
	};
	var Hc = m.LineWidget =
		function(a, b, c){
			for (var d in c)c.hasOwnProperty(d) && (this[d] = c[d]);
			this.cm = a;
			this.node = b
		};
	Hc.prototype.clear = Bd(function(){
		var a = this.line.widgets, b = N(this.line);
		if (null != b && a) {
			for (var c = 0; c < a.length; ++c)a[c] == this && a.splice(c--, 1);
			a.length || (this.line.widgets = null);
			R(this.line, Math.max(0, this.line.height - lb(this)));
			A(this.cm, b, b + 1)
		}
	});
	Hc.prototype.changed = Bd(function(){
		var a = this.height;
		this.height = null;
		if (a = lb(this) - a)R(this.line, this.line.height + a), a = N(this.line), A(this.cm, a, a + 1)
	});
	var Ed = {}, Dc =
		/[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\uFEFF]/g;
	Hb.prototype = {
		chunkSize: function(){
			return this.lines.length
		}, removeInner: function(a, b){
			for (var c = a, d = a + b; c < d; ++c) {
				var e = this.lines[c];
				this.height -= e.height;
				var f = e;
				f.parent = null;
				zd(f);
				U(e, "delete")
			}
			this.lines.splice(a, b)
		}, collapse: function(a){
			a.splice.apply(a, [a.length, 0].concat(this.lines))
		}, insertInner: function(a, b, c){
			this.height += c;
			this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
			a = 0;
			for (c = b.length; a < c; ++a)b[a].parent = this
		},
		iterN: function(a, b, c){
			for (b = a + b; a < b; ++a)if (c(this.lines[a]))return !0
		}
	};
	$a.prototype = {
		chunkSize: function(){
			return this.size
		}, removeInner: function(a, b){
			this.size -= b;
			for (var c = 0; c < this.children.length; ++c) {
				var d = this.children[c], e = d.chunkSize();
				if (a < e) {
					var f = Math.min(b, e - a), g = d.height;
					d.removeInner(a, f);
					this.height -= g - d.height;
					e == f && (this.children.splice(c--, 1), d.parent = null);
					if (0 == (b -= f))break;
					a = 0
				} else a -= e
			}
			25 > this.size - b && (c = [], this.collapse(c), this.children = [new Hb(c)], this.children[0].parent = this)
		},
		collapse: function(a){
			for (var b = 0, c = this.children.length; b < c; ++b)this.children[b].collapse(a)
		}, insertInner: function(a, b, c){
			this.size += b.length;
			this.height += c;
			for (var d = 0, e = this.children.length; d < e; ++d) {
				var f = this.children[d], g = f.chunkSize();
				if (a <= g) {
					f.insertInner(a, b, c);
					if (f.lines && 50 < f.lines.length) {
						for (; 50 < f.lines.length;)a = f.lines.splice(f.lines.length - 25, 25), a = new Hb(a), f.height -= a.height, this.children.splice(d + 1, 0, a), a.parent = this;
						this.maybeSpill()
					}
					break
				}
				a -= g
			}
		}, maybeSpill: function(){
			if (!(10 >=
				this.children.length)) {
				var a = this;
				do {
					var b = a.children.splice(a.children.length - 5, 5), b = new $a(b);
					if (a.parent) {
						a.size -= b.size;
						a.height -= b.height;
						var c = Z(a.parent.children, a);
						a.parent.children.splice(c + 1, 0, b)
					} else c = new $a(a.children), c.parent = a, a.children = [c, b], a = c;
					b.parent = a.parent
				} while (10 < a.children.length);
				a.parent.maybeSpill()
			}
		}, iterN: function(a, b, c){
			for (var d = 0, e = this.children.length; d < e; ++d) {
				var f = this.children[d], g = f.chunkSize();
				if (a < g) {
					g = Math.min(b, g - a);
					if (f.iterN(a, g, c))return !0;
					if (0 == (b -=
							g))break;
					a = 0
				} else a -= g
			}
		}
	};
	var oe = 0, L = m.Doc = function(a, b, c){
		if (!(this instanceof L))return new L(a, b, c);
		null == c && (c = 0);
		$a.call(this, [new Hb([Za("", null)])]);
		this.first = c;
		this.scrollTop = this.scrollLeft = 0;
		this.cantEdit = !1;
		this.history = Ib();
		this.frontier = c;
		c = n(c, 0);
		this.sel = {from: c, to: c, head: c, anchor: c, shift: !1, extend: !1, goalColumn: null};
		this.id = ++oe;
		this.modeOption = b;
		"string" == typeof a && (a = ka(a));
		Ac(this, {from: c, to: c, text: a}, null, {head: c, anchor: c})
	};
	L.prototype = Ld($a.prototype, {
		constructor: L, iter: function(a,
																																	b, c){
			c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a)
		}, insert: function(a, b){
			for (var c = 0, d = 0, e = b.length; d < e; ++d)c += b[d].height;
			this.insertInner(a - this.first, b, c)
		}, remove: function(a, b){
			this.removeInner(a - this.first, b)
		}, getValue: function(a){
			var b = Ec(this, this.first, this.first + this.size);
			return !1 === a ? b : b.join(a || "\n")
		}, setValue: function(a){
			var b = n(this.first, 0), c = this.first + this.size - 1;
			Ba(this, {from: b, to: n(c, w(this, c).text.length), text: ka(a), origin: "setValue"}, {head: b, anchor: b},
				!0)
		}, replaceRange: function(a, b, c, d){
			b = r(this, b);
			c = c ? r(this, c) : b;
			da(this, a, b, c, d)
		}, getRange: function(a, b, c){
			a = zc(this, r(this, a), r(this, b));
			return !1 === c ? a : a.join(c || "\n")
		}, getLine: function(a){
			return (a = this.getLineHandle(a)) && a.text
		}, setLine: function(a, b){
			Ea(this, a) && da(this, b, n(a, 0), r(this, n(a)))
		}, removeLine: function(a){
			a ? da(this, "", r(this, n(a - 1)), r(this, n(a))) : da(this, "", n(0, 0), r(this, n(1, 0)))
		}, getLineHandle: function(a){
			if (Ea(this, a))return w(this, a)
		}, getLineNumber: function(a){
			return N(a)
		}, lineCount: function(){
			return this.size
		},
		firstLine: function(){
			return this.first
		}, lastLine: function(){
			return this.first + this.size - 1
		}, clipPos: function(a){
			return r(this, a)
		}, getCursor: function(a){
			var b = this.sel;
			return la(null == a || "head" == a ? b.head : "anchor" == a ? b.anchor : "end" == a || !1 === a ? b.to : b.from)
		}, somethingSelected: function(){
			return !z(this.sel.head, this.sel.anchor)
		}, setCursor: Sa(function(a, b, c){
			a = r(this, "number" == typeof a ? n(a, b || 0) : a);
			c ? H(this, a) : ca(this, a, a)
		}), setSelection: Sa(function(a, b){
			ca(this, r(this, a), r(this, b || a))
		}), extendSelection: Sa(function(a,
																																			b){
			H(this, r(this, a), b && r(this, b))
		}), getSelection: function(a){
			return this.getRange(this.sel.from, this.sel.to, a)
		}, replaceSelection: function(a, b, c){
			Ba(this, {from: this.sel.from, to: this.sel.to, text: ka(a), origin: c}, b || "around")
		}, undo: Sa(function(){
			qd(this, "undo")
		}), redo: Sa(function(){
			qd(this, "redo")
		}), setExtending: function(a){
			this.sel.extend = a
		}, historySize: function(){
			var a = this.history;
			return {undo: a.done.length, redo: a.undone.length}
		}, clearHistory: function(){
			this.history = Ib()
		}, markClean: function(){
			this.history.dirtyCounter =
				0;
			this.history.lastOp = this.history.lastOrigin = null
		}, isClean: function(){
			return 0 == this.history.dirtyCounter
		}, getHistory: function(){
			return {done: Jb(this.history.done), undone: Jb(this.history.undone)}
		}, setHistory: function(a){
			var b = this.history = Ib();
			b.done = a.done.slice(0);
			b.undone = a.undone.slice(0)
		}, markText: function(a, b, c){
			return Xa(this, r(this, a), r(this, b), c, "range")
		}, setBookmark: function(a, b){
			var c = {replacedWith: b && (null == b.nodeType ? b.widget : b), insertLeft: b && b.insertLeft};
			a = r(this, a);
			return Xa(this,
				a, a, c, "bookmark")
		}, findMarksAt: function(a){
			a = r(this, a);
			var b = [], c = w(this, a.line).markedSpans;
			if (c)for (var d = 0; d < c.length; ++d) {
				var e = c[d];
				if ((null == e.from || e.from <= a.ch) && (null == e.to || e.to >= a.ch))b.push(e.marker.parent || e.marker)
			}
			return b
		}, getAllMarks: function(){
			var a = [];
			this.iter(function(b){
				if (b = b.markedSpans)for (var c = 0; c < b.length; ++c)null != b[c].from && a.push(b[c].marker)
			});
			return a
		}, posFromIndex: function(a){
			var b, c = this.first;
			this.iter(function(d){
				d = d.text.length + 1;
				if (d > a)return b = a, !0;
				a -= d;
				++c
			});
			return r(this, n(c, b))
		}, indexFromPos: function(a){
			a = r(this, a);
			var b = a.ch;
			if (a.line < this.first || 0 > a.ch)return 0;
			this.iter(this.first, a.line, function(a){
				b += a.text.length + 1
			});
			return b
		}, copy: function(a){
			var b = new L(Ec(this, this.first, this.first + this.size), this.modeOption, this.first);
			b.scrollTop = this.scrollTop;
			b.scrollLeft = this.scrollLeft;
			b.sel = {
				from: this.sel.from,
				to: this.sel.to,
				head: this.sel.head,
				anchor: this.sel.anchor,
				shift: this.sel.shift,
				extend: !1,
				goalColumn: this.sel.goalColumn
			};
			a && (b.history.undoDepth =
				this.history.undoDepth, b.setHistory(this.getHistory()));
			return b
		}, linkedDoc: function(a){
			a || (a = {});
			var b = this.first, c = this.first + this.size;
			null != a.from && a.from > b && (b = a.from);
			null != a.to && a.to < c && (c = a.to);
			b = new L(Ec(this, b, c), a.mode || this.modeOption, b);
			a.sharedHist && (b.history = this.history);
			(this.linked || (this.linked = [])).push({doc: b, sharedHist: a.sharedHist});
			b.linked = [{doc: this, isParent: !0, sharedHist: a.sharedHist}];
			return b
		}, unlinkDoc: function(a){
			a instanceof m && (a = a.doc);
			if (this.linked)for (var b = 0; b <
			this.linked.length; ++b)if (this.linked[b].doc == a) {
				this.linked.splice(b, 1);
				a.unlinkDoc(this);
				break
			}
			if (a.history == this.history) {
				var c = [a.id];
				Da(a, function(a){
					c.push(a.id)
				}, !0);
				a.history = Ib();
				a.history.done = Jb(this.history.done, c);
				a.history.undone = Jb(this.history.undone, c)
			}
		}, iterLinkedDocs: function(a){
			Da(this, a)
		}, getMode: function(){
			return this.mode
		}, getEditor: function(){
			return this.cm
		}
	});
	L.prototype.eachLine = L.prototype.iter;
	var pe = ["iter", "insert", "remove", "copy", "getEditor"], db;
	for (db in L.prototype)L.prototype.hasOwnProperty(db) &&
	0 > Z(pe, db) && (m.prototype[db] = function(a){
		return function(){
			return a.apply(this.doc, arguments)
		}
	}(L.prototype[db]));
	m.e_stop = Ha;
	m.e_preventDefault = B;
	m.e_stopPropagation = Kd;
	var ba, pb = 0;
	m.on = q;
	m.off = Y;
	m.signal = J;
	var oa = 30, fd = m.Pass = {
		toString: function(){
			return "CodeMirror.Pass"
		}
	};
	Qb.prototype = {
		set: function(a, b){
			clearTimeout(this.id);
			this.id = setTimeout(b, a)
		}
	};
	m.countColumn = xa;
	var Lb = [""], je = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, nc = /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F\udc00-\udfff]/;
	m.replaceGetRect = function(a){
		D = a
	};
	var pc;
	if (O)pc = !1; else {
		var Pd = p("div");
		pc = "draggable" in Pd || "dragDrop" in Pd
	}
	Ca ? Gb = function(a, b){
		return 36 == a.charCodeAt(b - 1) && 39 == a.charCodeAt(b)
	} : Wb && !/Version\/([6-9]|\d\d)\b/.test(navigator.userAgent) ? Gb = function(a, b){
		return /\-[^ \-?]|\?[^ !\'\"\),.\-\/:;\?\]\}]/.test(a.slice(b - 1, b + 1))
	} : P && (Gb = function(a, b){
		return 1 < b && 45 == a.charCodeAt(b - 1) && /\w/.test(a.charAt(b - 2)) && /[^\-?\.]/.test(a.charAt(b)) ? !0 : /[~!#%&*)=+}\]|\"\.>,:;][({[<]|-[^\-?\.\u2010-\u201f\u2026]|\?[\w~`@#$%\^&*(_=+{[|><]|\u2026[\w~`@#$%\^&*(_=+{[><]/.test(a.slice(b -
			1, b + 1))
	});
	var Mb, Fc, ka = 3 != "\n\nb".split(/\n/).length ? function(a){
		for (var b = 0, c = [], d = a.length; b <= d;) {
			var e = a.indexOf("\n", b);
			-1 == e && (e = a.length);
			var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e), g = f.indexOf("\r");
			-1 != g ? (c.push(f.slice(0, g)), b += g + 1) : (c.push(f), b = e + 1)
		}
		return c
	} : function(a){
		return a.split(/\r\n?|\n/)
	};
	m.splitLines = ka;
	var de = window.getSelection ? function(a){
		try {
			return a.selectionStart != a.selectionEnd
		} catch (b) {
			return !1
		}
	} : function(a){
		try {
			var b = a.ownerDocument.selection.createRange()
		} catch (c) {
		}
		return !b ||
		b.parentElement() != a ? !1 : 0 != b.compareEndPoints("StartToEnd", b)
	}, tb;
	var Ic = p("div");
	"oncopy" in Ic ? tb = !0 : (Ic.setAttribute("oncopy", "return;"), tb = "function" == typeof Ic.oncopy);
	var ma = {
		3: "Enter",
		8: "Backspace",
		9: "Tab",
		13: "Enter",
		16: "Shift",
		17: "Ctrl",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Esc",
		32: "Space",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "Left",
		38: "Up",
		39: "Right",
		40: "Down",
		44: "PrintScrn",
		45: "Insert",
		46: "Delete",
		59: ";",
		91: "Mod",
		92: "Mod",
		93: "Mod",
		109: "-",
		107: "=",
		127: "Delete",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'",
		63276: "PageUp",
		63277: "PageDown",
		63275: "End",
		63273: "Home",
		63234: "Left",
		63232: "Up",
		63235: "Right",
		63233: "Down",
		63302: "Insert",
		63272: "Delete"
	};
	m.keyNames = ma;
	for (var I = 0; 10 > I; I++)ma[I + 48] = String(I);
	for (I = 65; 90 >= I; I++)ma[I] = String.fromCharCode(I);
	for (I = 1; 12 >= I; I++)ma[I + 111] = ma[I + 63235] = "F" + I;
	var ya, Hd, se = function(a){
			return 255 >= a ? qe.charAt(a) : 1424 <= a && 1524 >= a ? "R" : 1536 <= a && 1791 >= a ? re.charAt(a - 1536) : 1792 <= a && 2220 >= a ? "r" : "L"
		}, qe = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL",
		re = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr", te = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, Qd = /[stwN]/, Rd = /[LRr]/, Sd = /[Lb1n]/, Td = /[1n]/;
	Hd = function(a){
		if (!te.test(a))return !1;
		for (var b = a.length, c = [], d = 0, e; d < b; ++d)c.push(se(a.charCodeAt(d)));
		for (var d = 0, f = "L"; d < b; ++d)e = c[d], "m" == e ? c[d] =
			f : f = e;
		d = 0;
		for (f = "L"; d < b; ++d)e = c[d], "1" == e && "r" == f ? c[d] = "n" : Rd.test(e) && (f = e, "r" == e && (c[d] = "R"));
		d = 1;
		for (f = c[0]; d < b - 1; ++d) {
			e = c[d];
			if ("+" == e && "1" == f && "1" == c[d + 1])c[d] = "1"; else if ("," == e && f == c[d + 1] && ("1" == f || "n" == f))c[d] = f;
			f = e
		}
		for (d = 0; d < b; ++d)if (e = c[d], "," == e)c[d] = "N"; else if ("%" == e) {
			for (f = d + 1; f < b && "%" == c[f]; ++f);
			var g = d && "!" == c[d - 1] || f < b - 1 && "1" == c[f] ? "1" : "N";
			for (e = d; e < f; ++e)c[e] = g;
			d = f - 1
		}
		d = 0;
		for (f = "L"; d < b; ++d)e = c[d], "L" == f && "1" == e ? c[d] = "L" : Rd.test(e) && (f = e);
		for (d = 0; d < b; ++d)if (Qd.test(c[d])) {
			for (f = d +
				1; f < b && Qd.test(c[f]); ++f);
			e = "L" == (f < b - 1 ? c[f] : "L");
			g = "L" == (d ? c[d - 1] : "L") || e ? "L" : "R";
			for (e = d; e < f; ++e)c[e] = g;
			d = f - 1
		}
		for (var f = [], h, d = 0; d < b;)if (Sd.test(c[d])) {
			e = d;
			for (++d; d < b && Sd.test(c[d]); ++d);
			f.push({from: e, to: d, level: 0})
		} else {
			var k = d, g = f.length;
			for (++d; d < b && "L" != c[d]; ++d);
			for (e = k; e < d;)if (Td.test(c[e])) {
				k < e && f.splice(g, 0, {from: k, to: e, level: 1});
				k = e;
				for (++e; e < d && Td.test(c[e]); ++e);
				f.splice(g, 0, {from: k, to: e, level: 2});
				k = e
			} else++e;
			k < d && f.splice(g, 0, {from: k, to: d, level: 1})
		}
		if (1 == f[0].level && (h = a.match(/^\s+/)))f[0].from =
			h[0].length, f.unshift({from: 0, to: h[0].length, level: 0});
		if (1 == K(f).level && (h = a.match(/\s+$/)))K(f).to -= h[0].length, f.push({from: b - h[0].length, to: b, level: 0});
		f[0].level != K(f).level && f.push({from: b, to: b, level: f[0].level});
		return f
	};
	m.version = "3.13 +";
	return m
}();
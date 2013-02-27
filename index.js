global.Document = Document
global.Node     = Node
global.Element  = Element
global.Text     = Text
global.document = new Document()

function Document() {}

Document.prototype.createTextNode = function(v) {
    var n = new Text();
    n.textContent = v;
    return n;
}

Document.prototype.createElement = function(nodeName) {
    var el = new Element();
    el.nodeName = nodeName;
    return el;
}

function Node () {}

Text.prototype = new Node()

Element.prototype = new Node()

function Style (el) {
  this.el = el;
  this.styles = [];
}

Style.prototype.setProperty = function (n,v) {
  var attr = this.el.getAttribute('style');

  !attr && this.el.setAttribute('style', '');
  this.el._setProperty(this.styles, {name: n, value:v});
}

Style.prototype.getProperty = function(n) {    
    return this.el._getProperty(this.styles, n);
}

function classList(el) {  
  this.el = el;
}

classList.prototype.add = function(cls) {    
  !this.el.getAttribute('class') && this.el.setAttribute('class','');  
  var v = this.el.getAttribute('class').value;
  this.el.setAttribute('class',v.length ? v+cls+' ' : v+cls);
}

function Attribute(name, value){  
  if (name) {
    this.name = name;
    this.value = value ? value : '';
  }  
}


function Element() {
    var self = this;

    this.style = new Style(this)
    this.classList = new classList(this);
    this.childNodes = [];
    this.attributes = [];

    this._setProperty = function(arr, obj, key, val) {
      var p = self._getProperty(arr, key);      
      if (p) {
        p.value = val;
        return;
      }
      arr.push('function' === typeof obj ? new obj(key.toLowerCase(),val) : obj);
    }

    this._getProperty = function(arr, key) {
      if (!key) return;
      key = key.toLowerCase();
      for (var i=0;i<arr.length;i++) {
        if (key == arr[i].name) return arr[i];
      }
    }
}

Element.prototype.appendChild = function(child) {
    child.parentElement = this;
    this.childNodes.push(child);
}

Element.prototype.setAttribute = function (n, v) {
    this._setProperty(this.attributes, Attribute, n, v);
}

Element.prototype.getAttribute = function(n) {
    return this._getProperty(this.attributes, n);
}

Element.prototype.replaceChild = function(newChild, oldChild) {
    var self = this;
    this.childNodes.forEach(function(child, index){
        if (child === oldChild)
        self.childNodes[index] = newChild;
    });
}

Element.prototype.__defineGetter__('innerHTML', function () {
  var s = ''
  this.childNodes.forEach(function (e) {
    s += (e.outerHTML || e.textContent)
  })
  return s
})

Element.prototype.__defineSetter__('innerHTML', function (v) {
  //only handle this simple case that doesn't need parsing
  //this case is useful... parsing is hard and will need added deps!
  if(v == '')
    this.childNodes.length = 0
})


Element.prototype.__defineGetter__('outerHTML', function () {
  var a = [],  self = this;
  
  function _stringify(arr, d) {
    var attr = [], value;
    arr.forEach(function(a){
      value = ('style' != a.name) ? a.value : _stylify(self.style.styles);
      attr.push(a.name+'='+'\"'+value+'\"');
    })
    return attr.length ? ' '+attr.join(" ") : '';
  }    

  function _stylify(styles) {      
    var stylified = '';
    styles.forEach(function(s){
      stylified+=s.name+':'+s.value+';';
    })
    return stylified;
  }

  a.push('<'+this.nodeName + _stringify(this.attributes)+'>')

  a.push(this.innerHTML)

  a.push('</'+this.nodeName+'>')

  return a.join('\n')
})

Element.prototype.__defineGetter__('textContent', function () {
  var s = ''
  this.childNodes.forEach(function (e) {
    s += e.textContent
  })
  return s
})

Element.prototype.addEventListener = function(t, l) {}

function escapeHTML(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&#x27;')
      .replace(/'/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

function Text(){}

Text.prototype.__defineGetter__('textContent', function() {
  return escapeHTML(this.value || '');
})

Text.prototype.__defineSetter__('textContent', function(v) {
  this.value = v
})


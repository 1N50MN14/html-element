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


function Attribute(name, value){  
  if (name) {
    this.name = name;
    this.value = value ? value : '';
  }  
}


function Element() {
    var self = this;

    this.classList = []
    this.classList.add = this.classList.push.bind(this.classList);
    this.style = new Style(this)
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
        if (key == arr[i].name) return key[i];
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

Element.prototype.toString = function () {
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
  this.textContent && a.push(this.textContent);
  this.childNodes.forEach(function (e) {
    a.push(e.toString())
  })
  a.push('</'+this.nodeName+'>')

  return a.join('\n')
}

Element.prototype.addEventListener = function(t, l) {}

function escapeHTML(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&#x27;')
      .replace(/'/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

function Text(){
}

Text.prototype.toString = function() {
    return escapeHTML(this.value);
}

global.Document = Document
global.Node     = Node
global.Element  = Element
global.Text     = Text
global.document = new Document()

function Document() {}

Document.prototype.createTextNode = function(v) {
    var n = new Text();
    n.value = v;
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

function Style () {

}

Style.prototype.setProperty = function (k,v) {
  this[k] = v
}

function Element() {
    this.classList = []
    this.classList.add = this.classList.push.bind(this.classList);
    this.style = new Style
    this.childNodes = [];
}

Element.prototype.appendChild = function(child) {
    child.parentElement = this;
    this.childNodes.push(child);
}

Element.prototype.setAttribute = function (k, v) {
  this[k] = v
}

Element.prototype.replaceChild = function(newChild, oldChild) {
    var self = this;
    this.childNodes.forEach(function(child, index){
        if (child === oldChild)
        self.childNodes[index] = newChild;
    });
}

Element.prototype.toString = function () {
  var a = []
  a.push('<'+this.nodeName+'>')
  this.childNodes.forEach(function (e) {
    a.push(e.toString())
  })
  a.push('</'+this.nodeName+'>')
  return a.join('\n')
}

function escapeHTML(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&#x27;')
      .replace(/'/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

function Text(){}

Text.prototype.toString = function() {
    return escapeHTML(this.value);
}

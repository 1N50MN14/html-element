require('../');

var test = require('tap').test;

//remove white space so it's easier to test
function clean(e) {
  return e.replace(/\n/g, '')
          .replace(/\s+/, ' ')
}

test('create a Text node', function(t){
  var h1 = document.createElement('h1')
  t.equal(clean(h1.outerHTML), "<h1></h1>")
  t.equal(clean(h1.textContent), "")

  h1.setAttribute('class', 'myclass');      
  t.type(h1.toString(), "string", "type of h1 should be string")

  t.equal(clean(h1.outerHTML), '<h1 class="myclass"></h1>')
  t.equal(clean(h1.textContent), "")

  h1.appendChild(document.createTextNode('hello'))

  t.equal(clean(h1.outerHTML), '<h1 class="myclass">hello</h1>')
  t.equal(clean(h1.textContent), "hello")
  t.end();
})


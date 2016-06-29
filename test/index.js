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
  t.equal(clean(h1.innerHTML), "")

  h1.setAttribute('class', 'myclass');
  t.type(h1.toString(), "string", "type of h1 should be string")

  t.equal(clean(h1.outerHTML), '<h1 class="myclass"></h1>')
  t.equal(clean(h1.textContent), "")

  h1.appendChild(document.createTextNode('hello'))

  t.equal(clean(h1.outerHTML), '<h1 class="myclass">hello</h1>')
  t.equal(clean(h1.textContent), "hello")
  t.equal(clean(h1.innerHTML), "hello")

  h1.appendChild(document.createElement('h2'))
  t.equal(clean(h1.outerHTML), '<h1 class="myclass">hello<h2></h2></h1>')
  t.equal(clean(h1.innerHTML), "hello<h2></h2>")

  h1.innerHTML = ''

  t.equal(clean(h1.innerHTML), "")
  t.equal(clean(h1.outerHTML), '<h1 class="myclass"></h1>')
  t.equal(h1.childNodes.length, 0)


  t.end();
})

test('create a Comment node', function(t){
  var body = document.createElement('body')

  var comment = document.createComment('a comment')
  body.appendChild(comment)

  t.equal(clean(body.outerHTML), "<body><!--a comment--></body>")

  comment.data = 'still a comment'

  t.equal(clean(body.outerHTML), "<body><!--still a comment--></body>")

  t.end()
})

test('dataset', function(t){

  var div = document.createElement('div')
  div.dataset['id'] = '123'
  t.equal(clean(div.outerHTML), '<div data-id="123"></div>')

  t.end()
})

test('basic set innerHTML', function(t){

  var div = document.createElement('div')
  var span = document.createElement('span')

  div.appendChild(span)

  t.equal(clean(div.outerHTML), '<div><span></span></div>')

  div.innerHTML = '<strong>Replaced content</strong>'

  t.equal(clean(div.outerHTML), '<div><strong>Replaced content</strong></div>')

  t.end()
})

test('correct html and attribute escaping', function(t){

  var div = document.createElement('div')
  div.setAttribute('title', "It's <bad> & \"scary\"")
  div.appendChild(document.createTextNode("It's text with <bad> & not so bad characters in \"it\""))

  t.equal(clean(div.outerHTML),
    '<div title="It\'s &lt;bad&gt; &amp; &quot;scary&quot;">' +
    'It\'s text with &lt;bad&gt; &amp; not so bad characters in "it"</div>'
  )

  t.end()
})

test('whitespace preserved', function(t){
  var body = document.createElement('body')
  body.appendChild(document.createTextNode('\n  '))
  var div = document.createElement('div')
  div.appendChild(document.createTextNode('The con'))
  var em = document.createElement('em')
  em.appendChild(document.createTextNode('tent'))
  div.appendChild(em)
  div.appendChild(document.createTextNode(' of the div'))
  body.appendChild(div)
  body.appendChild(document.createTextNode('\n'))

  t.equal(body.outerHTML,
    "<body>\n" +
    "  <div>The con<em>tent</em> of the div</div>\n" +
    "</body>"
  )

  t.end()

})

test('set/get style.cssText', function(t){
  var div = document.createElement('div')

  div.style.setProperty('background', 'green')
  t.equal(div.style.cssText, 'background:green;')

  div.style.cssText = 'color: red; padding: 8px'
  t.equal(div.style.cssText, 'color:red;padding:8px;')

  t.end()
})

test('style set/getAttribute', function(t){
  var div = document.createElement('div')

  div.style.setProperty('background', 'green')
  t.equal(div.getAttribute('style'), 'background:green;')

  div.setAttribute('style', 'color: red; padding: 8px')
  t.equal(div.getAttribute('style'), 'color:red;padding:8px;')

  t.end()
})

test('render outerHTML with inline style', function(t){
  var div = document.createElement('div')

  div.style.setProperty('background', 'green')
  t.equal(div.outerHTML, '<div style="background:green;"></div>')

  div.style.cssText = 'color: red; padding: 8px'
  t.equal(div.outerHTML, '<div style="color:red;padding:8px;"></div>')

  t.end()
})

test('removeAttribute', function(t){
  var div = document.createElement('div')
  div.setAttribute('data-id', 100)
  t.same(div.attributes[0], { name: 'data-id', value: 100 })
  div.setAttribute('data-key', 'key')
  t.same(div.attributes[1], { name: 'data-key', value: 'key' })
  div.removeAttribute('data-key')
  t.same(div.attributes, [ { name: 'data-id', value: 100 } ])
  div.removeAttribute('data-id')
  t.same(div.attributes, [])
  div.className = 'css-class'
  div.removeAttribute('class')
  t.equal('className' in div, false)
  t.end()
})

test('insertBefore', function(t){
  var div = document.createElement('div')
  var div1 = document.createElement('div')
  var div2 = document.createElement('div')
  div.appendChild(div1)
  div.appendChild(div2)
  var children = div.childNodes
  t.same(children[0], div1)
  t.same(children[1], div2)
  var div3 = document.createElement('div')
  div.insertBefore(div3, div2)
  t.same(children[1], div3)
  t.same(children[2], div2)
  t.end()
})

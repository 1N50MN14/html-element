require('../');

var test = require('tap').test;

test('create a Text node', function(t){
	var h1 = document.createElement('h1')
	h1.setAttribute('class', 'myclass');			
	t.type(h1.toString(), "string", "type of h1 should be string")
	t.end();
})

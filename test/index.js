require('../');

var test = require('tap').test;

test('create a Text node', function(t){
	var txt = document.createTextNode('text')
	
	t.end();
})

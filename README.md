# html-element

A simple HTMLElement shim on the server.

This is a partial implementation of HTMLElement, to get client-side templates (such as [hyperscript](https://github.com/dominictarr/hyperscript)) working in node!

The current implementation is fully compatible with [hyperscript](https://github.com/dominictarr/hyperscript).

Note: adds "document" to globals.

## Supported methods

- createElement(nodeName)
- createTextNode(value)
- appendChild(node)
- replaceChild(node)
- removeChild(node)
- insertBefore(new, existing)
- toString()
- setAttribute(name, value)
- getAttribute(name)
- setProperty(name, value)
- getProperty(name)
- innerHTML()
- outerHTML()
- textContent()

Setters update existing objects, otherwise create anew; 

## Properties
- innerHTML
- outerHTML
- textContent
- attribute.value
- attribute.name
- everything else

## TODO / Missing features
- Your PR to make this a more accurate implementation


## License

MIT

# html-element

A simple HTMLElement shim on the server.
This is a partial implementation of HTMLElement, to get things like hyperscript working in node.

Note: adds "document" to globals.

## Supported methods

- createElement(nodeName)
- createTextNode(value)
- appendChild(node)
- replaceChild(node)
- toString()
- setAttribute(name, value)
- getAttribute(name)
- setProperty(name, value)
- getProperty(name)

(setAttribute updates attribute if exists, otherwise creates anew)

## Properties

- textContent
- attribute.value
- attribute.name

## TODO / Missing features
- innerHTML
- title()

Please make a PR to help making this this a more accurate implementation.

## License

MIT

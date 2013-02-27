# html-element

A simple HTMLElement shim on the server.
This is a partial implementation of HTMLElement, to get things like hyperscript working in node.

## Supported methods

- createElement(nodeName)
- createTextNode(value)
- appendChild(node)
- replaceChild(node)
- toString()
- setAttribute(name, value)
- getAttribute(name)

(setAttribute updates attribute if exists, otherwise creates anew)

## Properties

- textContent
- attribute.value
- attribute.name

## TODO / Missing features
- Get setProperty() to work
- innerHTML
- title()

Please make a PR to help making this this a more accurate implementation.

## License

MIT

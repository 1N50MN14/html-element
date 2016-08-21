/**
 * A map of HTML element types to the HTML attributes they can have.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 * @module attributes-elements
 */

var HTML_ATTRIBUTES = {
  'accept': new Set([
    'form',
    'input',
  ]),

  'accept-charset': new Set([
    'form',
  ]),

  'accesskey': 'GLOBAL',

  'action': new Set([
    'form',
  ]),

  'align': new Set([
    'applet',
    'caption',
    'col',
    'colgroup',
    'hr',
    'iframe',
    'img',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
  ]),

  'alt': new Set([
    'applet',
    'area',
    'img',
    'input',
  ]),

  'async': new Set([
    'script',
  ]),

  'autocomplete': new Set([
    'form',
    'input',
  ]),

  'autofocus': new Set([
    'button',
    'input',
    'keygen',
    'select',
    'textarea',
  ]),

  'autoplay': new Set([
    'audio',
    'video',
  ]),

  'autosave': new Set([
    'input',
  ]),

  'bgcolor': new Set([
    'body',
    'col',
    'colgroup',
    'marquee',
    'table',
    'tbody',
    'tfoot',
    'td',
    'th',
    'tr',
  ]),

  'border': new Set([
    'img',
    'object',
    'table',
  ]),

  'buffered': new Set([
    'audio',
    'video',
  ]),

  'challenge': new Set([
    'keygen',
  ]),

  'charset': new Set([
    'meta',
    'script',
  ]),

  'checked': new Set([
    'command',
    'input',
  ]),

  'cite': new Set([
    'blockquote',
    'del',
    'ins',
    'q',
  ]),

  'class': 'GLOBAL',

  'code': new Set([
    'applet',
  ]),

  'codebase': new Set([
    'applet',
  ]),

  'color': new Set([
    'basefont',
    'font',
    'hr',
  ]),

  'cols': new Set([
    'textarea',
  ]),

  'colspan': new Set([
    'td',
    'th',
  ]),

  'content': new Set([
    'meta',
  ]),

  'contenteditable': 'GLOBAL',

  'contextmenu': 'GLOBAL',

  'controls': new Set([
    'audio',
    'video',
  ]),

  'coords': new Set([
    'area',
  ]),

  'data': new Set([
    'object',
  ]),

  'datetime': new Set([
    'del',
    'ins',
    'time',
  ]),

  'default': new Set([
    'track',
  ]),

  'defer': new Set([
    'script',
  ]),

  'dir': 'GLOBAL',

  'dirname': new Set([
    'input',
    'textarea',
  ]),

  'disabled': new Set([
    'button',
    'command',
    'fieldset',
    'input',
    'keygen',
    'optgroup',
    'option',
    'select',
    'textarea',
  ]),

  'download': new Set([
    'a',
    'area',
  ]),

  'draggable': 'GLOBAL',

  'dropzone': 'GLOBAL',

  'enctype': new Set([
    'form',
  ]),

  // FIXME translate from htmlFor
  'for': new Set([
    'label',
    'output',
  ]),

  'form': new Set([
    'button',
    'fieldset',
    'input',
    'keygen',
    'label',
    'meter',
    'object',
    'output',
    'progress',
    'select',
    'textarea',
  ]),

  'formaction': new Set([
    'input',
    'button',
  ]),

  'headers': new Set([
    'td',
    'th',
  ]),

  'height': new Set([
    'canvas',
    'embed',
    'iframe',
    'img',
    'input',
    'object',
    'video',
  ]),

  'hidden': 'GLOBAL',

  'high': new Set([
    'meter',
  ]),

  'href': new Set([
    'a',
    'area',
    'base',
    'link',
  ]),

  // TODO
};

function isStandardAttribute(attrName, tagName) {
  tagName = tagName.toLowerCase();
  var attr = HTML_ATTRIBUTES[attrName.toLowerCase()];
  return !!attr && (
    attr === 'GLOBAL' ||
    attr.has(tagName)
  );
}

module.exports = {
  isStandardAttribute: isStandardAttribute,
  HTML_ATTRIBUTES: HTML_ATTRIBUTES,
};

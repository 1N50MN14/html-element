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

  'accept-charset': 'form',

  'accesskey': 'GLOBAL',

  'action': 'form',

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

  'async': 'script',

  'autocomplete': new Set([
    'form',
    'input',
  ]),

  // TODO

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
    attr === tagName ||
    attr.has(tagName)
  );
}

module.exports = {
  isStandardAttribute: isStandardAttribute,
  HTML_ATTRIBUTES: HTML_ATTRIBUTES,
};

module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1744251502324, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.parseDefaults = void 0;
exports.stringify = stringify;
var _lexer = _interopRequireDefault(require("./lexer"));
var _parser = _interopRequireDefault(require("./parser"));
var _format = require("./format");
var _stringify = require("./stringify");
var _tags = require("./tags");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var parseDefaults = {
  voidTags: _tags.voidTags,
  closingTags: _tags.closingTags,
  childlessTags: _tags.childlessTags,
  closingTagAncestorBreakers: _tags.closingTagAncestorBreakers,
  includePositions: false,
  preferDoubleQuoteAttributes: false
};
exports.parseDefaults = parseDefaults;
function parse(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDefaults;
  var tokens = (0, _lexer["default"])(str, options);
  var nodes = (0, _parser["default"])(tokens, options);
  return (0, _format.format)(nodes, options);
}
function stringify(ast) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDefaults;
  return (0, _stringify.toHTML)(ast, options);
}
//# sourceMappingURL=index.js.map

}, function(modId) {var map = {"./lexer":1744251502325,"./parser":1744251502327,"./format":1744251502328,"./stringify":1744251502329,"./tags":1744251502330}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1744251502325, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyPosition = copyPosition;
exports["default"] = lexer;
exports.feedPosition = feedPosition;
exports.findTextEnd = findTextEnd;
exports.isWhitespaceChar = isWhitespaceChar;
exports.jumpPosition = jumpPosition;
exports.lex = lex;
exports.lexComment = lexComment;
exports.lexSkipTag = lexSkipTag;
exports.lexTag = lexTag;
exports.lexTagAttributes = lexTagAttributes;
exports.lexTagName = lexTagName;
exports.lexText = lexText;
exports.makeInitialPosition = makeInitialPosition;
var _compat = require("./compat");
function feedPosition(position, str, len) {
  var start = position.index;
  var end = position.index = start + len;
  for (var i = start; i < end; i++) {
    var _char = str.charAt(i);
    if (_char === '\n') {
      position.line++;
      position.column = 0;
    } else {
      position.column++;
    }
  }
}
function jumpPosition(position, str, end) {
  var len = end - position.index;
  return feedPosition(position, str, len);
}
function makeInitialPosition() {
  return {
    index: 0,
    column: 0,
    line: 0
  };
}
function copyPosition(position) {
  return {
    index: position.index,
    line: position.line,
    column: position.column
  };
}
function lexer(str, options) {
  var state = {
    str: str,
    options: options,
    position: makeInitialPosition(),
    tokens: []
  };
  lex(state);
  return state.tokens;
}
function lex(state) {
  var str = state.str,
    childlessTags = state.options.childlessTags;
  var len = str.length;
  while (state.position.index < len) {
    var start = state.position.index;
    lexText(state);
    if (state.position.index === start) {
      var isComment = (0, _compat.startsWith)(str, '!--', start + 1);
      if (isComment) {
        lexComment(state);
      } else {
        var tagName = lexTag(state);
        var safeTag = tagName.toLowerCase();
        if ((0, _compat.arrayIncludes)(childlessTags, safeTag)) {
          lexSkipTag(tagName, state);
        }
      }
    }
  }
}
var alphanumeric = /[A-Za-z0-9]/;
function findTextEnd(str, index) {
  while (true) {
    var textEnd = str.indexOf('<', index);
    if (textEnd === -1) {
      return textEnd;
    }
    var _char2 = str.charAt(textEnd + 1);
    if (_char2 === '/' || _char2 === '!' || alphanumeric.test(_char2)) {
      return textEnd;
    }
    index = textEnd + 1;
  }
}
function lexText(state) {
  var type = 'text';
  var str = state.str,
    position = state.position;
  var textEnd = findTextEnd(str, position.index);
  if (textEnd === position.index) return;
  if (textEnd === -1) {
    textEnd = str.length;
  }
  var start = copyPosition(position);
  var content = str.slice(position.index, textEnd);
  jumpPosition(position, str, textEnd);
  var end = copyPosition(position);
  state.tokens.push({
    type: type,
    content: content,
    position: {
      start: start,
      end: end
    }
  });
}
function lexComment(state) {
  var str = state.str,
    position = state.position;
  var start = copyPosition(position);
  feedPosition(position, str, 4); // "<!--".length
  var contentEnd = str.indexOf('-->', position.index);
  var commentEnd = contentEnd + 3; // "-->".length
  if (contentEnd === -1) {
    contentEnd = commentEnd = str.length;
  }
  var content = str.slice(position.index, contentEnd);
  jumpPosition(position, str, commentEnd);
  state.tokens.push({
    type: 'comment',
    content: content,
    position: {
      start: start,
      end: copyPosition(position)
    }
  });
}
function lexTag(state) {
  var str = state.str,
    position = state.position;
  {
    var secondChar = str.charAt(position.index + 1);
    var close = secondChar === '/';
    var start = copyPosition(position);
    feedPosition(position, str, close ? 2 : 1);
    state.tokens.push({
      type: 'tag-start',
      close: close,
      position: {
        start: start
      }
    });
  }
  var tagName = lexTagName(state);
  lexTagAttributes(state);
  {
    var firstChar = str.charAt(position.index);
    var _close = firstChar === '/';
    feedPosition(position, str, _close ? 2 : 1);
    var end = copyPosition(position);
    state.tokens.push({
      type: 'tag-end',
      close: _close,
      position: {
        end: end
      }
    });
  }
  return tagName;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
var whitespace = /\s/;
function isWhitespaceChar(_char3) {
  return whitespace.test(_char3);
}
function lexTagName(state) {
  var str = state.str,
    position = state.position;
  var len = str.length;
  var start = position.index;
  while (start < len) {
    var _char4 = str.charAt(start);
    var isTagChar = !(isWhitespaceChar(_char4) || _char4 === '/' || _char4 === '>');
    if (isTagChar) break;
    start++;
  }
  var end = start + 1;
  while (end < len) {
    var _char5 = str.charAt(end);
    var _isTagChar = !(isWhitespaceChar(_char5) || _char5 === '/' || _char5 === '>');
    if (!_isTagChar) break;
    end++;
  }
  jumpPosition(position, str, end);
  var tagName = str.slice(start, end);
  state.tokens.push({
    type: 'tag',
    content: tagName
  });
  return tagName;
}
function lexTagAttributes(state) {
  var str = state.str,
    position = state.position,
    tokens = state.tokens;
  var cursor = position.index;
  var quote = null; // null, single-, or double-quote
  var wordBegin = cursor; // index of word start
  var words = []; // "key", "key=value", "key='value'", etc
  var len = str.length;
  while (cursor < len) {
    var _char6 = str.charAt(cursor);
    if (quote) {
      var isQuoteEnd = _char6 === quote;
      if (isQuoteEnd) {
        quote = null;
      }
      cursor++;
      continue;
    }
    var isTagEnd = _char6 === '/' || _char6 === '>';
    if (isTagEnd) {
      if (cursor !== wordBegin) {
        words.push(str.slice(wordBegin, cursor));
      }
      break;
    }
    var isWordEnd = isWhitespaceChar(_char6);
    if (isWordEnd) {
      if (cursor !== wordBegin) {
        words.push(str.slice(wordBegin, cursor));
      }
      wordBegin = cursor + 1;
      cursor++;
      continue;
    }
    var isQuoteStart = _char6 === "'" || _char6 === '"';
    if (isQuoteStart) {
      quote = _char6;
      cursor++;
      continue;
    }
    cursor++;
  }
  jumpPosition(position, str, cursor);
  var wLen = words.length;
  var type = 'attribute';
  for (var i = 0; i < wLen; i++) {
    var word = words[i];
    var isNotPair = word.indexOf('=') === -1;
    if (isNotPair) {
      var secondWord = words[i + 1];
      if (secondWord && (0, _compat.startsWith)(secondWord, '=')) {
        if (secondWord.length > 1) {
          var newWord = word + secondWord;
          tokens.push({
            type: type,
            content: newWord
          });
          i += 1;
          continue;
        }
        var thirdWord = words[i + 2];
        i += 1;
        if (thirdWord) {
          var _newWord = word + '=' + thirdWord;
          tokens.push({
            type: type,
            content: _newWord
          });
          i += 1;
          continue;
        }
      }
    }
    if ((0, _compat.endsWith)(word, '=')) {
      var _secondWord = words[i + 1];
      if (_secondWord && !(0, _compat.stringIncludes)(_secondWord, '=')) {
        var _newWord2 = word + _secondWord;
        tokens.push({
          type: type,
          content: _newWord2
        });
        i += 1;
        continue;
      }
      var _newWord3 = word.slice(0, -1);
      tokens.push({
        type: type,
        content: _newWord3
      });
      continue;
    }
    tokens.push({
      type: type,
      content: word
    });
  }
}
var push = [].push;
function lexSkipTag(tagName, state) {
  var str = state.str,
    position = state.position,
    tokens = state.tokens;
  var safeTagName = tagName.toLowerCase();
  var len = str.length;
  var index = position.index;
  while (index < len) {
    var nextTag = str.indexOf('</', index);
    if (nextTag === -1) {
      lexText(state);
      break;
    }
    var tagStartPosition = copyPosition(position);
    jumpPosition(tagStartPosition, str, nextTag);
    var tagState = {
      str: str,
      position: tagStartPosition,
      tokens: []
    };
    var name = lexTag(tagState);
    if (safeTagName !== name.toLowerCase()) {
      index = tagState.position.index;
      continue;
    }
    if (nextTag !== position.index) {
      var textStart = copyPosition(position);
      jumpPosition(position, str, nextTag);
      tokens.push({
        type: 'text',
        content: str.slice(textStart.index, nextTag),
        position: {
          start: textStart,
          end: copyPosition(position)
        }
      });
    }
    push.apply(tokens, tagState.tokens);
    jumpPosition(position, str, tagState.position.index);
    break;
  }
}
//# sourceMappingURL=lexer.js.map

}, function(modId) { var map = {"./compat":1744251502326}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1744251502326, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayIncludes = arrayIncludes;
exports.endsWith = endsWith;
exports.isRealNaN = isRealNaN;
exports.startsWith = startsWith;
exports.stringIncludes = stringIncludes;
/*
  We don't want to include babel-polyfill in our project.
    - Library authors should be using babel-runtime for non-global polyfilling
    - Adding babel-polyfill/-runtime increases bundle size significantly

  We will include our polyfill instance methods as regular functions.
*/

function startsWith(str, searchString, position) {
  return str.substr(position || 0, searchString.length) === searchString;
}
function endsWith(str, searchString, position) {
  var index = (position || str.length) - searchString.length;
  var lastIndex = str.lastIndexOf(searchString, index);
  return lastIndex !== -1 && lastIndex === index;
}
function stringIncludes(str, searchString, position) {
  return str.indexOf(searchString, position || 0) !== -1;
}
function isRealNaN(x) {
  return typeof x === 'number' && isNaN(x);
}
function arrayIncludes(array, searchElement, position) {
  var len = array.length;
  if (len === 0) return false;
  var lookupIndex = position | 0;
  var isNaNElement = isRealNaN(searchElement);
  var searchIndex = lookupIndex >= 0 ? lookupIndex : len + lookupIndex;
  while (searchIndex < len) {
    var element = array[searchIndex++];
    if (element === searchElement) return true;
    if (isNaNElement && isRealNaN(element)) return true;
  }
  return false;
}
//# sourceMappingURL=compat.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1744251502327, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parser;
exports.hasTerminalParent = hasTerminalParent;
exports.parse = parse;
exports.rewindStack = rewindStack;
var _compat = require("./compat");
function parser(tokens, options) {
  var root = {
    tagName: null,
    children: []
  };
  var state = {
    tokens: tokens,
    options: options,
    cursor: 0,
    stack: [root]
  };
  parse(state);
  return root.children;
}
function hasTerminalParent(tagName, stack, terminals) {
  var tagParents = terminals[tagName];
  if (tagParents) {
    var currentIndex = stack.length - 1;
    while (currentIndex >= 0) {
      var parentTagName = stack[currentIndex].tagName;
      if (parentTagName === tagName) {
        break;
      }
      if ((0, _compat.arrayIncludes)(tagParents, parentTagName)) {
        return true;
      }
      currentIndex--;
    }
  }
  return false;
}
function rewindStack(stack, newLength, childrenEndPosition, endPosition) {
  stack[newLength].position.end = endPosition;
  for (var i = newLength + 1, len = stack.length; i < len; i++) {
    stack[i].position.end = childrenEndPosition;
  }
  stack.splice(newLength);
}
function parse(state) {
  var tokens = state.tokens,
    options = state.options;
  var stack = state.stack;
  var nodes = stack[stack.length - 1].children;
  var len = tokens.length;
  var cursor = state.cursor;
  while (cursor < len) {
    var token = tokens[cursor];
    if (token.type !== 'tag-start') {
      nodes.push(token);
      cursor++;
      continue;
    }
    var tagToken = tokens[++cursor];
    cursor++;
    var tagName = tagToken.content.toLowerCase();
    if (token.close) {
      var index = stack.length;
      var shouldRewind = false;
      while (--index > -1) {
        if (stack[index].tagName === tagName) {
          shouldRewind = true;
          break;
        }
      }
      while (cursor < len) {
        var endToken = tokens[cursor];
        if (endToken.type !== 'tag-end') break;
        cursor++;
      }
      if (shouldRewind) {
        rewindStack(stack, index, token.position.start, tokens[cursor - 1].position.end);
        break;
      } else {
        continue;
      }
    }
    var isClosingTag = (0, _compat.arrayIncludes)(options.closingTags, tagName);
    var shouldRewindToAutoClose = isClosingTag;
    if (shouldRewindToAutoClose) {
      var terminals = options.closingTagAncestorBreakers;
      shouldRewindToAutoClose = !hasTerminalParent(tagName, stack, terminals);
    }
    if (shouldRewindToAutoClose) {
      // rewind the stack to just above the previous
      // closing tag of the same name
      var currentIndex = stack.length - 1;
      while (currentIndex > 0) {
        if (tagName === stack[currentIndex].tagName) {
          rewindStack(stack, currentIndex, token.position.start, token.position.start);
          var previousIndex = currentIndex - 1;
          nodes = stack[previousIndex].children;
          break;
        }
        currentIndex = currentIndex - 1;
      }
    }
    var attributes = [];
    var attrToken = void 0;
    while (cursor < len) {
      attrToken = tokens[cursor];
      if (attrToken.type === 'tag-end') break;
      attributes.push(attrToken.content);
      cursor++;
    }
    cursor++;
    var children = [];
    var position = {
      start: token.position.start,
      end: attrToken.position.end
    };
    var elementNode = {
      type: 'element',
      tagName: tagToken.content,
      attributes: attributes,
      children: children,
      position: position
    };
    nodes.push(elementNode);
    var hasChildren = !(attrToken.close || (0, _compat.arrayIncludes)(options.voidTags, tagName));
    if (hasChildren) {
      var size = stack.push({
        tagName: tagName,
        children: children,
        position: position
      });
      var innerState = {
        tokens: tokens,
        options: options,
        cursor: cursor,
        stack: stack
      };
      parse(innerState);
      cursor = innerState.cursor;
      var rewoundInElement = stack.length === size;
      if (rewoundInElement) {
        elementNode.position.end = tokens[cursor - 1].position.end;
      }
    }
  }
  state.cursor = cursor;
}
//# sourceMappingURL=parser.js.map

}, function(modId) { var map = {"./compat":1744251502326}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1744251502328, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.formatAttributes = formatAttributes;
exports.splitHead = splitHead;
exports.unquote = unquote;
function splitHead(str, sep) {
  var idx = str.indexOf(sep);
  if (idx === -1) return [str];
  return [str.slice(0, idx), str.slice(idx + sep.length)];
}
function unquote(str) {
  var car = str.charAt(0);
  var end = str.length - 1;
  var isQuoteStart = car === '"' || car === "'";
  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end);
  }
  return str;
}
function format(nodes, options) {
  return nodes.map(function (node) {
    var type = node.type;
    var outputNode = type === 'element' ? {
      type: type,
      tagName: node.tagName.toLowerCase(),
      attributes: formatAttributes(node.attributes),
      children: format(node.children, options)
    } : {
      type: type,
      content: node.content
    };
    if (options.includePositions) {
      outputNode.position = node.position;
    }
    return outputNode;
  });
}
function formatAttributes(attributes) {
  return attributes.map(function (attribute) {
    var parts = splitHead(attribute.trim(), '=');
    var key = parts[0];
    var value = typeof parts[1] === 'string' ? unquote(parts[1]) : null;
    return {
      key: key,
      value: value
    };
  });
}
//# sourceMappingURL=format.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1744251502329, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.formatAttributes = formatAttributes;
exports.toHTML = toHTML;
var _compat = require("./compat");
function formatAttributes(attributes, preferDoubleQuoteAttributes) {
  return attributes.reduce(function (attrs, attribute) {
    var key = attribute.key,
      value = attribute.value;
    if (value === null) {
      return "".concat(attrs, " ").concat(key);
    }
    var quote;
    if (preferDoubleQuoteAttributes) {
      var quoteEscape = value.indexOf('"') !== -1;
      quote = quoteEscape ? "'" : '"';
    } else {
      var _quoteEscape = value.indexOf("'") !== -1;
      quote = _quoteEscape ? '"' : "'";
    }
    return "".concat(attrs, " ").concat(key, "=").concat(quote).concat(value).concat(quote);
  }, '');
}
function toHTML(tree, options) {
  return tree.map(function (node) {
    if (node.type === 'text') {
      return node.content;
    }
    if (node.type === 'comment') {
      return "<!--".concat(node.content, "-->");
    }
    var tagName = node.tagName,
      attributes = node.attributes,
      children = node.children;
    var isSelfClosing = (0, _compat.arrayIncludes)(options.voidTags, tagName.toLowerCase());
    return isSelfClosing ? "<".concat(tagName).concat(formatAttributes(attributes, options.preferDoubleQuoteAttributes), ">") : "<".concat(tagName).concat(formatAttributes(attributes, options.preferDoubleQuoteAttributes), ">").concat(toHTML(children, options), "</").concat(tagName, ">");
  }).join('');
}
var _default = {
  toHTML: toHTML
};
exports["default"] = _default;
//# sourceMappingURL=stringify.js.map

}, function(modId) { var map = {"./compat":1744251502326}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1744251502330, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voidTags = exports.closingTags = exports.closingTagAncestorBreakers = exports.childlessTags = void 0;
/*
  Tags which contain arbitary non-parsed content
  For example: <script> JavaScript should not be parsed
*/
var childlessTags = ['style', 'script', 'template'];

/*
  Tags which auto-close because they cannot be nested
  For example: <p>Outer<p>Inner is <p>Outer</p><p>Inner</p>
*/
exports.childlessTags = childlessTags;
var closingTags = ['html', 'head', 'body', 'p', 'dt', 'dd', 'li', 'option', 'thead', 'th', 'tbody', 'tr', 'td', 'tfoot', 'colgroup'];

/*
  Closing tags which have ancestor tags which
  may exist within them which prevent the
  closing tag from auto-closing.
  For example: in <li><ul><li></ul></li>,
  the top-level <li> should not auto-close.
*/
exports.closingTags = closingTags;
var closingTagAncestorBreakers = {
  li: ['ul', 'ol', 'menu'],
  dt: ['dl'],
  dd: ['dl'],
  tbody: ['table'],
  thead: ['table'],
  tfoot: ['table'],
  tr: ['table'],
  td: ['table']
};

/*
  Tags which do not need the closing tag
  For example: <img> does not need </img>
*/
exports.closingTagAncestorBreakers = closingTagAncestorBreakers;
var voidTags = ['!doctype', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
exports.voidTags = voidTags;
//# sourceMappingURL=tags.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1744251502324);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map
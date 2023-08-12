"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./App.css");
var _reactRouterDom = require("react-router-dom");
var _Posts = _interopRequireDefault(require("./Posts/Posts"));
var _Layout = _interopRequireDefault(require("./Layout/Layout"));
var _Login = _interopRequireDefault(require("./SignupLogin/Login"));
var _Register = _interopRequireDefault(require("./SignupLogin/Register"));
var _react = require("react");
var _CreatePost = _interopRequireDefault(require("./CreatePost/CreatePost"));
var _Post = _interopRequireDefault(require("./Post/Post"));
var _EditPost = _interopRequireDefault(require("./EditPost/EditPost"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Routing = function Routing() {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loggedIn = _useState2[0],
    setLoggedIn = _useState2[1];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/React.createElement(_Layout.default, {
      loggedIn: loggedIn,
      setLoggedIn: setLoggedIn
    })
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    index: true,
    element: /*#__PURE__*/React.createElement(_Posts.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/login",
    element: /*#__PURE__*/React.createElement(_Login.default, {
      loggedIn: loggedIn,
      setLoggedIn: setLoggedIn
    })
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/register",
    element: /*#__PURE__*/React.createElement(_Register.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/create",
    element: loggedIn ? /*#__PURE__*/React.createElement(_CreatePost.default, null) : /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/login"
    })
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/post/:id",
    element: loggedIn ? /*#__PURE__*/React.createElement(_Post.default, null) : /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/"
    })
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/edit/:id",
    element: loggedIn ? /*#__PURE__*/React.createElement(_EditPost.default, null) : /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/"
    })
  }))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Routing, null));
}
var _default = App;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Nav = _interopRequireDefault(require("../Navbar/Nav"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Layout = function Layout(_ref) {
  var loggedIn = _ref.loggedIn,
    setLoggedIn = _ref.setLoggedIn;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Nav.default, {
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Outlet, null));
};
var _default = Layout;
exports.default = _default;
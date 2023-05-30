"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./contexts/UserContext.js":
/*!*********************************!*\
  !*** ./contexts/UserContext.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserReducer\": function() { return /* binding */ UserReducer; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);\n// When the LOGIN action is dispatched,\n// update the username and set isLoggedIn to true\nconst UserReducer = (user, action)=>{\n    console.log(\"action.payload\", action.payload);\n    switch(action.type){\n        case \"REGISTER\":\n            return {\n                ...user,\n                username: action.payload,\n                isLoggedIn: false\n            };\n        case \"LOGIN\":\n            return {\n                ...user,\n                username: action.payload.username,\n                isLoggedIn: true,\n                token: action.payload.token\n            };\n        // Reset the username and set isLoggedIn to false\n        case \"LOGOUT\":\n            return {\n                ...user,\n                username: \"\",\n                isLoggedIn: false,\n                token: \"\"\n            };\n        default:\n            return state;\n    }\n};\n_c = UserReducer;\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserContext);\nvar _c;\n$RefreshReg$(_c, \"UserReducer\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9Vc2VyQ29udGV4dC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFFN0MsTUFBTUUsNEJBQWNELG9EQUFhQSxDQUFDO0FBRWxDLHVDQUF1QztBQUN2QyxpREFBaUQ7QUFFMUMsTUFBTUUsY0FBYyxDQUFDQyxNQUFNQztJQUNoQ0MsUUFBUUMsSUFBSSxrQkFBa0JGLE9BQU9HO0lBQ3JDLE9BQVFILE9BQU9JO1FBQ2IsS0FBSztZQUNILE9BQU87Z0JBQ0wsR0FBR0wsSUFBSTtnQkFDUE0sVUFBVUwsT0FBT0c7Z0JBQ2pCRyxZQUFZO1lBQ2Q7UUFDRixLQUFLO1lBQ0gsT0FBTztnQkFDTCxHQUFHUCxJQUFJO2dCQUNQTSxVQUFVTCxPQUFPRyxRQUFRRTtnQkFDekJDLFlBQVk7Z0JBQ1pDLE9BQU9QLE9BQU9HLFFBQVFJO1lBQ3hCO1FBQ0YsaURBQWlEO1FBQ2pELEtBQUs7WUFDSCxPQUFPO2dCQUNMLEdBQUdSLElBQUk7Z0JBQ1BNLFVBQVU7Z0JBQ1ZDLFlBQVk7Z0JBQ1pDLE9BQU87WUFDVDtRQUNGO1lBQ0UsT0FBT0M7SUFDWDtBQUNGLEVBQUU7S0EzQldWO0FBNkJiLCtEQUFlRCxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbnRleHRzL1VzZXJDb250ZXh0LmpzPzAwMmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgVXNlckNvbnRleHQgPSBjcmVhdGVDb250ZXh0KG51bGwpO1xuXG4vLyBXaGVuIHRoZSBMT0dJTiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbi8vIHVwZGF0ZSB0aGUgdXNlcm5hbWUgYW5kIHNldCBpc0xvZ2dlZEluIHRvIHRydWVcblxuZXhwb3J0IGNvbnN0IFVzZXJSZWR1Y2VyID0gKHVzZXIsIGFjdGlvbikgPT4ge1xuICBjb25zb2xlLmxvZyhcImFjdGlvbi5wYXlsb2FkXCIsIGFjdGlvbi5wYXlsb2FkKTtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgXCJSRUdJU1RFUlwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4udXNlcixcbiAgICAgICAgdXNlcm5hbWU6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0xvZ2dlZEluOiBmYWxzZSxcbiAgICAgIH07XG4gICAgY2FzZSBcIkxPR0lOXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi51c2VyLFxuICAgICAgICB1c2VybmFtZTogYWN0aW9uLnBheWxvYWQudXNlcm5hbWUsXG4gICAgICAgIGlzTG9nZ2VkSW46IHRydWUsXG4gICAgICAgIHRva2VuOiBhY3Rpb24ucGF5bG9hZC50b2tlbixcbiAgICAgIH07XG4gICAgLy8gUmVzZXQgdGhlIHVzZXJuYW1lIGFuZCBzZXQgaXNMb2dnZWRJbiB0byBmYWxzZVxuICAgIGNhc2UgXCJMT0dPVVRcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnVzZXIsXG4gICAgICAgIHVzZXJuYW1lOiBcIlwiLFxuICAgICAgICBpc0xvZ2dlZEluOiBmYWxzZSxcbiAgICAgICAgdG9rZW46IFwiXCIsXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJDb250ZXh0O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsIlVzZXJDb250ZXh0IiwiVXNlclJlZHVjZXIiLCJ1c2VyIiwiYWN0aW9uIiwiY29uc29sZSIsImxvZyIsInBheWxvYWQiLCJ0eXBlIiwidXNlcm5hbWUiLCJpc0xvZ2dlZEluIiwidG9rZW4iLCJzdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./contexts/UserContext.js\n"));

/***/ })

});
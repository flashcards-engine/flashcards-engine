/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/util/IpcUtil.ts":
/*!************************************!*\
  !*** ./src/common/util/IpcUtil.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    getChannel(method, route) {\n        return `${method}:${route}`;\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tbW9uL3V0aWwvSXBjVXRpbC50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUVBQWU7SUFDWCxVQUFVLENBQUMsTUFBYyxFQUFFLEtBQWE7UUFDcEMsT0FBTyxHQUFHLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGVjdHJvbi8uL3NyYy9jb21tb24vdXRpbC9JcGNVdGlsLnRzPzVmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAgIGdldENoYW5uZWwobWV0aG9kOiBzdHJpbmcsIHJvdXRlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGAke21ldGhvZH06JHtyb3V0ZX1gO1xuICAgIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/common/util/IpcUtil.ts\n");

/***/ }),

/***/ "./src/preload/ipc/APIFactory.ts":
/*!***************************************!*\
  !*** ./src/preload/ipc/APIFactory.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _common_util_IpcUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/util/IpcUtil */ \"./src/common/util/IpcUtil.ts\");\n\nlet api;\nfunction getApiFunction(ipcRenderer, channel) {\n    return function (...args) {\n        return ipcRenderer.invoke(channel, ...args);\n    };\n}\nfunction initializeApi() {\n    return {};\n}\nclass ApiFactory {\n    getApi(ipcRenderer, routes) {\n        if (!api) {\n            api = initializeApi();\n        }\n        routes.forEach((routeMapping) => {\n            const channel = _common_util_IpcUtil__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getChannel(routeMapping.method, routeMapping.route);\n            const method = routeMapping.method;\n            if (!api[method]) {\n                api[method] = {};\n            }\n            api[method][routeMapping.route] = getApiFunction(ipcRenderer, channel);\n        });\n        console.debug('api object configured:');\n        console.debug(api);\n        return api;\n    }\n}\nconst apiFactory = new ApiFactory();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiFactory);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJlbG9hZC9pcGMvQVBJRmFjdG9yeS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFnRDtBQUloRCxJQUFJLEdBQVEsQ0FBQztBQUViLFNBQVMsY0FBYyxDQUFDLFdBQWdCLEVBQUUsT0FBZTtJQUNyRCxPQUFPLFVBQVMsR0FBRyxJQUFXO1FBQzFCLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELFNBQVMsYUFBYTtJQUNsQixPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVU7SUFDWixNQUFNLENBQUMsV0FBZ0IsRUFBRSxNQUFzQjtRQUMzQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sR0FBRyxHQUFHLGFBQWEsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQTBCLEVBQUUsRUFBRTtZQUMxQyxNQUFNLE9BQU8sR0FBRyw0REFBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RSxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBZ0IsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDcEI7WUFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFDcEMsaUVBQWUsVUFBVSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24vLi9zcmMvcHJlbG9hZC9pcGMvQVBJRmFjdG9yeS50cz80YTVmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpcGNVdGlsIGZyb20gXCIuLi8uLi9jb21tb24vdXRpbC9JcGNVdGlsXCI7XG5pbXBvcnQgeyBBUEkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGVzL0FQSVwiO1xuaW1wb3J0IFJvdXRlTWFwcGluZyBmcm9tIFwiLi9Sb3V0ZU1hcHBpbmdcIjtcblxubGV0IGFwaTogQVBJO1xuXG5mdW5jdGlvbiBnZXRBcGlGdW5jdGlvbihpcGNSZW5kZXJlcjogYW55LCBjaGFubmVsOiBzdHJpbmcpOiAoLi4uYXJnczogYW55W10pID0+IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoY2hhbm5lbCwgLi4uYXJncylcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplQXBpKCk6IEFQSSB7XG4gICAgcmV0dXJuIHt9O1xufVxuXG5jbGFzcyBBcGlGYWN0b3J5IHtcbiAgICBnZXRBcGkoaXBjUmVuZGVyZXI6IGFueSwgcm91dGVzOiBSb3V0ZU1hcHBpbmdbXSk6IEFQSSB7XG4gICAgICAgIGlmICghYXBpKSB7XG4gICAgICAgICAgICBhcGkgPSBpbml0aWFsaXplQXBpKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJvdXRlcy5mb3JFYWNoKChyb3V0ZU1hcHBpbmc6IFJvdXRlTWFwcGluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hhbm5lbCA9IGlwY1V0aWwuZ2V0Q2hhbm5lbChyb3V0ZU1hcHBpbmcubWV0aG9kLCByb3V0ZU1hcHBpbmcucm91dGUpO1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gcm91dGVNYXBwaW5nLm1ldGhvZCBhcyBzdHJpbmc7XG4gICAgICAgICAgICBpZiAoIWFwaVttZXRob2RdKSB7XG4gICAgICAgICAgICAgICAgYXBpW21ldGhvZF0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwaVttZXRob2RdW3JvdXRlTWFwcGluZy5yb3V0ZV0gPSBnZXRBcGlGdW5jdGlvbihpcGNSZW5kZXJlciwgY2hhbm5lbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUuZGVidWcoJ2FwaSBvYmplY3QgY29uZmlndXJlZDonKTtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhhcGkpO1xuICAgICAgICByZXR1cm4gYXBpO1xuICAgIH1cbn1cblxuY29uc3QgYXBpRmFjdG9yeSA9IG5ldyBBcGlGYWN0b3J5KCk7XG5leHBvcnQgZGVmYXVsdCBhcGlGYWN0b3J5O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/preload/ipc/APIFactory.ts\n");

/***/ }),

/***/ "./src/preload/ipc/Routes.ts":
/*!***********************************!*\
  !*** ./src/preload/ipc/Routes.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _routes_FlashcardRoutes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../routes/FlashcardRoutes */ \"./src/preload/routes/FlashcardRoutes.ts\");\n/* harmony import */ var _routes_FlashcardSetRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../routes/FlashcardSetRoutes */ \"./src/preload/routes/FlashcardSetRoutes.ts\");\n/* harmony import */ var _routes_FlashcardSetGroupRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../routes/FlashcardSetGroupRoutes */ \"./src/preload/routes/FlashcardSetGroupRoutes.ts\");\n\n\n\nconst routes = [\n    _routes_FlashcardRoutes__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    _routes_FlashcardSetRoutes__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    _routes_FlashcardSetGroupRoutes__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n].reduce((accumulator, currentValue) => accumulator.concat(currentValue));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJlbG9hZC9pcGMvUm91dGVzLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDd0Q7QUFDTTtBQUNVO0FBRXhFLE1BQU0sTUFBTSxHQUFtQjtJQUMzQiwrREFBZTtJQUNmLGtFQUFrQjtJQUNsQix1RUFBdUI7Q0FDMUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFFMUUsaUVBQWUsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24vLi9zcmMvcHJlbG9hZC9pcGMvUm91dGVzLnRzPzIwOTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlTWFwcGluZyBmcm9tIFwiLi9Sb3V0ZU1hcHBpbmdcIjtcbmltcG9ydCBmbGFzaGNhcmRSb3V0ZXMgZnJvbSBcIi4uL3JvdXRlcy9GbGFzaGNhcmRSb3V0ZXNcIjtcbmltcG9ydCBmbGFzaGNhcmRTZXRSb3V0ZXMgZnJvbSBcIi4uL3JvdXRlcy9GbGFzaGNhcmRTZXRSb3V0ZXNcIjtcbmltcG9ydCBmbGFzaGNhcmRTZXRHcm91cFJvdXRlcyBmcm9tIFwiLi4vcm91dGVzL0ZsYXNoY2FyZFNldEdyb3VwUm91dGVzXCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVNYXBwaW5nW10gPSBbXG4gICAgZmxhc2hjYXJkUm91dGVzLFxuICAgIGZsYXNoY2FyZFNldFJvdXRlcyxcbiAgICBmbGFzaGNhcmRTZXRHcm91cFJvdXRlc1xuXS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IGFjY3VtdWxhdG9yLmNvbmNhdChjdXJyZW50VmFsdWUpKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/preload/ipc/Routes.ts\n");

/***/ }),

/***/ "./src/preload/preload.ts":
/*!********************************!*\
  !*** ./src/preload/preload.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ipc_APIFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ipc/APIFactory */ \"./src/preload/ipc/APIFactory.ts\");\n/* harmony import */ var _ipc_Routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ipc/Routes */ \"./src/preload/ipc/Routes.ts\");\n\n\nconst { ipcRenderer, contextBridge } = eval('require')('electron');\nconst api = _ipc_APIFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getApi(ipcRenderer, _ipc_Routes__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\ncontextBridge.exposeInMainWorld('api', api);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJlbG9hZC9wcmVsb2FkLnRzIiwibWFwcGluZ3MiOiI7OztBQUEwQztBQUNSO0FBQ2xDLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRW5FLE1BQU0sR0FBRyxHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxtREFBTSxDQUFDLENBQUM7QUFDbkQsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLy4vc3JjL3ByZWxvYWQvcHJlbG9hZC50cz8xN2VhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGlGYWN0b3J5IGZyb20gXCIuL2lwYy9BUElGYWN0b3J5XCI7XG5pbXBvcnQgcm91dGVzIGZyb20gXCIuL2lwYy9Sb3V0ZXNcIjtcbmNvbnN0IHsgaXBjUmVuZGVyZXIsIGNvbnRleHRCcmlkZ2UgfSA9IGV2YWwoJ3JlcXVpcmUnKSgnZWxlY3Ryb24nKTtcblxuY29uc3QgYXBpID0gYXBpRmFjdG9yeS5nZXRBcGkoaXBjUmVuZGVyZXIsIHJvdXRlcyk7XG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdhcGknLCBhcGkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/preload/preload.ts\n");

/***/ }),

/***/ "./src/preload/routes/FlashcardRoutes.ts":
/*!***********************************************!*\
  !*** ./src/preload/routes/FlashcardRoutes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst routes = [\n    {\n        method: 'GET',\n        route: '/hello'\n    }\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJlbG9hZC9yb3V0ZXMvRmxhc2hjYXJkUm91dGVzLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE1BQU0sR0FBbUI7SUFDM0I7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLEtBQUssRUFBRSxRQUFRO0tBQ2xCO0NBQ0osQ0FBQztBQUVGLGlFQUFlLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLy4vc3JjL3ByZWxvYWQvcm91dGVzL0ZsYXNoY2FyZFJvdXRlcy50cz8zNTc1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb3V0ZU1hcHBpbmcgZnJvbSBcIi4uL2lwYy9Sb3V0ZU1hcHBpbmdcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZU1hcHBpbmdbXSA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHJvdXRlOiAnL2hlbGxvJ1xuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/preload/routes/FlashcardRoutes.ts\n");

/***/ }),

/***/ "./src/preload/routes/FlashcardSetGroupRoutes.ts":
/*!*******************************************************!*\
  !*** ./src/preload/routes/FlashcardSetGroupRoutes.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst routes = [\n    {\n        method: 'GET',\n        route: '/hello2'\n    }\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJlbG9hZC9yb3V0ZXMvRmxhc2hjYXJkU2V0R3JvdXBSb3V0ZXMudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU0sTUFBTSxHQUFtQjtJQUMzQjtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsS0FBSyxFQUFFLFNBQVM7S0FDbkI7Q0FDSixDQUFDO0FBRUYsaUVBQWUsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24vLi9zcmMvcHJlbG9hZC9yb3V0ZXMvRmxhc2hjYXJkU2V0R3JvdXBSb3V0ZXMudHM/OWZlNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGVNYXBwaW5nIGZyb20gXCIuLi9pcGMvUm91dGVNYXBwaW5nXCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVNYXBwaW5nW10gPSBbXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICByb3V0ZTogJy9oZWxsbzInXG4gICAgfVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/preload/routes/FlashcardSetGroupRoutes.ts\n");

/***/ }),

/***/ "./src/preload/routes/FlashcardSetRoutes.ts":
/*!**************************************************!*\
  !*** ./src/preload/routes/FlashcardSetRoutes.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst routes = [\n    {\n        method: 'GET',\n        route: '/hello3'\n    }\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJlbG9hZC9yb3V0ZXMvRmxhc2hjYXJkU2V0Um91dGVzLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE1BQU0sR0FBbUI7SUFDM0I7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLEtBQUssRUFBRSxTQUFTO0tBQ25CO0NBQ0osQ0FBQztBQUVGLGlFQUFlLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLy4vc3JjL3ByZWxvYWQvcm91dGVzL0ZsYXNoY2FyZFNldFJvdXRlcy50cz82NGMzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb3V0ZU1hcHBpbmcgZnJvbSBcIi4uL2lwYy9Sb3V0ZU1hcHBpbmdcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZU1hcHBpbmdbXSA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHJvdXRlOiAnL2hlbGxvMydcbiAgICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/preload/routes/FlashcardSetRoutes.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/preload/preload.ts");
/******/ 	
/******/ })()
;
"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_school_index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/layout */ "./resources/js/Pages/shared/layout.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  layout: _shared_layout__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: ['schoolConfigArray', 'createSchool'],
  data: function data() {
    return {
      // orderNr:'',
      //level variables
      levelErrorName: null,
      levelErrorOrder: null,
      createLevel: true,
      storeLevelSpinner: false,
      levelId: null,
      updateLevelError: null,
      updateLevelSpinner: false,
      deleteLevelSpinner: false,
      levelConfigArray: [],
      levelForm: {
        levelName: '',
        orderNr: ''
      },
      //course variables
      couseId: null,
      //veriable to store the id for update purpose
      createCourse: true,
      courseError: null,
      updateCourseError: null,
      storeCourseSpinner: false,
      deleteCourseSpinner: false,
      updateCourseSpinner: false,
      courseConfigArray: [],
      courseForm: {
        courseName: '',
        schoolId: ''
      },
      //school varibles
      schoolAction: this.createSchool ? 'criada' : 'actualizada',
      schoolForm: {
        name: this.schoolConfigArray['name'],
        abbreviation: this.schoolConfigArray['abbreviation'],
        id: this.schoolConfigArray['id']
      }
    };
  },
  methods: {
    /**
     * school methods
     * */
    submit: function submit() {
      this.$inertia.post("/school", this.schoolForm);
    },
    updateSchool: function updateSchool() {
      this.$inertia.patch("/school/".concat(this.schoolForm.id), this.schoolForm);
    },

    /*
    Level methods
    */
    storeLevel: function storeLevel() {
      var that = this;
      this.storeLevelSpinner = true; //this.$inertia.post(`/level`,this.levelForm); 

      axios.post('/level', this.levelForm).then(function (response) {
        //console.log(response['data'].hasOwnProperty('orderNr')); 
        if (response['data'].hasOwnProperty('levelName') && response['data'].hasOwnProperty('orderNr')) {
          that.levelErrorName = response['data']['levelName'][0];
          that.levelErrorOrder = response['data']['orderNr'][0];
        } else if (response['data'].hasOwnProperty('levelName')) {
          that.levelErrorName = response['data']['levelName'][0];
          that.levelErrorOrder = null;
        } else if (response['data'].hasOwnProperty('orderNr')) {
          // that.levelErrorOrder=response['data']['orderNr'][0];
          that.levelErrorOrder = response['data']['orderNr'][0];
          that.levelErrorName = null;
        } else {
          that.levelConfigArray.unshift(response['data']);
          that.levelForm.levelName = '';
          that.levelForm.orderNr = '';
          that.storeLevelSpinner = false;
          that.levelErrorName = null;
          that.levelErrorOrder = null;
        }

        that.storeLevelSpinner = false;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    listLevel: function listLevel() {
      //this.$inertia.get(`/level`); 
      var that = this;
      axios.get("/level").then(function (response) {
        that.levelConfigArray = response['data']; //console.log(that.courseConfigArray);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    editLevel: function editLevel(id, name) {
      this.createLevel = false;
      this.levelForm.levelName = name;
      this.levelId = id;
      this.levelErrorName = null;
      this.levelErrorOrder = null;
      this.updateLevelError = null;
    },
    updateLevel: function updateLevel() {
      var _this = this;

      var that = this;
      this.updateLevelSpinner = true; //this.$inertia.patch(`/level/${this.levelId}`, this.levelForm);

      axios.patch("/level/".concat(this.levelId), this.levelForm).then(function (response) {
        if (response['data'].hasOwnProperty('levelName')) {
          _this.updateLevelError = response['data']['levelName'][0];
        } else {
          for (var i = 0; i < that.levelConfigArray.length; i++) {
            if (that.levelConfigArray[i]['id'] == response['data']['id']) {
              that.levelConfigArray[i]['name'] = response['data']['name'];
            }
          }
        }

        that.updateLevelSpinner = false;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    cancelLevelUpdate: function cancelLevelUpdate() {
      this.createLevel = true;
    },
    deleteLevel: function deleteLevel(item) {
      var _this2 = this;

      //this.$inertia.delete(`/level/${item}`);
      var that = this;
      this.deleteLevelSpinner = true;
      axios["delete"]("/level/".concat(item)).then(function (response) {
        _this2.levelErrorName = null;
        _this2.levelErrorOrder = null;
        _this2.updateLevelError = null;
        that.levelConfigArray = response['data'];
        that.deleteLevelSpinner = false; //console.log(that.courseConfigArray);
      })["catch"](function (error) {
        console.log(error);
      });
    },

    /**
     * course methods
    */
    listCourse: function listCourse() {
      //this.$inertia.get(`/course`); 
      var that = this;
      axios.get("/course").then(function (response) {
        that.courseConfigArray = response['data']; //console.log(that.courseConfigArray);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    storeCourse: function storeCourse() {
      console.log(this.levelForm.levelName);
      var that = this;
      that.storeCourseSpinner = true;
      this.courseForm.schoolId = this.schoolConfigArray['id']; //this.$inertia.post(`/course`,this.courseForm);

      axios.post('/course', this.courseForm).then(function (response) {
        if (response['data'].hasOwnProperty('schoolId') && response['data'].hasOwnProperty('courseName')) {
          that.courseError = response['data']['schoolId'][0];
        } else if (response['data'].hasOwnProperty('schoolId')) {
          that.courseError = response['data']['schoolId'][0];
        } else if (response['data'].hasOwnProperty('courseName')) {
          that.courseError = response['data']['courseName'][0];
        } else {
          that.courseConfigArray.unshift(response['data']);
          that.courseForm.courseName = '';
          that.storeCourseSpinner = false;
          that.courseError = null;
        }

        that.storeCourseSpinner = false;
      })["catch"](function (error) {//console.log(error);
      });
    },
    editCourse: function editCourse(id, name) {
      this.createCourse = false;
      this.courseForm.courseName = name;
      this.couseId = id;
      this.courseError = null;
      this.updateCourseError = null;
    },
    updateCourse: function updateCourse() {
      var _this3 = this;

      var that = this;
      this.updateCourseSpinner = true;
      axios.patch("/course/".concat(this.couseId), this.courseForm).then(function (response) {
        if (response['data'].hasOwnProperty('courseName')) {
          _this3.updateCourseError = response['data']['courseName'][0];
        } else {
          for (var i = 0; i < that.courseConfigArray.length; i++) {
            if (that.courseConfigArray[i]['id'] == response['data']['id']) {
              that.courseConfigArray[i]['name'] = response['data']['name'];
            }
          }
        }

        that.updateCourseSpinner = false;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    cancelCourseUpdate: function cancelCourseUpdate() {
      this.createCourse = true;
    },
    deleteCourse: function deleteCourse(item) {
      var _this4 = this;

      //this.$inertia.delete(`/course/${item}`);
      var that = this;
      this.deleteCourseSpinner = true;
      axios["delete"]("/course/".concat(item)).then(function (response) {
        _this4.courseError = null;
        _this4.updateCourseError = null;
        that.courseConfigArray = response['data'];
        that.deleteCourseSpinner = false; //console.log(that.courseConfigArray);
      })["catch"](function (error) {
        console.log(error);
      });
    }
  },
  computed: {
    inputErrorSchoolName: function inputErrorSchoolName() {
      return {
        inputError: this.$page.props.errors.name,
        'inputError:focus': this.$page.props.errors.name
      };
    },
    inputErrorAbbreviation: function inputErrorAbbreviation() {
      return {
        inputError: this.$page.props.errors.abbreviation,
        'inputError:focus': this.$page.props.errors.abbreviation
      };
    },
    inputErrorCourse: function inputErrorCourse() {
      return {
        inputError: this.courseError,
        'inputError:focus': this.courseError
      };
    },
    inputErrorUpdateCourse: function inputErrorUpdateCourse() {
      return {
        inputError: this.updateCourseError,
        'inputError:focus': this.updateCourseError
      };
    },
    inputErrorLevelName: function inputErrorLevelName() {
      return {
        inputError: this.levelErrorName,
        'inputError:focus': this.levelErrorName
      };
    },
    inputErrorLevelOrder: function inputErrorLevelOrder() {
      return {
        inputError: this.levelErrorOrder,
        'inputError:focus': this.levelErrorOrder
      };
    },
    inputErrorUpdateLevel: function inputErrorUpdateLevel() {
      return {
        inputError: this.updateLevelError,
        'inputError:focus': this.updateLevelError
      };
    }
  },
  mounted: function mounted() {
    this.listLevel();
    this.listCourse();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      editUserLink: "/profile/".concat(this.$page.props.sharedAuthUserId, "/edit")
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.breadcrumb[data-v-4b7fe100]{\r\n    background-color: #e2e2eb;\r\n    font-size:large;\r\n    padding-left:0;\r\n    padding-bottom:0;\n}\n.create-user-form[data-v-4b7fe100]{\r\n    background-color: #fdfdfe;\r\n    padding: 1.25rem;\r\n    margin-top: 0;\r\n    border-radius:2px ;\n}\n.inputError[data-v-4b7fe100], .inputError[data-v-4b7fe100]:focus {\r\n border-color: #e3342f;\r\n box-shadow: 0px 0px 3px 0px #e3342f;\n}\n.page-navigation[data-v-4b7fe100]{\r\n    margin-top: 2rem;\n}\n.center-msg[data-v-4b7fe100]{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.btn-group[data-v-4b7fe100], .btn-group-vertical[data-v-4b7fe100] {\r\n    position: relative;\r\n    display: flex;\r\n    vertical-align: middle;\n}\nform h4[data-v-4b7fe100]{\r\n    font-weight: 700;\n}\n.table-light[data-v-4b7fe100], .table-light > th[data-v-4b7fe100], .table-light > td[data-v-4b7fe100] {\r\n    background-color: #e2e2eb;\n}\n.table-delete[data-v-4b7fe100]{\r\n    color: #dc2020;\n}\n.table-edit[data-v-4b7fe100]{\r\n    color: #6b6316;\n}\n.table-button[data-v-4b7fe100]{\r\n    background-color: #e2e2eb;\n}\n.level[data-v-4b7fe100]{\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    margin-right: 0;\r\n    margin-left: 0;\r\n    justify-content: space-between;\n}\n.level-input[data-v-4b7fe100]{\r\n    flex-grow: 10;\n}\n.level-option[data-v-4b7fe100]{\r\n    flex-grow: 1;\r\n    margin-right: 5px;\r\n    margin-left: 5px;\r\n    width: 70px;\n}\n.level-btn[data-v-4b7fe100]{\r\n    flex-grow: 2;\n}\n@media screen and (min-width: 992px){\n.create-user-form[data-v-4b7fe100], .page-navigation[data-v-4b7fe100]{\r\n       margin-right: 10%;\r\n       margin-left: 10%;\n}\n}\n@media screen and (max-width: 767px){\r\n   /*.remove_label{\r\n      display: none;     \r\n   }**/\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.dashboard-brand{\n  font-family: 'Audiowide', cursive;\n  font-weight: 900;\n  font-size: 1.15rem;\n  color: #1cb0b9!important;\n}\n.dashboard-menu{\n   font-size: 1rem;\n}\n.dashboard-icon{\n   color: #343a40;\n}\n.dashboard-label{\n  margin-left:0.75rem;\n}\n.dashboard-arrow{\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n\n ", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4b7fe100_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4b7fe100_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4b7fe100_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./layout.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./resources/js/Pages/school/index.vue":
/*!*********************************************!*\
  !*** ./resources/js/Pages/school/index.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_4b7fe100_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=4b7fe100&scoped=true& */ "./resources/js/Pages/school/index.vue?vue&type=template&id=4b7fe100&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/Pages/school/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _index_vue_vue_type_style_index_0_id_4b7fe100_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css& */ "./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_4b7fe100_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_4b7fe100_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "4b7fe100",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/school/index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/shared/layout.vue":
/*!**********************************************!*\
  !*** ./resources/js/Pages/shared/layout.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _layout_vue_vue_type_template_id_18b87b5b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.vue?vue&type=template&id=18b87b5b& */ "./resources/js/Pages/shared/layout.vue?vue&type=template&id=18b87b5b&");
/* harmony import */ var _layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout.vue?vue&type=script&lang=js& */ "./resources/js/Pages/shared/layout.vue?vue&type=script&lang=js&");
/* harmony import */ var _layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.vue?vue&type=style&index=0&lang=css& */ "./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _layout_vue_vue_type_template_id_18b87b5b___WEBPACK_IMPORTED_MODULE_0__.render,
  _layout_vue_vue_type_template_id_18b87b5b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/shared/layout.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/school/index.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/Pages/school/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/shared/layout.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/shared/layout.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./layout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4b7fe100_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=style&index=0&id=4b7fe100&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./layout.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./resources/js/Pages/school/index.vue?vue&type=template&id=4b7fe100&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/Pages/school/index.vue?vue&type=template&id=4b7fe100&scoped=true& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_4b7fe100_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_4b7fe100_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_4b7fe100_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=4b7fe100&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=template&id=4b7fe100&scoped=true&");


/***/ }),

/***/ "./resources/js/Pages/shared/layout.vue?vue&type=template&id=18b87b5b&":
/*!*****************************************************************************!*\
  !*** ./resources/js/Pages/shared/layout.vue?vue&type=template&id=18b87b5b& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_template_id_18b87b5b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_template_id_18b87b5b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_template_id_18b87b5b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./layout.vue?vue&type=template&id=18b87b5b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=template&id=18b87b5b&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=template&id=4b7fe100&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/school/index.vue?vue&type=template&id=4b7fe100&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _vm.$page.props.flash.message
      ? _c(
          "div",
          {
            staticClass:
              "alert alert-success alert-dismissible fade show mt-4 mb-1",
            attrs: { role: "alert" },
          },
          [
            _c("span", { staticClass: "center-msg" }, [
              _vm._v("Escola  "),
              _c("strong", [_vm._v(_vm._s(_vm.$page.props.flash.message))]),
              _vm._v("  " + _vm._s(_vm.schoolAction) + " com sucesso"),
            ]),
            _vm._v(" "),
            _vm._m(0),
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "nav",
      {
        staticStyle: { "breadcrumb-divider": "''" },
        attrs: { "aria-label": "breadcrumb" },
      },
      [
        _c("ol", { staticClass: "breadcrumb page-navigation" }, [
          _c(
            "li",
            { staticClass: "breadcrumb-item" },
            [_c("inertia-link", { attrs: { href: "/" } }, [_vm._v(" Painel")])],
            1
          ),
          _vm._v(" "),
          _c(
            "li",
            {
              staticClass: "breadcrumb-item active",
              attrs: { "aria-current": "page" },
            },
            [_vm._v("Escola ")]
          ),
        ]),
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "page-navigation font-weight-bold h3 mb-1" }),
    _vm._v(" "),
    _c(
      "form",
      {
        staticClass: "create-user-form",
        on: {
          submit: function ($event) {
            $event.preventDefault()
            return _vm.submit($event)
          },
        },
      },
      [
        _c("h4", [_vm._v("Escola")]),
        _vm._v(" "),
        _c("p"),
        _vm._v(" "),
        _c("div", { staticClass: "form-row " }, [
          _c("div", { staticClass: "form-group col-md-8" }, [
            _c("label", { attrs: { for: "apelido" } }, [_vm._v("Nome")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.schoolForm.name,
                  expression: "schoolForm.name",
                },
              ],
              staticClass: "form-control",
              class: _vm.inputErrorSchoolName,
              attrs: { type: "text", id: "school_name" },
              domProps: { value: _vm.schoolForm.name },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.schoolForm, "name", $event.target.value)
                },
              },
            }),
            _vm._v(" "),
            _vm.$page.props.errors.name
              ? _c("div", { staticClass: "text-danger" }, [
                  _c(
                    "small",
                    [
                      _c("font-awesome-icon", {
                        attrs: { icon: ["fas", "exclamation-circle"] },
                      }),
                      _vm._v(" " + _vm._s(_vm.$page.props.errors.name)),
                    ],
                    1
                  ),
                ])
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group col-md-4" }, [
            _c("label", { attrs: { for: "name" } }, [_vm._v("Abreviatura")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.schoolForm.abbreviation,
                  expression: "schoolForm.abbreviation",
                },
              ],
              staticClass: "form-control",
              class: _vm.inputErrorAbbreviation,
              attrs: { type: "text", id: "school_abbreviation" },
              domProps: { value: _vm.schoolForm.abbreviation },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.schoolForm, "abbreviation", $event.target.value)
                },
              },
            }),
            _vm._v(" "),
            _vm.$page.props.errors.abbreviation
              ? _c("div", { staticClass: "text-danger" }, [
                  _c(
                    "small",
                    [
                      _c("font-awesome-icon", {
                        attrs: { icon: ["fas", "exclamation-circle"] },
                      }),
                      _vm._v(" " + _vm._s(_vm.$page.props.errors.abbreviation)),
                    ],
                    1
                  ),
                ])
              : _vm._e(),
          ]),
        ]),
        _vm._v(" "),
        _vm.createSchool
          ? _c(
              "button",
              { staticClass: "btn btn-primary", attrs: { type: "submit" } },
              [_vm._v("Criar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.createSchool === false
          ? _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { type: "button" },
                on: { click: _vm.updateSchool },
              },
              [_vm._v("Actualizar")]
            )
          : _vm._e(),
      ]
    ),
    _vm._v(" "),
    _vm._m(1),
    _vm._v(" "),
    _c("form", { staticClass: "create-user-form" }, [
      _c("h4", [_vm._v("Níveis")]),
      _vm._v(" "),
      _c("p"),
      _vm._v(" "),
      _vm.createLevel
        ? _c("div", { staticClass: "form-row level" }, [
            _c("div", { staticClass: "form-group level-input" }, [
              _c("label", { attrs: { for: "apelido" } }, [_vm._v("Nome")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.levelForm.levelName,
                    expression: "levelForm.levelName",
                  },
                ],
                staticClass: "form-control",
                class: _vm.inputErrorLevelName,
                attrs: { type: "text", id: "superadmin" },
                domProps: { value: _vm.levelForm.levelName },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.levelForm, "levelName", $event.target.value)
                  },
                },
              }),
              _vm._v(" "),
              _vm.levelErrorName
                ? _c("div", { staticClass: "text-danger" }, [
                    _c(
                      "small",
                      [
                        _c("font-awesome-icon", {
                          attrs: { icon: ["fas", "exclamation-circle"] },
                        }),
                        _vm._v(" " + _vm._s(_vm.levelErrorName)),
                      ],
                      1
                    ),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group level-option" }, [
              _c("label", { attrs: { for: "order" } }, [_vm._v("Ordem")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.levelForm.orderNr,
                    expression: "levelForm.orderNr",
                  },
                ],
                staticClass: "form-control",
                class: _vm.inputErrorLevelOrder,
                attrs: {
                  type: "text",
                  list: "level-order",
                  id: "super",
                  autocomplete: "off",
                },
                domProps: { value: _vm.levelForm.orderNr },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.levelForm, "orderNr", $event.target.value)
                  },
                },
              }),
              _vm._v(" "),
              _vm.levelErrorOrder
                ? _c("div", { staticClass: "text-danger" }, [
                    _c(
                      "small",
                      [
                        _c("font-awesome-icon", {
                          attrs: { icon: ["fas", "exclamation-circle"] },
                        }),
                        _vm._v(" " + _vm._s(_vm.levelErrorOrder)),
                      ],
                      1
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._m(2),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group level-btn" }, [
              _c(
                "label",
                { staticClass: "remove_label", attrs: { for: "name" } },
                [_vm._v(" ")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary form-control",
                  attrs: { type: "button" },
                  on: { click: _vm.storeLevel },
                },
                [
                  _vm.storeLevelSpinner
                    ? _c("span", {
                        staticClass: "spinner-grow spinner-grow-sm",
                        attrs: { role: "status", "aria-hidden": "true" },
                      })
                    : _vm._e(),
                  _vm._v(
                    "                            \n                        Introduzir\n                    "
                  ),
                ]
              ),
            ]),
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.createLevel
        ? _c("div", { staticClass: "form-row" }, [
            _c("div", { staticClass: "form-group col-md-8" }, [
              _c("label", { attrs: { for: "apelido" } }, [_vm._v("Editar")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.levelForm.levelName,
                    expression: "levelForm.levelName",
                  },
                ],
                staticClass: "form-control",
                class: _vm.inputErrorUpdateLevel,
                attrs: { type: "text", id: "superadmin" },
                domProps: { value: _vm.levelForm.levelName },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.levelForm, "levelName", $event.target.value)
                  },
                },
              }),
              _vm._v(" "),
              _vm.updateLevelError
                ? _c("div", { staticClass: "text-danger" }, [
                    _c(
                      "small",
                      [
                        _c("font-awesome-icon", {
                          attrs: { icon: ["fas", "exclamation-circle"] },
                        }),
                        _vm._v(" " + _vm._s(_vm.updateLevelError)),
                      ],
                      1
                    ),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-4" }, [
              _c(
                "label",
                { staticClass: "remove_label", attrs: { for: "name" } },
                [_vm._v(" ")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "btn-group" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-success form-control",
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        return _vm.updateLevel()
                      },
                    },
                  },
                  [
                    _vm.updateLevelSpinner
                      ? _c("span", {
                          staticClass: "spinner-grow spinner-grow-sm",
                          attrs: { role: "status", "aria-hidden": "true" },
                        })
                      : _vm._e(),
                    _vm._v(
                      "                            \n                        Actualizar\n                    "
                    ),
                  ]
                ),
                _vm._v(" "),
                _vm._m(3),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown-menu" }, [
                  _c(
                    "a",
                    {
                      staticClass: "dropdown-item",
                      on: {
                        click: function ($event) {
                          return _vm.cancelLevelUpdate()
                        },
                      },
                    },
                    [_vm._v("Cancelar")]
                  ),
                ]),
              ]),
            ]),
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "table-responsive-sm" }, [
        _c(
          "table",
          { staticClass: "table table-hover table-light user-table" },
          [
            _vm._m(4),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.levelConfigArray, function (item) {
                return _c("tr", { key: item.id }, [
                  _c("td", [_vm._v(" " + _vm._s(item.name))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(" " + _vm._s(item.order))]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass: "table-button",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.editLevel(item.id, item.name)
                          },
                        },
                      },
                      [
                        _c("font-awesome-icon", {
                          staticClass: "table-edit",
                          attrs: { icon: ["fas", "edit"] },
                        }),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass: "table-button",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.deleteLevel(item.id)
                          },
                        },
                      },
                      [
                        _vm.deleteLevelSpinner
                          ? _c("span", {
                              staticClass: "spinner-grow spinner-grow-sm",
                              attrs: { role: "status", "aria-hidden": "true" },
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _c("font-awesome-icon", {
                          staticClass: "table-delete",
                          attrs: { icon: ["fas", "trash"] },
                        }),
                      ],
                      1
                    ),
                  ]),
                ])
              }),
              0
            ),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _vm._m(5),
    _vm._v(" "),
    _c("form", { staticClass: "create-user-form" }, [
      _c("h4", [_vm._v("Cursos")]),
      _vm._v(" "),
      _c("p"),
      _vm._v(" "),
      _vm.createCourse
        ? _c("div", { staticClass: "form-row" }, [
            _c("div", { staticClass: "form-group col-md-9" }, [
              _c("label", { attrs: { for: "apelido" } }, [_vm._v("Nome")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.courseForm.courseName,
                    expression: "courseForm.courseName",
                  },
                ],
                staticClass: "form-control",
                class: _vm.inputErrorCourse,
                attrs: { type: "text", id: "superadmin" },
                domProps: { value: _vm.courseForm.courseName },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.courseForm, "courseName", $event.target.value)
                  },
                },
              }),
              _vm._v(" "),
              _vm.courseError
                ? _c("div", { staticClass: "text-danger" }, [
                    _c(
                      "small",
                      [
                        _c("font-awesome-icon", {
                          attrs: { icon: ["fas", "exclamation-circle"] },
                        }),
                        _vm._v(" " + _vm._s(_vm.courseError)),
                      ],
                      1
                    ),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-3" }, [
              _c(
                "label",
                { staticClass: "remove_label", attrs: { for: "name" } },
                [_vm._v(" ")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary form-control",
                  attrs: { type: "button" },
                  on: { click: _vm.storeCourse },
                },
                [
                  _vm.storeCourseSpinner
                    ? _c("span", {
                        staticClass: "spinner-grow spinner-grow-sm",
                        attrs: { role: "status", "aria-hidden": "true" },
                      })
                    : _vm._e(),
                  _vm._v(
                    "                            \n                        Introduzir\n                    "
                  ),
                ]
              ),
            ]),
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.createCourse
        ? _c("div", { staticClass: "form-row" }, [
            _c("div", { staticClass: "form-group col-md-8" }, [
              _c("label", { attrs: { for: "apelido" } }, [_vm._v("Editar")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.courseForm.courseName,
                    expression: "courseForm.courseName",
                  },
                ],
                staticClass: "form-control",
                class: _vm.inputErrorUpdateCourse,
                attrs: { type: "text", id: "superadmin" },
                domProps: { value: _vm.courseForm.courseName },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.courseForm, "courseName", $event.target.value)
                  },
                },
              }),
              _vm._v(" "),
              _vm.updateCourseError
                ? _c("div", { staticClass: "text-danger" }, [
                    _c(
                      "small",
                      [
                        _c("font-awesome-icon", {
                          attrs: { icon: ["fas", "exclamation-circle"] },
                        }),
                        _vm._v(" " + _vm._s(_vm.updateCourseError)),
                      ],
                      1
                    ),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-4" }, [
              _c(
                "label",
                { staticClass: "remove_label", attrs: { for: "name" } },
                [_vm._v(" ")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "btn-group" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-success form-control",
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        return _vm.updateCourse()
                      },
                    },
                  },
                  [
                    _vm.updateCourseSpinner
                      ? _c("span", {
                          staticClass: "spinner-grow spinner-grow-sm",
                          attrs: { role: "status", "aria-hidden": "true" },
                        })
                      : _vm._e(),
                    _vm._v(
                      "                            \n                        Actualizar\n                    "
                    ),
                  ]
                ),
                _vm._v(" "),
                _vm._m(6),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown-menu" }, [
                  _c(
                    "a",
                    {
                      staticClass: "dropdown-item",
                      on: {
                        click: function ($event) {
                          return _vm.cancelCourseUpdate()
                        },
                      },
                    },
                    [_vm._v("Cancelar")]
                  ),
                ]),
              ]),
            ]),
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "table-responsive-sm" }, [
        _c(
          "table",
          { staticClass: "table table-hover table-light user-table" },
          [
            _vm._m(7),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.courseConfigArray, function (item) {
                return _c("tr", { key: item.id }, [
                  _c(
                    "td",
                    [
                      _c(
                        "inertia-link",
                        {
                          attrs: {
                            href: "/subject/" + item.name + "/" + item.id,
                          },
                        },
                        [_vm._v(_vm._s(item.name))]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass: "table-button",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.editCourse(item.id, item.name)
                          },
                        },
                      },
                      [
                        _c("font-awesome-icon", {
                          staticClass: "table-edit",
                          attrs: { icon: ["fas", "edit"] },
                        }),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass: "table-button",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.deleteCourse(item.id)
                          },
                        },
                      },
                      [
                        _vm.deleteCourseSpinner
                          ? _c("span", {
                              staticClass: "spinner-grow spinner-grow-sm",
                              attrs: { role: "status", "aria-hidden": "true" },
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _c("font-awesome-icon", {
                          staticClass: "table-delete",
                          attrs: { icon: ["fas", "trash"] },
                        }),
                      ],
                      1
                    ),
                  ]),
                ])
              }),
              0
            ),
          ]
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close",
        },
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("br"), _vm._v(" "), _c("br")])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("datalist", { attrs: { id: "level-order" } }, [
      _c("option", { attrs: { value: "1" } }),
      _vm._v(" "),
      _c("option", { attrs: { value: "2" } }),
      _vm._v(" "),
      _c("option", { attrs: { value: "3" } }),
      _vm._v(" "),
      _c("option", { attrs: { value: "4" } }),
      _vm._v(" "),
      _c("option", { attrs: { value: "5" } }),
      _vm._v(" "),
      _c("option", { attrs: { value: "6" } }),
      _vm._v(" "),
      _c("option", { attrs: { value: "7" } }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-success dropdown-toggle dropdown-toggle-split",
        attrs: {
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false",
        },
      },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Toggle Dropdown")])]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Nome")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Ordem")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Editar")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Excluir")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("br"), _vm._v(" "), _c("br")])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-success dropdown-toggle dropdown-toggle-split",
        attrs: {
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false",
        },
      },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Toggle Dropdown")])]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Nome")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Editar")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Excluir")]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=template&id=18b87b5b&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=template&id=18b87b5b& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "header" } },
    [
      _c(
        "nav",
        { staticClass: "navbar navbar-expand-md navbar-dark bg-dark" },
        [
          _c(
            "a",
            {
              staticClass: "navbar-brand dashboard-brand",
              attrs: { href: "#" },
            },
            [_vm._v("Nota20")]
          ),
          _vm._v(" "),
          _vm._m(0),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse navbar-collapse",
              attrs: { id: "navbarText" },
            },
            [
              _c("ul", { staticClass: "navbar-nav mr-auto" }, [
                _c(
                  "li",
                  { staticClass: "nav-item active" },
                  [
                    _c(
                      "inertia-link",
                      {
                        staticClass: "nav-link dashboard-menu",
                        attrs: { href: "/" },
                      },
                      [
                        _vm._v("Painel"),
                        _c("span", { staticClass: "sr-only" }, [
                          _vm._v("(current)"),
                        ]),
                      ]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      {
                        staticClass: "nav-link dashboard-menu",
                        attrs: { href: "/user" },
                      },
                      [_vm._v("Utilizador")]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm._m(1),
                _vm._v(" "),
                _vm._m(2),
                _vm._v(" "),
                _vm._m(3),
              ]),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "navbar-text" },
                [
                  _c("inertia-link", { attrs: { href: _vm.editUserLink } }, [
                    _vm._v("Olá " + _vm._s(_vm.$page.props.sharedAuthuserName)),
                  ]),
                  _vm._v(" | "),
                  _c(
                    "inertia-link",
                    { attrs: { href: "/out", method: "post" } },
                    [_vm._v("Sair")]
                  ),
                ],
                1
              ),
            ]
          ),
        ]
      ),
      _vm._v(" "),
      _vm._t("default"),
    ],
    2
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "navbar-toggler",
        attrs: {
          type: "button",
          "data-toggle": "collapse",
          "data-target": "#navbarText",
          "aria-controls": "navbarText",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation",
        },
      },
      [_c("span", { staticClass: "navbar-toggler-icon" })]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item" }, [
      _c(
        "a",
        { staticClass: "nav-link dashboard-menu", attrs: { href: "#" } },
        [_vm._v("Turma")]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item" }, [
      _c(
        "a",
        { staticClass: "nav-link dashboard-menu", attrs: { href: "#" } },
        [_vm._v("Escola")]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item" }, [
      _c(
        "a",
        { staticClass: "nav-link dashboard-menu", attrs: { href: "#" } },
        [_vm._v("Estudante ")]
      ),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);
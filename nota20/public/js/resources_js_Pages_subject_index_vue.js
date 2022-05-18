"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_subject_index_vue"],{

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  props: ['searchRoute', 'label', 'searchItemError'],
  //inicio
  data: function data() {
    return {
      searchItem: '',
      searchItemSpinner: false,
      enableSearchPane: true,
      searchResultArray: []
    };
  },
  methods: {
    getSearchItem: function getSearchItem(itemName, itemId) {
      this.searchItemSpinner = true;
      this.searchItem = itemName; // emits an event to the parent component

      this.$emit('send-search-item', itemName, itemId); // end of the event

      this.enableSearchPane = false;
      this.searchItemSpinner = false;
    },
    //enables and disables the searchPane     
    enableDisableSearchPane: function enableDisableSearchPane() {
      var _this = this;

      document.querySelector('body').addEventListener('click', function (event) {
        if (event.target.getAttribute('class') === 'clickedItem') {
          _this.enableSearchPane = false;
        } else if (event.target.getAttribute('class') != 'clickedItem' && event.target.getAttribute('id') === 'inputSearch') {
          _this.enableSearchPane = true;
        } else {
          _this.enableSearchPane = false;
        }
      });
    }
  },
  watch: {
    /**
    * Searches courses in the database and returns to the user
    */
    searchItem: function searchItem() {
      var that = this;
      this.searchItemSpinner = true;
      axios.get("".concat(that.searchRoute, "=").concat(that.searchItem)).then(function (response) {
        if (response['data'].hasOwnProperty('searchItemData')) {
          that.searchResultArray = [{
            id: -1,
            name: 'Pesquisa sem resultados'
          }];
        } else {
          if (response['data'].length === 0) {
            that.searchResultArray = [{
              id: -1,
              name: 'Pesquisa sem resultados'
            }];
          } else {
            that.searchResultArray = _toConsumableArray(response['data']);
          }
        }

        that.searchItemSpinner = false;
      })["catch"](function (error) {});
    }
  },
  //fim
  computed: {
    inputSearchItemError: function inputSearchItemError() {
      return {
        inputError: this.searchItemError,
        'inputError:focus': this.searchItemError
      };
    },
    searchPaneUlError: function searchPaneUlError() {
      return {
        'search-pane-ul': this.searchResultArray.length >= 1
      };
    }
  },
  mounted: function mounted() {
    this.enableDisableSearchPane();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/layout */ "./resources/js/Pages/shared/layout.vue");
/* harmony import */ var _shared_searchpane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/searchpane */ "./resources/js/Pages/shared/searchpane.vue");
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
  components: {
    Searchpane: _shared_searchpane__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  layout: _shared_layout__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: ['courseName', 'courseId', 'subjectConfigArray'],
  data: function data() {
    return {
      //varibles to send to searchpane component
      searchRoute: '/subject/search?searchItemData',
      label: 'Nível',
      //subjcet variables
      subjectUpdateForm: {
        subjectName: '',
        subjectId: ''
      },
      subjectName: null,
      enableSubjetUpdateForm: false,
      levelSearchPane: true,
      searchItemId: '',
      searchCourseArray: [],
      subjectError: null,
      subjectUpdateError: null,
      searchItemError: null,
      userFeedBack: [],
      //user feedback array after creating subjects
      subjectUpdateSpinner: false,
      subjectFeedbackSpinner: false,
      deleteSubjectSpinner: false,
      //level variables
      searchLevelSpinner: false,
      // spiner for the level search input field
      searchItemName: null
    };
  },
  methods: {
    //takes the text from the input and assigns to the variable that sends it the to the 
    //search engine
    getSentSearchItem: function getSentSearchItem(itemName, itemId) {
      this.searchItemName = itemName;
      this.searchItemId = itemId;
    },
    // Submits the form
    submit: function submit() {
      /* this.$inertia.post('/subject',
        {
              subjectName:this.subjectName,
              searchLevel:this.searchLevel,
              levelId:this.levelId,
              courseId:this.courseId
          } 
        );***/
      var that = this;
      that.subjectFeedbackSpinner = true;
      axios.post('/subject', {
        subjectName: that.subjectName,
        levelName: that.searchItemName,
        levelId: that.searchItemId,
        courseId: that.courseId
      }).then(function (response) {
        //CHECK FOR ERROR MESSAGES
        console.log(response);

        if (response['data'].hasOwnProperty('subjectName') && response['data'].hasOwnProperty('levelName')) {
          that.subjectError = response['data']['subjectName']['0'];
          that.searchItemError = response['data']['levelName']['0'];
          that.subjectFeedbackSpinner = false;
        } else if (response['data'].hasOwnProperty('subjectName')) {
          that.subjectError = response['data']['subjectName']['0'];
          that.searchItemError = null;
          that.subjectFeedbackSpinner = false;
        } else if (response['data'].hasOwnProperty('levelName')) {
          that.searchItemError = response['data']['levelName']['0'];
          that.subjectError = null;
          that.subjectFeedbackSpinner = false;
        } else {
          that.subjectError = null;
          that.searchItemError = null;
        } //GET THE CREATED COURSE  AND LEVEL FOR USER FEEDBACK


        if (response['data'].hasOwnProperty('subject') && response['data'].hasOwnProperty('level')) {
          that.userFeedBack.push({
            id: response['data']['id'],
            subject: response['data']['subject'],
            level: response['data']['level']
          });
          that.subjectFeedbackSpinner = false;
        }
      })["catch"](function (error) {}).then(function (error) {
        that.searchItemName = null;
      });
    },
    //edit the selected subject
    editSubject: function editSubject(id, subject) {
      this.enableSubjetUpdateForm = true;
      document.getElementById('viewEditForm').scrollIntoView();
      this.subjectUpdateForm.subjectId = id;
      this.subjectUpdateForm.subjectName = subject;
    },
    //disable the subjcet update form
    cancelSubjectUpdate: function cancelSubjectUpdate() {
      this.enableSubjetUpdateForm = false;
    },
    //Update the subject name
    updateSubject: function updateSubject() {
      var that = this;
      this.subjectUpdateSpinner = true;
      axios.patch("/subject/".concat(that.subjectUpdateForm.subjectId), that.subjectUpdateForm).then(function (response) {
        if (response['data'].hasOwnProperty('subjectName')) {
          that.subjectUpdateError = response['data']['subjectName'][0];
        } else {
          that.subjectConfigArray.forEach(function (item, index, array) {
            if (item['id'] == response['data']['id']) {
              item['subject'] = response['data']['name'];
            }
          });
        }

        that.subjectUpdateSpinner = false;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    // delete the selected subject
    deleteSubject: function deleteSubject(id, courseId) {
      var _this = this;

      var that = this;
      this.deleteSubjectSpinner = true; //this.$inertia.delete(`/subject/${id}/${courseId}`);//for testing

      axios["delete"]("/subject/".concat(id, "/").concat(courseId)).then(function (response) {
        that.subjectConfigArray = response['data'];
        _this.deleteSubjectSpinner = false;
      })["catch"](function (error) {
        console.log(error);
      });
    }
  },
  computed: {
    inputSubjectNameError: function inputSubjectNameError() {
      return {
        inputError: this.subjectError,
        'inputError:focus': this.subjectError
      };
    },
    updateSubjectnameError: function updateSubjectnameError() {
      return {
        inputError: this.subjectUpdateError,
        'inputError:focus': this.subjectUpdateError
      };
    }
  }
});

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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.inputError, .inputError:focus {\r\n border-color: #e3342f;\r\n box-shadow: 0px 0px 3px 0px #e3342f;\n}\n.search-input-wrapper{\r\n    position:relative;\r\n    display: flex;\r\n    flex-direction: column;\n}\n.search-input-wrapper span{\r\n    position: absolute;\r\n    z-index: 100;\r\n    right: 15px;\r\n    top: 42px;\n}\n.search-pane{\r\n    position: relative;\r\n    display: flex;\n}\n.search-pane li{\r\n    list-style-type: none;\r\n    margin-left: -40px;\r\n    height: 2rem;\r\n    cursor: pointer;\r\n    padding-top: 0.34rem;\n}\n.search-pane li:hover{\r\n        background: grey;\n}\n.search-pane label{\r\n    margin-left: 1.5rem;\r\n    cursor: pointer;\n}\n.search-pane-ul{\r\n    position: absolute;\r\n    width: 100%;\r\n    z-index: 5;\r\n    border-radius: 5px;\r\n    border-left: 1px solid #cac4bb;\r\n    border-right: 1px solid #cac4bb;\r\n    border-bottom: 1px solid #cac4bb;\r\n    box-shadow: -5px 5px 10px 1px #cac4bb  , 5px 5px 10px 1px #cac4bb;\r\n    background: #f8f9fa;\n}\n.search-pane a{\r\n    display: block;\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.breadcrumb[data-v-f2057814]{\r\n    background-color: #e2e2eb;\r\n    font-size:large;\r\n    padding-left:0;\r\n    padding-bottom:0;\n}\n.create-user-form[data-v-f2057814]{\r\n    background-color: #fdfdfe;\r\n    padding: 1.25rem;\r\n    margin-top: 0;\r\n    border-radius:2px ;\n}\n.course-name[data-v-f2057814]{\r\n    margin-bottom: 1rem;\r\n    margin-top: 1.5rem;\n}\n.inputError[data-v-f2057814], .inputError[data-v-f2057814]:focus {\r\n border-color: #e3342f;\r\n box-shadow: 0px 0px 3px 0px #e3342f;\n}\n.page-navigation[data-v-f2057814]{\r\n    margin-top: 2rem;\n}\n.center-msg[data-v-f2057814]{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.btn-group[data-v-f2057814], .btn-group-vertical[data-v-f2057814] {\r\n    position: relative;\r\n    display: flex;\r\n    vertical-align: middle;\n}\nform h4[data-v-f2057814]{\r\n    font-weight: 700;\n}\n.table-light[data-v-f2057814], .table-light > th[data-v-f2057814], .table-light > td[data-v-f2057814] {\r\n    background-color: #e2e2eb;\n}\n.table-delete[data-v-f2057814]{\r\n    color: #dc2020;\n}\n.table-edit[data-v-f2057814]{\r\n    color: #6b6316;\n}\n.table-button[data-v-f2057814]{\r\n    background-color: #e2e2eb;\n}\n@media screen and (min-width: 992px){\n.create-user-form[data-v-f2057814], .page-navigation[data-v-f2057814], .course-name[data-v-f2057814] {\r\n       margin-right: 10%;\r\n       margin-left: 10%;\n}\n}\n@media screen and (max-width: 767px){\n.remove_label[data-v-f2057814]{\r\n      display: none;\n}\n}\r\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./searchpane.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f2057814_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f2057814_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f2057814_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./resources/js/Pages/shared/searchpane.vue":
/*!**************************************************!*\
  !*** ./resources/js/Pages/shared/searchpane.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _searchpane_vue_vue_type_template_id_0dce447e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./searchpane.vue?vue&type=template&id=0dce447e& */ "./resources/js/Pages/shared/searchpane.vue?vue&type=template&id=0dce447e&");
/* harmony import */ var _searchpane_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./searchpane.vue?vue&type=script&lang=js& */ "./resources/js/Pages/shared/searchpane.vue?vue&type=script&lang=js&");
/* harmony import */ var _searchpane_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./searchpane.vue?vue&type=style&index=0&lang=css& */ "./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _searchpane_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _searchpane_vue_vue_type_template_id_0dce447e___WEBPACK_IMPORTED_MODULE_0__.render,
  _searchpane_vue_vue_type_template_id_0dce447e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/shared/searchpane.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/subject/index.vue":
/*!**********************************************!*\
  !*** ./resources/js/Pages/subject/index.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_f2057814_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=f2057814&scoped=true& */ "./resources/js/Pages/subject/index.vue?vue&type=template&id=f2057814&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/Pages/subject/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _index_vue_vue_type_style_index_0_id_f2057814_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css& */ "./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_f2057814_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_f2057814_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "f2057814",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/subject/index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

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

/***/ "./resources/js/Pages/shared/searchpane.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/shared/searchpane.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./searchpane.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/subject/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/subject/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./layout.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/layout.vue?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************!*\
  !*** ./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./searchpane.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f2057814_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=style&index=0&id=f2057814&scoped=true&lang=css&");


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

/***/ "./resources/js/Pages/shared/searchpane.vue?vue&type=template&id=0dce447e&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/shared/searchpane.vue?vue&type=template&id=0dce447e& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_template_id_0dce447e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_template_id_0dce447e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_searchpane_vue_vue_type_template_id_0dce447e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./searchpane.vue?vue&type=template&id=0dce447e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=template&id=0dce447e&");


/***/ }),

/***/ "./resources/js/Pages/subject/index.vue?vue&type=template&id=f2057814&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Pages/subject/index.vue?vue&type=template&id=f2057814&scoped=true& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_f2057814_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_f2057814_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_f2057814_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=f2057814&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=template&id=f2057814&scoped=true&");


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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=template&id=0dce447e&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/shared/searchpane.vue?vue&type=template&id=0dce447e& ***!
  \************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "search-input-wrapper" }, [
    _c("label", { attrs: { for: "inputSearch" } }, [_vm._v(_vm._s(_vm.label))]),
    _vm._v(" "),
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.searchItem,
          expression: "searchItem",
        },
      ],
      staticClass: "form-control",
      class: _vm.inputSearchItemError,
      attrs: { type: "text", id: "inputSearch", autocomplete: "off" },
      domProps: { value: _vm.searchItem },
      on: {
        input: function ($event) {
          if ($event.target.composing) {
            return
          }
          _vm.searchItem = $event.target.value
        },
      },
    }),
    _vm._v(" "),
    _vm.searchItemError
      ? _c("div", { staticClass: "text-danger" }, [
          _c(
            "small",
            [
              _c("font-awesome-icon", {
                attrs: { icon: ["fas", "exclamation-circle"] },
              }),
              _vm._v(" " + _vm._s(_vm.searchItemError)),
            ],
            1
          ),
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.searchItemSpinner
      ? _c("span", {
          staticClass: "spinner-grow spinner-grow-sm",
          attrs: { role: "status", "aria-hidden": "true" },
        })
      : _vm._e(),
    _vm._v(" "),
    _vm.enableSearchPane
      ? _c("div", { staticClass: "search-pane" }, [
          _c(
            "ul",
            { class: _vm.searchPaneUlError },
            _vm._l(_vm.searchResultArray, function (item) {
              return _c("div", { key: item.id }, [
                _c(
                  "li",
                  {
                    staticClass: "clickedItem",
                    on: {
                      click: function ($event) {
                        return _vm.getSearchItem(item.name, item.id)
                      },
                    },
                  },
                  [
                    _c(
                      "label",
                      [
                        _c("font-awesome-icon", {
                          staticClass: "search-img",
                          attrs: { icon: ["fas", "search"] },
                        }),
                        _vm._v("  " + _vm._s(item.name)),
                      ],
                      1
                    ),
                  ]
                ),
              ])
            }),
            0
          ),
        ])
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=template&id=f2057814&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/subject/index.vue?vue&type=template&id=f2057814&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
              staticClass: "breadcrumb-item",
              attrs: { "aria-current": "page" },
            },
            [
              _c("inertia-link", { attrs: { href: "/school/create" } }, [
                _vm._v("Escola"),
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "li",
            {
              staticClass: "breadcrumb-item active",
              attrs: { "aria-current": "page" },
            },
            [_vm._v("Curso: " + _vm._s(_vm.courseName))]
          ),
        ]),
      ]
    ),
    _vm._v(" "),
    _c("form", { staticClass: "create-user-form" }, [
      _c("h4", [_vm._v("Disciplina")]),
      _vm._v(" "),
      _c("p"),
      _vm._v(" "),
      _c("div", { staticClass: "form-row" }, [
        _c("div", { staticClass: "form-group col-md-6" }, [
          _c("label", { attrs: { for: "apelido" } }, [_vm._v("Nome")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.subjectName,
                expression: "subjectName",
              },
            ],
            staticClass: "form-control",
            class: _vm.inputSubjectNameError,
            attrs: { type: "text", id: "superadmin" },
            domProps: { value: _vm.subjectName },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.subjectName = $event.target.value
              },
            },
          }),
          _vm._v(" "),
          _vm.subjectError
            ? _c("div", { staticClass: "text-danger" }, [
                _c(
                  "small",
                  [
                    _c("font-awesome-icon", {
                      attrs: { icon: ["fas", "exclamation-circle"] },
                    }),
                    _vm._v(" " + _vm._s(_vm.subjectError)),
                  ],
                  1
                ),
              ])
            : _vm._e(),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "form-group col-md-6" },
          [
            _c("Searchpane", {
              attrs: {
                searchRoute: _vm.searchRoute,
                label: _vm.label,
                searchItemError: _vm.searchItemError,
              },
              on: { "send-search-item": _vm.getSentSearchItem },
            }),
          ],
          1
        ),
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-primary",
          attrs: { type: "button" },
          on: { click: _vm.submit },
        },
        [
          _vm.subjectFeedbackSpinner
            ? _c("span", {
                staticClass: "spinner-grow spinner-grow-sm",
                attrs: { role: "status", "aria-hidden": "true" },
              })
            : _vm._e(),
          _vm._v("\n            Introduzir\n         "),
        ]
      ),
      _vm._v(" "),
      _c("p"),
      _vm._v(" "),
      _vm.userFeedBack.length > 0
        ? _c("div", { staticClass: "table-responsive-sm" }, [
            _c(
              "table",
              { staticClass: "table table-hover table-light user-table" },
              [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.userFeedBack, function (item) {
                    return _c("tr", { key: item.id }, [
                      _c("td", [_vm._v(_vm._s(item.subject))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(item.level))]),
                    ])
                  }),
                  0
                ),
              ]
            ),
          ])
        : _vm._e(),
    ]),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _c("div", { attrs: { id: "viewEditForm" } }),
    _vm._v(" "),
    _c("form", { staticClass: "create-user-form" }, [
      _c("h4", { attrs: { id: "" } }, [
        _vm._v("Curso de: " + _vm._s(_vm.courseName) + " "),
      ]),
      _vm._v(" "),
      _c("p"),
      _vm._v(" "),
      _vm.enableSubjetUpdateForm
        ? _c("div", { staticClass: "form-row" }, [
            _c("div", { staticClass: "form-group col-md-8" }, [
              _c("label", { attrs: { for: "apelido" } }, [_vm._v("Nome")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.subjectUpdateForm.subjectName,
                    expression: "subjectUpdateForm.subjectName",
                  },
                ],
                staticClass: "form-control",
                class: _vm.updateSubjectnameError,
                attrs: { type: "text", id: "superadmin" },
                domProps: { value: _vm.subjectUpdateForm.subjectName },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.subjectUpdateForm,
                      "subjectName",
                      $event.target.value
                    )
                  },
                },
              }),
              _vm._v(" "),
              _vm.subjectUpdateError
                ? _c("div", { staticClass: "text-danger" }, [
                    _c(
                      "small",
                      [
                        _c("font-awesome-icon", {
                          attrs: { icon: ["fas", "exclamation-circle"] },
                        }),
                        _vm._v(" " + _vm._s(_vm.subjectUpdateError)),
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
                        return _vm.updateSubject()
                      },
                    },
                  },
                  [
                    _vm.subjectUpdateSpinner
                      ? _c("span", {
                          staticClass: "spinner-grow spinner-grow-sm",
                          attrs: { role: "status", "aria-hidden": "true" },
                        })
                      : _vm._e(),
                    _vm._v(
                      "\n                            Actualizar\n                        "
                    ),
                  ]
                ),
                _vm._v(" "),
                _vm._m(2),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown-menu" }, [
                  _c(
                    "a",
                    {
                      staticClass: "dropdown-item",
                      on: {
                        click: function ($event) {
                          return _vm.cancelSubjectUpdate()
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
      _c("p"),
      _vm._v(" "),
      _c("div", { staticClass: "table-responsive-sm" }, [
        _c(
          "table",
          { staticClass: "table table-hover table-light user-table" },
          [
            _vm._m(3),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.subjectConfigArray, function (item) {
                return _c("tr", { key: item.id }, [
                  _c("td", [_vm._v(_vm._s(item.subject))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(item.level))]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass: "table-button",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.editSubject(item.id, item.subject)
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
                            return _vm.deleteSubject(item.id, _vm.courseId)
                          },
                        },
                      },
                      [
                        _vm.deleteSubjectSpinner
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
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Nome")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Nível")]),
      ]),
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
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Nível")]),
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
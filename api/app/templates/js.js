'use strict';

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ComboModels = /*#__PURE__*/function (_React$Component) {
  _inherits(ComboModels, _React$Component);

  var _super = _createSuper(ComboModels);

  function ComboModels(props) {
    var _this;

    _classCallCheck(this, ComboModels);

    _this = _super.call(this, props);
    _this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    return _this;
  }

  _createClass(ComboModels, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("http://localhost:5000/api/v1.0/models/").then(function (res) {
        return res.json();
      }).then(function (result) {
        _this2.setState({
          isLoaded: true,
          items: result
        });
      }, // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      function (error) {
        _this2.setState({
          isLoaded: true,
          error: error
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          error = _this$state.error,
          isLoaded = _this$state.isLoaded,
          items = _this$state.items;

      if (error) {
        return /*#__PURE__*/React.createElement("div", null, "Error: ", error.message);
      } else if (!isLoaded) {
        return /*#__PURE__*/React.createElement("div", null, "Loading...");
      } else {
        return /*#__PURE__*/React.createElement("select", {
          name: "select",
          id: "selectModel"
        }, items.map(function (item) {
          return /*#__PURE__*/React.createElement("option", {
            value: item.Model
          }, item.Description);
        }));
      }
    }
  }]);

  return ComboModels;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(ComboModels, null), document.getElementById("ComboModels"));

var Question = /*#__PURE__*/function (_React$Component2) {
  _inherits(Question, _React$Component2);

  var _super2 = _createSuper(Question);

  function Question(props) {
    var _this3;

    _classCallCheck(this, Question);

    _this3 = _super2.call(this, props);
    _this3.state = {
      error: null,
      isLoaded: false,
      items: [],
      body: {
        Model: document.getElementById("selectModel").value,
        Url: document.getElementById("urlNew").value,
        Question: document.getElementById("question").value
      }
    };
    return _this3;
  }

  _createClass(Question, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      var body = {
        Model: document.getElementById("selectModel").value,
        Url: document.getElementById("urlNew").value,
        Question: document.getElementById("question").value
      };
      fetch("http://localhost:5000/api/v1.0/question/", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        _this4.setState({
          isLoaded: true,
          items: result
        });
      }, // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      function (error) {
        _this4.setState({
          isLoaded: true,
          error: error
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          error = _this$state2.error,
          isLoaded = _this$state2.isLoaded,
          items = _this$state2.items;

      if (error) {
        return /*#__PURE__*/React.createElement("div", null, "Error: ", error.message);
      } else if (!isLoaded) {
        return /*#__PURE__*/React.createElement("div", null, "Loading...");
      } else {
        return /*#__PURE__*/React.createElement("h2", {
          name: "select"
        }, items);
      }
    }
  }]);

  return Question;
}(React.Component);

function answerQuestion() {
  document.getElementById("answer").innerHTML = "";
  ReactDOM.render( /*#__PURE__*/React.createElement(Question, null), document.getElementById("answer"));
}
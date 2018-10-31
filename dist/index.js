'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enzyme = require('enzyme');

//  Initial request state
var initialRequest = {
  pending: false,
  success: false,
  failed: false,
  successCount: 0,
  failureCount: 0,
  message: '',
  clean: true
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

function wrapRequest(request, actionsMock) {
  var defaultContextState = {
    data: {},
    actions: {}

    /* eslint-disable eqeqeq */
  };if (actionsMock && actionsMock.constructor == Object) {
    // Allow easy requestState action manip and tracking on request component via object ref
    defaultContextState.actions = actionsMock;
  }

  var ripOff = function ripOff() {
    var component = request.instance().renderComponent(defaultContextState);
    return enzyme.shallow(component);
  };

  return function setValue(value) {
    if (value && value.constructor == Object && value.id) {
      // Allow easy requestState manip and tracking on request component via object ref
      var data = defineProperty({}, value.id, value);
      defaultContextState.data = data;
    }
    return ripOff();
  };
}

exports.default = wrapRequest;
exports.initialRequestState = initialRequest;
//# sourceMappingURL=index.js.map

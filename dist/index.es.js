import { shallow } from 'enzyme';

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
    var actions = Object.assign({}, defaultContextState.actions, actionsMock);
    defaultContextState.actions = actions;
  }

  var ripOff = function ripOff() {
    var component = request.instance().renderComponent(defaultContextState);
    return shallow(component);
  };

  return function setValue(value) {
    if (value && value.constructor == Object && value.id) {
      var data = defineProperty({}, value.id, value);
      defaultContextState.data = data;
    }
    return ripOff();
  };
}

export default wrapRequest;
export { initialRequest as initialRequestState };
//# sourceMappingURL=index.es.js.map

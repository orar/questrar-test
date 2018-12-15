import { shallow } from 'enzyme'
import React from 'react';
import {initialRequest} from './common';

export { initialRequest as initialRequestState } from './common';

export function shallowRequest(componentNode) {
  if (/with(Single)?Request\(.*\)/.test(componentNode.name())) {
    return componentNode.dive().first().shallow();
  }

  if (/Request?/.test(componentNode.name())) {
    return componentNode.first().shallow();
  }
}

export default function wrapRequestNode (requestNode, actions) {
  let componentNode = requestNode;

  const defaultRequestState = {
    data: initialRequest,
    actions: {}
  };

  /* eslint-disable eqeqeq */
  if (actions && actions.constructor == Object) {
    // Allow custom request state actions for spying on request action calls
    defaultRequestState.actions = actions
  }

  if (typeof componentNode.name === 'function') {
    componentNode = shallowRequest(componentNode);
  } else {
    const node = shallow(React.Children.only(requestNode));
    componentNode = shallowRequest(node);
  }

  return function setProps (requestState) {
    /* eslint-disable eqeqeq */
    if (requestState && requestState.constructor == Object && requestState.id) {
      defaultRequestState.data = requestState;
    }

    return componentNode.setProps({ request: defaultRequestState });
  }
}

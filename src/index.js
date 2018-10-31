import { shallow } from 'enzyme'

export { initialRequest as initialRequestState } from './common';

export default function wrapRequest(request, actionsMock) {
  const defaultContextState = {
    data: { },
    actions: { }
  }

  /* eslint-disable eqeqeq */
  if (actionsMock && actionsMock.constructor == Object) {
    // Allow easy requestState action manip and tracking on request component via object ref
    defaultContextState.actions = actionsMock
  }

  const ripOff = () => {
    const component = request.instance().renderComponent(defaultContextState)
    return shallow(component)
  }

  return function setValue (value) {
    if (value && value.constructor == Object && value.id) {
      // Allow easy requestState manip and tracking on request component via object ref
      const data = { [value.id]: value }
      defaultContextState.data = data
    }
    return ripOff()
  }
}

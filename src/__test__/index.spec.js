import React from 'react'
import { shallow } from 'enzyme'
import { Request } from 'questrar'
import wrapRequest, { initialRequestState } from '../index'

const Requestor = () => <div>Test Requestor</div>

describe('Wrap a request test', () => {
  let id
  let wrapper
  let requestState

  const createWrapper = () => {
    wrapper = shallow(
      <Request id={id} inject>
        <Requestor />
      </Request>
    )
  }

  beforeEach(() => {
    id = 'xsvsgtes231'
    requestState = { ...initialRequestState, id, failed: true }

    createWrapper()
  });

  it('Should export `initialRequest` as named `initialRequestState`', () => {
    expect(initialRequestState).toBeDefined()
  });

  it('Should export `wrapRequest` as default', () => {
    expect(wrapRequest).toBeDefined()
  });

  it('Should be able to set the current request state of a request component', () => {
    const wrap = wrapRequest(wrapper);

    expect(typeof wrap === 'function').toBeTruthy();
    const fullWrap = wrap(requestState);
    expect(fullWrap.prop('request')).toMatchObject({ success: false, failed: true });

    requestState.failed = false;
    requestState.success = true;

    createWrapper();
    const nextWrap = wrapRequest(wrapper)(requestState);
    expect(nextWrap.prop('request')).toMatchObject({ data: { success: true, failed: false } })
  });

  it('Should rip bare the Request Component', () => {
    const wrap = wrapRequest(wrapper)(requestState);

    expect(wrap.prop('inject')).toBeTruthy()
    expect(wrap.prop('id')).toBe(id)
  })

  it('Should have the underlying component as immediate child', () => {
    const wrap = wrapRequest(wrapper)(requestState);

    expect(wrap.children().first().is(Requestor)).toBeTruthy()
  })

  it('Should be able to mock request action functions anyhow', () => {
    const actions = {
      success: jest.fn(),
      failed: jest.fn(),
      pending: jest.fn(),
      dirty: jest.fn(),
      clean: jest.fn(),
      remove: jest.fn()
    };
    const ripper = wrapRequest(wrapper, actions)(requestState);
    const reqActions = ripper.prop('actions');
    if (reqActions) {
      reqActions.failed()
      reqActions.success()
    }
    expect(ripper.children().first().is(Requestor)).toBeTruthy()
    expect(actions.success).toHaveBeenCalled()
    expect(actions.failed).toHaveBeenCalled()
  });
});

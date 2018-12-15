import React from 'react'
import { shallow } from 'enzyme'
import { Request } from 'questrar'
import createDefaultStateProvider from 'questrar/store'
import wrapRequest, { initialRequestState } from '../index';

const Requestor = () => <div>Test Requestor</div>

const stateProvider = createDefaultStateProvider();

describe('Wrap a request test', () => {
  let id
  let wrapper
  let requestState

  const createWrapper = () => {
    wrapper = shallow(
      <Request stateProvider={stateProvider} id={id} inject>
        <Requestor />
      </Request>
    );
  };

  beforeEach(() => {
    id = 'xsvsgtes231'
    requestState = { ...initialRequestState, id, failed: true }

    createWrapper()
  });

  it('Should export `initialRequest` as named `initialRequestState`', () => {
    expect(initialRequestState).toBeDefined()
  });

  it('Should export `wrapRequest` function as default', () => {
    expect(typeof wrapRequest).toBe('function')
  });

  it('Should shallow an unwrapped request node', () => {
    const node = (
      <Request stateProvider={stateProvider} id={id} inject>
        <Requestor />
      </Request>
    );
    const wrap = wrapRequest(node)(requestState);
    expect(wrap.is(Requestor)).toBeTruthy()
  });

  it('Should wrap a found Request node when Request is a child', () => {
    const node = shallow(
      <div>
        <Request stateProvider={stateProvider} id={id} inject>
          <Requestor />
        </Request>
      </div>
    );
    const requestNode = node.find(Request).first();
    const wrap = wrapRequest(requestNode)(requestState);
    expect(wrap.is(Requestor)).toBeTruthy()
  });

  it('Should be able to set the current request state of a request component', () => {
    const wrap = wrapRequest(wrapper);

    expect(typeof wrap).toBe('function');
    const fullWrap = wrap(requestState);
    expect(fullWrap.prop('request')).toMatchObject({ data: { success: false, failed: true } });

    requestState.failed = false;
    requestState.success = true;

    createWrapper();
    const nextWrap = wrapRequest(wrapper)(requestState);
    expect(nextWrap.prop('request')).toMatchObject({ data: { success: true, failed: false } })
  });

  it('Should rip bare to the underlying Requestor Component', () => {
    const wrap = wrapRequest(wrapper)(requestState);

    expect(wrap.is(Requestor)).toBeTruthy()
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
    const reqActions = ripper.props().request.actions;
    if (reqActions) {
      reqActions.failed()
      reqActions.success()
    }
    expect(ripper.first().is(Requestor)).toBeTruthy()
    expect(actions.success).toHaveBeenCalled()
    expect(actions.failed).toHaveBeenCalled()
  });
});

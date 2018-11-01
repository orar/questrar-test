# questar-test

> A test utility for testing questrar Request Component with [enzyme](https://airbnb.io/enzyme/)


[![NPM](https://img.shields.io/npm/v/questar-test.svg)](https://www.npmjs.com/package/questar-test)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6f3339b71b06d3b6279c/test_coverage)](https://codeclimate.com/github/orarr/questrar-test/test_coverage)
[![Build Status](https://travis-ci.org/orarr/questrar-test.svg?branch=master)](https://travis-ci.org/orarr/questrar-test)

## Install

```bash
yarn add -D questar-test
npm install --save-dev questar-test
```


## Usage

```jsx harmony
//  Nice.jsx

import React, { Component } from 'react'
import { Request } from 'questrar';

export const PetiteComponent = ({ request }) => {
  return (
    <div onClick={() => request.actions.remove(request.data.id)}>
      <div>{request.data.message}</div>
    </div>
  );
}

export default NiceComponent = () => {
   return (
     <Request id='abc123' inject> 
       <PetiteComponent  />
     </Request>
   )
}
```
```jsx harmony
//  Nice.spec.jsx

import React from 'react'
import { shallow } from 'enzyme';
import wrapRequest, { initialRequestState } from 'questrar-test';
import NiceComponent, { PetiteComponent } from '../Nice'

describe('NiceComponent', () => {
  let wrapper;
  let requestState;
  
  const createWrapper = () => {
    wrapper = shallow(<NiceComponent />)
  }
  
  beforeEach(() => {
    requestState = { ...initialRequestState, id: 'abc123' };
    createWrapper();
  })
  
  it('Should render PetiteComponent as default', () => {
    expect(wrapper.is(PetiteComponent)).toBeTruthy()
  });
  
  it('Should render a loading gear icon on request `pending`', () => {
    requestState.pending = true;
    const wrap = wrapRequest(wrapper)(requestState);
    
    expect(wrap.is(RequestPending)).toBeTruthy()
    expect(wrap.find(PetiteComponent).length).toBe(0)
  });
  
  it('Should remove request state `onClick` to close PetiteComponent', () => {
     const mockActions = {
          success: jest.fn(),
          failed: jest.fn(),
          pending: jest.fn(),
          dirty: jest.fn(),
          clean: jest.fn(),
          remove: jest.fn()
        };
    const wrap = wrapRequest(wrapper, mockActions)(requestState);
    wrap.simulate('click');
    expect(mockActions.remove).toHaveBeenNthCalledWith(1, requestState.id);
  });
});
```

Package exports two ends. `wrapRequest` as default and a named `import { initialRequestState }`;

```js
function wrapRequest(
  requestComponent: ShallowWrapper, //  ShallowWrapper of Request component node
  mockActions?: RequestActions
  )(
    defaultRequestState?: RequestState
   ): ShallowWrapper
```


## License

MIT © [orarr](https://github.com/orarr)

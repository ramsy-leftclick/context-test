import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';
import App, {TestContext, Render} from './App';
import {mount} from 'enzyme';

it('should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should set accounts', () => {

    jest.useFakeTimers();

    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});


    const mockSth = jest.fn(() => {
        return Promise.resolve(jest.fn());
    });

    const app = mount(
        <TestContext.Provider value={{mockSth}}>
            <Render/>
        </TestContext.Provider>
    );
  act(() => {
    jest.runAllImmediates()
  })
    expect(app.find('input')).toHaveLength(1);
    expect(app.find('#result')).toHaveLength(1);
    expect(app.find('#result').children()).toHaveLength(0);
    app.find('input').simulate('change', {target: {value: 'foo'}});
    expect(mockSth).toHaveBeenCalledWith('foo');
    app.update();
    expect(app.find('#result').children()).toHaveLength(1);
    expect(app.find('#result').childAt(0).text()).toEqual('foo');


  spy.mockRestore()
});



import sinon from 'sinon';
import React from 'react';
import {expect} from 'chai';
import {mount, shallow, render} from 'enzyme';

import App from './App';

describe('<App /> render', () => {
  it('Should start on loading state', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.find('#loader')).to.have.lengthOf(1);
  });

  it('Should call loadNewBoard when it is mounted', () => {
    sinon.spy(App.prototype, 'loadNewBoard');
    const wrapper = mount(<App/>);
    expect(App.prototype.loadNewBoard).to.have.property('callCount', 1);
    App.prototype.loadNewBoard.restore();
  });

  it('Should call renderBoard when the numbers are loaded', () => {
    sinon.spy(App.prototype, 'renderBoard');
    const wrapper = render(<App isLoaded={true}/>);
    expect(App.prototype.renderBoard).to.have.property('callCount', 1);
    App.prototype.renderBoard.restore();
  });

  it('Should render an error message when there is an error', () => {
    const err = {details: "my mistake", message: "drinking wine"};
    const wrapper = render(<App error={err}/>);
    expect(wrapper.find('#error')).to.have.lengthOf(1);
  });

});
describe('<App /> renderBoard', () => {
  let number = [];
  for(let i=0;i<81;i++){
    number.push(i)
  }
  it('Should render 81 cells, 9 lines with 9 cells each', () => {
    const wrapper = shallow(<App isLoaded={true} number={number}/>);
    const element = shallow(wrapper.instance().renderBoard());
    expect(element.find('td')).to.have.lengthOf(81);
    expect(element.find('tr')).to.have.lengthOf(9);
    element.find('tr').forEach(e => expect(e.find('td')).to.have.lengthOf(9))
  });
});

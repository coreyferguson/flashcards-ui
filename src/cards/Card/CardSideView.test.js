
import React from 'react';
import { expect, shallow } from '../../../test/support/TestUtilities';
import { CardSideView } from './CardSideView';

describe('CardSideView', () => {

  it('loading', () => {
    const wrapper = shallow(<CardSideView text='textValue' imageUrl='imageUrlValue' />);
    expect(wrapper.find('.text')).to.exist;
    expect(wrapper.find('.loading')).to.exist;
    expect(wrapper.find('.image')).to.not.exist;
  });

  it('image available / no longer loading', () => {
    const wrapper = shallow(<CardSideView text='textValue' imageUrl='imageUrlValue' image='imageValue' />);
    expect(wrapper.find('.text')).to.exist;
    expect(wrapper.find('.loading')).to.not.exist;
    expect(wrapper.find('.image')).to.exist;
  });

  it('no text', () => {
    const wrapper = shallow(<CardSideView imageUrl='imageUrlValue' image='imageValue' />);
    expect(wrapper.find('.text')).to.not.exist;
  });

});
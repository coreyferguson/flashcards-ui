
import React from 'react';
import PageContainer from '../PageContainer';
import './LandingViewUnauthenticated.scss';
import Button from '@bit/overattribution.growme.button';
import { Link } from 'react-router-dom';
import config from 'appConfig';

const imageUrl = `${config.assets.domain}/walnut-xlarge-40.jpg`;

export default class LandingViewUnauthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer className='landing-view-unauthenticated-wrapper' showLogo={false}>
        <div className='landing-view-unauthenticated'>
          <div className='content'>
            <h1>learn in a flash</h1>
            <h2>learn with flashcards</h2>
            <h2>that learn with you</h2>
            <Button component={<Link to='/signin'>try it</Link>} className='button' />
          </div>
          <div className='imagery'>
            <img src={imageUrl} alt='' />
            <span>it's good for your <span className='pop'>walnut</span></span>
          </div>
        </div>
      </PageContainer>
    );
  }

}

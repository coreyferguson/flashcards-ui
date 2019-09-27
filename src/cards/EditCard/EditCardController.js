
import PageContainer from '../../PageContainer';
import PropTypes from 'prop-types';
import React from 'react';
import sessionService from '../../authentication/sessionService';
import { gql } from 'apollo-boost';
import { useMutation as useMutationDefault } from '@apollo/react-hooks';
import { Redirect as RedirectDefault } from 'react-router-dom'
import EditCardView from './EditCardView';
import ErrorMessage from '../../ErrorMessage';
import client from '../../apolloProvider/apolloClient';
import Interim from '../../Interim';

export const SAVE_CARD = gql`
  mutation upsertCard(
    $userId: String!
    $sideAText: String
    $sideAImageUrl: String
    $sideBText: String
    $sideBImageUrl: String
  ) {
    upsertCard(
      userId: $userId
      labels: []
      sideAText: $sideAText
      sideAImageUrl: $sideAImageUrl
      sideBText: $sideBText
      sideBImageUrl: $sideBImageUrl
    ) {
      id
      labels
      sideAText
      sideAImageUrl
      sideBText
      sideBImageUrl
    }
  }
`;

export default function EditCardController({ Redirect, useMutation }) {
  useMutation = useMutation || useMutationDefault;
  const [saveCard, { loading, called, error }] = useMutation(SAVE_CARD, { client });
  Redirect = Redirect || RedirectDefault;

  if (called && !loading && !error) return <React.Fragment><Redirect to='/' /></React.Fragment>;

  function handleSave(card) {
    card.userId = sessionService.getSignInUserSession().idToken.payload.sub;
    saveCard({ variables: card });
  }

  return (
    <React.Fragment>
      {error && <ErrorMessage>
        <h2>Unknown error when saving card. Please try again.</h2>
        <h3>{error.message}</h3>
      </ErrorMessage> }
      { loading && <Interim />}
      { !loading && <EditCardView onSave={handleSave} /> }
    </React.Fragment>
  );
}

EditCardView.propTypes = {
  cardId: PropTypes.number
};

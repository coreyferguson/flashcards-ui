
import client from '../../../context/apolloProvider/apolloClient';
import DefaultView from './CardListView';
import Interim from '../../../context/Interim';
import PageContainer from '../../../context/PageContainer';
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery as useQueryDefault } from '@apollo/react-hooks';

export const LIST_CARDS = gql`
  {
    me {
      cards {
        items {
          id
          labels
          sideAFontSize
          sideAText
          sideAImageUrl
          sideBFontSize
          sideBText
          sideBImageUrl
        }
      }
    }
  }
`;

export const useQueryCacheState = { hasCache: false };

export default function CardListGraphqlProvider({ CardListView, useQuery }) {
  useQuery = useQuery || useQueryDefault;
  const { loading, error, data } = useQuery(LIST_CARDS, { client });
  useQueryCacheState.hasCache = true;
  if (loading) return <Interim />;
  if (error) return <p>unknown error occurred</p>;
  const View = CardListView || DefaultView;
  return <PageContainer><View cards={data.me.cards} /></PageContainer>;
}
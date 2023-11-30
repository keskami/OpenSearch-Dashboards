/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { EuiCard, EuiFlexItem, EuiIcon } from '@elastic/eui';
import { DrilldownVisParams, Card } from './types';

interface DrilldownVisComponentProps extends DrilldownVisParams {
  renderComplete: () => void;
}

const DrilldownVisComponent = ({ cards, renderComplete }: DrilldownVisComponentProps) => {
  useEffect(renderComplete); // renderComplete will be called after each render to signal, that we are done with rendering.

  const parsedCardData = JSON.parse(cards);

  return (
    <>
      {parsedCardData &&
        parsedCardData.map((card: Card, index: number) => (
          <EuiFlexItem key={index}>
            <EuiCard
              icon={<EuiIcon size="xl" type="dashboardApp" />}
              title={card.cardName}
              layout="horizontal"
              description={card.cardDescription}
              onClick={() => window.open(card.cardUrl, '_blank')}
              paddingSize="m"
            />
          </EuiFlexItem>
        ))}
    </>
  );
};

// default export required for React.Lazy
// eslint-disable-next-line import/no-default-export
export { DrilldownVisComponent as default };

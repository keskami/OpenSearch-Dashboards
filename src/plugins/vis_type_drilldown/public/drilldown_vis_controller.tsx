/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect } from 'react';
import { EuiCard, EuiFlexItem, EuiIcon } from '@elastic/eui';
import { useOpenSearchDashboards } from '../../opensearch_dashboards_react/public';
import { DrilldownVisParams, Card, DrilldownServices } from './types';

interface DrilldownVisComponentProps extends DrilldownVisParams {
  renderComplete: () => void;
}

const DrilldownVisComponent = ({ cards, renderComplete }: DrilldownVisComponentProps) => {
  useEffect(renderComplete); // renderComplete will be called after each render to signal, that we are done with rendering.

  const {
    services: { application },
  } = useOpenSearchDashboards<DrilldownServices>();

  const parsedCardData = JSON.parse(cards);

  const onDashboardSelection = useCallback(
    (id) => {
      application?.navigateToApp('dashboards', {
        path: `#/view/${id}`,
      });
    },
    [application]
  );

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
              onClick={() => {
                switch (card.cardType) {
                  case 'URL':
                    // Implement navigation logic to a different URL
                    window.open(card.cardUrl);
                    break;
                  case 'Dashboard':
                    // Implement custom action logic
                    onDashboardSelection(card.cardDashboardID);
                    break;
                  default:
                    window.open('_blank');
                    // Handle default case or throw an error if needed
                    break;
                }
              }}
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

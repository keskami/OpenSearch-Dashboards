/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, Fragment, useEffect, useRef, useState } from 'react';
import {
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuperSelect,
  EuiText,
  EuiButtonEmpty,
} from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';
import { VisOptionsProps } from 'src/plugins/vis_default_editor/public';
import { SimpleSavedObject } from 'src/core/public/saved_objects/simple_saved_object';
import { useOpenSearchDashboards } from '../../opensearch_dashboards_react/public';
import { Card, DrilldownServices, DrilldownVisParams } from './types';
import { CardForm } from './components/card_form';

function DrilldownOptions({ stateParams, setValue }: VisOptionsProps<DrilldownVisParams>) {
  const updateCard = useCallback(
    (index: number, card: Card) => {
      const updatedCards = [...stateParams.cards];
      updatedCards[index] = card;
      setValue('cards', updatedCards);
    },
    [stateParams.cards, setValue]
  );

  const addCardForm = useCallback(() => {
    const newCard: Card = {
      cardName: 'newDrilldownCard',
      cardDescription: 'newDrilldownCard',
      cardUrl: 'newDrilldownCard',
      cardType: 'newDrilldownCard',
      cardDashboardID: 'newDrilldownCard',
    };
    setValue('cards', [...stateParams.cards, newCard]);
  }, [stateParams.cards, setValue]);

  const [dashboards, setDashboards] = useState<Array<SimpleSavedObject<any>>>([]);

  const {
    services: { http, savedObjects },
  } = useOpenSearchDashboards<DrilldownServices>();

  useEffect(() => {
    const getSaved = async () => {
      const saved = await savedObjects?.client.find({
        type: 'dashboard',
      });
      setDashboards(saved?.savedObjects);
    };

    getSaved();
  }, [savedObjects.client, http.basePath]);

  const options = dashboards.map((dashboard) => ({
    value: dashboard.id,
    inputDisplay: dashboard.attributes.title,
  }));

  return (
    <EuiFlexGroup
      className="visEditorSidebar"
      justifyContent="spaceBetween"
      gutterSize="none"
      responsive={false}
      direction="column"
    >
      {stateParams.cards &&
        stateParams.cards.map((card, index) => (
          <>
            <CardForm index={index} card={card} updateCard={updateCard} options={options} />
          </>
        ))}
      <EuiButtonEmpty size="xs" iconType="plusInCircleFilled" onClick={addCardForm}>
        <FormattedMessage id="visDefaultEditor.aggAdd.addButtonLabel" defaultMessage="Add" />
      </EuiButtonEmpty>
    </EuiFlexGroup>
  );
}

export { DrilldownOptions };

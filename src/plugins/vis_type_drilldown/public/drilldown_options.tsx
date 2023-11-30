/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, Fragment, useEffect, useRef } from 'react';
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
    };
    setValue('cards', [...stateParams.cards, newCard]);
  }, [stateParams.cards, setValue]);

  const {
    services: { http, savedObjects },
  } = useOpenSearchDashboards<DrilldownServices>();

  interface List {
    value: string;
    inputDisplay: string;
    dropdownDisplay: JSX.Element; // Adjust the type based on the actual type of dropdownDisplay
  }

  const options = useRef<List[]>([
    {
      value: '1',
      inputDisplay: 'Option 1',
      dropdownDisplay: (
        <Fragment>
          <strong>Name</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              id
              <br />
              text
            </p>
          </EuiText>
        </Fragment>
      ),
    },
  ]);

  const saved = useRef<any>();
  // const index = useRef<any>();

  useEffect(() => {
    const fetchData = async () => {
      saved.current = savedObjects?.client.find({
        type: 'dashboard',
      });
      const path = (await saved.current).savedObjects[0].client
        .getPath(['dashboard', (await saved.current).savedObjects[0].id])
        .substring(28);
      const savedObjectURL = http.basePath.prepend('/app/dashboards#/view/' + path);
      options.current = [
        {
          value: savedObjectURL,
          inputDisplay: 'yes',
          dropdownDisplay: (
            <Fragment>
              <strong>Name</strong>
              <EuiText size="s" color="subdued">
                <p className="euiTextColor--subdued">
                  id
                  <br />
                  text
                </p>
              </EuiText>
            </Fragment>
          ),
        },
      ];
    };
    fetchData();
  });

  const activeVisName = '';
  const handleVisTypeChange = () => {};

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
            <CardForm
              index={index}
              card={card}
              updateCard={updateCard}
              options={options.current}
              valueOfSelected={activeVisName}
              onChange={handleVisTypeChange}
            />
          </>
        ))}
      <EuiButtonEmpty size="xs" iconType="plusInCircleFilled" onClick={addCardForm}>
        <FormattedMessage id="visDefaultEditor.aggAdd.addButtonLabel" defaultMessage="Add" />
      </EuiButtonEmpty>
    </EuiFlexGroup>
  );
}

export { DrilldownOptions };

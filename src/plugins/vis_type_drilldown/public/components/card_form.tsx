/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  EuiPanel,
  EuiTitle,
  EuiTextArea,
  EuiFlexItem,
  EuiFieldText,
  EuiAccordion,
  EuiFlexGroup,
  EuiSuperSelect,
  EuiFilterButton,
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { Card } from '../types';

interface CardFormProps {
  index: number;
  card: Card;
  updateCard: (index: number, card: Card) => void;
  options: any;
}

const CardForm = ({ index, card, updateCard, options }: CardFormProps) => {
  const [activeVisName, setActiveVisName] = useState<any>('');
  return (
    <EuiAccordion
      id={String(index)}
      buttonContent={`Drilldown ${index + 1}`}
      paddingSize="s"
      initialIsOpen={true}
    >
      <EuiPanel paddingSize="s">
        <EuiFlexGroup direction="column" gutterSize="m" className="eui-fullHeight">
          <EuiFlexItem>
            <EuiTitle size="xs">
              <h2>
                <label
                  htmlFor={i18n.translate('drilldownVisInput', {
                    defaultMessage: 'Drilldown Visualisation CardName',
                  })}
                >
                  Card Name
                </label>
              </h2>
            </EuiTitle>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiFieldText
              id="drilldownVisInput"
              className="eui-fullHeight"
              value={card.cardName}
              onChange={({ target: { value } }) => {
                updateCard(index, { ...card, cardName: value });
              }}
              fullWidth={true}
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiTitle size="xs">
              <h2>
                <label
                  htmlFor={i18n.translate('drilldownVisInput', {
                    defaultMessage: 'Drilldown Visualisation Description',
                  })}
                >
                  Description
                </label>
              </h2>
            </EuiTitle>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiTextArea
              id="markdownVisInput"
              className="eui-fullHeight"
              value={card.cardDescription}
              onChange={({ target: { value } }) => {
                updateCard(index, { ...card, cardDescription: value });
              }}
              fullWidth={true}
              data-test-subj="markdownTextarea"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiTitle size="xs">
              <h2>
                <label
                  htmlFor={i18n.translate('drilldownVisInput', {
                    defaultMessage: 'Drilldown Visualisation Url',
                  })}
                >
                  Url
                </label>
              </h2>
            </EuiTitle>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiFieldText
              id="drilldownVisInput"
              placeholder=""
              className="eui-fullHeight"
              value={card.cardUrl}
              onChange={({ target: { value } }) => {
                updateCard(index, { ...card, cardUrl: value, cardType: 'URL' });
              }}
              fullWidth={true}
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiTitle size="xs">
              <h2>
                <label
                  htmlFor={i18n.translate('drilldownVisInput', {
                    defaultMessage: 'Drilldown Visualisation Destination',
                  })}
                >
                  Select a Destination
                </label>
              </h2>
            </EuiTitle>
          </EuiFlexItem>

          <EuiSuperSelect
            options={options}
            valueOfSelected={activeVisName}
            onChange={(selectedDashboard: string) => {
              setActiveVisName(selectedDashboard);
              updateCard(index, {
                ...card,
                cardDashboardID: selectedDashboard,
                cardType: 'Dashboard',
              });
            }}
            fullWidth={true}
            data-test-subj="chartPicker"
          />
        </EuiFlexGroup>
      </EuiPanel>
    </EuiAccordion>
  );
};

export { CardForm };

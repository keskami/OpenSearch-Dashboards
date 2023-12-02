/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { i18n } from '@osd/i18n';
import { DrilldownOptions } from './drilldown_options';
import { SettingsOptions } from './settings_options_lazy';
import { DefaultEditorSize } from '../../vis_default_editor/public';
import { toExpressionAst } from './to_ast';

export const drillDownVisDefinition = {
  name: 'drilldown',
  title: 'Drilldown',
  isAccessible: true,
  icon: 'logstashFilter',
  description: i18n.translate('visTypeDrilldown.drilldownDescription', {
    defaultMessage: 'I LOVE drilldown!',
  }),
  toExpressionAst,
  visConfig: {
    defaults: {
      cards: [
        {
          cardName: '',
          cardDescription: '',
          cardUrl: '',
          cardType: '',
          cardDashboardID: '',
        },
      ],
    },
  },
  editorConfig: {
    optionTabs: [
      {
        name: 'advanced',
        title: i18n.translate('visTypeDrilldown.tabs.dataText', {
          defaultMessage: 'Data',
        }),
        editor: DrilldownOptions,
      },
      {
        name: 'options',
        title: i18n.translate('visTypeDrilldown.tabs.optionsText', {
          defaultMessage: 'Options',
        }),
        editor: SettingsOptions,
      },
    ],
    enableAutoApply: true,
    defaultSize: DefaultEditorSize.MEDIUM,
  },
  options: {
    showTimePicker: false,
    showFilterBar: false,
  },
  requestHandler: 'none',
  responseHandler: 'none',
  inspectorAdapters: {},
};

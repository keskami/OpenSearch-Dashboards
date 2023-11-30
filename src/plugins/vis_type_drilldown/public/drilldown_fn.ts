/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { i18n } from '@osd/i18n';
import { ExpressionFunctionDefinition, Render } from '../../expressions/public';
import { DrilldownArguments, DrilldownVisParams } from './types';

export interface DrilldownVisRenderValue {
  visType: 'drilldown';
  visParams: DrilldownVisParams;
}

export type DrilldownVisExpressionFunctionDefinition = ExpressionFunctionDefinition<
  'drilldownVis',
  unknown,
  DrilldownArguments,
  Render<DrilldownVisRenderValue>
>;

export const createDrilldownVisFn = (): DrilldownVisExpressionFunctionDefinition => ({
  name: 'drilldownVis',
  type: 'render',
  inputTypes: [],
  help: i18n.translate('visTypeDrilldown.function.help', {
    defaultMessage: 'Drilldown visualization',
  }),
  args: {
    cards: {
      types: ['string'],
      help: i18n.translate('visTypeDrilldown.function.cards.help', {
        defaultMessage: 'Cards',
      }),
    },
  },
  fn(input, args) {
    return {
      type: 'render',
      as: 'drilldown_vis',
      value: {
        visType: 'drilldown',
        visParams: {
          cards: args.cards,
        },
      },
    };
  },
});

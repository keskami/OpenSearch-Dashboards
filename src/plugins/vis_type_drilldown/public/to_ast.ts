/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vis } from '../../visualizations/public';
import { buildExpression, buildExpressionFunction } from '../../expressions/public';
import { DrilldownVisExpressionFunctionDefinition } from './drilldown_fn';

export const toExpressionAst = (vis: Vis) => {
  const { cards } = vis.params;

  const drilldownVis = buildExpressionFunction<DrilldownVisExpressionFunctionDefinition>(
    'drilldownVis',
    {
      cards: JSON.stringify(cards),
    }
  );

  const ast = buildExpression([drilldownVis]);

  return ast.toAst();
};

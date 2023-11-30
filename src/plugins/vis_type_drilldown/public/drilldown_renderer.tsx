/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { VisualizationContainer } from '../../visualizations/public';
import { ExpressionRenderDefinition } from '../../expressions/common/expression_renderers';
import { DrilldownVisRenderValue } from './drilldown_fn';

// @ts-ignore
const DrilldownVisComponent = lazy(() => import('./drilldown_vis_controller'));

export const drilldownVisRenderer: ExpressionRenderDefinition<DrilldownVisRenderValue> = {
  name: 'drilldown_vis',
  displayName: 'drilldown visualization',
  reuseDomNode: true,
  render: async (domNode, { visParams }, handlers) => {
    handlers.onDestroy(() => {
      unmountComponentAtNode(domNode);
    });

    render(
      <VisualizationContainer className="drilldownVis">
        <DrilldownVisComponent {...visParams} renderComplete={handlers.done} />
      </VisualizationContainer>,
      domNode
    );
  },
};

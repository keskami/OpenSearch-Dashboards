/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoreSetup, CoreStart, Plugin } from '../../../core/public';
import { VisDrilldownPluginSetup, VisDrilldownPluginStart } from './types';
import { drillDownVisDefinition } from './drilldown_vis';
import { createDrilldownVisFn } from './drilldown_fn';
import { VisualizationsSetup } from '../../visualizations/public';
import { Plugin as ExpressionsPublicPlugin } from '../../expressions/public';
import { drilldownVisRenderer } from './drilldown_renderer';

export interface DrilldownPluginSetupDependencies {
  expressions: ReturnType<ExpressionsPublicPlugin['setup']>;
  visualizations: VisualizationsSetup;
}

export class VisDrilldownPlugin
  implements Plugin<VisDrilldownPluginSetup, VisDrilldownPluginStart> {
  public setup(
    core: CoreSetup,
    { visualizations, expressions }: DrilldownPluginSetupDependencies
  ): VisDrilldownPluginSetup {
    visualizations.createBaseVisualization(drillDownVisDefinition);
    expressions.registerRenderer(drilldownVisRenderer);
    expressions.registerFunction(createDrilldownVisFn);
  }

  public start(core: CoreStart): VisDrilldownPluginStart {
    return {};
  }

  public stop() {}
}

import {
  AllCommunityModule as AgGridAllCommunityModule,
  ModuleRegistry as AgGridModuleRegistry,
} from 'ag-grid-community';
import * as AgChartsCommunity from 'ag-charts-community';

let agModulesRegistered = false;

export function registerAgModules(): void {
  if (agModulesRegistered) {
    return;
  }

  AgGridModuleRegistry.registerModules([AgGridAllCommunityModule]);

  const chartsModuleRegistry = (AgChartsCommunity as any).ModuleRegistry;
  const chartsAllCommunityModule = (AgChartsCommunity as any).AllCommunityModule;
  const chartsSetupCommunityModules = (AgChartsCommunity as any).setupCommunityModules;

  // v13+ API: ModuleRegistry + AllCommunityModule
  if (chartsModuleRegistry && chartsAllCommunityModule) {
    chartsModuleRegistry.registerModules([chartsAllCommunityModule]);
  } else if (typeof chartsSetupCommunityModules === 'function') {
    // v12 API: setupCommunityModules helper
    chartsSetupCommunityModules();
  }

  agModulesRegistered = true;
}

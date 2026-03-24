import {
  AllCommunityModule as AgGridAllCommunityModule,
  ModuleRegistry as AgGridModuleRegistry,
} from 'ag-grid-community';
import {
  AllCommunityModule as AgChartsAllCommunityModule,
  ModuleRegistry as AgChartsModuleRegistry,
} from 'ag-charts-community';

let agModulesRegistered = false;

export function registerAgModules(): void {
  if (agModulesRegistered) {
    return;
  }

  AgGridModuleRegistry.registerModules([AgGridAllCommunityModule]);
  AgChartsModuleRegistry.registerModules([AgChartsAllCommunityModule]);
  agModulesRegistered = true;
}

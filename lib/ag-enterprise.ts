import { ModuleRegistry as AgGridModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise';

let agEnterpriseRegistered = false;

/**
 * AG Grid prints its "License Key Not Found" notice as a box of asterisks, one
 * `console.error` per line, which buries every other error in the console. This
 * collapses the box into a single informational line.
 *
 * Only lines belonging to that ASCII box are dropped: real AG Grid errors are
 * prefixed `AG Grid: ...`, never an asterisk. The trial watermark is left alone.
 *
 * The filter stays installed for the page's lifetime because AG Grid revalidates
 * the license for every grid it creates, with no once-per-page guard. The cost
 * is one extra frame named `agGridLicenseBannerFilter` on unrelated
 * `console.error` stacks.
 */
function quietLicenseBanner(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const original = console.error;
  console.error = function agGridLicenseBannerFilter(...args: unknown[]) {
    const [first] = args;
    if (typeof first === 'string' && first.trimStart().startsWith('*')) {
      return;
    }
    original.apply(console, args);
  };

  console.info(
    'AG Grid Enterprise running in trial mode: set NEXT_PUBLIC_AG_GRID_LICENSE_KEY to remove the watermark.'
  );
}

/**
 * Row grouping, aggregation and the side bar are Enterprise features, so pages
 * that need them register here instead of via `registerAgModules`. Kept separate
 * so community-only pages are not pulled into the enterprise bundle.
 */
export function registerAgEnterpriseModules(): void {
  if (agEnterpriseRegistered) {
    return;
  }

  AgGridModuleRegistry.registerModules([AllEnterpriseModule]);

  const licenseKey = process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY;
  if (licenseKey) {
    LicenseManager.setLicenseKey(licenseKey);
  } else {
    quietLicenseBanner();
  }

  agEnterpriseRegistered = true;
}

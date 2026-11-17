const unique = (values) => [...new Set(values)];

const missingFrom = (expected, actual) => {
  const actualSet = new Set(actual);
  return unique(expected).filter((id) => !actualSet.has(id));
};

const formatIds = (label, ids) =>
  ids.length > 0 ? `${label}:\n${ids.map((id) => `  - ${id}`).join("\n")}` : null;

export function assertCaptureCoverage({ baselineIds, discoveredIds, capturedIds, failures = {} }) {
  const missingEligible = missingFrom(baselineIds, discoveredIds);
  const missingCaptures = missingFrom(discoveredIds, capturedIds);
  const sections = [
    formatIds("Baseline VRT ids no longer eligible", missingEligible),
    formatIds("VRT-eligible stories without a captured reference", missingCaptures),
  ].filter(Boolean);

  for (const id of missingCaptures) {
    if (failures[id]) sections.push(`  ${id}: ${failures[id]}`);
  }

  if (sections.length > 0) {
    throw new Error(`VRT capture coverage failed.\n${sections.join("\n")}`);
  }
}

export function assertPairedCoverage({ expectedIds, baseIds, headIds }) {
  const missingBase = missingFrom(expectedIds, baseIds);
  const missingHead = missingFrom(expectedIds, headIds);
  const baseOnly = missingFrom(baseIds, headIds);
  const headOnly = missingFrom(headIds, baseIds);
  const sections = [
    formatIds("Expected ids missing from base report", missingBase),
    formatIds("Expected ids missing from head report", missingHead),
    formatIds("Unpaired base-only ids", baseOnly),
    formatIds("Unpaired head-only ids", headOnly),
  ].filter(Boolean);

  if (sections.length > 0) {
    throw new Error(`VRT pairing failed.\n${sections.join("\n")}`);
  }
}

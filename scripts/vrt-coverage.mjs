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

export function assertPairedCoverage({
  baseSelectedIds,
  headSelectedIds,
  baseCapturedIds,
  headCapturedIds,
}) {
  const missingBaseCaptures = missingFrom(baseSelectedIds, baseCapturedIds);
  const missingHeadSelection = missingFrom(baseSelectedIds, headSelectedIds);
  const missingHeadCaptures = missingFrom(baseSelectedIds, headCapturedIds);
  const newHeadIds = missingFrom(headSelectedIds, baseSelectedIds);
  const missingNewHeadCaptures = missingFrom(newHeadIds, headCapturedIds);
  const sections = [
    formatIds("Base-selected ids without a base capture", missingBaseCaptures),
    formatIds("Base-selected ids no longer selected on head", missingHeadSelection),
    formatIds("Base-selected ids without a head capture", missingHeadCaptures),
    formatIds("New head-selected ids without a verified head capture", missingNewHeadCaptures),
  ].filter(Boolean);

  if (sections.length > 0) {
    throw new Error(`VRT pairing failed.\n${sections.join("\n")}`);
  }

  return {
    pairedIds: unique(baseSelectedIds),
    newHeadIds,
  };
}

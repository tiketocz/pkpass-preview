const MAX_FILE_ENTRIES = 5;

type SourceArgs = {
  values?: unknown;
  variant?: unknown;
  targetOs?: unknown;
};

const isFileMap = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const placeholderFor = (filename: string) => {
  if (filename === "pass.json") {
    return "{\n    /* parsed contents of pass.json */\n  }";
  }
  if (/\.(?:png|jpe?g|gif|webp|svg)$/i.test(filename)) {
    return '"<base64-encoded image>"';
  }
  return '"<file contents>"';
};

/** Builds the public API example used by comparison stories in rendered Docs. */
export const buildComparisonSource = (args: SourceArgs): string | undefined => {
  if (!isFileMap(args.values) || !("pass.json" in args.values)) return undefined;

  const filenames = Object.keys(args.values).sort((left, right) => {
    if (left === "pass.json") return -1;
    if (right === "pass.json") return 1;
    return left.localeCompare(right);
  });
  const shownFilenames = filenames.slice(0, MAX_FILE_ENTRIES);
  const fileLines = shownFilenames.map(
    (filename) => `  ${JSON.stringify(filename)}: ${placeholderFor(filename)},`,
  );
  if (filenames.length > shownFilenames.length) {
    fileLines.push(
      `  // …${filenames.length - shownFilenames.length} more files from the pass bundle`,
    );
  }

  const props = ["values={passFiles}"];
  if (typeof args.variant === "string" && args.variant !== "fallback") {
    props.push(`variant=${JSON.stringify(args.variant)}`);
  }
  if (typeof args.targetOs === "string" && args.targetOs !== "ios26") {
    props.push(`targetOs=${JSON.stringify(args.targetOs)}`);
  }

  return [
    'import { PKPassPreview } from "@tiketo/pkpass-preview";',
    "",
    "const passFiles = {",
    ...fileLines,
    "};",
    "",
    `<PKPassPreview ${props.join(" ")} />`,
  ].join("\n");
};

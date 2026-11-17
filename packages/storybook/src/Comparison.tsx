import { PKPassPreview, type PreviewTargetOs, type PreviewVariant } from "@tiketo/pkpass-preview";
import { useState } from "react";

import {
  type NativeReference,
  featuredActionsCount,
  findNativeReference,
  getScenario,
} from "./scenarioCatalog";

export type ComparisonArgs = {
  values: Record<string, unknown>;
  scenarioId: string;
  variant: PreviewVariant;
  /** Forwarded to PKPassPreview; omitted = legacy behaviour (TIK-318). */
  targetOs: PreviewTargetOs;
};

export type WebWalletDetailProps = {
  values: Record<string, unknown>;
  fixtureKey: string;
  variant: PreviewVariant;
  targetOs: PreviewTargetOs;
  heading?: string;
};

const styles = {
  detail: {
    display: "grid",
    gap: 12,
    maxWidth: "100%",
  } as const,
  heading: {
    margin: 0,
    color: "#0b0b45",
    fontSize: 14,
    fontWeight: 700,
    textAlign: "center",
  } as const,
  wrap: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
  } as const,
  col: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  } as const,
  label: {
    minHeight: 18,
    color: "#666",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.04em",
    textAlign: "center",
  } as const,
  placeholder: {
    width: 320,
    maxWidth: "100%",
    minHeight: 408,
    border: "1px dashed #c4c4c4",
    borderRadius: 12,
    background: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    fontSize: 13,
    lineHeight: 1.5,
    padding: 24,
    boxSizing: "border-box",
    textAlign: "center",
  } as const,
  img: {
    width: 320,
    maxWidth: "100%",
    height: "auto",
    borderRadius: 12,
    // Match PKPassPreview's shadow; references are tight-cropped to the card.
    boxShadow: "0 3px 4px 0 rgb(0 0 0 / 20%), 0 2px 5px 0 rgb(0 0 0 / 19%)",
  } as const,
};

const referenceLabel = (reference: NativeReference) => {
  const ios = reference.iOS ? `iOS ${reference.iOS}` : undefined;
  if (reference.kind === "simulator") {
    return ["Apple Wallet", ios, reference.device, "Simulator"].filter(Boolean).join(" · ");
  }
  if (reference.kind === "device") {
    return ["Apple Wallet", ios, reference.device, "Device"].filter(Boolean).join(" · ");
  }
  return ["Apple Wallet", ios, "legacy, origin not recorded"].filter(Boolean).join(" · ");
};

const referenceFor = ({ values, fixtureKey, variant, targetOs }: WebWalletDetailProps) =>
  findNativeReference({
    fixtureKey,
    variant,
    targetOs,
    featuredActionsCount: fixtureKey.startsWith("vltava-featured-")
      ? featuredActionsCount(values)
      : undefined,
  });

/** One responsive detail used by stories and the interactive Playground. */
export const WebWalletDetail = (props: WebWalletDetailProps) => {
  const { values, variant, targetOs, heading = "Web / Apple Wallet" } = props;
  const reference = referenceFor(props);
  const [failedPath, setFailedPath] = useState<string>();

  return (
    <section className="web-wallet-detail" style={styles.detail}>
      <h2 style={styles.heading}>{heading}</h2>
      <div className="pkpass-comparison" style={styles.wrap}>
        <div className="pkpass-comparison-column" style={styles.col}>
          <div style={styles.label}>Web preview</div>
          <PKPassPreview values={values} variant={variant} targetOs={targetOs} />
        </div>
        <div className="pkpass-comparison-column" style={styles.col}>
          <div style={styles.label}>{reference ? referenceLabel(reference) : "Apple Wallet"}</div>
          {reference && failedPath !== reference.path ? (
            <img
              src={reference.path}
              alt={`${referenceLabel(reference)} reference`}
              className="pkpass-reference"
              style={styles.img}
              onError={() => setFailedPath(reference.path)}
            />
          ) : (
            <div className="pkpass-reference-note" style={styles.placeholder}>
              {reference ? (
                <>
                  Native reference file missing: <code>{reference.path}</code>
                </>
              ) : (
                "No native reference for this configuration."
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const Comparison = ({ values, scenarioId, variant, targetOs }: ComparisonArgs) => {
  const metadata = getScenario(scenarioId);
  return (
    <WebWalletDetail
      values={values}
      fixtureKey={metadata.fixtureKey}
      variant={variant}
      targetOs={targetOs}
    />
  );
};

export const comparisonArgs = (
  scenarioId: string,
  values: Record<string, unknown>,
  configuration: Partial<Pick<ComparisonArgs, "variant" | "targetOs">> = {},
): ComparisonArgs => ({
  values,
  scenarioId,
  variant: "fallback",
  targetOs: "ios26",
  ...configuration,
});

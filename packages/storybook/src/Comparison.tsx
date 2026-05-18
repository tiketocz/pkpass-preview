import { PKPassPreview } from "@tiketo/pkpass-preview";
import { useState } from "react";

export type ComparisonArgs = {
  values: Record<string, unknown>;
  screenshot: string;
};

const styles = {
  wrap: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
    flexWrap: "wrap",
  } as const,
  col: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  } as const,
  label: {
    fontSize: 12,
    color: "#666",
    fontWeight: 500,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  } as const,
  placeholder: {
    width: 312,
    minHeight: 408,
    border: "1px dashed #c4c4c4",
    borderRadius: 12,
    background: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
    fontSize: 13,
    padding: 16,
    textAlign: "center",
  } as const,
  img: { maxWidth: 312, borderRadius: 12 } as const,
};

// Screenshots live in packages/storybook/public/screenshots/ and are
// served at /screenshots/* by Storybook's staticDirs. Missing image
// => placeholder (no console errors).
export const Comparison = ({ values, screenshot }: ComparisonArgs) => {
  const [hasShot, setHasShot] = useState(true);
  const src = `screenshots/${screenshot}.jpg`;
  return (
    <div style={styles.wrap}>
      <div style={styles.col}>
        <div style={styles.label}>Our render</div>
        <PKPassPreview values={values} />
      </div>
      <div style={styles.col}>
        <div style={styles.label}>iOS Wallet</div>
        {hasShot ? (
          <img
            src={src}
            alt={`iOS Wallet screenshot of ${screenshot}`}
            style={styles.img}
            onError={() => setHasShot(false)}
          />
        ) : (
          <div style={styles.placeholder}>
            iOS screenshot pending — add <code style={{ fontSize: 12 }}>public/{src}</code>
          </div>
        )}
      </div>
    </div>
  );
};

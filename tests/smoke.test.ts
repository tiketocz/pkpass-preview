import { describe, it } from "vitest";

describe("@tiketo/pkpass-preview — smoke", () => {
  // Real smoke landing in M1.1 (TIK-121) once `index.ts` exports the
  // PKPassPreview component. For M1.0 we only assert that the test runner
  // boots and the workspace resolves — see vitest.config.ts.
  it.todo("renders PKPassPreview with a minimal generic pass");
});

/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MdxComponent: ComponentType;
  export default MdxComponent;
}

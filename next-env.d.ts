/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

declare module "*.svg" {
  const content: any;
  export default content;
}

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      second: string;
      fontMain: string;
      fontSecond: string;
    };
  }
}

// Minimal React Native type shim for building this package.
//
// This is used only at build time via `tsconfig.json` "typeRoots".
// It is intentionally minimal: consumers of `@nine4/ui-kit` should provide
// their own `react-native` types via their React Native installation.

declare module 'react-native' {
  export type ViewStyle = {
    [key: string]: unknown;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    overflow?: 'visible' | 'hidden' | 'scroll';

    backgroundColor?: string;
    borderTopWidth?: number;
    borderBottomWidth?: number;
    borderBottomColor?: string;

    elevation?: number;
    shadowColor?: string;
    shadowOpacity?: number;
    shadowRadius?: number;
    shadowOffset?: { width: number; height: number };

    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingHorizontal?: number;

    marginBottom?: number;
    marginLeft?: number;

    height?: number;
    minHeight?: number;
    flex?: number;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    alignItems?: string;
  };

  export type TextStyle = {
    [key: string]: unknown;
    fontSize?: number;
    fontWeight?: string | number;
  };

  export const Platform: {
    OS: 'ios' | 'android' | 'web' | (string & {});
  };
}


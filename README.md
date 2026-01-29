# @nine4/ui-kit

Design system tokens and style helpers for React Native apps.

## Install

```
npm install @nine4/ui-kit
```

## Usage

```ts
import {
  lightTheme,
  darkTheme,
  typography,
  SCREEN_PADDING,
  CARD_PADDING,
  CARD_LIST_GAP,
  BUTTON_BORDER_RADIUS,
  spacing,
  getCardBaseStyle,
  getCardBorderStyle,
  getScreenContainerStyle,
  getScreenContentStyle,
  getScreenHeaderStyle,
  getSectionTitleStyle,
  getTabBarStyle,
} from '@nine4/ui-kit';
```

## Layout patterns (copy/paste)

These patterns are the “happy path” for consistent spacing and readable screens.

### Screen container (background + flex)

Use `getScreenContainerStyle(theme)` for the outermost container:

```ts
import React from 'react';
import {
  getScreenContainerStyle,
} from '@nine4/ui-kit';

export function MyScreen({ theme, children }: { theme: any; children: React.ReactNode }) {
  return (
    <View style={getScreenContainerStyle(theme)}>
      {children}
    </View>
  );
}
```

### Screen gutters (avoid edge-to-edge content)

In React Native, most content (including `TextInput`) will stretch to the parent width. If the parent has **no horizontal padding**, you’ll get accidental full-bleed UI.

**Rule of thumb**: every screen should have a gutter wrapper (or `contentContainerStyle`) that applies left/right padding.

Canonical gutter pattern (safe-area aware):

```ts
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_PADDING, getScreenContentStyle } from '@nine4/ui-kit';

export function ScreenContent({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        getScreenContentStyle({ insets, paddingHorizontal: SCREEN_PADDING }),
        { paddingVertical: SCREEN_PADDING },
      ]}
    >
      {children}
    </ScrollView>
  );
}
```

### Screen header (safe-area + chrome)

Use `getScreenHeaderStyle(theme, insets)` for consistent header spacing:

```ts
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getScreenHeaderStyle } from '@nine4/ui-kit';

export function ScreenHeader({ theme, title }: { theme: any; title: string }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={getScreenHeaderStyle(theme, insets)}>
      <Text style={{ color: theme.text.primary, fontSize: 20, fontWeight: '700' }}>
        {title}
      </Text>
    </View>
  );
}
```

### Cards (border + radius + internal padding)

Use `getCardBaseStyle()` + `getCardBorderStyle(theme)` and default to `CARD_PADDING` for inner padding:

```ts
import React from 'react';
import { View } from 'react-native';
import { CARD_PADDING, getCardBaseStyle, getCardBorderStyle } from '@nine4/ui-kit';

export function Card({ theme, children }: { theme: any; children: React.ReactNode }) {
  return (
    <View
      style={[
        getCardBaseStyle({ radius: 12 }),
        getCardBorderStyle(theme),
        { backgroundColor: theme.background.surface },
      ]}
    >
      <View style={{ padding: CARD_PADDING }}>
        {children}
      </View>
    </View>
  );
}
```

### Card lists (consistent gaps + gutters)

Use `CARD_LIST_GAP` for spacing between cards and `SCREEN_PADDING` for outer gutters:

```ts
import React from 'react';
import { FlatList } from 'react-native';
import { CARD_LIST_GAP, SCREEN_PADDING } from '@nine4/ui-kit';

export function CardList<T>({
  data,
  renderItem,
}: {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
}) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, i) => String(i)}
      contentContainerStyle={{
        padding: SCREEN_PADDING,
        gap: CARD_LIST_GAP,
      }}
    />
  );
}
```

### Section titles (consistent typography + spacing)

Use `getSectionTitleStyle(theme)` for list/setting sections:

```ts
import React from 'react';
import { Text } from 'react-native';
import { getSectionTitleStyle } from '@nine4/ui-kit';

export function SectionTitle({ theme, children }: { theme: any; children: string }) {
  return <Text style={getSectionTitleStyle(theme)}>{children}</Text>;
}
```

### Bottom tabs (safe-area aware)

Use `getTabBarStyle(theme, insets)` for React Navigation bottom tabs:

```ts
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTabBarStyle } from '@nine4/ui-kit';

// inside your navigator component:
const insets = useSafeAreaInsets();
const tabBarStyle = getTabBarStyle(theme, insets);
```

## Spacing scale

Prefer the `spacing` scale for new code and keep `SCREEN_PADDING` / `CARD_PADDING` for backwards compatibility.

- **Examples**: `spacing.sm` (8), `spacing.lg` (16), `spacing.xl` (24), `spacing.xxxl` (48)

## Themes + token conventions

- As of **`0.2.0`**, `primary` is the **brand accent** and the prior grayscale `primary.*` moved to `neutral.*`.

- **`theme.primary`**: brand accent color (use for primary buttons, links, focus rings, active tabs, etc.)
- **`theme.neutral`**: grayscale ramp (use for black/white/gray UI when you do *not* want the brand accent)
- **`theme.text` / `theme.background` / `theme.border`**: semantic tokens for common UI needs

Example:

```ts
import { StyleSheet } from 'react-native';
import { lightTheme } from '@nine4/ui-kit';

const theme = lightTheme;

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background.screen },
  title: { color: theme.text.primary },
  link: { color: theme.primary.main },
  primaryButton: { backgroundColor: theme.button.primary.background },
});
```

## Recommended app guardrail (avoid ad-hoc remaps)

In consuming apps, prefer a single adapter (e.g. `createThemeFromUIKit()`) that converts `ColorTheme` into your app’s internal theme shape, and import that adapter everywhere. This prevents subtle drift (like accidentally mapping grayscale `primary` into “brand”).

## Build locally

```
npm install
npm run build
```

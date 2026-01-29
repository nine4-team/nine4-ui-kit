/**
 * Shared spacing tokens for consistent layout.
 *
 * Goal: keep screen padding stable while standardizing the space between cards
 * across all "card list" surfaces (Active Standards, Standards Library, History, etc).
 */

/**
 * Canonical spacing scale.
 *
 * Use this for consistent vertical rhythm and predictable gutters.
 */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/**
 * Backwards-compatible constants (keep these stable for consuming apps).
 */
export const SCREEN_PADDING = spacing.lg;
export const CARD_LIST_GAP = spacing.md;
export const CARD_PADDING = spacing.lg;

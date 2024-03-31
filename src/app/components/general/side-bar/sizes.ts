export const sizes = [
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
  '24',
  '26',
  '28',
  '30',
  '32',
] as const;

export type TextSizes = (typeof sizes)[number];

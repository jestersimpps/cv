export type BentoSize = 'large' | 'medium' | 'wide' | 'small';

export interface BentoConfig {
  colSpan: string;
  rowSpan: string;
}

export const BENTO_SIZES: Record<BentoSize, BentoConfig> = {
  large: {
    colSpan: 'col-span-2 sm:col-span-4 lg:col-span-4',
    rowSpan: 'row-span-2',
  },
  medium: {
    colSpan: 'col-span-2',
    rowSpan: 'row-span-2',
  },
  wide: {
    colSpan: 'col-span-2 sm:col-span-4 lg:col-span-4',
    rowSpan: 'row-span-1',
  },
  small: {
    colSpan: 'col-span-2',
    rowSpan: 'row-span-1',
  },
};

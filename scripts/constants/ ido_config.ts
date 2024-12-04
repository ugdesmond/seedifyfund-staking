export const IDO_CONFIG = {
  names: [
    'Staking 90 days - Seedworld',
    'Staking 180 days - Seedworld',
    'Staking 270 days - Seedworld',
    'Staking 360 days - Seedworld',
  ],
  aprs: [10, 20, 25, 30],
  days: [90, 180, 270, 360],
  tokenAddress: '0x968bE3F7bfeF0F8eDc3c1aD90232EbB0DA0867aA', // Seedworld
};

export function getRate(apr: number, lockDuration: number) {
  return ((apr * lockDuration) / 365) * 100;
}

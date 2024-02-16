import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains'

const fork = {
  ...mainnet,
  rpcUrls: {
    default: { http: [import.meta.env.VITE_RPC_URL] },
  },
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: 'Degen Hub',
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  chains: [fork],
});

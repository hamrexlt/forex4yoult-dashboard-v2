import { arbitrum, bitcoin, mainnet, solana } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { BitcoinAdapter } from "@reown/appkit-adapter-bitcoin";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://dashboard.reown.com

export const projectId = "860565723b152e68347c7fc220cf247a";

// 2. Create a metadata object - optional
const metadata = {
	name: "Forex4Yoult",
	description: "Forex4Yoult",
	url: window.location.origin,
	icons: [],
};

// 3. Set the networks
const networks = [mainnet, solana, bitcoin];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
	networks,
	projectId,
	ssr: true,
});

const bitcoinAdapter = new BitcoinAdapter({
	projectId,
});

const solanaWeb3JsAdapter = new SolanaAdapter();

// 5. Create modal
createAppKit({
	adapters: [wagmiAdapter, solanaWeb3JsAdapter, bitcoinAdapter],
	networks,
	projectId,
	metadata,
	features: {
		analytics: true, // Optional - defaults to your Cloud configuration
	},
});

export function AppKitProvider({ children }) {
	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}

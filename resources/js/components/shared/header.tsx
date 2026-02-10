import {
	AppKitButton,
	AppKitNetworkButton,
	// useAppKitAccount,
} from "@reown/appkit/react";
// import type { Wallet } from "@reown/appkit-wallet-button";
// import { Wallet2Icon } from "lucide-react";
// import { Button } from "../ui/button";

export default function Header() {
	// const { isConnected } = useAppKitAccount({ namespace: "eip155" });
	// // const { open, close } = useAppKit();
	return (
		<header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/*<h1 className="text- font-bold text-gray-900 dark:text-white tracking-tight">
						Direct Withdraw
					</h1>*/}
					<AppKitNetworkButton />
				</div>
				<div className="flex items-center gap-3">
					{/*{!isConnected && (
						<Button
							onClick={() => open({ namespace: "eip155", view: "Connect" })}
							size={"lg"}
							className="flex items-center gap-2 text-sm font-semibold text-gray-700  bg-gray-50 border border-gray-200  hover:bg-gray-100 animate-pulse"
							aria-label="Connect Wallet"
						>
							<Wallet2Icon />
							Connect Wallet
						</Button>
					)}*/}
					<AppKitButton />

					{/*{isConnected && (
						<Button
							onClick={async () => await close()}
							size={"lg"}
							className="flex items-center gap-2 text-sm font-semibold text-gray-700  bg-gray-50 border border-gray-200  hover:bg-gray-100 animate-pulse"
							aria-label="Connect Connection"
						>
							<Wallet2Icon />
							Close Connection
						</Button>
					)}*/}
					{/*<div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-cover bg-center"></div>*/}
				</div>
			</div>
		</header>
	);
}

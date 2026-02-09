import {
	AppKitButton,
	AppKitConnectButton,
	AppKitNetworkButton,
	useAppKit,
	useAppKitAccount,
} from "@reown/appkit/react";
import { useAppKitWallet } from "@reown/appkit-wallet-button/react";
import {
	ChevronLeft,
	LockIcon,
	SendIcon,
	ShieldCheckIcon,
	WalletIcon,
} from "lucide-react";
import { useMemo } from "react";
import Swal from "sweetalert2";
import Header from "./components/shared/header.tsx";
import { Button } from "./components/ui/button.tsx";
import { getCookie } from "./lib/cookie.ts";

const data = JSON.parse(getCookie("direct-withdraw-data"));
const withdrawalAmount = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 3,
}).format(data.amount);

const App = () => {
	// const { isConnected } = useAppKitAccount({ namespace: "eip155" });
	const evmAccount = useAppKitAccount({ namespace: "eip155" });
	const solAccount = useAppKitAccount({ namespace: "solana" });
	const btcAccount = useAppKitAccount({ namespace: "bip122" });
	const isConnected = useMemo(() => {
		return (
			evmAccount.isConnected || solAccount.isConnected || btcAccount.isConnected
		);
	}, [evmAccount.isConnected, solAccount.isConnected, btcAccount.isConnected]);
	const { open } = useAppKit();
	console.log(solAccount.allAccounts);
	return (
		<>
			<Header />
			{/*<AppKitButton />
			<AppKitNetworkButton />*/}
			<main className="flex-grow flex items-center justify-center lg:p-6">
				<div className="w-full max-w-[500px] flex flex-col gap-4">
					<Button
						onClick={() => history.back()}
						size={"lg"}
						className="transition-all transform active:scale-[0.98] hadow-xl shadow-primary/30 hover:bg-primary/90"
						bg-primary
					>
						<ChevronLeft className="mr-2" />
						Back to Home
					</Button>
					{/**/}
					<div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
						{/**/}
						<div className="px-8 pt-8 pb-2 text-center">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Review Withdrawal
							</h2>
							<p className="text-sm text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest font-semibold">
								Step 2 of 2
							</p>
						</div>
						{/**/}
						<div className="px-8 py-8 space-y-6">
							<div className="space-y-4">
								<div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800/50">
									<span className="text-sm text-gray-500 dark:text-gray-400">
										Withdrawal Amount
									</span>
									<span className="font-semibold text-gray-900 dark:text-white">
										{withdrawalAmount}
									</span>
								</div>
								{/*<div className="flex justify-between items-start py-3 border-b border-gray-50 dark:border-gray-800/50">
									<span className="text-sm text-gray-500 dark:text-gray-400">
										Wallet Address
									</span>
									<span className="font-mono text-xs text-right text-gray-900 dark:text-white max-w-[200px] break-all">
										{address}
									</span>
								</div>*/}
								{/*<div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800/50">
									<span className="text-sm text-gray-500 dark:text-gray-400">
										Network Fee
									</span>
									<span className="font-medium text-gray-500 dark:text-gray-400">
										$8.72
									</span>
								</div>*/}
							</div>
							<div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border-2 border-primary/20 flex flex-col items-center justify-center space-y-2">
								<span className="text-xs font-bold uppercase tracking-widest text-primary/80">
									You will receive
								</span>
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
										{withdrawalAmount}
									</span>
								</div>
							</div>
							<div className="space-y-4 pt-2">
								{!isConnected && (
									<Button
										size={"lg"}
										onClick={async () => await open()}
										className="w-full py-3 shadow-xl text-lg hover:bg-primary/90"
									>
										<WalletIcon />
										Connect Wallet
									</Button>
								)}
								<button
									type="button"
									disabled={!isConnected}
									onClick={() => {
										Swal.fire({
											theme: "material-ui-light",
											icon: "error",
											title: "Error",
											text: "Something went wrong",
										});
									}}
									className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 text-lg disabled:animate-none btn-pulse disabled:opacity-15"
								>
									{/*transition-all transform hover:-translate-y-0.5 active:scale-[0.98] */}
									<SendIcon />
									Withdraw {withdrawalAmount}
								</button>
								{/*<button className="w-full py-2 text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
									Cancel and go back
								</button>*/}
							</div>
							<div className="flex items-center justify-center gap-4 pt-2">
								<div className="flex items-center gap-1.5 opacity-60">
									<ShieldCheckIcon className="h-5 w-5" />
									<span className="text-[11px] font-bold uppercase tracking-tighter text-gray-900 dark:text-white">
										Secure Protocol
									</span>
								</div>
								<div className="flex items-center gap-1.5 opacity-60">
									<LockIcon className="h-5 w-5" />
									<span className="text-[11px] font-bold uppercase tracking-tighter text-gray-900 dark:text-white">
										2FA Enabled
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
export default App;

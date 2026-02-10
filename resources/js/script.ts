import { WalletEnum } from "#enums/wallet_enum";

// @ts-expect-error
$(document).ready(async () => {
	//@ts-expect-error
	$(".select-coin").select2({
		placeholder: "Select coin",
		data: Object.keys(WalletEnum)
			.filter((key) => Number.isNaN(Number(key)))
			.map((key) => {
				return {
					id: key,
					namespace: WalletEnum[key as unknown as any],
					text: key,
				};
			}),
		// allowClear: true,
	});
	// const coinSelect = $(".select-coin");
	// const coinSelectTouched = false;
	// const chainSelect = $(".select-chain");
	// coinSelect.on("select2:opening", () => {
	// 	coinSelectTouched = true;
	// });
	// coinSelect.on("select2:select", (e) => {
	// 	if (coinSelectTouched) {
	// 		//@ts-expect-error
	// 		const namespace = e.params.data.namespace;
	// 		//@ts-expect-error
	// 		chainSelect.prop("disabled", false).select2({
	// 			// data: [{ id: 2, text: e.params.data.id }],
	// 			ajax: {
	// 				url: "https://explorer-api.walletconnect.com/v3/chains?projectId=860565723b152e68347c7fc220cf247a&testnets=false",
	// 				data: (_params) => {
	// 					var query = {
	// 						// search: params.term,
	// 						// page: params.page || 1
	// 						namespaces: namespace,
	// 					};

	// 					// Query parameters will be ?search=[term]&page=[page]
	// 					return query;
	// 				},
	// 				processResults: (data, _params) => {
	// 					const results = Object.entries(data.chains).map(
	// 						([_key, value]) => ({
	// 							id: JSON.stringify({
	// 								//@ts-expect-error
	// 								name: value.name,
	// 								//@ts-expect-error
	// 								rpc: value.rpc,
	// 								namespace,
	// 							}),
	// 							//@ts-expect-error
	// 							text: value.name,
	// 						}),
	// 					);
	// 					return {
	// 						results,
	// 					};
	// 				},
	// 			},
	// 		});
	// 	}
	// });
	// //@ts-expect-error
	// chainSelect.prop("disabled", true).select2({
	// 	placeholder: "Select chain",
	// });

	// $("form[name='withdraw-direct']").on("submit", async (e) => {
	// 	e.preventDefault();
	// 	const form = e.target;
	// 	if (!(form instanceof HTMLFormElement)) return;
	// 	const _formData = new FormData(form);
	// 	// await setup();
	// 	// await handleConnect();
	// 	// console.log(formData);
	// });
	// //@ts-expect-error
	// $("form[name='withdraw-direct']").validate({
	// 	submitHandler: (form: HTMLFormElement) => {
	// 		// console.log(form);
	// 		form.submit();
	// 	},
	// });
});

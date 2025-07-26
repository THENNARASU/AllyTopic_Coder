import { useState, useCallback, useEffect } from "react"
import { useEvent } from "react-use"
import { Checkbox } from "vscrui"
import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"

import {
	type ProviderSettings,
	type ModelInfo,
	type ReasoningEffort,
	type OrganizationAllowList,
	azureOpenAiDefaultApiVersion,
	openAiModelInfoSaneDefaults,
} from "@roo-code/types"

import { ExtensionMessage } from "@roo/ExtensionMessage"

import { useAppTranslation } from "@src/i18n/TranslationContext"
import { Button, StandardTooltip } from "@src/components/ui"

import { convertHeadersToObject } from "../utils/headers"
import { inputEventTransform, noTransform } from "../transforms"
import { ModelPicker } from "../ModelPicker"
import { R1FormatSetting } from "../R1FormatSetting"
import { ThinkingBudget } from "../ThinkingBudget"

type OpenAICompatibleProps = {
	apiConfiguration: ProviderSettings
	setApiConfigurationField: (field: keyof ProviderSettings, value: ProviderSettings[keyof ProviderSettings]) => void
	organizationAllowList: OrganizationAllowList
	modelValidationError?: string
}

export const OpenAICompatible = ({
	apiConfiguration,
	setApiConfigurationField,
	organizationAllowList,
	modelValidationError,
}: OpenAICompatibleProps) => {
	const { t } = useAppTranslation()

	const [azureApiVersionSelected, setAzureApiVersionSelected] = useState(!!apiConfiguration?.azureApiVersion)
	const [openAiLegacyFormatSelected, setOpenAiLegacyFormatSelected] = useState(!!apiConfiguration?.openAiLegacyFormat)

	const [openAiModels, setOpenAiModels] = useState<Record<string, ModelInfo> | null>(null)

	const [customHeaders, setCustomHeaders] = useState<[string, string][]>(() => {
		const headers = apiConfiguration?.openAiHeaders || {}
		return Object.entries(headers)
	})

	const handleAddCustomHeader = useCallback(() => {
		// Only update the local state to show the new row in the UI.
		setCustomHeaders((prev) => [...prev, ["", ""]])
		// Do not update the main configuration yet, wait for user input.
	}, [])

	const handleUpdateHeaderKey = useCallback((index: number, newKey: string) => {
		setCustomHeaders((prev) => {
			const updated = [...prev]

			if (updated[index]) {
				updated[index] = [newKey, updated[index][1]]
			}

			return updated
		})
	}, [])

	const handleUpdateHeaderValue = useCallback((index: number, newValue: string) => {
		setCustomHeaders((prev) => {
			const updated = [...prev]

			if (updated[index]) {
				updated[index] = [updated[index][0], newValue]
			}

			return updated
		})
	}, [])

	const handleRemoveCustomHeader = useCallback((index: number) => {
		setCustomHeaders((prev) => prev.filter((_, i) => i !== index))
	}, [])

	// Helper to convert array of tuples to object

	// Add effect to update the parent component's state when local headers change
	useEffect(() => {
		const timer = setTimeout(() => {
			const headerObject = convertHeadersToObject(customHeaders)
			setApiConfigurationField("openAiHeaders", headerObject)
		}, 300)

		return () => clearTimeout(timer)
	}, [customHeaders, setApiConfigurationField])

	const handleInputChange = useCallback(
		<K extends keyof ProviderSettings, E>(
			field: K,
			transform: (event: E) => ProviderSettings[K] = inputEventTransform,
		) =>
			(event: E | Event) => {
				setApiConfigurationField(field, transform(event as E))
			},
		[setApiConfigurationField],
	)

	const onMessage = useCallback((event: MessageEvent) => {
		const message: ExtensionMessage = event.data

		switch (message.type) {
			case "openAiModels": {
				const updatedModels = message.openAiModels ?? []
				setOpenAiModels(Object.fromEntries(updatedModels.map((item) => [item, openAiModelInfoSaneDefaults])))
				break
			}
		}
	}, [])

	useEvent("message", onMessage)

	return (
		<>
			<VSCodeTextField
				value={apiConfiguration?.openAiBaseUrl || ""}
				type="url"
				onInput={handleInputChange("openAiBaseUrl")}
				placeholder={t("settings:placeholders.baseUrl")}
				className="w-full">
				<label className="block font-medium mb-1">{t("settings:providers.openAiBaseUrl")}</label>
			</VSCodeTextField>
			<VSCodeTextField
				value={apiConfiguration?.openAiApiKey || ""}
				type="password"
				onInput={handleInputChange("openAiApiKey")}
				placeholder={t("settings:placeholders.apiKey")}
				className="w-full">
				<label className="block font-medium mb-1">{t("settings:providers.apiKey")}</label>
			</VSCodeTextField>
			<ModelPicker
				apiConfiguration={apiConfiguration}
				setApiConfigurationField={setApiConfigurationField}
				defaultModelId="gpt-4o"
				models={openAiModels}
				modelIdKey="openAiModelId"
				serviceName="OpenAI"
				serviceUrl="https://platform.openai.com"
				organizationAllowList={organizationAllowList}
				errorMessage={modelValidationError}
			/>
			<div className="flex flex-col gap-3">

				<div>
					<VSCodeTextField
						value={
							apiConfiguration?.openAiCustomModelInfo?.contextWindow?.toString() ||
							openAiModelInfoSaneDefaults.contextWindow?.toString() ||
							""
						}
						type="text"
						style={{
							borderColor: (() => {
								const value = apiConfiguration?.openAiCustomModelInfo?.contextWindow

								if (!value) {
									return "var(--vscode-input-border)"
								}

								return value > 0 ? "var(--vscode-charts-green)" : "var(--vscode-errorForeground)"
							})(),
						}}
						onInput={handleInputChange("openAiCustomModelInfo", (e) => {
							const value = (e.target as HTMLInputElement).value
							const parsed = parseInt(value)

							return {
								...(apiConfiguration?.openAiCustomModelInfo || openAiModelInfoSaneDefaults),
								contextWindow: isNaN(parsed) ? openAiModelInfoSaneDefaults.contextWindow : parsed,
							}
						})}
						placeholder={t("settings:placeholders.numbers.contextWindow")}
						className="w-full">
						<label className="block font-medium mb-1">
							{t("settings:providers.customModel.contextWindow.label")}
						</label>
					</VSCodeTextField>
					<div className="text-sm text-vscode-descriptionForeground">
						{t("settings:providers.customModel.contextWindow.description")}
					</div>
				</div>
			</div>
		</>
	)
}

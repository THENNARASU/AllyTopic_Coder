import { Checkbox } from "vscrui"

import { useAppTranslation } from "@/i18n/TranslationContext"

interface R1FormatSettingProps {
	onChange: (value: boolean) => void
	openAiR1FormatEnabled?: boolean
}

export const R1FormatSetting = ({ onChange, openAiR1FormatEnabled }: R1FormatSettingProps) => {
	const { t } = useAppTranslation()

	return (
		<div>
		</div>
	)
}

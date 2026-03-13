import { useMemo } from "react"
import { useExtensionState } from "@src/context/ExtensionStateContext"

/**
 * Custom hook that creates and returns the auto-approval toggles object
 * This encapsulates the logic for creating the toggles object from extension state
 */
export function useAutoApprovalToggles() {
	const {
		alwaysAllowReadOnly,
		alwaysAllowWrite,
		alwaysAllowExecute,
		alwaysAllowModeSwitch,
		alwaysAllowBrowser,
		alwaysAllowSubtasks,
		alwaysApproveResubmit,
		alwaysAllowFollowupQuestions,
		alwaysAllowMcp,
		alwaysAllowUpdateTodoList,
	} = useExtensionState()

	const toggles = useMemo(
		() => ({
			alwaysAllowReadOnly,
			alwaysAllowWrite,
			alwaysAllowExecute,
			alwaysAllowModeSwitch,
			alwaysAllowBrowser,
			alwaysAllowSubtasks,
			alwaysApproveResubmit,
			alwaysAllowFollowupQuestions,
			alwaysAllowMcp,
			alwaysAllowUpdateTodoList,
		}),
		[
			alwaysAllowReadOnly,
			alwaysAllowWrite,
			alwaysAllowExecute,
			alwaysAllowModeSwitch,
			alwaysAllowBrowser,
			alwaysAllowSubtasks,
			alwaysApproveResubmit,
			alwaysAllowFollowupQuestions,
			alwaysAllowMcp,
			alwaysAllowUpdateTodoList,
		],
	)

	return toggles
}

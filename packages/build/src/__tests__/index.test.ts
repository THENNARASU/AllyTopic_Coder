// npx vitest run src/__tests__/index.test.ts

import { generatePackageJson } from "../index.js"

describe("generatePackageJson", () => {
	it("should be a test", () => {
		const generatedPackageJson = generatePackageJson({
			packageJson: {
				name: "allytopic-coder",
				displayName: "%extension.displayName%",
				description: "%extension.description%",
				publisher: "AllyTopic",
				version: "3.17.2",
				icon: "assets/icons/icon.png",
				contributes: {
					viewsContainers: {
						activitybar: [
							{
								id: "allytopic-coder-ActivityBar",
								title: "%views.activitybar.title%",
								icon: "assets/icons/icon.svg",
							},
						],
					},
					views: {
						"allytopic-coder-ActivityBar": [
							{
								type: "webview",
								id: "allytopic-coder.SidebarProvider",
								name: "",
							},
						],
					},
					commands: [
						{
							command: "allytopic-coder.plusButtonClicked",
							title: "%command.newTask.title%",
							icon: "$(add)",
						},
						{
							command: "allytopic-coder.openInNewTab",
							title: "%command.openInNewTab.title%",
							category: "%configuration.title%",
						},
					],
					menus: {
						"editor/context": [
							{
								submenu: "allytopic-coder.contextMenu",
								group: "navigation",
							},
						],
						"allytopic-coder.contextMenu": [
							{
								command: "allytopic-coder.addToContext",
								group: "1_actions@1",
							},
						],
						"editor/title": [
							{
								command: "allytopic-coder.plusButtonClicked",
								group: "navigation@1",
								when: "activeWebviewPanelId == allytopic-coder.TabPanelProvider",
							},
							{
								command: "allytopic-coder.settingsButtonClicked",
								group: "navigation@6",
								when: "activeWebviewPanelId == allytopic-coder.TabPanelProvider",
							},
							{
								command: "allytopic-coder.accountButtonClicked",
								group: "navigation@6",
								when: "activeWebviewPanelId == allytopic-coder.TabPanelProvider",
							},
						],
					},
					submenus: [
						{
							id: "allytopic-coder.contextMenu",
							label: "%views.contextMenu.label%",
						},
						{
							id: "allytopic-coder.terminalMenu",
							label: "%views.terminalMenu.label%",
						},
					],
					configuration: {
						title: "%configuration.title%",
						properties: {
							"allytopic-coder.allowedCommands": {
								type: "array",
								items: {
									type: "string",
								},
								default: ["npm test", "npm install", "tsc", "git log", "git diff", "git show"],
								description: "%commands.allowedCommands.description%",
							},
							"allytopic-coder.customStoragePath": {
								type: "string",
								default: "",
								description: "%settings.customStoragePath.description%",
							},
						},
					},
				},
				scripts: {
					lint: "eslint **/*.ts",
				},
			},
			overrideJson: {
				name: "allytopic-coder-nightly",
				displayName: "AllyTopic Coder Nightly",
				publisher: "AllyTopic",
				version: "0.0.1",
				icon: "assets/icons/icon-nightly.png",
				scripts: {},
			},
			substitution: ["allytopic-coder", "roo-code-nightly"],
		})

		expect(generatedPackageJson).toStrictEqual({
			name: "allytopic-coder-nightly",
			displayName: "AllyTopic Coder Nightly",
			description: "%extension.description%",
			publisher: "AllyTopic",
			version: "0.0.1",
			icon: "assets/icons/icon-nightly.png",
			contributes: {
				viewsContainers: {
					activitybar: [
						{
							id: "roo-code-nightly-ActivityBar",
							title: "%views.activitybar.title%",
							icon: "assets/icons/icon.svg",
						},
					],
				},
				views: {
					"roo-code-nightly-ActivityBar": [
						{
							type: "webview",
							id: "roo-code-nightly.SidebarProvider",
							name: "",
						},
					],
				},
				commands: [
					{
						command: "roo-code-nightly.plusButtonClicked",
						title: "%command.newTask.title%",
						icon: "$(add)",
					},
					{
						command: "roo-code-nightly.openInNewTab",
						title: "%command.openInNewTab.title%",
						category: "%configuration.title%",
					},
				],
				menus: {
					"editor/context": [
						{
							submenu: "roo-code-nightly.contextMenu",
							group: "navigation",
						},
					],
					"roo-code-nightly.contextMenu": [
						{
							command: "roo-code-nightly.addToContext",
							group: "1_actions@1",
						},
					],
					"editor/title": [
						{
							command: "roo-code-nightly.plusButtonClicked",
							group: "navigation@1",
							when: "activeWebviewPanelId == roo-code-nightly.TabPanelProvider",
						},
						{
							command: "roo-code-nightly.settingsButtonClicked",
							group: "navigation@6",
							when: "activeWebviewPanelId == roo-code-nightly.TabPanelProvider",
						},
						{
							command: "roo-code-nightly.accountButtonClicked",
							group: "navigation@6",
							when: "activeWebviewPanelId == roo-code-nightly.TabPanelProvider",
						},
					],
				},
				submenus: [
					{
						id: "roo-code-nightly.contextMenu",
						label: "%views.contextMenu.label%",
					},
					{
						id: "roo-code-nightly.terminalMenu",
						label: "%views.terminalMenu.label%",
					},
				],
				configuration: {
					title: "%configuration.title%",
					properties: {
						"roo-code-nightly.allowedCommands": {
							type: "array",
							items: {
								type: "string",
							},
							default: ["npm test", "npm install", "tsc", "git log", "git diff", "git show"],
							description: "%commands.allowedCommands.description%",
						},
						"roo-code-nightly.customStoragePath": {
							type: "string",
							default: "",
							description: "%settings.customStoragePath.description%",
						},
					},
				},
			},
			scripts: {},
		})
	})
})

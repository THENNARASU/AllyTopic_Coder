import path from "path"
import { RooProtectedController } from "../RooProtectedController"

describe("RooProtectedController", () => {
	const TEST_CWD = "/test/workspace"
	let controller: RooProtectedController

	beforeEach(() => {
		controller = new RooProtectedController(TEST_CWD)
	})

	describe("isWriteProtected", () => {
		it("should protect .allytopicignore file", () => {
			expect(controller.isWriteProtected(".allytopicignore")).toBe(true)
		})

		it("should protect files in .allytopic directory", () => {
			expect(controller.isWriteProtected(".allytopic/config.json")).toBe(true)
			expect(controller.isWriteProtected(".allytopic/settings/user.json")).toBe(true)
			expect(controller.isWriteProtected(".allytopic/modes/custom.json")).toBe(true)
		})

		it("should protect .rooprotected file", () => {
			expect(controller.isWriteProtected(".rooprotected")).toBe(true)
		})

		it("should protect .allytopicmodes files", () => {
			expect(controller.isWriteProtected(".allytopicmodes")).toBe(true)
		})

		it("should protect .roorules* files", () => {
			expect(controller.isWriteProtected(".roorules")).toBe(true)
			expect(controller.isWriteProtected(".roorules.md")).toBe(true)
		})

		it("should protect .clinerules* files", () => {
			expect(controller.isWriteProtected(".clinerules")).toBe(true)
			expect(controller.isWriteProtected(".clinerules.md")).toBe(true)
		})

		it("should protect files in .vscode directory", () => {
			expect(controller.isWriteProtected(".vscode/settings.json")).toBe(true)
			expect(controller.isWriteProtected(".vscode/launch.json")).toBe(true)
			expect(controller.isWriteProtected(".vscode/tasks.json")).toBe(true)
		})

		it("should not protect other files starting with .allytopic", () => {
			expect(controller.isWriteProtected(".allytopicsettings")).toBe(false)
			expect(controller.isWriteProtected(".allytopicconfig")).toBe(false)
		})

		it("should not protect regular files", () => {
			expect(controller.isWriteProtected("src/index.ts")).toBe(false)
			expect(controller.isWriteProtected("package.json")).toBe(false)
			expect(controller.isWriteProtected("README.md")).toBe(false)
		})

		it("should not protect files that contain 'roo' but don't start with .roo", () => {
			expect(controller.isWriteProtected("src/roo-utils.ts")).toBe(false)
			expect(controller.isWriteProtected("config/roo.config.js")).toBe(false)
		})

		it("should handle nested paths correctly", () => {
			expect(controller.isWriteProtected(".allytopic/config.json")).toBe(true) // .allytopic/** matches at root
			expect(controller.isWriteProtected("nested/.allytopicignore")).toBe(true) // .allytopicignore matches anywhere by default
			expect(controller.isWriteProtected("nested/.allytopicmodes")).toBe(true) // .allytopicmodes matches anywhere by default
			expect(controller.isWriteProtected("nested/.roorules.md")).toBe(true) // .roorules* matches anywhere by default
		})

		it("should handle absolute paths by converting to relative", () => {
			const absolutePath = path.join(TEST_CWD, ".allytopicignore")
			expect(controller.isWriteProtected(absolutePath)).toBe(true)
		})

		it("should handle paths with different separators", () => {
			expect(controller.isWriteProtected(".allytopic\\config.json")).toBe(true)
			expect(controller.isWriteProtected(".allytopic/config.json")).toBe(true)
		})
	})

	describe("getProtectedFiles", () => {
		it("should return set of protected files from a list", () => {
			const files = ["src/index.ts", ".allytopicignore", "package.json", ".allytopic/config.json", "README.md"]

			const protectedFiles = controller.getProtectedFiles(files)

			expect(protectedFiles).toEqual(new Set([".allytopicignore", ".allytopic/config.json"]))
		})

		it("should return empty set when no files are protected", () => {
			const files = ["src/index.ts", "package.json", "README.md"]

			const protectedFiles = controller.getProtectedFiles(files)

			expect(protectedFiles).toEqual(new Set())
		})
	})

	describe("annotatePathsWithProtection", () => {
		it("should annotate paths with protection status", () => {
			const files = ["src/index.ts", ".allytopicignore", ".allytopic/config.json", "package.json"]

			const annotated = controller.annotatePathsWithProtection(files)

				expect(annotated).toEqual([
					{ path: "src/index.ts", isProtected: false },
					{ path: ".allytopicignore", isProtected: true },
					{ path: ".allytopic/config.json", isProtected: true },
					{ path: "package.json", isProtected: false },
				])
		})
	})

	describe("getProtectionMessage", () => {
		it("should return appropriate protection message", () => {
			const message = controller.getProtectionMessage()
			expect(message).toBe("This is a Roo configuration file and requires approval for modifications")
		})
	})

	describe("getInstructions", () => {
		it("should return formatted instructions about protected files", () => {
			const instructions = controller.getInstructions()

			expect(instructions).toContain("# Protected Files")
			expect(instructions).toContain("write-protected")
			expect(instructions).toContain(".allytopicignore")
			expect(instructions).toContain(".allytopic/**")
			expect(instructions).toContain("\u{1F6E1}") // Shield symbol
		})
	})

	describe("getProtectedPatterns", () => {
		it("should return the list of protected patterns", () => {
			const patterns = RooProtectedController.getProtectedPatterns()

			expect(patterns).toEqual([
				".allytopicignore",
				".allytopicmodes",
				".roorules*",
				".clinerules*",
				".allytopic/**",
				".vscode/**",
				".rooprotected",
			])
		})
	})
})

import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import clsx from "clsx"

interface Tip {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}
const tips: Tip[] = [
  // Example:
  // { icon: "codicon-lightbulb", titleKey: "tip.title", descriptionKey: "tip.description" }
]

interface RooTipsProps {
	cycle?: boolean
}

const RooTips = ({ cycle = false }: RooTipsProps) => {
	const { t } = useTranslation("chat")
	const [currentTipIndex, setCurrentTipIndex] = useState(tips.length > 0 ? Math.floor(Math.random() * tips.length) : 0)
	const [isFading, setIsFading] = useState(false)

	useEffect(() => {
		if (!cycle || tips.length === 0) return

		let timeoutId: NodeJS.Timeout | undefined = undefined
		const intervalId = setInterval(() => {
			setIsFading(true) // Start fade out
			timeoutId = setTimeout(() => {
				setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length)
				setIsFading(false) // Start fade in
			}, 1000) // Fade duration
		}, 11000) // 10s display + 1s fade

		return () => {
			clearInterval(intervalId)
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
	}, [cycle])

	const currentTip = tips.length > 0 ? tips[currentTipIndex] : undefined
	const topTwoTips = tips.length > 0 ? tips.slice(0, 2) : []

 return (
   <div
	 className={clsx(
	   "flex flex-col items-center justify-center px-5 py-2.5 gap-4",
	   cycle && "h-[5em] overflow-visible m-5",
	 )}
   >
	 {/* If we need real estate, we show a compressed version of the tips. Otherwise, we expand it. */}
	 {tips.length === 0 ? (
	   <div className="opacity-50">No tips available.</div>
	 ) : cycle ? (
	   <>
		 <div className="opacity-70 pb-1"> Did you know about...</div>
		 {currentTip && (
		   <div
			 className={clsx(
			   "flex items-center gap-2 text-vscode-editor-foreground font-vscode max-w-[250px] transition-opacity duration-1000 ease-in-out",
			   isFading ? "opacity-0" : "opacity-70",
			 )}
		   >
			 <span className={`codicon ${currentTip.icon}`}></span>
			 <span>
			   <span>{t(currentTip.titleKey)}</span>: {t(currentTip.descriptionKey)}
			 </span>
		   </div>
		 )}
	   </>
	 ) : (
	   topTwoTips.map((tip) => (
		 <div
		   key={tip.titleKey}
		   className="flex items-center gap-2 text-vscode-editor-foreground font-vscode max-w-[250px]"
		 >
		   <span className={`codicon ${tip.icon}`}></span>
		   <span>
			 <span>{t(tip.titleKey)}</span>: {t(tip.descriptionKey)}
		   </span>
		 </div>
	   ))
	 )}
   </div>
 )
}

export default RooTips

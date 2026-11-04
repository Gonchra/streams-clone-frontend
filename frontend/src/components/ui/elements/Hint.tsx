import { type PropsWithChildren } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/common/tooltip'

interface HintProps {
	label: string
	asChild?: boolean
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
}

export function Hint({ children, align, label, side, asChild }: PropsWithChildren<HintProps>) {

	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent className='bg-[#1f2128] text-white dark:text-[#1f2128] dark:bg-white' side={side} align={align}>
					<p className="font-semibold">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
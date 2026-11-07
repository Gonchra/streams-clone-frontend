'use client'

import { cva, VariantProps } from 'class-variance-authority'
import { FindProfileQuery } from '@/gql/graphql'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/common/avatar'
import { cn } from '@/utils/tw-merge'
import { getMediaSource } from '@/utils/get-media-source'
import { Check } from 'lucide-react'

const channelVerifiedSizes = cva('', {
	variants: {
		size: {
			sm: 'size-3',
			default: 'size-4',
		},
		defaultVariants: {
			size: 'default'
		}
	}
})

interface ChannelVerifiedProps extends VariantProps<typeof channelVerifiedSizes> {
}

export function ChannelVerified({ size }: ChannelVerifiedProps) {

	return (
		<span className={cn('flex items-center justify-center rounded-full bg-primary p-0.5', channelVerifiedSizes({size}))}>
			<Check className={cn('stroke-[4px] text-white', size === 'sm' ? 'size-2' : 'size-[11px]')} />
		</span>
	)
}
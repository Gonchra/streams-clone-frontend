'use client'

import { cva, VariantProps } from 'class-variance-authority'
import { FindProfileQuery } from '@/gql/graphql'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/common/avatar'
import { cn } from '@/utils/tw-merge'
import { getMediaSource } from '@/utils/get-media-source'

const avatarSizes = cva('', {
	variants: {
		size: {
			sm: 'size-7',
			default: 'size-9',
			lg: 'size-14'
		},
		defaultVariants: {
			size: 'default'
		}
	}
})

interface ChannelAvatarProps extends VariantProps<typeof avatarSizes> {
	channel: Pick<FindProfileQuery['findProfile'], 'username' | 'avatar'>
	isLive?: boolean
}

export function ChannelAvatar({ size, channel, isLive }: ChannelAvatarProps) {

	return (
		<div className="relative">
			<Avatar className={cn(avatarSizes({ size }), isLive && 'ring-2 ring-rose-500')}>
				<AvatarImage src={channel.avatar ? getMediaSource(channel.avatar) : ''} className="object-cover" />
				<AvatarFallback>
					{channel.username?.length > 0 && channel.username[0]}
				</AvatarFallback>
			</Avatar>
		</div>
	)
}
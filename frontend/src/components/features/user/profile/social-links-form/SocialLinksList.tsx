'use client'

import { useTranslations } from 'next-intl'
import {useFindSocialLinksQuery, useReorderSocialLinksMutation} from '@/graphql/generated/output'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd'
import { Separator } from '@/components/ui/common/separator'
import { SocialLinkItem } from '@/components/features/user/profile/social-links-form/SocialLinkItem'
import {toast} from "sonner";

export function SocialLinksList() {
	const t = useTranslations('dashboard.settings.profile.socialLinks')

	const { data, refetch } = useFindSocialLinksQuery()
	const items = data?.findSocialLinks ?? []

	const [socialLinks, setSocialLinks] = useState(items)

	useEffect(() => {
		setSocialLinks(items)
	}, [items])

	const [reorder, {loading: isLoadingReorder}] = useReorderSocialLinksMutation({
		onCompleted() {
			refetch()
			toast.success(t('successReorderMessage'))
		},
		onError() {
			toast.error(t('errorReorderMessage'))
		}
	})

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return
		}

		const items = Array.from(socialLinks)
		const [reorderItem] = items.splice(result.source.index, 1)
		console.log(reorderItem)
		items.splice(result.destination.index, 0, reorderItem)

		const bulkUpdateData = items.map((socialLink, index) => ({
			id: socialLink.id,
			position: index
		}))

		setSocialLinks(items)

		reorder({variables: {list: bulkUpdateData}})
	}


	return socialLinks.length ? (
		<>
			<Separator />
			<div className="px-5 mt-5">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="socialLinks">
						{provided => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{socialLinks.map((socialLink, index) => (
									<Draggable
										key={socialLink.id}
										draggableId={socialLink.id!}
										index={index}
										isDragDisabled={isLoadingReorder}
									>
										{provided => (
											<SocialLinkItem
												key={socialLink.id}
												socialLink={socialLink}
												provided={provided}
											/>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	) : null
}
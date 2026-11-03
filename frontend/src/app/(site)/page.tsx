'use client'

import { useCurrent } from '@/hooks/useCurrent'

export default function HomePage() {
	const {user, isLoadingProfile} = useCurrent()

	return (
		<div>
			{isLoadingProfile ? <div>Loading...</div> : JSON.stringify(user)}

		</div>
	)
}
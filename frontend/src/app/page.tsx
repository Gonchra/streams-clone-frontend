'use client'

import {useTranslations} from 'next-intl'
import { Button } from '@/components/ui/common/button'

export default function HomePage() {
	const t = useTranslations('home')

	return (
		<div>
			Home
		</div>
	)
}
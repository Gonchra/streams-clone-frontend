'use client'

import { useTranslations } from 'next-intl'
import { useCurrent } from '@/hooks/useCurrent'
import { Skeleton } from '@/components/ui/common/skeleton'
import { CardContainer } from '@/components/ui/elements/CardContainer'
import { EnableTOTP } from '@/components/features/user/account/totp/EnableTOTP'
import { DisableTOTP } from '@/components/features/user/account/totp/DisableTOTP'

export function WrapperTOTP() {
	const t = useTranslations('dashboard.settings.account.twoFactor')

	const { user, isLoadingProfile } = useCurrent()

	return isLoadingProfile ? (
		<WrapperTOTPSkeleton />
	) : (
		<CardContainer heading={t('heading')} description={t('description')} rightContent={(
			<div className="gap-x-4 flex items-center">
				{!user?.isTotpEnabled ? <EnableTOTP /> : <DisableTOTP />}
			</div>
		)}>

		</CardContainer>
	)
}

export function WrapperTOTPSkeleton() {
	return <Skeleton className="h-24 w-full" />
}
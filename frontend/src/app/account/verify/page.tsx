import { redirect } from 'next/navigation'
import { VerifyAccountForm } from '@/components/features/auth/forms/VerifyAccountForm'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

interface VerifyAccountProps {
	searchParams: Promise<{token: string}>
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.verify')

	return {
		title: t('heading')
	}
}

export default async function VerifyAccountPage({ searchParams }: VerifyAccountProps) {
	const {token} = await searchParams

	if(!token) {
		return redirect('/account/create')
	}

	return <VerifyAccountForm />
}
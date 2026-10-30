import { NewPasswordForm } from '@/components/features/auth/forms/NewPasswordForm'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface NewPasswordProps {
	params: Promise<{token: string}>
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.newPassword')

	return {
		title: t('heading')
	}
}

export default function NewPasswordPage({params}: NewPasswordProps) {
	return (
		<NewPasswordForm />
	)
}
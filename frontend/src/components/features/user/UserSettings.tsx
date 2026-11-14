'use client'

import { useTranslations } from 'next-intl'
import { Heading } from '@/components/ui/elements/Heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/common/tabs'
import { ChangeAvatarForm } from '@/components/features/user/profile/ChangeAvatarForm'
import { ChangeInfoForm } from '@/components/features/user/profile/ChangeInfoForm'
import { SocialLinksForm } from '@/components/features/user/profile/social-links-form/SocialLinksForm'

export function UserSettings() {
	const t = useTranslations('dashboard.settings')

	return (
		<div className="lg:px-10">
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size="lg"
			/>
			<Tabs defaultValue="profile" className="w-full mt-3">
				<TabsList className="grid grid-cols-5 w-full max-w-2xl">
					<TabsTrigger value="profile">
						{t('header.profile')}
					</TabsTrigger>
					<TabsTrigger value="account">
						{t('header.account')}
					</TabsTrigger>
					<TabsTrigger value="appearance">
						{t('header.appearance')}
					</TabsTrigger>
					<TabsTrigger value="notifications">
						{t('header.notifications')}
					</TabsTrigger>
					<TabsTrigger value="sessions">
						{t('header.sessions')}
					</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<div className="mt-5 space-y-6">
						<Heading title={t('profile.header.heading')} description={t('profile.header.description')} />
						<ChangeAvatarForm />
						<ChangeInfoForm />
						<SocialLinksForm />
					</div>
				</TabsContent>
				<TabsContent value="account">2</TabsContent>
				<TabsContent value="appearance">3</TabsContent>
				<TabsContent value="notifications">4</TabsContent>
				<TabsContent value="sessions">5</TabsContent>
			</Tabs>
		</div>
	)
}
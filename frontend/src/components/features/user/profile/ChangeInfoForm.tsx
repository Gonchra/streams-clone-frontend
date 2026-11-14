'use client'

import { useForm } from 'react-hook-form'
import { changeInfoSchema, TypeChangeInfoSchema } from '@/schemas/user/change-info.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useCurrent } from '@/hooks/useCurrent'
import { Skeleton } from '@/components/ui/common/skeleton'
import { FormWrapper } from '@/components/ui/elements/FormWrapper'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import { Textarea } from '@/components/ui/common/textarea'
import { Button } from '@/components/ui/common/button'
import { useChangeProfileInfoMutation } from '@/graphql/generated/output'
import { toast } from 'sonner'

export function ChangeInfoForm() {
	const t = useTranslations('dashboard.settings.profile.info')

	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<TypeChangeInfoSchema>({
		resolver: zodResolver(changeInfoSchema),
		values: {
			displayName: user?.displayName ?? '',
			username: user?.username ?? '',
			bio: user?.bio ?? ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangeProfileInfoMutation({
		onCompleted() {
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid, isDirty } = form.formState

	const onSubmit = (data: TypeChangeInfoSchema) => {
		update({ variables: { data } })
	}

	return isLoadingProfile ? (
		<ChangeInfoFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('usernameLabel')}</FormLabel>
								<FormControl>
									<Input
										disabled={isLoadingUpdate}
										placeholder={t('usernamePlaceholder')}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t('usernameDescription')}
								</FormDescription>
							</FormItem>
						)}
						name="username"
					/>
					<Separator />

					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('displayNameLabel')}</FormLabel>
								<FormControl>
									<Input
										disabled={isLoadingUpdate}
										placeholder={t('displayNamePlaceholder')}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t('displayNameDescription')}
								</FormDescription>
							</FormItem>
						)}
						name="displayName"
					/>
					<Separator />
					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('bioLabel')}</FormLabel>
								<FormControl>
									<Textarea
										disabled={isLoadingUpdate}
										placeholder={t('bioPlaceholder')}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t('bioDescription')}
								</FormDescription>
							</FormItem>
						)}
						name="bio"
					/>
					<Separator />
					<div className="flex justify-end p-5">
						<Button disabled={!isValid || !isDirty || isLoadingUpdate}>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}

export function ChangeInfoFormSkeleton() {
	return (
		<Skeleton className="h-96 w-full" />
	)
}
'use client'

import { FormWrapper } from '@/components/ui/elements/FormWrapper'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { socialLinksSchema, TypeSocialLinksSchema } from '@/schemas/user/social-links.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateSocialLinkMutation, useFindSocialLinksQuery } from '@/graphql/generated/output'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/common/form'
import { toast } from 'sonner'
import { Input } from '@/components/ui/common/input'
import { Skeleton } from '@/components/ui/common/skeleton'
import { Separator } from '@/components/ui/common/separator'
import { Button } from '@/components/ui/common/button'

export function SocialLinksForm() {
	const t = useTranslations('dashboard.settings.profile.socialLinks.createForm')

	const { loading: isLoadingLinks, refetch } = useFindSocialLinksQuery()

	const form = useForm<TypeSocialLinksSchema>({
		resolver: zodResolver(socialLinksSchema),
		defaultValues: {
			url: '',
			title: ''
		}
	})

	const [create, { loading: isLoadingCreate }] = useCreateSocialLinkMutation({
		onCompleted() {
			form.reset()
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid } = form.formState

	const onSubmit = (data: TypeSocialLinksSchema) => {
		create({ variables: { data } })
	}

	return isLoadingLinks ? (
		<SocialLinksFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('titleLabel')}</FormLabel>
								<FormControl>
									<Input
										disabled={isLoadingCreate}
										placeholder={t('titlePlaceholder')}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t('titleDescription')}
								</FormDescription>
							</FormItem>
						)}
						name="title"
					/>
					<Separator />
					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('urlLabel')}</FormLabel>
								<FormControl>
									<Input
										disabled={isLoadingCreate}
										placeholder={t('urlPlaceholder')}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t('urlDescription')}
								</FormDescription>
							</FormItem>
						)}
						name="url"
					/>
					<Separator />
					<div className="flex justify-end p-5">
						<Button
							disabled={!isValid || isLoadingCreate}
						>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}

export function SocialLinksFormSkeleton() {
	return <Skeleton className="h-72 w-full" />
}
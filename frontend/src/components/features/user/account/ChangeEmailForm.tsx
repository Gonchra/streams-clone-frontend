'use client'

import { useTranslations } from 'next-intl'
import { useCurrent } from '@/hooks/useCurrent'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useChangeEmailMutation } from '@/graphql/generated/output'
import { toast } from 'sonner'
import { changeEmailSchema, TypeChangeEmailSchema } from '@/schemas/user/change-email.schema'
import { Skeleton } from '@/components/ui/common/skeleton'
import { FormWrapper } from '@/components/ui/elements/FormWrapper'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import { Button } from '@/components/ui/common/button'

export function ChangeEmailForm() {
	const t = useTranslations('dashboard.settings.account.email')

	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<TypeChangeEmailSchema>({
		resolver: zodResolver(changeEmailSchema),
		values: {
			email: user?.email ?? ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangeEmailMutation({
		onCompleted() {
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid, isDirty } = form.formState

	const onSubmit = (data: TypeChangeEmailSchema) => {
		update({ variables: { data } })
	}

	return isLoadingProfile ? (
		<ChangeEmailFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('emailLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder='john.doe@example.com'
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t('emailDescription')}
								</FormDescription>
							</FormItem>
						)}
						name="email"
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

export function ChangeEmailFormSkeleton() {
	return <Skeleton className='h-64 w-full' />
}
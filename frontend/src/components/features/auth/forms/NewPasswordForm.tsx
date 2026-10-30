'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { newPasswordSchema, TypeNewPasswordSchema } from '@/schemas/auth/new-password.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNewPasswordMutation } from '@/graphql/generated/output'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { Button } from '@/components/ui/common/button'
import { AuthWrapper } from '@/components/features/auth/AuthWrapper'

export function NewPasswordForm() {
	const t = useTranslations('auth.newPassword')

	const router = useRouter()
	const params = useParams<{ token: string }>()

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
			passwordRepeat: ''
		}
	})

	const [newPassword, { loading: isLoadingNew }] = useNewPasswordMutation({
		onCompleted(data) {
			toast.success(t('successMessage'))
			router.push('/account/login')
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid } = form.formState

	const onSubmit = (data: TypeNewPasswordSchema) => {
		newPassword({ variables: { data: { ...data, token: params.token } } })
	}


	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref="/account/login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField control={form.control} render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t('passwordLabel')}
							</FormLabel>
							<FormControl>
								<Input placeholder="********" type="password" {...field} disabled={isLoadingNew} />
							</FormControl>
							<FormDescription>
								{t('passwordDescription')}
							</FormDescription>
						</FormItem>
					)} name="password" />
					<FormField control={form.control} render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t('passwordRepeatLabel')}
							</FormLabel>
							<FormControl>
								<Input placeholder="********" type="password" {...field} disabled={isLoadingNew} />
							</FormControl>
							<FormDescription>
								{t('passwordRepeatDescription')}
							</FormDescription>
						</FormItem>
					)} name="passwordRepeat" />
					<Button className="mt-2 w-full" disabled={!isValid || isLoadingNew} type="submit">
						{t('submitButton')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { AuthWrapper } from '@/components/features/auth/AuthWrapper'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema, TypeResetPasswordSchema } from '@/schemas/auth/reset-password.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useResetPasswordMutation } from '@/graphql/generated/output'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/common/alert'
import { CircleCheck } from 'lucide-react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { Button } from '@/components/ui/common/button'

export function ResetPasswordForm() {
	const t = useTranslations('auth.resetPassword')
	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<TypeResetPasswordSchema>({
		defaultValues: {
			email: ''
		},
		resolver: zodResolver(resetPasswordSchema)
	})

	const { isValid } = form.formState

	const [resetPassword, { loading: isLoadingReset }] = useResetPasswordMutation({
		onCompleted() {
			setIsSuccess(true)
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const onSubmit = (data: TypeResetPasswordSchema) => {
		resetPassword
		({
			variables: {
				data
			}
		})
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref="/account/login"
		>
			{isSuccess ? (
				<Alert>
					<CircleCheck className="size-4" />
					<AlertTitle>{t('successAlertTitle')}</AlertTitle>
					<AlertDescription>
						{t('successAlertDescription')}
					</AlertDescription>
				</Alert>
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('emailLabel')}</FormLabel>
									<FormControl>
										<Input placeholder="john.doe@example.com" disabled={isLoadingReset} {...field} />
									</FormControl>
									<FormDescription>
										{t('emailDescription')}
									</FormDescription>
								</FormItem>
							)}
							name="email"
						/>

						<Button
							className='mt-2 w-full'
							disabled={!isValid || isLoadingReset}
						>
							{t('submitButton')}
						</Button>
					</form>
				</Form>
			)}

		</AuthWrapper>
	)
}
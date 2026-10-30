'use client'

import { AuthWrapper } from '@/components/features/auth/AuthWrapper'
import { useTranslations } from 'next-intl'
import { useLoginUserMutation } from '@/graphql/generated/output'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type TypeLoginSchema } from '@/schemas/auth/login.schema'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { Button } from '@/components/ui/common/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/common/input-otp'

export function LoginForm() {
	const t = useTranslations('auth.login')

	const router = useRouter()

	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			login: '',
			password: '',
		}
	})

	const [login, { loading: isLoadingLogin }] = useLoginUserMutation({
		onCompleted(data) {
			if(data.loginUser.message) {
				setIsShowTwoFactor(true)
			} else {
				toast.success(t('successMessage'))
				router.push('/dashboard/settings')
			}
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid } = form.formState

	const onSubmit = (data: TypeLoginSchema) => {
		login({variables: {data}})
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref="/account/create"
		>
				<Form
					{...form}
				>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
						{isShowTwoFactor ? (
							<FormField control={form.control} render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t('pinLabel')}
									</FormLabel>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>
										{t('pinDescription')}
									</FormDescription>
								</FormItem>
							)} name="pin" />
						) : (
							<>
								<FormField control={form.control} render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('loginLabel')}
										</FormLabel>
										<FormControl>
											<Input placeholder="johndoe" {...field} disabled={isLoadingLogin} />
										</FormControl>
										<FormDescription>
											{t('loginDescription')}
										</FormDescription>
									</FormItem>
								)} name="login" />
								<FormField control={form.control} render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('passwordLabel')}
										</FormLabel>
										<FormControl>
											<Input placeholder="********" type="password" {...field} disabled={isLoadingLogin} />
										</FormControl>
										<FormDescription>
											{t('passwordDescription')}
										</FormDescription>
									</FormItem>
								)} name="password" />
							</>
						)}
						<Button className='mt-2 w-full' disabled={!isValid || isLoadingLogin} type='submit'>
							{t('submitButton')}
						</Button>
					</form>
				</Form>
		</AuthWrapper>
	)
}


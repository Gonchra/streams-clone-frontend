'use client'

import { AuthWrapper } from '@/components/features/auth/AuthWrapper'
import { useForm } from 'react-hook-form'
import { createAccountSchema, TypeCreateAccountSchema } from '@/schemas/auth/create-account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { Button } from '@/components/ui/common/button'
import {useCreateUserMutation} from "@/graphql/generated/output";
import { toast } from 'sonner'
import { useState } from 'react'
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/common/alert";
import {CircleCheck} from "lucide-react";
import { useTranslations } from 'next-intl'

export function CreateAccountForm() {
	const t = useTranslations('auth.register')
	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<TypeCreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	const [create, {loading: isLoadingCreate}] = useCreateUserMutation({
		onCompleted() {
			setIsSuccess(true)
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid } = form.formState

	const onSubmit = (data: TypeCreateAccountSchema) => {
		create({variables: {data}})
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref="/account/login"
		>
			{isSuccess ? (
				<Alert>
					<CircleCheck className="size-4"/>
					<AlertTitle>{t('successAlertTitle')}</AlertTitle>
					<AlertDescription>
						{t('successAlertDescription')}
					</AlertDescription>
				</Alert>
			) : (
				<Form
					{...form}
				>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
						<FormField control={form.control} render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('usernameLabel')}
								</FormLabel>
								<FormControl>
									<Input placeholder="johndoe" {...field} disabled={isLoadingCreate} />
								</FormControl>
								<FormDescription>
									{t('usernameDescription')}
								</FormDescription>
							</FormItem>
						)} name="username" />
						<FormField control={form.control} render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('emailLabel')}
								</FormLabel>
								<FormControl>
									<Input placeholder="john.doe@example.com" {...field} disabled={isLoadingCreate} />
								</FormControl>
								<FormDescription>
									{t('emailDescription')}
								</FormDescription>
							</FormItem>
						)} name="email" />
						<FormField control={form.control} render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('passwordLabel')}
								</FormLabel>
								<FormControl>
									<Input placeholder="********" type="password" {...field} disabled={isLoadingCreate} />
								</FormControl>
								<FormDescription>
									{t('passwordDescription')}
								</FormDescription>
							</FormItem>
						)} name="password" />
						<Button className='mt-2 w-full' disabled={!isValid || isLoadingCreate} type='submit'>
							{t('submitButton')}
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	)
}


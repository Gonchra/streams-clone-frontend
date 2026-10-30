import { PropsWithChildren } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/common/card'
import Image from 'next/image'
import { Button } from '@/components/ui/common/button'
import Link from 'next/link'

interface AuthWrapperProps {
	heading: string
	backButtonLabel?: string
	backButtonHref?: string
}

export function AuthWrapper({children, heading, backButtonLabel, backButtonHref}: PropsWithChildren<AuthWrapperProps>) {
	return (
		<div className='flex h-full items-center justify-center'>
			<Card className='w-112.5'>
				<CardHeader className='flex  items-center justify-center gap-x-4'>
					<Image
						src='/images/logo.svg'
						alt="Streams"
						width={40}
						height={40}
					/>
					<CardTitle>
						{heading}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{children}
				</CardContent>
				<CardFooter className='-mt-2'>
					{backButtonLabel && backButtonHref && (
						<Button
							variant='ghost'
							className='w-full'
						>
							<Link href={backButtonHref}>{backButtonLabel}</Link>
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
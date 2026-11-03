import { NotificationType } from '@/gql/graphql'
import { Bell, CheckIcon, Fingerprint, Medal, Radio, User } from 'lucide-react'

export function getNotificationIcon(type: NotificationType) {
	switch (type) {
		case NotificationType.StreamStart:
			return Radio
		case NotificationType.NewFollower:
			return User
		case NotificationType.NewSponsorship:
			return Medal
		case NotificationType.EnableTwoFactor:
			return Fingerprint
		case NotificationType.VerifiedChannel:
			return CheckIcon
		default:
			return Bell
	}
}
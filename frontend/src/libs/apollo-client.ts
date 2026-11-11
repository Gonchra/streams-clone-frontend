import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SERVER_URL } from '@/libs/constants/url.constants'
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs'

const httpLink = new UploadHttpLink({
	uri: SERVER_URL,
	credentials: 'include',
	headers: {
		'apollo-require-preflight': true
	}
})

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
})
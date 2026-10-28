import type { CodegenConfig } from '@graphql-codegen/cli'
import "dotenv/config"

const config: CodegenConfig = {
	schema: '../backend/src/core/graphql/schema.gql',
	documents: ['./src/graphql/**/*.graphql'],
	generates: {
		'./src/gql/graphql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
			config: {
				useTypeImports: true
			}
		},
		'./src/graphql/generated/output.ts': {
			plugins: ['@softonus/graphql-codegen-apollo-hooks'],
			config: {
				groupByModule: true
			}
		}
	},
	ignoreNoDocuments: true
}

export default config
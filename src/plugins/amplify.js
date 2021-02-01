import {Amplify, API, Storage } from 'aws-amplify'
import '@aws-amplify/ui-vue'
import aws_exports from '@/aws-exports'

Amplify.configure(aws_exports)

export { API, Storage }
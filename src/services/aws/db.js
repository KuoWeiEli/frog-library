import { API } from '@/plugins/amplify';
import * as mutationQL from '@/graphql/mutations'
import * as queryQL from '@/graphql/queries'
import * as subscriptionQL from '@/graphql/subscriptions'

const mutations = function (model, action) {
    return new Promise((resolve, reject) => {
        API.graphql({
            query: mutationQL[action],
            variables: {input: model}
        }).then(result => {
            resolve(result.data[action])
        }).catch(err => reject(err))
    })
}

const queries = function (action) {
    return new Promise((resolve, reject) => {
        API.graphql({
            query: queryQL[action]
        }).then(result => {
            resolve(result.data[action])
        }).catch(err => reject(err))
    })
}

const subscriptions = function(action, nextFn) {
    API.graphql({ query: subscriptionQL[action]})
        .subscribe({
            next: nextFn
        })
}

export { mutations, queries, subscriptions }



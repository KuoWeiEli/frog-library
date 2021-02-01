import axios from 'axios'
import {db, fv} from '@/plugins/firebaseConifg'
import file from '@/services/firebase/file'
import { Book } from '@/model/book'

const bookConverter = {
    toFirestore: function (book) {
        console.log(`bookConverter.toFirestore: ` + JSON.stringify(book))
        return {
            name: book.name,
            author: book.author,
            tech: book.tech,
            publisher: book.publisher,
            publishDate: book.publishDate,
            coverUrl: book.coverUrl,
            status: book.status,
            createDate: book.createDate,
            timestamp: fv.serverTimestamp()
        }
    },
    fromFirestore: function (snapshot, options) {
        console.log(`bookConverter.fromFirestore: ` + JSON.stringify(snapshot))
        const data = snapshot.data(options)
        return new Book(snapshot.id, data.name, data.author, data.tech, data.publisher, data.publishDate,
            data.coverUrl, data.status, data.createDate, data.timestamp)
    }
}

const bookRef = db.collection('books')

const bookService = {
    uploadCover(book) {
        return new Promise((resolve, reject) => {
            file.upload(`images/book_cover/${book.id}`, book.cover)
                .then(coverUrl => {
                    resolve(coverUrl)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    saveBook(book) {
        return new Promise((resolve, reject) => {
            bookRef.doc(book.id)
                .withConverter(bookConverter)
                .set(book, {merge: true})
                .then(() => {
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    save(book) {
        if (!book.id) { // 新增時，沒有 bookId
            book.id = bookRef.doc().id
        }

        return new Promise((resolve, reject) => {
            this.uploadCover(book)
                .then(coverUrl => {
                    book.coverUrl = coverUrl

                    this.saveBook(book)
                        .then(() => resolve(book))
                        .catch(error => reject(error))
                })
                .catch(error => reject(error))
        })
    },

    getAll() {
        return new Promise(resolve => {
            axios.get('http://localhost:3000/books')
                .then(response => {
                    resolve(response.data)
                })
        })
    },
}
export default bookService
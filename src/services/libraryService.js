import bookService from '@/services/book'
import reservationService from '@/services/reservations'

const libraryService = {
    bookCurrStatus: {
        N: '可借閱',   // Normal
        P: '借閱中',   // Pending
        E: '不可借閱', // Error
    },

    getAll() {
        function getBooks() {
            return new Promise(resolve => {
                bookService.getAll()
                    .then(data => {
                        resolve(data)
                    })
            })
        }

        function getWaitReservations() {
            return new Promise(resolve => {
                reservationService.getWaitReservations()
                    .then(data => {
                        resolve(data)
                    })
            })
        }

        return new Promise(resolve => {
            Promise.all([getBooks(), getWaitReservations()])
                .then(r => {
                    // books base
                    r[0].forEach(book => {
                        // 破損或遺失皆不可借閱
                        book.statusDisplay = this.bookCurrStatus[/[BL]/.test(book.status)? 'E': 'N']
                    })

                    // bookSeq-reservationArray
                    let map = {};
                    r[1].forEach(reservation => {
                        let seq = reservation.bookSeq;
                        if (!map[seq]) {
                            map[seq] = []
                        }
                        map[seq].push({
                            reservationDate: reservation.reservationDate,
                            dueDate: reservation.dueDate
                        })
                    })
                    // 預約佇列與等待人數
                    r[0].forEach(book => {
                        book.waitQuere = map[book.bookSeq]
                        book.waitNum = book.waitQuere? book.waitQuere.length: 0
                    })
                    resolve(r[0])
                })
        })
    }
}

export default libraryService
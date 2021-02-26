class Reservation {
    constructor(id, applyDate, reservationDate, dueDate, verifyDate, takeDate
        , returnDate, status, userID, bookID) {
        this.id = id
        this.applyDate = applyDate
        this.reservationDate = reservationDate
        this.dueDate = dueDate
        this.verifyDate = verifyDate
        this.takeDate = takeDate
        this.returnDate = returnDate
        this.status = status
        this.userID = userID
        this.bookID = bookID
    }
}

const reservationStatus = {
    E: '已歸還', // end
    D: '已拒絕', // deny
    T: '已逾時', // timeout
    C: '已取消', // cancel
    2: '待審核', // step2
    3: '待取書', // step3
    4: '待歸還'  // step4
}

export {Reservation, reservationStatus}
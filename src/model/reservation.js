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

// ref reservationStatus
const reservationStatusStep = {
    END: 'E',
    DENY: 'D',
    TIMEOUT: 'T',
    CANCEL: 'C',
    STEP2: '2',
    STEP3: '3',
    STEP4: '4'
}

/** 是否為等待狀態：STEP2~4、TIMEOUT **/
function isPendding(status) {
    return /[234T]/.test(status)
}

export {Reservation, reservationStatus, reservationStatusStep, isPendding}
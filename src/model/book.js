class Book {
    constructor(id, name, author, tech, publisher, publishDate, status, createDate) {
        this.id = id
        this.name = name
        this.author = author
        this.tech = tech
        this.publisher = publisher
        this.publishDate = publishDate
        this.status = status
        this.createDate = createDate
    }
}

/** for 系統管理員 **/
const bookStatus = {
    'L': '遺失',  // lost
    'B': '破損',  // broke
    'N': '可供借閱'// normal
}

/** for 館藏資訊顯示給 User **/
const bookCurrStatus = {
    N: '可借閱',   // Normal
    P: '借閱中',   // Pending
    E: '不可借閱', // Error
}

export {Book, bookStatus, bookCurrStatus}
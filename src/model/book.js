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

const bookStatus =  {
    'L': '遺失',  // lost
    'B': '破損',  // broke
    'N': '可供借閱'// normal
}

export { Book, bookStatus }
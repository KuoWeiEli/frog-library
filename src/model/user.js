class User {
    constructor(id, email, empid, nameTW, nameEN, status) {
        this.id = id
        this.email = email
        this.empid = empid
        this.nameTW = nameTW
        this.nameEN = nameEN
        this.status = status
    }

    defaultUser() {
        return new User(
            null,
            'Email?蛙只知道飛鴿傳書！',
            'XXXX',
            '訪客蛙',
            'Visitor Frog',
            null)
    }
}

const userStatus = {
    'L': '離職',
    'S': '留職停薪',
    'N': '在職'
}

export { User, userStatus }
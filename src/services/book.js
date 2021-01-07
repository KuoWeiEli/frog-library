import axios from "axios";

const bookService = {
    bookStatus: {
        'L': '遺失',  // lost
        'B': '破損',  // broke
        'N': '可供借閱'// normal
    },

    getAll() {
        return new Promise(resolve => {
            axios.get('http://localhost:3000/books')
                .then(response => {
                    resolve(response.data)
                })
        })
    }
}

export default bookService
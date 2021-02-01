import axios from "axios";

const userService = {
    userStatus: {
        'L': '離職',
        'S': '留職停薪',
        'N': '在職'
    },

    getAll() {
        return new Promise(resolve => {
            axios.get('http://localhost:3000/users')
                .then(response => {
                    resolve(response.data)
                })
        })
    }
}

export default userService
import axios from "axios";

const userService = {
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
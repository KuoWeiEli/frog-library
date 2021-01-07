import axios from "axios";

const reservationService = {
    reservationStatus: {
        E: '已歸還',
        D: '已拒絕',
        T: '已逾時',
        C: '已取消',
        2: '待審核',
        3: '待取書',
        4: '待歸還'
    },
    getAll() {
        return new Promise(resolve => {
            axios.get('http://localhost:3000/reservations')
                .then(response => {
                    resolve(response.data)
                })
        })
    },
    getByUserId(empId) {
        return new Promise(resolve => {
            axios.get(`http://localhost:3000/reservations?empId=${empId}`)
                .then(response => {
                    resolve(response.data)
                })
        })
    },
    getWaitReservations() {
        return new Promise(resolve => {
            axios.get(`http://localhost:3000/reservations?status=2&status=3`)
                .then(response => {
                    resolve(response.data)
                })
        })
    }
}

export default reservationService
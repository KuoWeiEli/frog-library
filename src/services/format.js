const format = {
    formatDate(date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${year}/${month}/${day}`
    },
    /** yyyy-MM-dd **/
    toDateStr(date) {
        return date.toISOString().substr(0, 10)
    }
}

export default format
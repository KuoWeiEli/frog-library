const format = {
    formatDate(date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
    },
    /** yyyy-MM-dd **/
    toDateStr(date) {
        return date.toISOString().substr(0, 10)
    }
}

export default format
import Message from 'element-ui/packages/message/src/main'

const Msg = {
    showMsg(type, msg) {
        Message({type: type, message: msg})
    },
    success(msg) {
        this.showMsg('success', msg)
    },
    warning(msg) {
        this.showMsg('warning', msg)
    },
    error(msg) {
        this.showMsg('error', msg)
    }
}

export default Msg
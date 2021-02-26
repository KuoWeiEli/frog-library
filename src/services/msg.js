import Message from 'element-ui/packages/message/src/main'



const Msg = {
    i18N: {
        'success_reservation': '預約成功！',
        'err_reservation': '預約失敗，請洽系統管理員！',


        'err_query': '查詢發生錯誤，請洽系統管理員！',
        'err_update': '更新發生錯誤，請洽系統管理員！',
        'err_delete': '刪除發生錯誤，請洽系統管理員！'
    },
    showMsg(type, msg) {
        let i18nMessage = this.i18N[msg]? this.i18N[msg]: msg
        Message({type: type, message: i18nMessage})
    },
    success(msg) {
        this.showMsg('success', msg)
    },
    warning(msg) {
        this.showMsg('warning', msg)
    },
    error(msg, err) {
        this.showMsg('error', msg)
        console.log('Error: ' + JSON.stringify(err))
    }
}

export default Msg
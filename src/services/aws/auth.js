import { Auth } from '@/plugins/amplify'

const AuthService = {
    /** 註冊 **/
    signUp(email, password) {
        return new Promise((resolve, reject) => {
            Auth.signUp({username: email, password: password})
                .then(resolve)
                .catch(reject)
        })
    },
    /** 驗證註冊 **/
    confirmSignUp(email, confirmCode) {
        return new Promise((resolve, reject) => {
            Auth.confirmSignUp(email, confirmCode)
                .then(resolve)
                .catch(reject)
        })
    },
    /** 重寄驗證碼 **/
    resendSignUp(email) {
        return new Promise((resolve, reject) => {
            Auth.resendSignUp(email)
                .then(resolve)
                .catch(reject)
        })
    },
    /** 登入 **/
    signIn(email, password) {
        return new Promise((resolve, reject) => {
            Auth.signIn(email, password)
                .then(resolve)
                .catch(reject)
        })
    },
    /** 忘記密碼-發送驗證碼 **/
    forgotPassword(email) {
        return new Promise((resolve, reject) => {
            Auth.forgotPassword(email)
                .then(resolve)
                .catch(reject)
        })
    },
    /** 忘記密碼-設定新密碼 **/
    forgotPasswordSubmit(email, verificationCode, newPassword) {
        return new Promise((resolve, reject) => {
            Auth.forgotPasswordSubmit(email, verificationCode, newPassword)
                .then(resolve)
                .catch(reject)
        })
    },
    /**
     * 重新寄送驗證碼
     * type 類型：
     * R: 註冊
     * F: 忘記密碼
     * **/
    reSendVerificationCodeByType(email, type) {
        switch (type) {
            case 'R': return this.resendSignUp(email)
            case 'F': return this.forgotPassword(email)
        }
    },
    /** 登出 **/
    signOut() {
        return new Promise((resolve, reject) => {
            Auth.signOut()
                .then(resolve)
                .catch(reject)
        })
    },
    /** 取得現在的使用者 **/
    currentUserInfo() {
        return new Promise((resolve, reject) => {
            Auth.currentUserInfo()
                .then(resolve)
                .catch(reject)
        })
    }
}

export default AuthService
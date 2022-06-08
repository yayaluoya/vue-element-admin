export class Env {
    /**
     * 是否开发模式
     */
    static get dev() {
        return process.env.NODE_ENV === 'development';
    }
}
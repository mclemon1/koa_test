export default {
    IS_DEV: process.env.NODE_ENV === "development",
    hostUrl: process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8889' : 'http://api.xiaolongren.online'
}
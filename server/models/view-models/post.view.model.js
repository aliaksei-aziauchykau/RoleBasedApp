module.exports = class PostViewModel {
    constructor(data) {
        this.title = data && data.title || "";
        this.message = data && data.message || "";
        this.planTypes = data && data.planTypes || [];
    }
}
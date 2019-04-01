
class Todo {
    constructor() {
        this.text = "";
        this.completed = false;
        this.createdDate = new Date();
    }

    static configMongoose() {
        let mongoseConfig =  {
            text: String,
            completed: Boolean,
            createdDate: Date
        };

        return {
            name: "Todo",
            collection: "todos",
            mongoseConfig
        }
    }
}

module.exports = Todo;
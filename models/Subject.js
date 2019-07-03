export default class Subject {

    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._comments = [];
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get comments() {
        return this._comments;
    }

    set comments(comments) {
        this._comments = comments;
    }
}

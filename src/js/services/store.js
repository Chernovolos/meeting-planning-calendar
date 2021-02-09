class Store {
    state = null;

    listeners = [];

    reducer = (state, action) => console.log('REDUCER NOT CONFIGURED IN STORE!!!', action);

    constructor(reducer) {
        if (reducer !== null && reducer !== undefined) {
            this.reducer = reducer;
        }
    }

    getState = () => this.state;

    dispatch = (action) => {
        this.state = this.reducer(this.state, action);
    }

    subscribe = (listener) => {
        this.listeners.push(listener);
    };
}

export default Store;

function createStore(reducer) {
  let state;
  const handlers = [];

  state = reducer(state, { type: "@@__init__@@" });

  return {
    dispatch: (action) => {
      state = reducer(state, action);
      handlers.forEach((handler) => {
        handler();
      });
    },
    subscribe: (listener) => {
      handlers.push(listener);
    },
    getState: () => state,
  };
}

const InitState = {
  type: "",
  counter: 0,
  profile: {
    id: "",
    imageUrl: "",
  },
};

function reducer(state = InitState, action) {
  switch (action.type) {
    case "SET_COUNTER":
      return { ...state, counter: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    default:
      return state;
  }
}

function actionCreator(type, payload) {
  return {
    type: type,
    payload: payload,
  };
}

const store = createStore(reducer);

store.subscribe(() => {
  console.log("State updated:", store.getState());
});

store.dispatch(actionCreator("SET_COUNTER", 5));
store.dispatch(actionCreator("SET_TYPE", 3));

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const INITIAL_STATE =
  typeof window !== 'undefined' && window.__PRELOADED_STATE__
    ? window.__PRELOADED_STATE__
    : { todos: [], loading: false };

if (typeof window !== 'undefined') {
  delete window.__PRELOADED_STATE__;
}

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'START_LOADING_TODOS':
      return {
        ...state,
        loading: true,
      };
    case 'STOP_LOADING_TODOS':
      return {
        ...state,
        loading: false,
      };
    case 'STORE_TODOS':
      return {
        ...state,
        todos: action.payload.todos,
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(item => ({
          ...item,
          completed:
            item.id === action.payload.id ? !item.completed : item.completed,
        })),
      };
    default:
      return state;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const actions = {
  startLoadingTodos: () => ({
    type: 'START_LOADING_TODOS',
  }),
  stopLoadingTodos: () => ({
    type: 'STOP_LOADING_TODOS',
  }),
  storeTodos: todos => ({
    type: 'STORE_TODOS',
    payload: { todos },
  }),
  toggleTodo: id => ({
    type: 'TOGGLE_TODO',
    payload: { id },
  }),
  loadTodos: (onLoadingFinished = () => {}) => {
    return async (dispatch, getState) => {
      if (getState().loading) {
        return;
      }
      dispatch(actions.startLoadingTodos());
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      dispatch(actions.storeTodos(data));
      dispatch(actions.stopLoadingTodos());
      onLoadingFinished();
    };
  },
};

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

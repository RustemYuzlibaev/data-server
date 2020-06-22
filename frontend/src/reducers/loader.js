import { SHOW_LOADER } from '../actions/actionTypes';
import store from '../store';

const initialState = {
    showLoader: false,
};

export default function loader(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return Object.assign({}, state, {
                showLoader: action.show,
            });

        default:
            return state;
    }
}

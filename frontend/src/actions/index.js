import { SHOW_LOADER } from './actionTypes';

export function turnOnLoader(value) {
    return {
        type: SHOW_LOADER,
        show: value,
    };
}

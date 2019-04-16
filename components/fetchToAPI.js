import { BACKEND_IP } from '../config';

function fetchToAPI(urlString, options) {
    return fetch( BACKEND_IP + urlString, options);
}

export default fetchToAPI;
import { API_POSTGRES } from "../const.js";

export function get() {
    fetch(API_POSTGRES + '/auth')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });

}

export function post() {
}
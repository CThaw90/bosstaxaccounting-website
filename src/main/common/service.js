const api = {};
const self = {};

const URLS = {
    SEND_EMAIL: '/send-email'
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

self.post = function (url, body) {
    const method = 'POST';
    return window.fetch(url, {
        method,
        headers,
        body: window.JSON.stringify(body)
    }).then(response => response.json());
};

api.sendEmail = request => self.post(URLS.SEND_EMAIL, request);

export default api;

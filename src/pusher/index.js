const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '987970',
    key: 'c6fd201f50ddc27a1163',
    secret: '6f35f7d2e53920876a2c',
    cluster: 'eu',
    encrypted: true
});

module.exports = pusher

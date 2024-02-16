import Pusher from "pusher-js";
import Echo from 'laravel-echo'
import axios from '@/lib/axios'

const options = {
    broadcaster: "pusher",
    client: new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_APP_KEY}`, {
        cluster: "eu",
        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    axios.post('/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                        .then(response => {
                            callback(null, response.data);
                        })
                        .catch(error => {
                            callback(error);
                        });
                }
            };
        },
    })
};

const echo = new Echo(options)

export default echo;

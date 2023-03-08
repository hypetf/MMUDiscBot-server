const axios = require('axios');
const {
    GUILD_ID
} = process.env;

const fetchDiscordUserDetails = async(access_token) => {
    try {
        const response = await axios.get(
            'https://discord.com/api/v8/users/@me',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const isGuildMember = async(access_token) => {
    try {
        const response = await axios.get(
            'https://discord.com/api/v8/users/@me/guilds',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        );

        let arr = response.data;
        let res = arr.find(g => g.id === GUILD_ID);
        if(!res)
            return false;
        else
            return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const oauth2PayloadRequest = async(formData) => {
    try {
        const j = await axios.post('https://discord.com/api/v8/oauth2/token',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return j;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    fetchDiscordUserDetails,
    isGuildMember,
    oauth2PayloadRequest
}
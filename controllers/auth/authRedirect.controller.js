// const CryptoJS = require('crypto-js');
const url = require('url');
const {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URL,
    SUCCESS_REDIRECT_URL
} = process.env;

const {
    fetchDiscordUserDetails,
    isGuildMember,
    oauth2PayloadRequest
} = require('../../services/index');

async function authRedirectController(req, res) {
    const { code } = req.query;
    if(code) {
        try {
            const formData = new url.URLSearchParams({
                client_id: DISCORD_CLIENT_ID,
                client_secret: DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code.toString(),
                redirect_uri: DISCORD_REDIRECT_URL
            });
            const response = await oauth2PayloadRequest(formData);
            const { access_token, refresh_token } = response.data;
            const DiscordUser = await fetchDiscordUserDetails(access_token);
            // const isMember = await isGuildMember(access_token);
            let DiscordAvatar;
            if(DiscordUser.avatar === null)
                DiscordAvatar = "https://cdn.discordapp.com/attachments/1075493204306165992/1082895894246084628/discord-avatar-512-BK8XE.png";
            else
                DiscordAvatar = `https://cdn.discordapp.com/avatars/${DiscordUser.id}/${DiscordUser.avatar}.webp?size=512`;
            // var encrypted_accessToken = CryptoJS.AES.encrypt(access_token, CRYPTO_SECRET_KEY).toString();
            // var encrypted_refreshToken = CryptoJS.AES.encrypt(refresh_token, CRYPTO_SECRET_KEY).toString();

            req.session.userData = {
                uid: DiscordUser.id,
                username: DiscordUser.username,
                discriminator: DiscordUser.discriminator,
                verified: DiscordUser.verified,
                avatar: DiscordAvatar
                // enc_t: encrypted_accessToken.substring(4,20)
            };

            res.redirect(SUCCESS_REDIRECT_URL);
        }
        catch(err) {
            res.redirect("https://discord.com/api/oauth2/authorize?client_id=1082878003576582164&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fredirect&response_type=code&scope=identify%20guilds")
        }
    }
}

function getAuthenticatedUser(req, res) {
    if(!req.session.userData)
        res.sendStatus(401);
    else {
        res.send(req.session.userData);
    }
}

function logout(req, res) {
    req.session.destroy();
    req.session = null;
    res.clearCookie("connect.sid");
    res.sendStatus(200);
}

module.exports = {
    authRedirectController,
    logout,
    getAuthenticatedUser
}
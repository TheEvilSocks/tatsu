module.exports.BASE_URL = "https://api.tatsu.gg/v1";


module.exports.GUILD_MEMBER_RANKING = (guild_id, user_id) => `${this.BASE_URL}/guilds/${guild_id}/rankings/members/${user_id}/all`;
module.exports.GUILD_RANKINGS = (guild_id, offset) => `${this.BASE_URL}/guilds/${guild_id}/rankings/all${offset ? `?offset=${offset}` : ''}`;

module.exports.PROFILE = (user_id) => `${this.BASE_URL}/users/${user_id}/profile`;

module.exports.BASE_URL = "https://api.tatsu.gg/v1";


module.exports.GUILD_MEMBER_RANKING = (guild_id, member_id) => `${this.BASE_URL}/guilds/${guild_id}/rankings/members/${member_id}/all`;
module.exports.GUILD_RANKINGS = (guild_id, offset) => `${this.BASE_URL}/guilds/${guild_id}/rankings/all${offset ? `?offset=${offset}` : ''}`;

module.exports.GUILD_MEMBER_RANKING_WEEK = (guild_id, member_id) => `${this.BASE_URL}/guilds/${guild_id}/rankings/members/${member_id}/week`;
module.exports.GUILD_RANKINGS_WEEK = (guild_id, offset) => `${this.BASE_URL}/guilds/${guild_id}/rankings/week${offset ? `?offset=${offset}` : ''}`;

module.exports.GUILD_MEMBER_RANKING_MONTH = (guild_id, member_id) => `${this.BASE_URL}/guilds/${guild_id}/rankings/members/${member_id}/month`;
module.exports.GUILD_RANKINGS_MONTH = (guild_id, offset) => `${this.BASE_URL}/guilds/${guild_id}/rankings/month${offset ? `?offset=${offset}` : ''}`;

module.exports.MODIFY_GUILD_MEMBER_SCORE = (guild_id, member_id) => `${this.BASE_URL}/guilds/${guild_id}/members/${member_id}/score`

module.exports.PROFILE = (user_id) => `${this.BASE_URL}/users/${user_id}/profile`;

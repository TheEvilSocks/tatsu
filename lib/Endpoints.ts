export const BASE_URL = "https://api.tatsu.gg/v1";


export const GUILD_MEMBER_RANKING = (guild_id: string, member_id: string) => `${BASE_URL}/guilds/${guild_id}/rankings/members/${member_id}/all`;
export const GUILD_RANKINGS = (guild_id: string, offset?: number) => `${BASE_URL}/guilds/${guild_id}/rankings/all${offset !== undefined ? `?offset=${offset}` : ''}`;

export const GUILD_MEMBER_RANKING_WEEK = (guild_id: string, member_id: string) => `${BASE_URL}/guilds/${guild_id}/rankings/members/${member_id}/week`;
export const GUILD_RANKINGS_WEEK = (guild_id: string, offset?: number) => `${BASE_URL}/guilds/${guild_id}/rankings/week${offset !== undefined ? `?offset=${offset}` : ''}`;

export const GUILD_MEMBER_RANKING_MONTH = (guild_id: string, member_id: string) => `${BASE_URL}/guilds/${guild_id}/rankings/members/${member_id}/month`;
export const GUILD_RANKINGS_MONTH = (guild_id: string, offset?: number) => `${BASE_URL}/guilds/${guild_id}/rankings/month${offset !== undefined ? `?offset=${offset}` : ''}`;

export const MODIFY_GUILD_MEMBER_SCORE = (guild_id: string, member_id: string) => `${BASE_URL}/guilds/${guild_id}/members/${member_id}/score`

export const PROFILE = (user_id: string) => `${BASE_URL}/users/${user_id}/profile`;

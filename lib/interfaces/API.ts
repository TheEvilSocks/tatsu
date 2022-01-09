export interface IAPIGuildRanking {
	guild_id: string,
	rankings: IAPIGuildRank[]
}

export interface IAPIGuildRank {
	rank: number,
	score: number,
	user_id: string
}

export interface IAPIModifiedGuildMember {
	guild_id: string,
	score: number,
	user_id: string
}

export interface IAPIUserProfile {
	avatar_hash: string,
	avatar_url: string,
	credits: number,
	discriminator: string,
	id: string,
	info_box: string,
	reputation: number,
	subscription_type: number,
	subscription_renewal: string,
	title: string,
	tokens: number,
	username: string,
	xp: number
}


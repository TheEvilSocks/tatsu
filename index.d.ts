import { RequestOptions } from 'http';

declare function Tatsu(apiKey: string, options?: Tatsu.Options): Tatsu.TatsuClient;

declare namespace Tatsu {

	interface Options {
		bucket: BucketOptions
		api: RequestOptions
	}

	interface PartialMemberRanking {
		guild_id: string
		score: number
		user_id: string
	}

	interface MemberRanking {
		guild_id: string
		rank: number
		score: number
		id: string
		user_id: string
		addScore(score_amount: number): Promise<PartialMemberRanking>
		removeScore(score_amount: number): Promise<PartialMemberRanking>
	}

	export class UserProfile {
		constructor(data: any)

		id: string
		username: string
		discriminator: string
		avatar_hash: string
		avatar_url: string
		level: number
		xp: number
		reputation: number
		credits: number
		tokens: number
		title: string
		info_box: string
		subscription_type: number
		subscription_renewal: Date
	}

	interface BucketOptions {
		limit: number
		interval: number
		networkLatency: number
	}

	export class TatsuClient {
		constructor(apiKey: string, options?: Options)
		private apiKey: string
		private options: {
			bucket: BucketOptions
		}

		/* Alltime Rankings */
		getMemberRanking(guild_id: string, user_id: string): Promise<MemberRanking>
		getGuildRankings(guild_id: string, offset?: number): Promise<MemberRanking[]>

		/* Monthly Rankings */
		getMonthlyMemberRanking(guild_id: string, user_id: string): Promise<MemberRanking>
		getMonthlyGuildRankings(guild_id: string, offset?: number): Promise<MemberRanking[]>

		/* Weekly Rankings */
		getWeeklyMemberRanking(guild_id: string, user_id: string): Promise<MemberRanking>
		getWeeklyGuildRankings(guild_id: string, offset?: number): Promise<MemberRanking[]>

		getProfile(user_id: string): Promise<UserProfile>

		addGuildMemberScore(guild_id: string, user_id: string, score_amount: number): Promise<PartialMemberRanking>
		removeGuildMemberScore(guild_id: string, user_id: string, score_amount: number): Promise<PartialMemberRanking>

	}

	export class Bucket {
		limit: number
		interval: number
		networkLatency: number

		constructor(limit: number, interval: number, networkLatency: number)
	}


}

export = Tatsu;
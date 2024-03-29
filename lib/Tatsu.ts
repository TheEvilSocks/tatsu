import https, { RequestOptions } from 'https';
import { version } from "../package.json";
import * as Endpoints from './Endpoints';
import { IAPIGuildMemberPoints, IAPIGuildRank, IAPIGuildRanking, IAPIModifiedGuildMember, IAPIStoreListing, IAPIUserProfile } from './interfaces/API';
import { GuildRank } from './structures/GuildRank';
import { GuildRankings } from './structures/GuildRankings';
import { ModifiedGuildMemberScore } from './structures/ModifiedGuildMemberScore';
import { StoreListing } from './structures/StoreListing';
import { UserProfile } from './structures/UserProfile';
import { GuildMemberPoints } from './structures/GuildMemberPoints';


export interface BucketOptions {
	limit: number
	interval: number
	networkLatency: number
}

export interface RateLimitInfo {
	limit: number;
	remaining: number;
	localRemaining: number;
	reset: Date;
}

export interface TatsuOptions {
	bucket: BucketOptions,
	api: RequestOptions
}

export class TatsuClient {
	private apiKey: string;
	private options: TatsuOptions;
	private ratelimitInfo: RateLimitInfo;

	private requestQueue: (() => Promise<any>)[] = [];


	/**
	 * Create a new API client
	 * @arg {string} apiKey Your Tatsu API key, request one by using `t!apikey` on Discord.
	 * @arg {Object} [options] Optional overrides for certain library settings.
	 */
	constructor(apiKey: string, options?: TatsuOptions) {
		this.apiKey = apiKey;

		this.options = Object.assign(
			{
				bucket: {
					limit: 60,
					interval: 60000,
					networkLatency: 0,
				},
				api: {
					headers: {
						"User-Agent": `tatsu/tatsu v${version} - https://github.com/TheEvilSocks/tatsu`,
						Authorization: this.apiKey,
					},
				},
			},
			options
		);

		this.ratelimitInfo = {
			remaining: 60,
			localRemaining: 60,
			limit: 60,
			reset: new Date()
		};
	}

	/**
	 * Get the ranking of a specific member in a guild. (Similar to `t!rank`)
	 * @param {string} guild_id
	 * @param {string} user_id
	 */
	getMemberRanking(guild_id: string, user_id: string): Promise<GuildRank> {
		return this._queueRequest<IAPIGuildRank>(
			"GET",
			Endpoints.GUILD_MEMBER_RANKING(guild_id, user_id)
		).then((rank) => new GuildRank(this, guild_id, rank));
	}
	/**
	 * Get the ranking of a specific member in a guild, but only count score gained in the last 30 days.
	 * @param {string} guild_id
	 * @param {string} user_id
	 */
	getMonthlyMemberRanking(guild_id: string, user_id: string): Promise<GuildRank> {
		return this._queueRequest<IAPIGuildRank>(
			"GET",
			Endpoints.GUILD_MEMBER_RANKING_MONTH(guild_id, user_id)
		).then((rank) => new GuildRank(this, guild_id, rank));
	}

	/**
	 * Get the ranking of a specific member in a guild, but only count score gained in the last 7 days.
	 * @param {string} guild_id
	 * @param {string} user_id
	 */
	getWeeklyMemberRanking(guild_id: string, user_id: string): Promise<GuildRank> {
		return this._queueRequest<IAPIGuildRank>(
			"GET",
			Endpoints.GUILD_MEMBER_RANKING_WEEK(guild_id, user_id)
		).then((rank) => new GuildRank(this, guild_id, rank));
	}

	/**
	 * Get the rankings of a guild. (Similar to `t!top`)
	 * @param {string} guild_id
	 * @param {number} [offset]
	 */
	getGuildRankings(guild_id: string, offset?: number): Promise<GuildRankings> {
		return this._queueRequest<IAPIGuildRanking>(
			"GET",
			Endpoints.GUILD_RANKINGS(guild_id, offset)
		).then((rankings) => new GuildRankings(this, guild_id, rankings.rankings));
	}

	/**
	 * Get the rankings of a guild, but only count score gained in the last 30 days.
	 * @param {string} guild_id
	 * @param {number} [offset]
	 */
	getMonthlyGuildRankings(guild_id: string, offset?: number): Promise<GuildRankings> {
		return this._queueRequest<IAPIGuildRanking>(
			"GET",
			Endpoints.GUILD_RANKINGS_MONTH(guild_id, offset)
		).then((rankings) => new GuildRankings(this, guild_id, rankings.rankings));
	}

	/**
	 * Get the rankings of a guild, but only count score gained in the last 7 days.
	 * @param {string} guild_id
	 * @param {number} [offset]
	 */
	getWeeklyGuildRankings(guild_id: string, offset?: number): Promise<GuildRankings> {
		return this._queueRequest<IAPIGuildRanking>(
			"GET",
			Endpoints.GUILD_RANKINGS_WEEK(guild_id, offset)
		).then((rankings) => new GuildRankings(this, guild_id, rankings.rankings));
	}

	/**
	 * Get the profile of a user. (Similar to `t!profile`)
	 * @param {string} user_id
	 */
	getProfile(user_id: string): Promise<UserProfile> {
		return this._queueRequest<IAPIUserProfile>("GET", Endpoints.PROFILE(user_id)).then((data) => new UserProfile(data));
	}

	/**
	 * Add score to a member's guild ranking.
	 * @param {string} guild_id The ID of the guild in which to modify the user's score
	 * @param {string} user_id The ID of the member of which to modify the user's score
	 * @param {string} score_amount The amount of score to add
	 */
	addGuildMemberScore(guild_id: string, user_id: string, score_amount: number): Promise<ModifiedGuildMemberScore> {
		return this._queueRequest<IAPIModifiedGuildMember>(
			"PATCH",
			Endpoints.MODIFY_GUILD_MEMBER_SCORE(guild_id, user_id),
			{
				action: 0,
				amount: score_amount,
			}
		).then((data) => new ModifiedGuildMemberScore(this, guild_id, data));
	}

	/**
	 * Remove score from a member's guild ranking.
	 * @param {string} guild_id The ID of the guild in which to modify the user's score
	 * @param {string} user_id The ID of the member of which to modify the user's score
	 * @param {string} score_amount The amount of score to add
	 */
	removeGuildMemberScore(guild_id: string, user_id: string, score_amount: number): Promise<ModifiedGuildMemberScore> {
		return this._queueRequest<IAPIModifiedGuildMember>(
			"PATCH",
			Endpoints.MODIFY_GUILD_MEMBER_SCORE(guild_id, user_id),
			{
				action: 1,
				amount: score_amount,
			}
		).then((data) => new ModifiedGuildMemberScore(this, guild_id, data));
	}

	getStoreListing(listing_id: string): Promise<StoreListing> {
		return this._queueRequest<IAPIStoreListing>(
			"GET",
			Endpoints.GET_STORE_LISTING(listing_id)
		).then((data) => new StoreListing(data));
	}

	/**
	 * Get a member's point count.
	 * @param {string} guild_id The ID of the guild in which to get the user's points
	 * @param {string} user_id The ID of the member of which to get the user's points
	 */
	getGuildMemberPoints(guild_id: string, user_id: string): Promise<GuildMemberPoints> {
		return this._queueRequest<IAPIGuildMemberPoints>(
			"GET",
			Endpoints.GUILD_MEMBER_POINTS(guild_id, user_id)
		).then((data) => new GuildMemberPoints(this, guild_id, data));
	}

	/**
	 * Add points to a member's guild ranking.
	 * @param {string} guild_id The ID of the guild in which to modify the user's points
	 * @param {string} user_id The ID of the member of wich to modify the user's points
	 * @param {string} points_amount The amount of points to add
	 * @return Promise
	 */
	addGuildMemberPoints(guild_id: string, user_id: string, points_amount: number): Promise<GuildMemberPoints> {
		return this._queueRequest<IAPIGuildMemberPoints>(
			"PATCH",
			Endpoints.GUILD_MEMBER_POINTS(guild_id, user_id),
			{
				action: 0,
				amount: points_amount,
			}
		).then((data) => new GuildMemberPoints(this, guild_id, data));
	}

	/**
	 * Remove points from a member's guild ranking.
	 * @param {string} guild_id The ID of the guild in which to modify the user's points
	 * @param {string} user_id The ID of the member of wich to modify the user's points
	 * @param {string} points_amount The amount of points to add
	 * @return Promise
	 */
	removeGuildMemberPoints(guild_id: string, user_id: string, points_amount: number): Promise<GuildMemberPoints> {
		return this._queueRequest<IAPIGuildMemberPoints>(
			"PATCH",
			Endpoints.GUILD_MEMBER_POINTS(guild_id, user_id),
			{
				action: 1,
				amount: points_amount,
			}
		).then((data) => new GuildMemberPoints(this, guild_id, data));
	}

	private _queueRequest<T>(method: string, endpoint: string, data?: any) {
		return new Promise<T>((resolve, reject) => {
			const actualCall = async () => {
				await this._makeRequest<T>(method, endpoint, data).then(resolve, reject);
			};

			this.requestQueue.push(actualCall);
			this._advanceQueue();
		});

	}

	// Use ratelimitInfo to determine if we should wait before making the request
	// If we don't have to wait, execute the next request in the queue
	private async _advanceQueue() {
		// There's no requests left, so we're done
		if (this.requestQueue.length === 0)
			return;

		// Check the ratelimit info
		if (this.ratelimitInfo.localRemaining > 0) {
			// We're not ratelimited, so we can make more requests
			const jobs = this.requestQueue.splice(0, this.ratelimitInfo.localRemaining);
			this.ratelimitInfo.localRemaining -= jobs.length;
			await Promise.allSettled(jobs.map((job) => job()));
			if (this.ratelimitInfo.localRemaining > this.ratelimitInfo.remaining)
				this.ratelimitInfo.localRemaining = this.ratelimitInfo.remaining;
			return;
		}

		// We're ratelimited, so we need to wait
		const waitTime = this.ratelimitInfo.reset.getTime() - Date.now();
		setTimeout(() => {
			this.ratelimitInfo.remaining = this.ratelimitInfo.limit;
			this.ratelimitInfo.localRemaining = this.ratelimitInfo.limit;
			this._advanceQueue();
		}, waitTime);
	}

	private _makeRequest<T>(method: string, path: string, body: any | string = null): Promise<T> {
		return new Promise((fulfill, reject) => {
			let data = "";
			const req = https.request(
				path,
				Object.assign({ method: method }, this.options.api),
				(res) => {

					this.ratelimitInfo.remaining = Number(res.headers["x-ratelimit-remaining"]);
					this.ratelimitInfo.limit = Number(res.headers["x-ratelimit-limit"]);
					this.ratelimitInfo.reset = new Date(Number(res.headers["x-ratelimit-reset"]) * 1000);

					res.on("data", (chunk) => {
						data += chunk;
					});

					res.on("end", () => {
						if (res.statusCode == 200) {
							fulfill(JSON.parse(data) as T);
						} else {
							reject(
								Object.assign({ statusCode: res.statusCode }, JSON.parse(data))
							);
						}
					});

					res.on("error", (e) => {
						reject(e);
					});
				}
			);

			if (!body) {
				req.end();
			} else {
				if (typeof body == "object") {
					req.end(JSON.stringify(body));
				} else {
					req.end(body);
				}
			}

		});
	}
}
const https = require("https");
const Package = require("../package.json");
const Bucket = require("./Bucket");
const Endpoints = require("./Endpoints");
const GuildRanking = require("./structures/guild_ranking");

const User = require("./structures/user");

class TatsuClient {
	/**
	 * Create a new API client
	 * @arg {string} apiKey Your Tatsu API key, request one by using `t!apikey` on Discord.
	 * @arg {Object} [options] Optional overrides for certain library settings.
	 */
	constructor(apiKey, options) {
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
						"User-Agent": `tatsu/tatsu v${Package.version} - https://github.com/TheEvilSocks/tatsu`,
						Authorization: this.apiKey,
					},
				},
			},
			options
		);

		this.bucket = new Bucket(
			this.options.bucket.limit,
			this.options.bucket.interval,
			this.options.bucket.networkLatency
		);
	}

	/**
	 * Get the ranking of a specific member in a guild. (Similar to `t!rank`)
	 * @param {string} guild_id
	 * @param {string} user_id
	 * @returns Promise<MemberRanking>
	 */
	getMemberRanking(guild_id, user_id) {
		return this._doReq(() => {
			return this._makeRequest(
				"GET",
				Endpoints.GUILD_MEMBER_RANKING(guild_id, user_id)
			).then((rank) => {
				fulfill(new GuildRanking(this, guild_id, rank));
			}, reject);
		});
	}
	/**
	 * Get the ranking of a specific member in a guild, but only count score gained in the last 30 days.
	 * @param {string} guild_id
	 * @param {string} user_id
	 * @returns Promise<MemberRanking>
	 */
	getMonthlyMemberRanking(guild_id, user_id) {
		return this._doReq(() => {
			return this._makeRequest(
				"GET",
				Endpoints.GUILD_MEMBER_RANKING_MONTH(guild_id, user_id)
			).then((rankings) => {
				rankings.rankings = rankings.rankings.map(
					(ranking) => new GuildRanking(this, guild_id, ranking)
				);
				fulfill(rankings.rankings);
			}, reject);
		});
	}

	/**
	 * Get the ranking of a specific member in a guild, but only count score gained in the last 7 days.
	 * @param {string} guild_id
	 * @param {string} user_id
	 * @returns Promise<MemberRanking>
	 */
	getWeeklyMemberRanking(guild_id, user_id) {
		return this._doReq(() => {
			return this._makeRequest(
				"GET",
				Endpoints.GUILD_MEMBER_RANKING_WEEK(guild_id, user_id)
			).then((rankings) => {
				rankings.rankings = rankings.rankings.map(
					(ranking) => new GuildRanking(this, guild_id, ranking)
				);
				fulfill(rankings.rankings);
			}, reject);
		});
	}

	/**
	 * Get the rankings of a guild. (Similar to `t!top`)
	 * @param {string} guild_id
	 * @param {number} [offset]
	 * @returns Promise<MemberRanking[]>
	 */
	getGuildRankings(guild_id, offset) {
		return this._doReq(() => {
			return new Promise((fulfill, reject) => {
				this._makeRequest(
					"GET",
					Endpoints.GUILD_RANKINGS(guild_id, offset)
				).then((rankings) => {
					rankings.rankings = rankings.rankings.map(
						(ranking) => new GuildRanking(this, guild_id, ranking)
					);
					fulfill(rankings.rankings);
				}, reject);
			});
		});
	}

	/**
	 * Get the rankings of a guild, but only count score gained in the last 30 days.
	 * @param {string} guild_id
	 * @param {number} [offset]
	 * @returns Promise<MemberRanking[]>
	 */
	getMonthlyGuildRankings(guild_id, offset) {
		return this._doReq(() => {
			return new Promise((fulfill, reject) => {
				this._makeRequest(
					"GET",
					Endpoints.GUILD_RANKINGS_MONTH(guild_id, offset)
				).then((rankings) => {
					rankings.rankings = rankings.rankings.map(
						(ranking) => new GuildRanking(this, guild_id, ranking)
					);
					fulfill(rankings.rankings);
				}, reject);
			});
		});
	}

	/**
	 * Get the rankings of a guild, but only count score gained in the last 7 days.
	 * @param {string} guild_id
	 * @param {number} [offset]
	 * @returns Promise<MemberRanking[]>
	 */
	getWeeklyGuildRankings(guild_id, offset) {
		return this._doReq(() => {
			return new Promise((fulfill, reject) => {
				this._makeRequest(
					"GET",
					Endpoints.GUILD_RANKINGS_WEEK(guild_id, offset)
				).then((rankings) => {
					rankings.rankings = rankings.rankings.map(
						(ranking) => new GuildRanking(this, guild_id, ranking)
					);
					fulfill(rankings.rankings);
				}, reject);
			});
		});
	}

	/**
	 * Get the profile of a user. (Similar to `t!profile`)
	 * @param {string} user_id
	 * @returns Promise<UserProfile>
	 */
	getProfile(user_id) {
		return this._doReq(() => {
			return new Promise((fulfill, reject) => {
				this._makeRequest("GET", Endpoints.PROFILE(user_id)).then((data) => {
					fulfill(new User(data));
				}, reject);
			});
		});
	}

	/**
	 * Add score to the member's guild ranking.
	 * @param {string} guild_id The ID of the guild in which to modify the user's score
	 * @param {string} user_id The ID of the member of wich to modify the user's score
	 * @param {string} score_amount The amount of score to add
	 * @return Promise
	 */
	addGuildMemberScore(guild_id, user_id, score_amount) {
		return this._doReq(() => {
			return new Promise((fulfill, reject) => {
				this._makeRequest(
					"PATCH",
					Endpoints.MODIFY_GUILD_MEMBER_SCORE(guild_id, user_id),
					{
						action: 0,
						amount: score_amount,
					}
				).then((data) => {
					fulfill(new User(data));
				}, reject);
			});
		});
	}

	/**
	 * Remove score from the member's guild ranking.
	 * @param {string} guild_id The ID of the guild in which to modify the user's score
	 * @param {string} user_id The ID of the member of wich to modify the user's score
	 * @param {string} score_amount The amount of score to add
	 * @return Promise
	 */
	removeGuildMemberScore(guild_id, user_id, score_amount) {
		return this._doReq(() => {
			return new Promise((fulfill, reject) => {
				this._makeRequest(
					"PATCH",
					Endpoints.MODIFY_GUILD_MEMBER_SCORE(guild_id, user_id),
					{
						action: 1,
						amount: score_amount,
					}
				).then((data) => {
					fulfill(new User(data));
				}, reject);
			});
		});
	}

	_doReq(promise) {
		return new Promise((fulfill, reject) => {
			this.bucket.queue(() => {
				promise().then(fulfill, reject);
			});
		});
	}

	_makeRequest(method, path, body) {
		return new Promise((fulfill, reject) => {
			let data = "";
			const req = https.request(
				path,
				Object.assign({ method: method }, this.options.api),
				(res) => {
					res.on("data", (chunk) => {
						data += chunk;
					});

					res.on("end", () => {
						if (res.statusCode == 200) {
							fulfill(JSON.parse(data));
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

			if (!body) return req.end();

			if (typeof body == "object") {
				req.end(JSON.stringify(body));
			} else {
				req.end(body);
			}
		});
	}
}

module.exports = TatsuClient;

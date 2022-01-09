class PartialGuildRanking {
	constructor(tatsuClient, guild_id, api_obj) {
		this._tatsuClient = tatsuClient;
		this._guild_id = guild_id;
		this._data = api_obj;
	}

	get id() {
		// string
		return this._data.user_id;
	}
	get guild_id() {
		// string
		return this._guild_id;
	}
	get score() {
		return this._data.score;
	}

	/**
	 * Add score to the member's guild ranking.
	 * @param {Number} score_amount
	 * @return Promise
	 */
	addScore(score_amount) {
		return this._tatsuClient.addGuildMemberScore(
			this.guild_id,
			this.id,
			score_amount
		);
	}

	/**
	 * Remove score from the member's guild ranking.
	 * @param {string} score_amount The amount of score to add
	 * @return Promise
	 */
	removeScore(score_amount) {
		return this._tatsuClient.removeGuildMemberScore(
			this.guild_id,
			this.id,
			score_amount
		);
	}
}

module.exports = PartialGuildRanking;

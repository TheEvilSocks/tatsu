import util from 'util';
import { IAPIGuildRank } from "../interfaces/API";
import { TatsuClient } from "../Tatsu";

export class GuildRank {
	private _tatsuClient: TatsuClient;
	private _guild_id: string;
	private _data: IAPIGuildRank;


	constructor(tatsuClient: TatsuClient, guild_id: string, api_obj: IAPIGuildRank) {
		this._tatsuClient = tatsuClient;
		this._guild_id = guild_id;
		this._data = api_obj;
	}

	get user_id() {
		return this._data.user_id;
	}

	get guild_id() {
		return this._guild_id;
	}

	get rank() {
		return this._data.rank;
	}

	get score() {
		return this._data.score;
	}

	getProfile() {
		return this._tatsuClient.getProfile(this.user_id);
	}

	toJSON() {
		return {
			rank: this.rank,
			score: this.score,
			user_id: this.user_id,
			guild_id: this.guild_id
		}
	}

	[util.inspect.custom]() {
		return this.toJSON();
	}

	/**
	 * Add score to the member's guild ranking.
	 */
	addScore(score_amount: number) {
		return this._tatsuClient.addGuildMemberScore(
			this.guild_id,
			this.user_id,
			score_amount
		);
	}

	/**
	 * Remove score from the member's guild ranking.
	 */
	removeScore(score_amount: string) {
		return this._tatsuClient.removeGuildMemberScore(
			this.guild_id,
			this.user_id,
			score_amount
		);
	}
}
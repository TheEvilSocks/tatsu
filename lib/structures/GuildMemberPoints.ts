import util from 'util';
import { TatsuClient } from "../Tatsu";
import { IAPIGuildMemberPoints } from "../interfaces/API";

export class GuildMemberPoints {
	private _tatsuClient: TatsuClient;
	private _guild_id: string;
	private _data: IAPIGuildMemberPoints;


	constructor(tatsuClient: TatsuClient, guild_id: string, api_obj: IAPIGuildMemberPoints) {
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

	get points() {
		return this._data.points;
	}

	getProfile() {
		return this._tatsuClient.getProfile(this.user_id);
	}

	toJSON() {
		return {
			rank: this.rank,
			points: this.points,
			user_id: this.user_id,
			guild_id: this.guild_id
		}
	}

	[util.inspect.custom]() {
		return this.toJSON();
	}

	/**
	 * Add points to the member
	 */
	addPoints(point_amount: number) {
		return this._tatsuClient.addGuildMemberPoints(
			this.guild_id,
			this.user_id,
			point_amount
		);
	}

	/**
	 * Remove points from the member
	 */
	removePoints(point_amount: number) {
		return this._tatsuClient.removeGuildMemberPoints(
			this.guild_id,
			this.user_id,
			point_amount
		);
	}
}
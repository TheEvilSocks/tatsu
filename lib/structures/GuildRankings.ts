import util from 'util';
import { IAPIGuildRank } from "../interfaces/API";
import { TatsuClient } from "../Tatsu";
import { GuildRank } from "./GuildRank";

export class GuildRankings {
	private _tatsuClient: TatsuClient;
	private _guild_id: string;
	private _rankings: IAPIGuildRank[];

	[index: number]: GuildRank;

	constructor(tatsuClient: TatsuClient, guild_id: string, api_obj: IAPIGuildRank[]) {
		this._tatsuClient = tatsuClient;
		this._guild_id = guild_id;
		this._rankings = api_obj;

		return new Proxy(this, GuildRankings.indexHandler);
	}

	get guild_id() {
		return this._guild_id;
	}

	get rankings(): GuildRank[] {
		return this._rankings.map(rank => new GuildRank(this._tatsuClient, this.guild_id, rank));
	}

	get length() {
		return this._rankings.length;
	}

	toString() {
		return `[GuildRankings: ${this.guild_id}]`;
	}

	toJSON() {
		return {
			guild_id: this.guild_id,
			rankings: this.rankings
		};
	}

	[util.inspect.custom]() {
		return this.toJSON();
	}

	[Symbol.iterator]() {
		return this.rankings[Symbol.iterator]();
	}

	// This allow us to use the index operator on the GuildRankings object.
	private static indexHandler: ProxyHandler<GuildRankings> = {
		get: (target, prop) => {
			// If prop is a property of the GuildRankings object, return it.
			if (prop in target)
				return target[prop as any];

			// If prop in the rankings array, return the GuildRank at that index.
			if (prop in target.rankings)
				return target.rankings[Number(prop)];

			return undefined;
		}
	};

	/**
	 * Add score to a member's guild ranking.
	 */
	addScore(score_amount: number, user_id: string) {
		return this._tatsuClient.addGuildMemberScore(
			this.guild_id,
			user_id,
			score_amount
		);
	}

	/**
	 * Remove score from a member's guild ranking.
	 */
	removeScore(score_amount: string, user_id: string) {
		return this._tatsuClient.removeGuildMemberScore(
			this.guild_id,
			user_id,
			score_amount
		);
	}
}
import util from 'util';
import { IAPIUserProfile } from "../interfaces/API";

export class UserProfile {
	private _data: IAPIUserProfile;

	constructor(api_obj: IAPIUserProfile) {
		this._data = api_obj;
	}

	get id() {
		return this._data.id;
	}
	get user_id() { return this.id; }
	get username() {
		return this._data.username;
	}
	get discriminator() {
		return this._data.discriminator;
	}
	get avatar_hash() {
		return this._data.avatar_hash;
	}
	get avatar_url() {
		return this._data.avatar_url;
	}
	get level() {
		return Math.floor(Math.sqrt((9 * this._data.xp) / 625));
	}
	get xp() {
		return this._data.xp;
	}

	get exp() { return this.xp; }
	get experience() { return this.xp; }

	get reputation() {
		return this._data.reputation;
	}
	get credits() {
		return this._data.credits;
	}
	get tokens() {
		return this._data.tokens;
	}
	get title() {
		return this._data.title;
	}
	get info_box() {
		return this._data.info_box;
	}
	get subscription_type() {
		return this._data.subscription_type;
	}
	get subscription_renewal() {
		if (!('subscription_renewal' in this._data)) return null;
		return new Date(this._data.subscription_renewal);
	}

	toString() {
		return `[UserProfile: ${this.user_id}]`;
	}

	toJSON() {
		let res: { [name: string]: any } = {
			id: this.id,
			username: this.username,
			discriminator: this.discriminator,
			avatar_hash: this.avatar_hash,
			avatar_url: this.avatar_url,
			level: this.level,
			experience: this.experience,
			reputation: this.reputation,
			credits: this.credits,
			tokens: this.tokens,
			title: this.title,
			info_box: this.info_box,
			subscription_type: this.subscription_type
		};
		if (this.subscription_renewal)
			res.subscription_renewal = this.subscription_renewal

		return res;
	}

	[util.inspect.custom]() {
		return this.toJSON();
	}
}
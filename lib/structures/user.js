class UserProfile {
	constructor(api_obj) {
		this._data = api_obj;
	}

	get id() {
		// string
		return this._data.id;
	}
	get username() {
		// string
		return this._data.username;
	}
	get discriminator() {
		// string
		return this._data.discriminator;
	}
	get avatar_hash() {
		// string
		return this._data.avatar_hash;
	}
	get avatar_url() {
		// string
		return this._data.avatar_url;
	}
	get level() {
		// number
		return Math.floor(Math.sqrt((9 * this._data.xp) / 625));
	}
	get xp() {
		// number
		return this._data.xp;
	}

	get exp() { return this.xp; }
	get experience() { return this.xp; }

	get reputation() {
		// number
		return this._data.reputation;
	}
	get credits() {
		// number
		return this._data.credits;
	}
	get tokens() {
		// number
		return this._data.tokens;
	}
	get title() {
		// string
		return this._data.title;
	}
	get info_box() {
		// string
		return this._data.info_box;
	}
	get subscription_type() {
		// number
		return this._data.subscription_type;
	}
	get subscription_renewal() {
		// Date
		return new Date(this._data.subscription_renewal);
	}
}

module.exports = UserProfile;
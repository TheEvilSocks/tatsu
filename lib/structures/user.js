class User {
	constructor(api_obj) {
		this.data = api_obj;
	}

	get id() {
		// string
		return this.data.id;
	}
	get username() {
		// string
		return this.data.username;
	}
	get discriminator() {
		// string
		return this.data.discriminator;
	}
	get avatar_hash() {
		// string
		return this.data.avatar_hash;
	}
	get avatar_url() {
		// string
		return this.data.avatar_url;
	}
	get level() {
		// number
		return Math.sqrt((9 * this.data.xp) / 625);
	}
	get xp() {
		// number
		return this.data.xp;
	}

	get exp() { return this.xp; }
	get experience() { return this.xp; }

	get reputation() {
		// number
		return this.data.reputation;
	}
	get credits() {
		// number
		return this.data.credits;
	}
	get tokens() {
		// number
		return this.data.tokens;
	}
	get title() {
		// string
		return this.data.title;
	}
	get info_box() {
		// string
		return this.data.info_box;
	}
	get subscription_type() {
		// number
		return this.data.subscription_type;
	}
	get subscription_renewal() {
		// Date
		return new Date(this.data.subscription_renewal);
	}
}

module.exports = User;
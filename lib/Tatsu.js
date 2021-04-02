const https = require('https');
const Package = require('../package.json');
const Bucket = require('./Bucket');
const Endpoints = require('./Endpoints');

const User = require('./structures/user');

class TatsuClient {

	/**
	* Create a new API client
	* @arg {string} apiKey Your Tatsumaki API key.
	* @arg {Object} [options] Optional overrides for certain library settings.
	*/
	constructor(apiKey, options) {
		this.apiKey = apiKey;

		this.options = Object.assign({
			bucket: {
				limit: 60,
				interval: 60000,
				networkLatency: 0
			},
			api: {
				headers: {
					'User-Agent': `tatsu/tatsu v${Package.version} - https://github.com/TheEvilSocks/tatsu`,
					'Authorization': this.apiKey
				}
			}
		}, options);

		this.bucket = new Bucket(this.options.bucket.limit, this.options.bucket.interval, this.options.bucket.networkLatency);
	}


	getMemberRanking(guild_id, user_id) {
		return this._doReq(() => {
			return this._makeRequest('GET', Endpoints.GUILD_MEMBER_RANKING(guild_id, user_id));
		});
	}

	getGuildRankings(guild_id, offset) {
		return this._doReq(() => {
			return new Promise((fulfill, reject) => {
				this._makeRequest('GET', Endpoints.GUILD_RANKINGS(guild_id, offset)).then((rankings) => {
					rankings.rankings = rankings.rankings.map(ranking => ranking.guild_id = guild_id);
					fulfill(rankings);
				}, reject);
			});
		});
	}

	getProfile(user_id) {
		return this._doReq(() => {
			return new Promise((fulfill, reject) => {
				this._makeRequest('GET', Endpoints.PROFILE(user_id)).then(data => {
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

			let data = '';
			const req = https.request(path, Object.assign({ method: method }, this.options.api), (res) => {
				res.on('data', function (chunk) {
					data += chunk;
				});

				res.on('end', function () {
					if (res.statusCode == 200) {
						fulfill(JSON.parse(data));
					} else {
						reject({ statusCode: res.statusCode, message: data });
					}
				});

				res.on('error', (e) => {
					reject(e);
				});
			});

			if (typeof body == "object") {
				req.end(JSON.stringify(body));
			} else {
				req.end();
			}
		});
	}
}

module.exports = TatsuClient;
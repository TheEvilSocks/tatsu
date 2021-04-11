/*
	A flush is a complete reset of the ratelimits.
	In Tatsu's case, the ratelimit resets 60 seconds after the first request. 
	So a 'flush' would happen 60 seconds after doing the first drip.
*/

/**
 * Used to handle ratelimited API requests.
 * @prop {Number} drips How many drips the Bucket has dripped.
 * @prop {Number} limit Amount of drips there can be within an interval.
 * @prop {Number} lastdrip Timestamp of last drip.
 * @prop {Number} lastFlush Timestamp of last flush.
 * @prop {Number} interval Time in milliseconds to wait between flushing drips.
 */

class Bucket {
	/**
	 * Make a Bucket, handling ratelimits
	 * @arg {Number} limit Amount of requests per interval.
	 * @arg {Number} interval Amount of milliseconds to wait between flushing the ratelimit status.
	 * @arg {Number} [networkLatency] Extra time in milliseconds to add on top of the interval in case of network latency.
	 */

	constructor(limit = 60, interval = 60000, networkLatency = 0) {
		this.limit = limit;
		this.interval = interval;
		this.networkLatency = networkLatency;

		this.drips = 0; // Used to keep track of the amount of requests within the reset interval.
		this.lastDrip = 0; // Used to keep track of when to schedule the next drip
		this.lastFlush = 0; // 

		this._queue = []; // Array of (async) functions that are to be executed with the ratelimit in mind.
	}


	queue(cb, isPriority) {
		if (!isPriority) {
			this._queue.push(cb);
		} else {
			this._queue.unshift(cb);
		}
		this.drip();
	}

	/**
	 * (Slowly) go through all requests currently in the bucket.
	 */
	drip() {
		// No need to drip if there's nothing to drip.
		// Also never drip if we're already dripping! That could cause unwanted ratelimit issues.
		if (this.busy || this._queue.length === 0)
			return;

		// Check if we're past the reset interval, if so, reset the current amount of drips we can go through.
		if (this.lastFlush + this.interval + this.limit * this.networkLatency < Date.now()) {
			this.lastFlush = Date.now();
			this.drips = Math.max(0, this.drips - this.limit);
		}

		// As long as there's something to drip and we're still within the limit, let's execute some work!
		while (this._queue.length && this.drips < this.limit) {
			this.drips++;

			const job = this._queue.shift();
			if (!job) return; // Haha can never be too sure
			const time = this.networkLatency + this.lastDrip - Date.now();

			this.lastDrip = Date.now() + Math.max(0, time);

			setTimeout(() => {
				job();
			}, Math.max(0, time));

		}

		// Queue the next time we should execute some stuff.
		if (this._queue.length && !this.busy) {
			let time = this.networkLatency;

			if (this.drips >= this.limit)
				time = Math.max(0, this.lastFlush + this.interval + this.limit * this.networkLatency - Date.now());

			this.busy = setTimeout(() => {
				this.busy = null;
				this.drip();
			}, time);
		}
	}
}

module.exports = Bucket;
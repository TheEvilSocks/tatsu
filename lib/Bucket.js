/*
	A flush is a complete reset of the ratelimits.
	In Tatsu's case, the ratelimit resets 60 seconds after the first request. 
	So a 'flush' would happen 60 seconds after doing the first drain.
*/

/**
 * Used to handle ratelimited API requests.
 * @prop {Number} drains How many drains the Bucket has drained.
 * @prop {Number} limit Amount of drains there can be within an interval.
 * @prop {Number} lastdrain Timestamp of last drain.
 * @prop {Number} lastFlush Timestamp of last flush.
 * @prop {Number} interval Time in milliseconds to wait between flushing drains.
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

		this.drains = 0; // Used to keep track of the amount of requests within the reset interval.
		this.lastDrain = 0; // Used to keep track of when to schedule the next drain
		this.lastFlush = 0; // 

		this._queue = []; // Array of (async) functions that are to be executed with the ratelimit in mind.
	}


	queue(cb, isPriority) {
		if (!isPriority) {
			this._queue.push(cb);
		} else {
			this._queue.unshift(cb);
		}
		this.drain();
	}

	/**
	 * (Slowly) go through all requests currently in the bucket.
	 */
	drain() {
		// No need to drain if there's nothing to drain.
		// Also never drain if we're already draining! That could cause unwanted ratelimit issues.
		if (this.busy || this._queue.length === 0)
			return;

		// Check if we're past the reset interval, if so, reset the current amount of drains we can go through.
		if (this.lastFlush + this.interval + this.limit * this.networkLatency < Date.now()) {
			this.lastFlush = Date.now();
			this.drains = Math.max(0, this.drains - this.limit);
		}

		// As long as there's something to drain and we're still within the limit, let's execute some work!
		while (this.queue.length && this.drains < this.limit) {
			this.drains++;

			let job = this._queue.shift();
			if (!job) return; // Haha can never be too sure
			let time = this.networkLatency + this.lastDrain - Date.now();

			this.lastDrain = Date.now() + Math.max(0, time);

			setTimeout(() => {
				job();
			}, Math.max(0, time));

		}

		// Queue the next time we should execute some stuff.
		if (this._queue.length && !this.busy) {

			// Did this with an actual if-statement because I don't want a long ternary in the setTimeout
			let time = this.networkLatency;

			if (this.drains >= this.limit)
				time = Math.max(0, this.lastFlush + this.interval + this.limit * this.networkLatency - Date.now());


			this.busy = setTimeout(() => {
				this.busy = null;
				this.drain();
			}, time);
		}
	}
}

module.exports = Bucket;
Tatsu
====
[![NPM version](https://img.shields.io/npm/v/tatsu)](https://npmjs.com/package/tatsu) ![Last commit](https://img.shields.io/github/last-commit/theevilsocks/tatsu)  

A NodeJS wrapper for interfacing with [Tatsu's](https://tatsu.gg) API.

Installing
---


```
npm install --save tatsu
```

Guild Rankings Example
---

```js
const Tatsu = require('tatsu');

// Replace API_KEY with your Tatsu API key.
const client = new Tatsu("API_KEY");

// Get the Guild Rankings of Tatsu's Lounge
client.getGuildRankings('173184118492889089').then(rankings => {
	console.log(rankings)
})
```

Useful Links
---

[Tatsu's developer portal](https://dev.tatsu.gg/) contains very detailed information on how their API works, as well as which other libraries are available.

[Tatsu's API channel (#api)](https://discord.gg/tatsu) is the best place to get support. Ping me (@TheEvilSocks#0023) for library support.
 
License
---

Please read the the [LICENSE](LICENSE) file.

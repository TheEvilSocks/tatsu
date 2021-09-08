## Guild Related Functions

### #getGuildRankings

Get the rankings of a guild. (Similar to `t!top`)

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| guild_id  | string | The Discord ID of the guild.                         |
| offset?   | number | Offset the results with `offset` users. Default: `0` |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[GuildRanking](GuildRanking.md)[]>

#### Example

```js
const Tatsu = require("../index.js");

const client = Tatsu("API_KEY");

client.getGuildRankings("173184118492889089").then((rankings) => {
  console.log(rankings.length);
}, console.error);

// Expected output:
// 100
```

### #getWeeklyGuildRankings

Get the rankings of a guild, but only count score gained in the last 7 days.

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| guild_id  | string | The Discord ID of the guild.                         |
| offset?   | number | Offset the results with `offset` users. Default: `0` |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[GuildRanking](GuildRanking.md)[]>

### #getMonthlyGuildRankings

Get the rankings of a guild, but only count score gained in the last 30 days.

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| guild_id  | string | The Discord ID of the guild.                         |
| offset?   | number | Offset the results with `offset` users. Default: `0` |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[GuildRanking](GuildRanking.md)[]>

### #getGuildRanking

Get the ranking of a specific member in a guild. (Similar to `t!rank`)

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| guild_id  | string | The Discord ID of the guild. |
| user_id   | string | The Discord ID of the user.  |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[GuildRanking](GuildRanking.md)>

### #getWeeklyGuildRanking

Get the ranking of a specific member in a guild, but only count score gained in the last 7 days.

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| guild_id  | string | The Discord ID of the guild. |
| user_id   | string | The Discord ID of the user.  |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[GuildRanking](GuildRanking.md)>

### #getMonthlyGuildRanking

Get the ranking of a specific member in a guild, but only count score gained in the last 30 days.

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| guild_id  | string | The Discord ID of the guild. |
| user_id   | string | The Discord ID of the user.  |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[GuildRanking](GuildRanking.md)>

### #addGuildMemberScore

Add score to a member's guild ranking.

| Parameter | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| guild_id  | string | The Discord ID of the guild.            |
| user_id   | string | The Discord ID of the user.             |
| score     | number | The amount of score to add to the user. |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[PartialGuildRanking](PartialGuildRanking.md)>

### #removeGuildMemberScore

Remove score from a member's guild ranking.

| Parameter | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| guild_id  | string | The Discord ID of the guild.            |
| user_id   | string | The Discord ID of the user.             |
| score     | number | The amount of score to remove from the user. |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[PartialGuildRanking](PartialGuildRanking.md)>


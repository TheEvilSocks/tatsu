Guild Objects
---

### MemberRanking

| Field | Type | Description |
|---|---|---|
| guild_id | string | The Discord ID of the guild. |
| user_id | string | The Discord ID of the user. |
| rank | number | The user's rank. Will be `-1` if the user has no record. |
| score | number | The user's guild score. (Also known as server XP) |

---------

Guild Functions
---

### #getGuildRankings

Get the rankings of a guild. (Similar to `t!top`)

| Parameter | Type | Description |
|---|---|---|
| guild_id | string | The Discord ID of the guild. |
| offset? | number | Offset the results with `offset` users. Default: `0` |

*returns* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[MemberRanking](#memberranking)[]>

### #getWeeklyGuildRankings

Get the rankings of a guild, but only count score gained in the last 7 days.

| Parameter | Type | Description |
|---|---|---|
| guild_id | string | The Discord ID of the guild. |
| offset? | number | Offset the results with `offset` users. Default: `0` |

*returns* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[MemberRanking](#memberranking)[]>

### #getMonthlyGuildRankings

Get the rankings of a guild, but only count score gained in the last 30 days.

| Parameter | Type | Description |
|---|---|---|
| guild_id | string | The Discord ID of the guild. |
| offset? | number | Offset the results with `offset` users. Default: `0` |

*returns* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[MemberRanking](#memberranking)[]>

### #getMemberRanking

Get the ranking of a specific member in a guild. (Similar to `t!rank`)

| Parameter | Type | Description |
|---|---|---|
| guild_id | string | The Discord ID of the guild. |
| user_id | string | The Discord ID of the user. |

*returns* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[MemberRanking](#memberranking)>

### #getWeeklyMemberRanking

Get the ranking of a specific member in a guild, but only count score gained in the last 7 days.

| Parameter | Type | Description |
|---|---|---|
| guild_id | string | The Discord ID of the guild. |
| user_id | string | The Discord ID of the user. |

*returns* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[MemberRanking](#memberranking)>

### #getMonthlyMemberRanking

Get the ranking of a specific member in a guild, but only count score gained in the last 30 days.

| Parameter | Type | Description |
|---|---|---|
| guild_id | string | The Discord ID of the guild. |
| user_id | string | The Discord ID of the user. |

*returns* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[MemberRanking](#memberranking)>
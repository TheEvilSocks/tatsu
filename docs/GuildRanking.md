# GuildRanking

| Field    | Type   | Description                                              |
| -------- | ------ | -------------------------------------------------------- |
| guild_id | string | The Discord ID of the guild.                             |
| user_id  | string | The Discord ID of the user.                              |
| rank     | number | The user's rank. Will be `-1` if the user has no record. |
| score    | number | The user's guild score. (Also known as server XP)        |

# Functions

### #addScore

Add score to the member's guild ranking.
| Parameter | Type | Description |
| ------------ | ------ | ------------------------------------------------- |
| score_amount | number | The amount of score to add to the user's ranking. |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[PartialGuildRanking](PartialGuildRanking.md)>

### #removeScore

Remove score from the member's guild ranking.
| Parameter | Type | Description |
| ------------ | ------ | ------------------------------------------------- |
| score_amount | number | The amount of score to remove from the user's ranking. |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[PartialGuildRanking](PartialGuildRanking.md)>

---

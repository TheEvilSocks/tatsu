# ModifiedGuildMember

The ModifiedGuildMember is a GuildRanking object without the **rank** field present.

| Field    | Type   | Description                                       |
| -------- | ------ | ------------------------------------------------- |
| guild_id | string | The Discord ID of the guild.                      |
| user_id  | string | The Discord ID of the user.                       |
| score    | number | The user's guild score. (Also known as server XP) |

_Please note how the **rank** field is not present._


# Functions

### #addScore

Add score to the member's guild ranking.  
| Parameter    | Type   | Description                                       |
| ------------ | ------ | ------------------------------------------------- |
| score_amount | number | The amount of score to add to the user's ranking. |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[ModifiedGuildMember](#modifiedguildmember>

### #removeScore

Remove score from the member's guild ranking.  
| Parameter    | Type   | Description                                            |
| ------------ | ------ | ------------------------------------------------------ |
| score_amount | number | The amount of score to remove from the user's ranking. |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[ModifiedGuildMember](#modifiedguildmember)>

---

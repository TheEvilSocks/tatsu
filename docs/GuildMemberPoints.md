# GuildMemberPoints

An object containing the amount of points a member has in a guild.  
Points are a server's currency and can be used to purchase items from the server's shop.

| Field    | Type   | Description                                       |
| -------- | ------ | ------------------------------------------------- |
| guild_id | string | The Discord ID of the guild.                      |
| user_id  | string | The Discord ID of the user.                       |
| score    | number | The user's guild points.                          |
| rank     | number | The user's rank based on **points**               |


# Functions

### #addPoints

Add points to the member

| Parameter     | Type   | Description                              |
| ------------- | ------ | ---------------------------------------- |
| points_amount | number | The amount of points to add to the user. |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[GuildMemberPoints](#GuildMemberPoints)>

### #removePoints

Remove score from the member's guild ranking.

| Parameter     | Type   | Description                                   |
| ------------- | ------ | --------------------------------------------- |
| points_amount | number | The amount of points to remove from the user. |

_returns_ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[GuildMemberPoints](#GuildMemberPoints)>

---

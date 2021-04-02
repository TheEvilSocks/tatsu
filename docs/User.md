User Objects
---

### UserProfile

| Field | Type | Description |
|---|---|---|
| id | string | The Discord ID of the user. |
| username | string | The username of the user. |
| discriminator | string | The discriminator of a user. |
| avatar_url | string | The url of the avatar of the user. |
| xp | number | The amount of experience the user has earned. |
| reputation | number | The amount of reputation the user has received. |
| credits | number | The amount of ![credits](https://tatsu.gg/static/credits.gif) credits the user has earned. |
| tokens | number | The amount of ![tokens](https://tatsu.gg/static/tokens.gif) tokens the user has earned. |
| title | string | The title the user has set for their profile card. |
| info_box | string | The description the user has set for their profile card. |

---------

User Functions
---

### #getProfile

Get the profile of a user. (Similar to `t!profile`)

| Parameter | Type | Description |
|---|---|---|
| user_id | string | The Discord ID of the user. |

*returns* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[UserProfile](#userprofile)[]>

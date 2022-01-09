# Changelog

## [1.0.0] 9th of January 2022

Release 1.0.0 brings a rewrite in Typescript. Previously typings were kept in a seperate typings file, but now all codebase is written in Typescript.  
Upon publishing, this will be transpiled and typings will be automatically separated.

### Added

- `GuildRankings` is now iterable.
- Added `getProfile()` to GuildRank.

### Changed

- All API structures now return a cleaned up JSON when stringifying.
- All requests made now respect the ratelimit headers
- `PartialGuildMember` has been renamed to `ModifiedGuildMember`

### Removed

- The `Bucket` class, previously used to handle ratelimits, is removed.  
   Ratelimits are now handled by `TatsuClient`.

---

## [0.3.2] 9th of January 2022

### Fixed

- (Aericio) Fix `user_id` being undefined in `GuildRanking` and `PartialGuildRanking`

#### Contributors

- Aericio

---

## [0.3.1] 8th of September 2021

### Added

- Add `PartialGuildRanking` structure, this is returned when modifying a guild member's score.

---

## [0.3.0] 2nd of September 2021

### Added

- Add `GuildRanking` structure
- Add modify guild member endpoints

### Changed

- Any guild rankings endpoints now return the `GuildRanking` class.  
   _This should not break any existing code._

### Fixed

- Fix errors (haha)
  - The Tatsu API now returns errors in JSON format, so we should handle them accordingly.

---

## [0.2.4] 11th of April 2021

### Changed

- Exposed `UserProfile` class

---

## [0.2.3] 11th of April 2021

### Fixed

- `Bucket` now properly drips
  - This means ratelimits are now handled correctly, in the previous version it would count every API request twice.

---

## [0.2.2] 3rd of April 2021

### Changed

- Added some JSDocs

---

## [0.2.1] 3rd of April 2021

### Added

- Added new endpoints
  - Monthly guild rankings
  - Weekly guild rankings
  - Monthly guildmember ranking
  - Weekly guildmember ranking

[ **!** ] Please note, that at the time of writing this, these endpoints are live, but might not return correct data. This will silently be fixed, as the issue is with the API, not the library.

### Fixed

- Guild rankings are actually guild rankings now!

---

## [0.2.0] 2nd of April 2021

### Added

- [Documentation!](https://docs.theevilsocks.com/tatsu/)
- Added new fields!
  - User.avatar_hash
  - User.level
  - User.subscription_type
  - User.subscription_renewal

### Changed

- **[BREAKING]** Guild rankings are now just an array of MemberRanking, rather than a complicated object
- Some inner workings of how objects are constructed

---

## [0.1.1] 5th of February 2021

### Fixed

- Minor changes
- Fix errors, uhh erroring

---

## [0.1.0] 4th of February 2021

Initial Release!

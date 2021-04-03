Changelog
===

[0.2.1] 3rd of April 2021
---
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

[0.2.0] 2nd of April 2021
---
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

[0.1.1] 5th of February 2021
---
### Fixed
- Minor changes  
- Fix errors, uhh erroring

---

[0.1.0] 4th of February 2021
---
Initial Release!
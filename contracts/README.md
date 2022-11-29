# Advent calendar hook

This is a hook that will be used by 24 different locks (one lock per day).
The contract implements the `onKeyPurchase` hook so that the user can only purchase a token (they are free) if they own the token for the previous day AND if the day is "right" (ie one can only buy a token on day n if today >= day n).

The contract also implements "special" days where some tokens can be airdropped. The contract should not keep any state as we may want to change it!

KCON SLOT PREFERENCES WEB PAGE
==============================

Static website to provide a display utility for authors' slot preferences, backed by a parser for this new syntax.

EXAMPLES:

You can specify a list of particular numbers:

    5005, 5117, 5761

You can also use parentheses or brackets to group choices if you wish:

    (5001, 5002, 5003), (5100, 5200, 5300)

This also supports PATTERNS. All patterns require an order:

    lowest 5XXX
    highest 5XXX

The first will make a list starting with 5001, 5002, 5003, etc.
The second will make a list starting with 5999, 5998, 5997, etc.

There are also FIXED patterns. These require that all placeholder digits have the same value.
To illustrate, consider these two patterns:

    lowest 50XX
    lowest fixed 50XX

The first makes a list starting with 5001, 5002, 5003, 5004, 5005 etc.
The second makes a list starting with 5011, 5022, 5033, 5044, 5055, etc.

Note that there are many fewer fixed options. By definition, for any given pattern,
there can be at most 10 variants emitted.

The "fixed" modifer has no effect on patterns with only a single placeholder digit.

All of the above can be composed. So the following are all valid syntax:

    (highest 599X, 5002), 5022, lowest fixed 5XX0

    5013, 5017, 5019, 5023, 5027

    [lowest 500X, lowest 50X0, lowest 5X00], 5999, (5107, 5170)

    5007, highest 5X72, 5201, lowest fixed 50XX

Note that when executed parseAndListPreferences() or listPreferences(), you can pass in a list of unavailable slots. This is useful for instance, for blocking the X000 slot itself (since it is always the first-place prize), or for 9kon, blocking 9999).

In particular, this is useful for actual slot assignment - at the conclusion of a contest, you run through each article by score order and add all slots which have already been taken by higher winners.

If the function emits an empty list, then that means that the user did not provide enough preferences and a slot will have to be assigned for them.

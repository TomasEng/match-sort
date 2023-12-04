# MatchSort

MatchSort is a simple library NPM package that provides a fast, precise and customisable way to sort and filter strings by a given search term.

## Installation
MatchSort can be installed using NPM:
```bash
npm install match-sort
```

## Simple example
The fastest way to get started is by importing the ready-to-use `generalTextMatcher` object:

```js
import {generalTextMatcher} from 'match-sort';
import {data} from './data';

const planets = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
];
const searchTerm = 'sa';

const sortedData = generalTextMatcher.sort(searchTerm, planets);
/**
 * Expected result:
 * sortedData = [
 *   'Saturn',
 *   'Mars',
 *   'Uranus',
 * ];
 */
```
This example will sort "Saturn" first because it is the only planet that starts with the provided search term, "sa".
Then, Mars and Uranus are both included in the result because they both contain the letters "s" and "a".
Mars is sorted before Uranus because the letters of the search term constitute a larger part of the word "Mars" (1/2) than they do of the word "Uranus" (1/3),
hence "Mars" is considered a better match.
Words that do not contain all the characters of the search term are not included in the result.

## Custom examples
The `generalTextMatcher` object is built using the `MatchSort` class, which can be used to create any kind of functions for sorting and filtering string arrays.
Let's say we want to create a matcher that simply filters out all strings that do not contain the search term.
This can be done using the `MatchSort` class as follows:

```typescript
import {MatchSort} from 'match-sort';

const filter = (search: string) => (value: string) => value.includes(search);

const filterMatcher = new MatchSort().setFilter(filter);
```

However, when we now call `filterMatcher.sort('sa', planets)` on the list in the first example, we will get an empty result.
This is because the function is case sensitive. To fix that, it is necessary to provide a transformation function.
That is a function that transforms the search term and the values to be matched to a common format.
In fact, this package provides a ready-to-use transformation functions through the `StringTransform` class, including one for converting to lower case.
The `MatchSort` class accepts an array of such functions in its constructor, so we can apply it like this:

```typescript
import {MatchSort, StringTransform} from 'match-sort';

const filter = (search: string) => (value: string) => value.includes(search);
const transformFunctionList = [StringTransform.lowercase];

const filterMatcher = new MatchSort(transformFunctionList).setFilter(filter);
```

Now, when we call `filterMatcher.sort('sa', planets)` on the list in the first example we will get an an array containing "Saturn" as the only result.
If the list had contained "Saturn" and "saturn", both would have been included in the result, but "saturn" would have been sorted before "Saturn" because it matched the search term before the transformation was applied.

This sorter might need some more specific functionality, though. Results are only filtered, but not sorted.
If a user searches for "ur", "Mercury", "Saturn" and "Uranus" will be included in the result, but "Mercury" and "Saturn" will be sorted before "Uranus", although the user is probably looking for "Uranus".
To fix this, we can provide a custom sorting function that checks if the value starts with the search term.
This is done using the `MatchSort.chain()` function:

```typescript
import {MatchSort, StringTransform} from 'match-sort';
import {startsWith} from './startsWith';

const contains = (search: string) => (value: string) => value.includes(search);
const startsWith = (search: string) => (value: string) => value.startsWith(search);
const transformFunctionList = [StringTransform.lowercase];

const filterMatcher = new MatchSort(transformFunctionList)
  .chain(startsWith)
  .setFilter(filter);
```
Any number of chain functions can be applied to the `MatchSort` object, and they will be applied in the order they were added.
This means that values that match according to the first function will be sorted first, then values that match according to the second function, and so on.
If several values rank equally according to this strategy, they will be compared using the transform functions.

Sometimes, it is necessary to do a more complex comparison, so a function returning a boolean is not enough.
Therefore, `MatchSort.chain` also supports functions that return a number. The lower the number, the better the rank.
Let's say we want to sort the items by how well they match the search term, given that they don't start with it.
Since all values that do not contain the search string are filtered out, we can do that with a function that simply returns the length of the value:

```typescript
import {MatchSort, StringTransform} from 'match-sort';

const contains = (search: string) => (value: string) => value.includes(search);
const startsWith = (search: string) => (value: string) => value.startsWith(search);
const rank = () => (value: string) => value.length;

const filterMatcher = new MatchSort(transformFunctionList)
  .chain(startsWith)
  .chain(rank)
  .setFilter(filter);
```
Now, when we run `filterMatcher.sort('ur', planets)` on the list in the first example, "Uranus" will still be sorted first since the `startsWith` function is applied first,
but then "Saturn" will be sorted before "Mercury" because "ur" constitutes a larger part of the value.
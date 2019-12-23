// interface GetNextIndex {
//   step?: number;
//   currentIndex: number;
//   itemsLength: number;
//   loop: boolean;
// }

// export function getNextIndex({
//   step = 1,
//   currentIndex,
//   itemsLength,
//   loop,
// }: GetNextIndex) {
//   if (currentIndex === -1) {
//     return step > 0 ? 0 : itemsLength - 1;
//   }

//   const nextIndex = currentIndex + step;

//   if (nextIndex < 0) {
//     return loop ? itemsLength - 1 : 0;
//   }

//   if (nextIndex >= itemsLength) {
//     if (loop) return 0;
//     return currentIndex > itemsLength ? itemsLength : currentIndex;
//   }

//   return nextIndex;
// }

// //////////////////////////////////////////////////////////////

// export function getItemIndex<T>(items: T[], item: T) {
//   if (item == null || items.length === 0) {
//     return -1;
//   }
//   return items.indexOf(item);
// }

// //////////////////////////////////////////////////////////////
// /**
//  * Gets the next highlighted or selected option based on the typed characters
//  */
// export function getNextOptionFromKeys<T>({
//   items,
//   searchString,
//   itemToString,
//   currentValue,
// }: {
//   items: T[];
//   searchString: string;
//   itemToString: (item: T) => string;
//   currentValue: T;
// }) {
//   if (!searchString) {
//     return null;
//   }

//   // If current value doesn't exist, find the item that match the search string
//   if (!currentValue) {
//     const found = items.find(item =>
//       itemToString(item)
//         .toLowerCase()
//         .startsWith(searchString.toLowerCase()),
//     );
//     return found || currentValue;
//   }

//   // Filter items for ones that match the search string (case insensitive)
//   const searchResults = items.filter(item =>
//     itemToString(item)
//       .toLowerCase()
//       .startsWith(searchString.toLowerCase()),
//   );

//   // If there's a match, let's get the next item to select
//   if (searchResults.length) {
//     let nextIndex: number;

//     // If the currentValue is in the available items, we move to the next available option
//     if (searchResults.includes(currentValue)) {
//       const currentIndex = searchResults.indexOf(currentValue);
//       nextIndex = currentIndex + 1;
//       if (nextIndex === searchResults.length) {
//         nextIndex = 0;
//       }
//       return searchResults[nextIndex];
//     } else {
//       // Else, we pick the first item in the available items
//       nextIndex = items.indexOf(searchResults[0]);
//       return items[nextIndex];
//     }
//   }

//   // a decent fallback to the currentValue
//   return currentValue;
// }

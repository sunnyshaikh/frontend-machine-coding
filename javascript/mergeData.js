function mergeData(arr) {
  const map = new Map();

  for (const { user, duration, equipment } of arr) {
    if (!map.has(user)) {
      map.set(user, { user, duration, equipment });
    } else {
      const entry = map.get(user);
      entry.duration += duration;
      entry.equipment = [...new Set([...entry.equipment, ...equipment])].sort();
    }
  }

  return Array.from(map.values());
}

const mergedData = mergeData([
  { user: 8, duration: 50, equipment: ["bench"] },
  { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
  { user: 8, duration: 50, equipment: ["bench"] },
  { user: 7, duration: 150, equipment: ["bench", "kettlebell"] },
]);

console.log(mergedData);

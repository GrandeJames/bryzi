function groupBy<T>(collection: T[], key: keyof T): Record<string, T[]> {
  return collection.reduce((result, item) => {
    const groupKey = item[key] as string;
    (result[groupKey] ||= []).push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export default groupBy;

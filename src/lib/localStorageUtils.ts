"use client";

const getLocalStorageData = <T>(key: string): T[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing local storage data", error);
      return [];
    }
  }
  return [];
};

const getLocalStorageItem = <T extends { id: string }>(key: string, id: string): T | undefined => {
  const data = getLocalStorageData<T>(key);
  return data.find((item: any) => item.id === id);
};

const addLocalStorageItem = <T>(key: string, newItem: T): void => {
  const data = getLocalStorageData<T>(key);
  data.push(newItem);
  localStorage.setItem(key, JSON.stringify(data));
};

const removeLocalStorageItem = <T extends { id: string }>(key: string, id: string): void => {
  const data = getLocalStorageData<T>(key);
  const updatedData = data.filter((item: any) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updatedData));
};

const updateLocalStorageItem = <T extends { id: string }>(key: string, updatedItem: T): void => {
  const data = getLocalStorageData<T>(key);
  const updatedData = data.map((item: any) => (item.id === updatedItem.id ? updatedItem : item));
  localStorage.setItem(key, JSON.stringify(updatedData));
};

export {
  getLocalStorageData,
  getLocalStorageItem,
  addLocalStorageItem,
  removeLocalStorageItem,
  updateLocalStorageItem,
};

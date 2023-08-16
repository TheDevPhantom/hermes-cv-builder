// lots of room for improvement here
// looking for better ways to save data locally
// optionally, looking at saving data to a server

const loadData = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

const saveData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export { loadData, saveData };

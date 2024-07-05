export function generateId() {
  const id = Math.floor(Math.random() * 9000) + 1000;
  return id.toString();
}

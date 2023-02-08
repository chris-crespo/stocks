export const unreachable = (msg: string) => {
  throw new Error(`unreachable: ${msg}`);
}

declare function verify({
  signature: string,
  publicKey: string,
  data: string,
  saltLength: number
}): Promise<boolean>;

export {
  verify
};

declare function verify({
  signature: string;
  publicKey: string;
  data: string | object;
}): Promise<boolean>;

export {
  verify
};

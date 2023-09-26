import { verify } from 'src';

describe('verifies signatures', () => {

  it('verifies signatures for given signature, publicKey, data', async ()=> {

    const data = "Sign me!"
    const signature = "ilTUthI0dHMQZXpAL3thxAYwI2oSxHz0RRjCpEpc6G6gUPdVNhndc8-q0tODiPgYREUMGZtbcprphcVwfzItXNcKppv48BKq4zHqDjsZL_yqq3gCxr8s1hCNuhfcnHw7L0NntwlN7JAp_iijyKhpu74GnXwQtjrcHjvFLqjtsdeAP29DQruBGsknZKZtg8Jtrm7kvh3Ekh3BewzBYBfsu9gbvc4daYgnfeKAPRzsrd8vVjW60cL11dJjeQ7a9NaMSkszf9SVSNBas8McAAHbB19KqNmXJPnfJ9cdq-dzAVIF3Ilz83BsSA1necCIpKTb9phP4DNkcu3s5JOk3C7MEA=="
    const publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3eBIMsmM+lnrt4a8ZKe\nremQjs2hBhQrkVP6rtXyIH7cHJ9QFfnML6Eo7Dd37USydHWi2irw+ZNcWiLPxlNN\nvR0IFPulCPmrIncngyy7WJ5omKYmfU9E/FD6GNt4XHJ9TlbGAzGkoAJYN6KpvVve\nfAQnNbOD5PZ3xjPSJAAAK9/gWo82GbgtKt5+hWln5ZHO82ImC+DUhmJHNPR6dSsn\nTvU5S/I+N8rycEpWCewJSCm6y58q5f7OI7dMe3l4t/YyLXqVtPiSDNgcUPKfaBsg\n/nswyGfX0mlmfFI3An4yXASh0LrUwrfsZk+x3jxvqdU7UgKOjViYWQPUTlLm2fcR\n1QIDAQAB\n-----END PUBLIC KEY-----\n"

    expect(
      await verify({
        signature,
        publicKey,
        data
      })
    ).toEqual(true)

    expect(
      await verify({
        signature,
        publicKey,
        data: "Not The Momma!"
      })
    ).toEqual(false)

  })

  it('verifies another example', async ()=> {

    const data = "{\"status\":\"success\",\"failed_reason\":null,\"blockchain\":\"polygon\",\"transaction\":\"0x2c9edd8489100de5facb05426f2972b67f12b77c6df4488258145f2013a938c3\",\"sender\":\"0x317d875ca3b9f8d14f960486c0d1d1913be74e90\",\"nonce\":110,\"receiver\":\"0x317d875ca3b9f8d14f960486c0d1d1913be74e90\",\"token\":\"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619\",\"confirmations\":1,\"after_block\":32224419,\"amount\":\"0.00062055\",\"fee_amount\":\"0.00000945\",\"fee_receiver\":\"0x7b94266CA5cC36005b3043e1ffE5EBd624494731\",\"payload\":{\"country\":\"CH\",\"usd_value_received\":\"0.9862060281885\"},\"uuid\":\"c7a13601-2a25-4e10-990e-3fa494970e02\",\"callback\":\"http://integrate.depay.internal/api/links/payments/done\",\"release\":null,\"forward_to\":\"https://nftbutler.io/\",\"forward_on_failure\":true,\"confirmed_at\":\"2022-08-23T09:39:04.859046Z\",\"created_at\":\"2022-08-23T09:38:40.454774Z\",\"updated_at\":\"2022-08-23T09:39:05.037254Z\"}" 
    const signature = "ZfNjR5AX5DSe2hi2E3g5I4QxAA1T0CJGO5n5HxOOJ6PvViLl_46tnVkaCY5jQhRzjB5tu1WpEy5LDMpB5-JQOpIPgekgggrXqd2gz8noxDSyGeFSEp7bDckmuQSfMWBA9UYcquQwkKPvA1dM681nBbv0k7xDmrMByw7feXmrR8-pu7oFnFn3XMrBgVIrSbqvZxOy5q4j7t6NbogTI0KYNrgoymcYgeaP5d5RunOdlFTvZLKx9-swl0uMgDXeq81ILDK0Rdx_bs5dhB-aAqlznTK75pVZ08K_0Vjeu8y4s9FHbp5REr-NH0OkrzWb_L-Jk4L2NdWnau7ol6Np1Ac5pA=="
    const publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw2fORpk9Ait2C/NRJX3j\nv8dF9HLS3uThQYBwoBnhFiNkSHbzrgJ9aNqav9oOS7f6TepCUXEqd8muU35GYTno\nCCnShBsq/1c+JQ00W49IySJGXVKpIvw9JnkFDg8yqE/CmLwJWCX1z+HDnGJCtc2D\nMfMzu8CaFxPXAn91dMwLIRRXqqb5E4VU+TorjecYK7F2TXftZlSaALeibaExni3v\noQwZlnTbe+zp/lKbUGV4mWYfEVXi1w5MB6Jpsv5nnqcKjX1giczva0mMZTvIVzlp\nd71AsnL06JHHqqGzM+oL4/Q+hi8YSN/xGhNOJeybqDhYkIeX9VqECYC7iJMGPAvC\nBQIDAQAB\n-----END PUBLIC KEY-----\n"

    expect(
      await verify({
        signature,
        publicKey,
        data
      })
    ).toEqual(true)
  })

  it('verifies if data was passed as object', async ()=> {

    const data = JSON.parse("{\"status\":\"success\",\"failed_reason\":null,\"blockchain\":\"polygon\",\"transaction\":\"0x2c9edd8489100de5facb05426f2972b67f12b77c6df4488258145f2013a938c3\",\"sender\":\"0x317d875ca3b9f8d14f960486c0d1d1913be74e90\",\"nonce\":110,\"receiver\":\"0x317d875ca3b9f8d14f960486c0d1d1913be74e90\",\"token\":\"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619\",\"confirmations\":1,\"after_block\":32224419,\"amount\":\"0.00062055\",\"fee_amount\":\"0.00000945\",\"fee_receiver\":\"0x7b94266CA5cC36005b3043e1ffE5EBd624494731\",\"payload\":{\"country\":\"CH\",\"usd_value_received\":\"0.9862060281885\"},\"uuid\":\"c7a13601-2a25-4e10-990e-3fa494970e02\",\"callback\":\"http://integrate.depay.internal/api/links/payments/done\",\"release\":null,\"forward_to\":\"https://nftbutler.io/\",\"forward_on_failure\":true,\"confirmed_at\":\"2022-08-23T09:39:04.859046Z\",\"created_at\":\"2022-08-23T09:38:40.454774Z\",\"updated_at\":\"2022-08-23T09:39:05.037254Z\"}")
    const signature = "ZfNjR5AX5DSe2hi2E3g5I4QxAA1T0CJGO5n5HxOOJ6PvViLl_46tnVkaCY5jQhRzjB5tu1WpEy5LDMpB5-JQOpIPgekgggrXqd2gz8noxDSyGeFSEp7bDckmuQSfMWBA9UYcquQwkKPvA1dM681nBbv0k7xDmrMByw7feXmrR8-pu7oFnFn3XMrBgVIrSbqvZxOy5q4j7t6NbogTI0KYNrgoymcYgeaP5d5RunOdlFTvZLKx9-swl0uMgDXeq81ILDK0Rdx_bs5dhB-aAqlznTK75pVZ08K_0Vjeu8y4s9FHbp5REr-NH0OkrzWb_L-Jk4L2NdWnau7ol6Np1Ac5pA=="
    const publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw2fORpk9Ait2C/NRJX3j\nv8dF9HLS3uThQYBwoBnhFiNkSHbzrgJ9aNqav9oOS7f6TepCUXEqd8muU35GYTno\nCCnShBsq/1c+JQ00W49IySJGXVKpIvw9JnkFDg8yqE/CmLwJWCX1z+HDnGJCtc2D\nMfMzu8CaFxPXAn91dMwLIRRXqqb5E4VU+TorjecYK7F2TXftZlSaALeibaExni3v\noQwZlnTbe+zp/lKbUGV4mWYfEVXi1w5MB6Jpsv5nnqcKjX1giczva0mMZTvIVzlp\nd71AsnL06JHHqqGzM+oL4/Q+hi8YSN/xGhNOJeybqDhYkIeX9VqECYC7iJMGPAvC\nBQIDAQAB\n-----END PUBLIC KEY-----\n"

    expect(
      await verify({
        signature,
        publicKey,
        data
      })
    ).toEqual(true)
  })
})

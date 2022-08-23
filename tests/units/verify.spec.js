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
})

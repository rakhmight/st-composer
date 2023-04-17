export default {
    state: {
        sign:  {
            keys: {
                assymetric: {
                  publicKey: "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdZu42hoFCvMUrDTQ6A2B3CIV4\ntH0ansr5XAmEgdYmdF/KOcJsnv/Y0T7Bv52UhiRr3s9HUAh9jcmjWq1+zksFEW/Z\nFOxU0SsvqhQ0lzNPulw3dPY1tWv1eVXesTl0+Ja/6RdpDNBuRisg9Lp7hgUdCt1j\ngnQcpwYUPbfNOYHOwQIDAQAB\n-----END PUBLIC KEY-----\n"
                },
                symmetric: {
                  algorithm: "aes256",
                  notation: "hex",
                  encoding: "utf8",
                  key: "Vt0hOJ+YIA9q7epztD7dswofz3glXWn3bK1DmEtGKVg=",
                  iv: "2eRwXTaTeszmvbxRYreShQ=="
                }
              },
              id: "6437e533974544cc4cffa44d",
              fullName: "Raupov Akbar Alisherovich",
              subjects:  [
                {
                  id: "6438e1ff5adf0080ae242d36",
                  themes: [],
                  chair: "6437e49292e121403a6e2e43",
                  name: { ru: "Предмет 1", uz_l: null, uz_k: null, eng: null }
                },
                {
                  id: "6438e219cce25fedc67dde31",
                  themes: [
                    {
                      name: { ru: "Тема 1", eng: null, uz_k: null, uz_l: null },
                      id: 1
                    },
                    {
                      name: { ru: "Тема 2", eng: null, uz_k: null, uz_l: null },
                      id: 2
                    },
                    {
                      name: { ru: "Тема 3", eng: null, uz_k: null, uz_l: null },
                      id: 3
                    },
                    {
                      name: { ru: "Тема 4", eng: null, uz_k: null, uz_l: null },
                      id: 4
                    }
                  ],
                  chair: "6437e49292e121403a6e2e43",
                  name: { ru: "Предмет 2", uz_l: null, uz_k: null, eng: null }
                },
                {
                  id: "0000000639c7575c6e4683f1",
                  themes: [],
                  chair: "6437e49292e121403a6e2e43",
                  name: { ru: "Кафедра 3", uz_l: null, uz_k: null, eng: null }
                },
                {
                  id: "6438ee43bf140a219d4f0e97",
                  themes: [],
                  chair: "6437e49292e121403a6e2e43",
                  name: { ru: "Кафедра 4", uz_l: null, uz_k: null, eng: null }
                }
              ]
        }
    },
    getters: {
        currentSign(state){
            return state.sign
        }
    },
    mutations: {
        setSign(state, value){
            state.sign = value
        },
        clearSign(state){
            state.sign = {
                keys:{
                    assymetric:{},
                    symmetric:{}
                },
                id: undefined,
                fullName: undefined,
                subjects: []
            }
        }
    },
    actions: {
    }
}  
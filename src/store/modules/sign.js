export default {
    state: {
        sign:  {
            keys: {
                assymetric: {
                  publicKey: "-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwDaNG7m1gVHxKTBlungVLnS8w\r\nPGM7BhOPKT0Vb5CF4gEK2KK96IwA1i+BYi2/2NBVgmVgeYj0Mt6xAir//v0seX5S\r\nGvdJk2g1OuVqllRFRvRUH7/jeFbOhfoWT1DvVcD/SJLLN3a4KeZnXbN3UN7wPLEw\r\nte68agt9C4Y23qKgpQIDAQAB\r\n-----END PUBLIC KEY-----\r\n"
                },
                symmetric: {
                  algorithm: "aes256",
                  notation: "hex",
                  encoding: "utf8",
                  key: "0cO7QAPNeLXlxoj46XQ0xlZL+kdu8Gio5LGbQfJG6v0=",
                  iv: "kE/00EEBWqICKu4DkdC06Q=="
                }
              },
              hash: "b4f9ac3b5a15cb60e36f66998820f398b7098abc55749ae8bf66b70808ea9443",
              id: "643d17b2bc73ef10e71d363b",
              subjects: [
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
              ],
              fullName: "Makarov Radion Sergeevich"
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
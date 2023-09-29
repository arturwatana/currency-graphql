import axios from "axios";
export const currencyQuery = {
    currency: async (_, { data }) => {
        console.log(data);
        const res = await axios.get(`https://economia.awesomeapi.com.br/json/last/${data}`);
        const key = Object.keys(res.data);
        return res.data[key[0]];
    },
};

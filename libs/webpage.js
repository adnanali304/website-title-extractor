
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.extractTitle = (address) => {
    if(!address.match(/^[a-zA-Z]+:\/\//)){
        address = 'http://' + address;
    }
    return axios.get(address).then(response => {
        return response.data;
    })
    .then(data => {
        const {document} = (new JSDOM(data)).window;
        const title = document.querySelector("title").innerHTML;
        return {address, title};
    }).catch(e => {
        return {address, title: "NO_RESPONSE"};
    })
}
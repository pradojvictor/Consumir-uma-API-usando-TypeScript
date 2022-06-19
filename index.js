"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function form() {
    // primeiro vamos selecionar os elementos do html
    function htmlSelectors() {
        const selector = (id) => document.getElementById(id);
        return {
            inputName: selector("inputName"),
            inputUserName: selector("inputUserName"),
            inputEmail: selector("inputEmail"),
            inputAddress: selector("inputAddress"),
            inputAddressComplement: selector("inputAddressComplement"),
            inputphone: selector("typePhone"),
            inputZip: selector("inputZip"),
            inputCity: selector("inputCity"),
            inputCompanyName: selector("inputCompanyName"),
            inputURL: selector("typeURL"),
            getDataBtn: selector("getDataBtn"),
            sendDataBtn: selector("sendDataBtn"), // add o botão que iram atualizar as informações
        };
    }
    // função que ira buscar o usuario, ira pegar os dados da API
    function getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                return yield response.json();
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    // função que ira atualizar o usuario, ira atualizar os dados da API
    function updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                    method: "PUT",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                });
                return yield response.json();
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    // função irmã da update
    function handleUpdateUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const { inputName, inputUserName, inputEmail, inputAddress, inputAddressComplement, inputphone, inputZip, inputCity, inputCompanyName, inputURL } = htmlSelectors();
            // vamos reatribuir os valores
            const saveUser = yield updateUser({
                id: 1,
                name: inputName.value,
                username: inputUserName.value,
                email: inputEmail.value,
                address: {
                    street: inputAddress.value,
                    suite: inputAddressComplement.value,
                    city: inputCity.value,
                    zipcode: inputZip.value,
                },
                phone: inputphone.value,
                website: inputURL.value,
                company: {
                    name: inputCompanyName.value,
                },
            });
            //verificar se ocorreu um saveuser
            if (saveUser === null || saveUser === void 0 ? void 0 : saveUser.id) {
                // inputName.value = ""; // cria um espaco em branco
            }
        });
    }
    // função para logar um usuario
    function logRandomUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // agora vamos popular os campos com as informações da Api na tela
            event === null || event === void 0 ? void 0 : event.preventDefault();
            const firstUser = yield getUser(1); // função para logar um usuario
            const allSelectors = htmlSelectors();
            if (!firstUser)
                return; //caso ele não retorne nada ele encerra aqui
            allSelectors.inputName.value = firstUser.name; // ira completa o campo com os dados do nome
            allSelectors.inputUserName.value = firstUser.username;
            allSelectors.inputEmail.value = firstUser.email;
            allSelectors.inputAddress.value = firstUser.address.street;
            allSelectors.inputAddressComplement.value = firstUser.address.suite;
            allSelectors.inputphone.value = firstUser.phone;
            allSelectors.inputZip.value = firstUser.address.zipcode;
            allSelectors.inputCity.value = firstUser.address.city;
            allSelectors.inputCompanyName.value = firstUser.company.name;
            allSelectors.inputURL.value = firstUser.website;
        });
    }
    // função para controlar os botões
    function setupButtonHandlers() {
        const { getDataBtn, sendDataBtn } = htmlSelectors();
        getDataBtn.addEventListener("click", logRandomUser);
        sendDataBtn.addEventListener("click", handleUpdateUser);
    }
    function init() {
        setupButtonHandlers(); //essa função ira carrega no onload preparando os botões
        // logRandomUser()     // caso eu queira que ao carregar a pagina todas as informações ja venham carregadas
    }
    return {
        init,
        logRandomUser,
    };
}
form().init(); //carregada no onload


interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

interface Company {
    name: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

function form() {

    // primeiro vamos selecionar os elementos do html
    function htmlSelectors() {

        const selector = (id: string) => document.getElementById(id)

        return {
            inputName: selector("inputName") as HTMLInputElement,
            inputUserName: selector("inputUserName") as HTMLInputElement,
            inputEmail: selector("inputEmail") as HTMLInputElement,
            inputAddress: selector("inputAddress") as HTMLInputElement,
            inputAddressComplement: selector("inputAddressComplement") as HTMLInputElement,
            inputphone: selector("typePhone") as HTMLInputElement,
            inputZip: selector("inputZip") as HTMLInputElement,
            inputCity: selector("inputCity") as HTMLInputElement,
            inputCompanyName: selector("inputCompanyName") as HTMLInputElement,
            inputURL: selector("typeURL") as HTMLInputElement,
            getDataBtn: selector("getDataBtn") as HTMLButtonElement,   // add o botão que iram busca as informações
            sendDataBtn: selector("sendDataBtn") as HTMLButtonElement, // add o botão que iram atualizar as informações
        };
    }

    // função que ira buscar o usuario, ira pegar os dados da API
    async function getUser(userId: number): Promise<User | undefined> {
        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            return await response.json()
        } catch (error) {
            console.error(error);
        }
    }

    // função que ira atualizar o usuario, ira atualizar os dados da API
    async function updateUser(user: User): Promise<User | undefined> {
        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            return await response.json();
        } catch (err) {
            console.error(err);
        }
    }

    // função irmã da update
    async function handleUpdateUser(event: Event) {
        event.preventDefault();
        const { inputName, inputUserName, inputEmail, inputAddress, inputAddressComplement, inputphone, inputZip, inputCity, inputCompanyName, inputURL
        } = htmlSelectors();

        // vamos reatribuir os valores
        const saveUser = await updateUser({
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
        if (saveUser?.id) {
            // inputName.value = ""; // cria um espaco em branco
        }
    }

    // função para logar um usuario
    async function logRandomUser(event: Event): Promise<void> {
        // agora vamos popular os campos com as informações da Api na tela
        event?.preventDefault();
        const firstUser = await getUser(1); // função para logar um usuario
        const allSelectors = htmlSelectors();
        if (!firstUser) return //caso ele não retorne nada ele encerra aqui
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
    }

    // função para controlar os botões
    function setupButtonHandlers() {
        const { getDataBtn, sendDataBtn } = htmlSelectors();
        getDataBtn.addEventListener("click", logRandomUser);
        sendDataBtn.addEventListener("click", handleUpdateUser);
    }

    function init(): void {
        setupButtonHandlers()  //essa função ira carrega no onload preparando os botões
        // logRandomUser()     // caso eu queira que ao carregar a pagina todas as informações ja venham carregadas
    }
    return {
        init,
        logRandomUser,
    }
}
form().init();     //carregada no onload


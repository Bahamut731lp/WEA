/**
 * @typedef {{
 *  street: string,
 *  suite: string,
 *  city: string,
 *  zipcode: string,
 *  geo: {
 *      lat: string,
 *      lng: string
 *  }
 * }} Address
 */

/**
 * @typedef {{
 *  name: string,
 *  catchPhrase: string,
 *  bs: string
 * }} Company
 */

/**
 * @typedef {{
 *  id: number,
 *  name: string,
 *  username: string,
 *  email: string,
 *  address: Address,
 *  phone: string,
 *  website: string,
 *  company: Company
 * }[]} User
 */


const TABLE_HEADER = ["id", "name", "username", "email", "phone", "website"];

/**
 * Funkce pro získání dat o uživatelích
 */
async function getUsers() {
    let isOk = true;

    const response = await fetch("https://jsonplaceholder.typicode.com/users").catch((error) => {
        // Nasty side effect, ale nechci try-catch;
        isOk = false
    });;

    if (!isOk || !String(response.status).startsWith("2")) return []

    /** @type {User[]} */
    const json = await response.json();

    return json;
}

/**
 * Funkce pro zobrazení dat do tabulky
 * @param {User[]} data Data o uživatelích
 */
async function displayData(data) {

    // Nalezení a kontrola existence containeru
    const container = document.getElementById("mydata-display");
    if (!container) throw new Error("Kontejner s id mydata-display neexistuje.");

    //Vytvoření tabulky
    const table = document.createElement("table");
    table.createTHead();
    table.createTBody();

    // Projdeme všechna pole, která chceme zobrazovat a vytvoříme pro ně záhlaví
    const header = TABLE_HEADER.map(field => {
        const element = document.createElement("th");
        element.textContent = field;

        return element;
    });

    // Tabulka může mít více těl, vezmeme to první
    const body = table.tBodies[0];

    // Vytvoření jednotlivých řádků
    for (const user of data) {
        const row = document.createElement("tr");
        // Každej řádek vytvoříme tak, že vezmeme záhlaví
        // a vytvoříme buňku - textem ji naplníme jenom v případě,
        // že bude klíč záhlaví v objektu user
        const fields = TABLE_HEADER.map(field => {
            const element = document.createElement("td");
            if (field in user) element.textContent = user[field];

            return element.outerHTML;
        });

        // Tady jsem musel trochu hackovat
        // Nemůžu tady dát prostý append, protože fields je typu HTMLTableCellElement[],
        // a to mi append ani další funkce nepoberou
        // Takže si to nejdřív zkonvertuju na string a pak to vložím naráz
        // Rozhodně mi to připadá lepší jak používat insertCell()
        row.insertAdjacentHTML("beforeend", fields.join(""))
        body.append(row)
    }

    table.tHead.append(...header);
    container.append(table);
}

window.document.addEventListener('DOMContentLoaded', async () => {
    const button = document.getElementById("mydata-read");

    button.addEventListener("click", async () => {
        const users = await getUsers();
        if (!users.length) return alert("Data se nepodařilo načíst");
        
        displayData(users);
    });
});

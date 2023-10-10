const HIDDEN_CLASS_NAME = "hidden";

function onToggleClick(event) {
    const poznamky = document.querySelectorAll(".poznamka");
    const isHidden = [...poznamky].every(v => v.classList.contains(HIDDEN_CLASS_NAME));

    for (const poznamka of poznamky) {
        poznamka.classList.toggle(HIDDEN_CLASS_NAME);
    }

    event.target.textContent = isHidden ? "skrýt poznámky" : "zobrazit poznámky"
}

window.addEventListener("load", () => {
    document.body.insertAdjacentHTML("beforebegin", `
        <style>
            .${HIDDEN_CLASS_NAME} {
                display: none
            }
        </style>
    `);

    document
    .getElementById("prepinac")
    .addEventListener("click", onToggleClick);
});


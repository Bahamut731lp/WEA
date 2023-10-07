const HIDDEN_CLASS_NAME = "hidden";

function onToggleClick(event) {
    const poznamky = document.querySelectorAll(".poznamka");
    
    for (const poznamka of poznamky) {
        poznamka.classList.toggle(HIDDEN_CLASS_NAME);
    }
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


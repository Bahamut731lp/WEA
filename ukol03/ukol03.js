/*
* @TODO implementovat řešení dle zadání na elearning.tul.cz
*/
"use strict";

// Bootstrap barvy z dokumentace
const COLOURS = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "muted", "white"]

/**
 * Funkce obsluhující kliknutí tlačítka pro obarvení banneru
 * @param {PointerEvent} event Událost kliknutí 
 * @param {HTMLElement} banner Reference na HTML element
 */
function onButtonClick(event, banner) {
    const {target} = event;
    if (!target) return false;

    // Nalezení kliknuté barvy
    const colour = [...target.classList]
    .map((value) => value.split("-").pop())
    .find(value => COLOURS.includes(value));

    if (!colour) return false;

    // Odstranění barev z banneru
    const bannerColorClasses = [...banner.classList]
    .filter((value) => COLOURS.includes(value.split("-").pop()))

    banner.classList.remove(...bannerColorClasses)
    banner.classList.add(`bg-${colour}`);
}

function main() {
    const banner = document.querySelector("#banner");
    const buttons = document.querySelectorAll("button");

    for (const button of buttons) {
        button.addEventListener("click", (event) => onButtonClick(event, banner));
    }
}

window.addEventListener("load", main);
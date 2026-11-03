export const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
export const btn = document.getElementById('roll-btn');
export const quit = document.getElementById('quit-game')
export const results = [];
export const el = document.querySelectorAll(".active-dice");
export const pointsSelect = document.querySelectorAll(".points-select");
export const lockedAll = document.querySelectorAll(".locked-status");
export const state = {
    isRolling: false,
    rolls: 3
}
export const rollsLeft = document.getElementById("rolls-left");
export const upperPointers = document.querySelectorAll(".upper-section .points-select");
export const lowerPointers = document.querySelectorAll(".lower-section .points-select");
export const totalHigher = document.getElementById("higher-section-total-points");
export const totalLower = document.getElementById("lower-section-total-points");
export const totalGrand = document.getElementById("grand-section-total-points");
export const bonusText = document.getElementById("bonus");
export const newGameBtn = document.getElementById("newgamebtn");
export const welcomeScreen = document.querySelector(".welcome-screen");
export const gameScreen = document.querySelector(".gameplay");
export const soloBtn = document.getElementById("Solo");
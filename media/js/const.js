export const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
export const btn = document.getElementById('roll-btn');
export const quit = document.getElementById('quit-game')
export const results = [];
export const el = document.querySelectorAll(".active-dice");
export const pointsSelect = document.querySelectorAll(".points-select");
export const lockedAll = document.querySelectorAll(".locked-status");
export const state = {
    isRolling: false,
    rolls: 3,
    currentPlayer: 0
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

export const modes = document.querySelectorAll(".mode")


export const UPPER = ["1", "2", "3", "4", "5", "6"];
export const LOWER = ["3-row", "4-row", "2-3", "s-straight", "l-straight", "5-row", "random"];



export const players = [];
export const scoreBoard = document.querySelector(".scoring-options");

export const player1 = document.getElementById("p1");
export const player2 = document.getElementById("p2");

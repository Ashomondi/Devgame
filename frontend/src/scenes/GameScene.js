import Phaser from 'phaser';
import { Board } from '../objects/Board';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.board = new Board(this);
        
        this.hudOverlay = this.add.dom(0, 0).createFromCache('hudUI');
        this.hudOverlay.setOrigin(0, 0);

        this.setupUIListeners();
    }

    setupUIListeners() {
        const rollBtn = document.getElementById('roll-dice-btn');
        if (rollBtn) {
            rollBtn.addEventListener('click', () => this.handleDiceRoll());
        }
    }

    handleDiceRoll() {
        console.log("Dice rolled! Communicating with Go API...");
    }

    showPropertyModal(propertyData) {
        const modalHtml = `
            <div class="modal-backdrop">
                <div class="property-card tourism-sector">
                    <h3>${propertyData.sector}</h3>
                    <h2>${propertyData.name}</h2>
                    <div class="rent-schedule">Base Rent: ${propertyData.rent}</div>
                    <button id="buy-btn">Buy Property (${propertyData.cost})</button>
                    <button id="auction-btn">Auction</button>
                </div>
            </div>
        `;
        
        const modal = this.add.dom(window.innerWidth / 2, window.innerHeight / 2).createFromHTML(modalHtml);
        
        document.getElementById('buy-btn').addEventListener('click', () => {
            modal.destroy();
        });
    }

    showLiquidationModal(debtAmount) {
        const liquidationHtml = `
            <div class="liquidation-container">
                <h2>⚠️ Liquidation Required</h2>
                <p>Debt Owed: Ksh ${debtAmount}</p>
                <div class="progress-bar"><div class="fill" style="width: 0%"></div></div>
                <button class="confirm-btn">Confirm & Pay</button>
            </div>
        `;
        this.add.dom(window.innerWidth / 2, window.innerHeight / 2).createFromHTML(liquidationHtml);
    }
}

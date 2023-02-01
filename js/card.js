export default class Card {
  _cardOpen = false;
  _cardMatched = false;
  constructor(container, number, action) {
    container = document.getElementById('game-container');
    this.card = document.createElement('div');
    this.number = number;
    this.cardNumber = document.createElement('span');
    this.card.classList.add('card');
    this.cardNumber.textContent = number;
    this.cardNumber.classList.add('card-text');
      
    this.card.addEventListener('click', () => {
      if(this.cardOpen === false && this._cardMatched === false) {
        this.card.classList.add('open');
        action(this);
        this.cardOpen = true;
      }
    });
  
    container.append(this.card);
    this.card.append(this.cardNumber);
  };

  set cardOpen(value) {
    this._cardOpen = value;
    value ? this.card.classList.add('open') & this.card.classList.add('card-text') : this.card.classList.remove('open') & this.card.classList.remove('card-text');
  };

  get cardOpen() {
    return this._cardOpen;
  };

  set cardMatched(value) {
    this._cardMatched = value;
    value ? this.card.classList.add('matched') & this.card.classList.add('card-text') : this.card.classList.remove('matched') & this.card.classList.remove('card-text');
  };

  get cardMatched() {
    return this._cardOpen;
  };
};
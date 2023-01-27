import { html, css, LitElement } from 'lit';

export class TestBtn extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
    }
    :host([current-side]) {
      border: 10px dashed green;
    }
    div {
      padding: 50px;
      border-radius: 25px;
      display : flex;
    }
    p {
      text-align: center;
      margin: auto;
      width: 50%;
      font-size: 20px;
      word-wrap: break-word;
      word-break: keep-all;
      overflow: hidden;
    }
    .container {
      height: var(--test-btn-height, 300px);
      width: var(--test-btn-width, 150px);
    }
  `;
    
    
  static properties = {
    currentSide: {type: Boolean,
    reflect: true,
  attribute: 'current-side'},
    sideOneData: {
      type: String,
      attribute: "side-one-data",
    },
    sideTwoData: {
      type: String,
      attribute: "side-two-data",
      reflect: true,
    }, 
    color1: {
      type: String,
    },
    color2: {type: String},
    backgroundColor: {
      type: String
    }
  };

  constructor() {
    super();
    this.currentSide = true;
    this.sideOneData = null;
    this.sideTwoData = null;
    this.color1 = "white";
    this.color2 = "black";
    this.activeColor = null;
    this.backgroundColor = null;
  }

  firstUpdated(changedProperties) {
    this.shadowRoot.querySelector(".container").addEventListener('click', this.__flip.bind(this));
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "currentSide") {
        this.activeColor = (this.currentSide) ? this.color2 : this.color1;
        this.backgroundColor = (!this.currentSide) ? this.color2 : this.color1;
      }      
    });
  }

  __flip() {
     this.currentSide = !this.currentSide;
     this.dispatchEvent(new CustomEvent('test-btn-flipped', {
      composed: true,
      bubbles: true,
      cancelable: false,
      detail: {
        value: this.currentSide
      }
     }));
  }

  render() {
    return html`
      <div
        class="container"
        style="background-color: ${this.backgroundColor};
        color: ${this.activeColor};"> 

      <p part="text-side">${this.currentSide ? this.sideOneData : this.sideTwoData}</p>
      <p>${this.currentSide ? html`<slot name="side1"></slot>` : html`<slot name="side2"></slot>`}</p>
      </div>
    `;
  }
}

import { html, css, LitElement } from 'lit';

export class TestBtn extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;

    }
    :host > div {
      padding: 50px;
      border-radius: 25px;
      display : flex
    }
    :host > p {
      text-align: center;
      margin: auto;
      width: 50%;
      font-size: 30px;
      
    }
  `;
    
    
  static properties = {
    currentSide: {type: Boolean},
    sideOneData: {type: String},
    sideTwoData: {type: String}, 
    height: {type: Number},
    width: {type: Number},
    color1: {type: String},
    color2: {type: String},
    coloredText: {type: String}
  };

  constructor(sideOneData, sideTwoData, height, width, color1, color2, coloredText) {
    super();
    this.currentSide = true;
    this.sideOneData = sideOneData || "No Data Entered (Side 1)";
    this.sideTwoData = sideTwoData || "No Data Entered (Side 2)";
    this.height = height || 300;
    this.width = width || 150;
    this.color1 = color1 || "#AAAE7F";
    this.color2 = color2 || "#143109"; 
    this.coloredText = coloredText || "True";
  }

  __flip() {
     this.currentSide = !this.currentSide;
  }

  render() {
    var tempString = (this.currentSide) ? this.sideOneData : this.sideTwoData;
    var backgroundColor = (this.currentSide) ? this.color1 : this.color2;

    console.log(this.coloredText);

    var textColor = (this.coloredText == "True") ? ((this.currentSide) ? this.color2 : this.color1) : "white"; 

    console.log(textColor);

    return html`
      <div 
        @click=${this.__flip}
        style="
        height: ${this.height}px;
        width: ${this.width}px;
        background-color: ${backgroundColor};
        color: ${textColor};
        
        "> 

      <p
        style=" 
        text-align: center;
        margin: auto;
        width: 50%;
        font-size: 25px;
        word-wrap: break-word;
        word-break: keep-all;
      ">${tempString}</p>

      </div>
    `;
  }
}

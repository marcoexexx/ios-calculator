const colorScheme = {
  bgPrimary: "#D4D4D2",
  bgSecondary: "#1c1c1c",
  bgThird: "#ff9500",
};


class ButtonElementImpl {
  constructor(context, className, bg, color = "#fff", display) {
    this.context = context;
    this.className = className;
    this.bg = bg;
    this.color = color;
    this.display = !display ? context : display;
  }

  new() {
    let el = document.createElement("div");
    let context = document.createElement("p");

    context.textContent = this.display;
    el.setAttribute("class", this.className);
    el.setAttribute("onclick", `show("${this.context}", "${this.display}")`);
    el.style.background = this.bg;
    el.style.color = this.color;// this.getTextColor(this.bg);
    el.appendChild(context);
    return el;
  }
}


let calElement = document.querySelector(".btn-container");
let numElement = document.querySelector(".num");

let btnElements = [
  new ButtonElementImpl("AC", "btn primary-operator ac", colorScheme.bgPrimary, "#000"),
  new ButtonElementImpl("+/-", "btn primary-operator", colorScheme.bgPrimary, "#000"),
  new ButtonElementImpl("%", "btn primary-operator", colorScheme.bgPrimary, "#000"),
  new ButtonElementImpl("/", "btn operator", colorScheme.bgThird, "#fff", "÷"),

  new ButtonElementImpl("7", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("8", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("9", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("*", "btn operator", colorScheme.bgThird, "#fff", "x"),

  new ButtonElementImpl("4", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("5", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("6", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("-", "btn operator", colorScheme.bgThird),

  new ButtonElementImpl("1", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("2", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("3", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("+", "btn operator", colorScheme.bgThird),

  new ButtonElementImpl("0", "btn zero", colorScheme.bgSecondary),
  new ButtonElementImpl(".", "btn", colorScheme.bgSecondary),
  new ButtonElementImpl("=", "btn equal operator", colorScheme.bgThird),
]


const numberFormat = Intl.NumberFormat("en-US").format;
let operator;
let formula = "";

btnElements.forEach(btn => {
  let el = btn.new();
  calElement.appendChild(el);
})


function addOpeartor(op) {
  if (/\d$/.test(formula)) {
    formula += op;
  } else {
    formula = formula.slice(0, -1);
    formula += op;
  }
};


function calculate() {
  console.log(formula)
  if (/\d$/.test(formula)) numElement.value = eval(formula)
  else {
    formula = formula.slice(0, -1);
    numElement.value = eval(formula);
  }
}


function show(num, display) {
  if (display === "AC" || display === "C") {
    numElement.value = "0";
    formula = "";
    document.querySelector(".ac").childNodes[0].textContent = "AC";
    return;
  } else if (!Number(display) && display !== "+/-" && display !== "=") { // if opeartor
    operator = num;
    addOpeartor(operator);
    console.log(formula)
  } else if (!Number(display) && display === "+/-") { // if +/- opeartor
    if (numElement.value.startsWith("-")) numElement.value = numElement.value.slice(1);
    else numElement.value = "-"+numElement.value;
  } else if (Number(display)) {
    document.querySelector(".ac").childNodes[0].textContent = "C";
    if (numElement.value === "0") numElement.value = numElement.value.slice(1);
    if (operator) numElement.value = "";

    numElement.value = numberFormat((numElement.value + display).replaceAll(",", ""));
    formula += display;
    if (operator) operator = undefined;
  } else if (display === "=") {
    calculate();
  }
}

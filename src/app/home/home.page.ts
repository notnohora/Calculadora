// import { Component} from '@angular/core';
// import { IonHeader, IonButton, IonTitle, IonContent, IonInput, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
// import { FormsModule } from '@angular/forms'; 
// import { CommonModule } from '@angular/common';
// import { last } from 'rxjs';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
//   imports: [CommonModule, FormsModule, IonButton, IonContent, IonInput, IonGrid, IonRow, IonCol],
// })
// export class HomePage {
//   constructor() {}
//   count = 0;
//   parenthesis = 2;
//   value = '';
//   auxValue = '';
//   readyForNewInput = true;
//   lastOperator = '';
//   lastValue = ''
//   expression: string = '';

//   buttonGroups = [
//     ['c', '()', '%', '/'],
//     ['7', '8', '9', '*'],
//     ['4', '5', '6', '-'],
//     ['1', '2', '3', '+'],
//     ['+/-', '0', '.', '=']
//   ];
  
//   calculate(op: string) {
//   const a = parseFloat(this.lastValue);
//   const b = parseFloat(this.value);

//   const operations: { [key: string]: (x: number, y: number) => number } = {
//     '*': (x, y) => x * y,
//     '%': (x, y) => (x*y) / 100,
//     '/': (x, y) => x / y,
//     '-': (x, y) => x - y,
//     '+': (x, y) => x + y
//   };

//   if (operations[op]) {
//       const result = operations[op](a, b)
//       if(op === '%' && this.lastOperator === ''){
//         this.lastValue = '' + result;
//         this.value = '' + result;
//       }
//       else if (op === '%' && this.lastOperator !== ''){
//         this.value = '' + result;
//       }
//       else{
//         this.lastValue = this.value;
//         this.value = '' + result;
//       }
      
//     }
//   }


//   pressButton(Symbol : string) {
//   // Numbers
//     if(!isNaN(Number(Symbol))){
//       if(this.readyForNewInput){
//         this.value = '' + Symbol;
//       }
//       else{
//         this.value += '' + Symbol;
//       }
//       this.expression += Symbol;
//       this.readyForNewInput = false;
//     }
//   // Clear
//     else if (Symbol === 'c'){
//       this.count = 0;
//       this.parenthesis = 2;
//       this.expression = '';
//       this.value = '';
//       this.auxValue = '';
//       this.readyForNewInput = true;
//       this.lastOperator = '';
//       this.lastValue = ''
//     }
//     // Parenthesis
//     else if(Symbol === '()'){
//       if(!isNaN(Number(this.expression[this.expression.length-1]))){
//         this.expression += ')';
//       }
//       else if(['+', '-', '*', '/', '('].includes(this.expression[this.expression.length-1]) ){
//         this.expression += '(';
//       }
//       else {
//         if((this.parenthesis % 2) === 0){
//         this.expression += '(';
//         }
//         else{
//           this.expression += ')'
//         }
//       }
//       this.parenthesis += 1;
//     }
//     // Positive/Negative
//     else if(Symbol === '+/-'){
//       this.auxValue = this.value;
//       if (this.value.startsWith('-')) {
//         this.value = this.value.slice(1);
//       } 
//       else {
//         this.value = '-' + this.value;
//       }

//       if (this.expression.length > 0) {
//         if(this.auxValue.startsWith('-')){
//           this.expression = this.expression.replace(/([+\-*/])?\((-\d+\.?\d*)$/, (match, operator, number) => {
//           return (operator || '') + number.slice(1);;
//           });
//         }else{
//           this.expression = this.expression.replace(/([+\-*/])?(\d+\.?\d*)$/, (match, operator, number) => {
//           return (operator || '') + '(-' + number;
//           });
//         }
        
//       }
//     }
//   // Equals
//   //QUEDE AQUI CUADRANDO COMO CALCULAR CON PARENTESIS Y PORCENTAJES JUNTOS 
//   // (100+20)% no funciona
//     else if (Symbol === '='){
//       this.count = this.expression.split('%').length - 1;
//         if(this.lastOperator !== '%' && this.value !== this.lastValue && this.count === 1){
//           this.calculate(this.lastOperator);
//         }
//         else if(this.count >= 1 && this.parenthesis > 2){

// //BORRADOR FALLIDOS
//           // try {
//           // let expr = this.expression;
//           // expr = expr.replace(/(\([^()]*\))%/, (match, p1) => {
//           //   return `(${p1}/100)`;  
//           // });


//     // this.value = eval(expr).toString();
//     // this.lastValue = this.value;
//   // } catch (e) {
//   //   this.value = 'Error';
//   // }
//         try {
//           let expr = this.expression;
//           // Reemplazar patrones tipo "A+B%" o "A-B%" por su versión expandida
//           expr = expr.replace(/(\d+(\.\d+)?)([+\-])(\d+(\.\d+)?)%/g, (match, num1, _, operator, num2) => {
//               return `${num1}${operator}(${num1}*${num2}/100)`;
//           });

//           // Reemplazar patrones tipo "A*B%" o "A/B%" por A*(B/100) o A/(B/100)
//           expr = expr.replace(/(\d+(\.\d+)?)([*\/])(\d+(\.\d+)?)%/g, (match, num1, _, operator, num2) => {
//               return operator === '*' 
//               ? `${num1}*(${num2}/100)` 
//               : `${num1}/(${num2}/100)`;
//           });
//           this.value = eval(expr).toString();
//           this.lastValue = this.value;
//           // this.expression = this.value;
//         } catch (e) {
//           this.value = 'Error';
//         }
//       }
//       else if(this.count === 0 && this.parenthesis >= 2){
//         try {
//           this.value = eval(this.expression).toString();
//           this.lastValue = this.value;
//           // this.expression = this.value;
//         } catch (e) {
//           this.value = 'Error';
//         }
//         //
//       }
      
//     }
  
//   // Operators
//     else if (['+', '-', '*', '/', '%'].includes(Symbol)){
//       this.expression += Symbol;
//       this.readyForNewInput = true;
//       // Percent Cases
//       if(Symbol === '%'){
//         if (this.parenthesis === 2){
//         if(this.lastOperator === ''){
//           this.lastValue = this.value
//           this.value = '1'
//           this.calculate(Symbol);
//           this.lastOperator = Symbol;
//         }
//         else if(this.lastOperator === '*' || this.lastOperator === '/'){
//           this.auxValue = this.lastValue
//           this.lastValue = this.value
//           this.value = '1'
//           this.calculate(Symbol)
//           this.lastValue = this.auxValue
//         }
//         else if(this.lastOperator === '+' || this.lastOperator === '-'){
//           this.calculate(Symbol)
//         }
//       }
//       }
//       // else cases
//       else{
//         this.lastValue = this.value;
//         this.lastOperator = Symbol;
//       }
//     }   
//   }
// }

import { Component} from '@angular/core';
import { IonHeader, IonButton, IonTitle, IonContent, IonInput, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { last } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, FormsModule, IonButton, IonContent, IonInput, IonGrid, IonRow, IonCol],
})
export class HomePage {
  constructor() {}
  count = 0;
  parenthesis = 2;
  value = '';
  auxValue = '';
  readyForNewInput = true;
  lastOperator = '';
  lastValue = ''
  expression: string = '';

  buttonGroups = [
    ['c', '()', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '=']
  ];
  
  calculate(op: string) {
  const a = parseFloat(this.lastValue);
  const b = parseFloat(this.value);

  const operations: { [key: string]: (x: number, y: number) => number } = {
    '*': (x, y) => x * y,
    '%': (x, y) => (x*y) / 100,
    '/': (x, y) => x / y,
    '-': (x, y) => x - y,
    '+': (x, y) => x + y
  };

  if (operations[op]) {
      const result = operations[op](a, b)
      if(op === '%' && this.lastOperator === ''){
        this.lastValue = '' + result;
        this.value = '' + result;
      }
      else if (op === '%' && this.lastOperator !== ''){
        this.value = '' + result;
      }
      else{
        this.lastValue = this.value;
        this.value = '' + result;
      }
      
    }
  }


  pressButton(Symbol : string) {
  // Numbers
    if(!isNaN(Number(Symbol))){
      if(this.readyForNewInput){
        this.value = '' + Symbol;
      }
      else{
        this.value += '' + Symbol;
      }
      this.expression += Symbol;
      this.readyForNewInput = false;
    }
  // Clear
    else if (Symbol === 'c'){
      this.count = 0;
      this.parenthesis = 2;
      this.expression = '';
      this.value = '';
      this.auxValue = '';
      this.readyForNewInput = true;
      this.lastOperator = '';
      this.lastValue = ''
    }
    // Parenthesis
    else if(Symbol === '()'){
      if(!isNaN(Number(this.expression[this.expression.length-1]))){
        this.expression += ')';
      }
      else if(['+', '-', '*', '/', '('].includes(this.expression[this.expression.length-1]) ){
        this.expression += '(';
      }
      else {
        if((this.parenthesis % 2) === 0){
        this.expression += '(';
        }
        else{
          this.expression += ')'
        }
      }
      this.parenthesis += 1;
    }
    // Positive/Negative
    else if(Symbol === '+/-'){
      this.auxValue = this.value;
      if (this.value.startsWith('-')) {
        this.value = this.value.slice(1);
      } 
      else {
        this.value = '-' + this.value;
      }
      // También actualizamos la expresión
  // 1) Eliminamos el último número completo de la expresión
  this.expression = this.expression.replace(/(\d+\.?\d*)$/, '');
  
      
        if(this.value.startsWith('-') && this.lastOperator === '-'){
          this.expression.slice(this.expression.length);
          this.expression += '+' + this.value.slice(1);
        }else if (this.value.startsWith('-') && this.lastOperator === '+'){
          this.expression += '(' + this.value + ')';
          this.parenthesis += 2;
        }
        else{
          this.expression.slice(this.expression.length);
          this.expression +=  this.value;
        }
        
      
    }
  // Equals
  else if (Symbol === '=') {
  try {
    let expr = this.expression;

    // Case A*B% → A*(B/100)
    // Case A/B% → A/(B/100)
    expr = expr.replace(/(\d+(\.\d+)?)([*\/])(\d+(\.\d+)?)%/g, 
      (match, num1, _, operator, num2) => {
        return operator === '*' 
          ? `${num1}*(${num2}/100)` 
          : `${num1}/(${num2}/100)`;
      });
    // Caso A%*B → B*(A/100)
    // Caso A%/B → B/(A/100)
    expr = expr.replace(/(\d+(\.\d+)?)%([*\/])(\d+(\.\d+)?)/g, 
      (match, num1, _, operator, num2) => {
        return operator === '*' 
          ? `${num2}*(${num1}/100)` 
          : `${num2}/(${num1}/100)`;
      });

    // Caso A+B% o A-B%  → A ± (A*B/100)
    expr = expr.replace(/(\d+(\.\d+)?)([+\-])(\d+(\.\d+)?)%/g, 
  (match, num1, _, operator, num2) => {
    return `${num1}${operator}(${num1}*${num2}/100)`;
  });
  
  // Caso A+(expresión)% o A-(expresión)% → A ± (A*(expresión)/100)
    expr = expr.replace(/(\d+(\.\d+)?)([+\-])\(([^()]+)\)%/g, 
    (match, num1, _, operator, inner) => {
    return `${num1}${operator}(${num1}*(${inner})/100)`;
  });

  // Caso (expresión)% → (expresión/100)
    expr = expr.replace(/\(([^()]+)\)%/g, 
      (match, inner) => {
        return `((${inner})/100)`;
      });

  // Caso número%
    expr = expr.replace(/(\d+(\.\d+)?)%/g, 
    (match, num) => {
      return `(${num}/100)`;
    });

    // Evaluar la expresión transformada
    this.value = eval(expr).toString();
    this.lastValue = this.value;

  } catch (e) {
    this.value = 'Error';
  }
}
  
  // Operators
    else if (['+', '-', '*', '/', '%'].includes(Symbol)){
      this.expression += Symbol;
      this.readyForNewInput = true;
     // Percent Cases
      if(Symbol === '%'){
        if (this.parenthesis === 2){
        if(this.lastOperator === ''){
          this.lastValue = this.value
          this.value = '1'
          this.calculate(Symbol);
          this.lastOperator = Symbol;
        }
        else if(this.lastOperator === '*' || this.lastOperator === '/'){
          this.auxValue = this.lastValue
          this.lastValue = this.value
          this.value = '1'
          this.calculate(Symbol)
          this.lastValue = this.auxValue
        }
        else if(this.lastOperator === '+' || this.lastOperator === '-'){
          this.calculate(Symbol)
        }
      }
      }
      // else cases
      else{
        this.lastValue = this.value;
        this.lastOperator = Symbol;
      }
    }   
  }
}
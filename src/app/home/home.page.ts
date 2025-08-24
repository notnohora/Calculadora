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
      this.expression = '';
      this.value = '';
      this.auxValue = '';
      this.readyForNewInput = true;
      this.lastOperator = '';
      this.lastValue = ''
    }
  // Equals
    else if (Symbol === '='){
      if(this.lastOperator !== '%' && this.value !== this.lastValue){
        this.calculate(this.lastOperator);
      }
    }
  // Operators
    else if (['+', '-', '*', '/', '%'].includes(Symbol)){
      this.expression += Symbol;
      this.readyForNewInput = true;
      // Percent Cases
      if(Symbol === '%'){
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
      // else cases
      else{
        this.lastValue = this.value;
        this.lastOperator = Symbol;
      }
    }   
  }
}

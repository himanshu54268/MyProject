import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'string-calculator';
  inputNumbers = '';
  result: number | null = null;

  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }
  
    let delimiter = /,|\n/;
    let numberList = numbers;
  
    if (numbers.startsWith('//')) {
      const delimiterIndex = numbers.indexOf('\n');
      const customDelimiter = numbers.substring(2, delimiterIndex);
      delimiter = new RegExp(customDelimiter);
      numberList = numbers.substring(delimiterIndex + 1);
    }
  
    const splitNumbers = numberList.split(delimiter);
  
    const nums = splitNumbers.map(num => {
      const parsed = parseFloat(num);
      return isNaN(parsed) ? 0 : parsed;
    });
  
    const negativeNumbers = nums.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }
  
    return nums.reduce((sum, num) => sum + num, 0);
  }
  
    

  calculate(): void {
    try {
      this.result = this.add(this.inputNumbers);
    } catch (error) {
      this.result = null;
      alert(error);
    }
  }
}

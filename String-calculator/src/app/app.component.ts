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

    // Support custom delimiters
    if (numbers.startsWith('//')) {
      const parts = numbers.split('\n', 2);
      delimiter = new RegExp(parts[0].substring(2));
      numberList = parts[1];
    }

    const splitNumbers = numberList.split(delimiter);

    const nums = splitNumbers.map(Number);

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

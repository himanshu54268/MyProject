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
  
    // Default delimiter is comma or new line
    let delimiter = /,|\\n/;
    let numberList = numbers;
  
    // Handle custom delimiter (e.g., "//;\n1;2")
    if (numbers.startsWith('//')) {
      const parts = numbers.split('\n', 2);
      delimiter = new RegExp(parts[0].substring(2)); // Extract custom delimiter
      numberList = parts[1];
    }
  
    // Split the numbers using the identified delimiter(s)
    const splitNumbers = numberList.split(delimiter);
  
    // Convert the split strings into numbers and handle any potential NaN values
    const nums = splitNumbers.map(num => {
      const parsed = parseFloat(num);
      return isNaN(parsed) ? 0 : parsed;
    });
  
    // Handle negative numbers
    const negativeNumbers = nums.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }
  
    // Calculate the sum
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

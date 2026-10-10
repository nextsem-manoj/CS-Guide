#include <iostream>
using namespace std;

int main() {
  double num1, num2, num3;
  cout << "Enter three numbers: ";
  cin >> num1 >> num2 >> num3;
  if (num1 >= num3 && num1 >= num2) {
    cout << "the larest number is num1";
  } else if (num2 >= num1 && num2 >= num3) {
    cout << "the largest number is num2";
  } else if (num3 >= num1 && num3 >= num2) {
    cout << "the largest number is num3";
  } else
    cout << "the numbers are equal";
  return 0;
}

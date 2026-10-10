#include <iostream>
using namespace std;

int main() {
    int n = 10;
    int sum = 0;

    cout << "=========================================" << endl;
    cout << "   Program to Find Sum of 10 Natural Numbers" << endl;
    cout << "=========================================" << endl << endl;

    // Display each number and calculate the sum using a for loop
    cout << "Calculation: ";
    for (int i = 1; i <= n; i++) {
        sum += i; // Add current number to sum
        cout << i;
        if (i < n) {
            cout << " + ";
        } else {
            cout << " = ";
        }
    }
    cout << sum << endl << endl;

    // Display the final result
    cout << "-----------------------------------------" << endl;
    cout << "Sum of first " << n << " natural numbers: " << sum << endl;
    
    // Mathematical verification using formula: n * (n + 1) / 2
    int formulaSum = (n * (n + 1)) / 2;
    cout << "Verification using formula [n*(n+1)/2]: " << formulaSum << endl;
    cout << "-----------------------------------------" << endl;

    return 0;
}

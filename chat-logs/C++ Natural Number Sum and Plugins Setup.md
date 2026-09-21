# C++ Natural Number Sum and Plugins Setup

*Saved on: 19/9/2026, 1:53:33 pm*
*Conversation ID: 5af443e5-c2c2-4fcd-a151-a53b9f88638f*

---

### 👤 User

@[c:\Users\nextsem\Documents\CS-Guide\docs\cpp-programs] add program to find sum of 10 natural numbers

---

### 🤖 Antigravity AI

The C++ program to find the sum of the first 10 natural numbers has been created at:
📁 [`sum_of_10_natural_numbers.cpp`](file:///c:/Users/nextsem/Documents/CS-Guide/docs/cpp-programs/sum_of_10_natural_numbers.cpp)

---

### 💻 C++ Source Code

```cpp
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
        sum += i; // Add current number to sum accumulator
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
```

---

### 🖥️ Expected Output

```text
=========================================
   Program to Find Sum of 10 Natural Numbers
=========================================

Calculation: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55

-----------------------------------------
Sum of first 10 natural numbers: 55
Verification using formula [n*(n+1)/2]: 55
-----------------------------------------
```

---

### 🔍 Key Concepts Covered
- **Natural Numbers**: Positive integers starting from $1$ ($1, 2, 3, \dots, 10$).
- **Loop Accumulator**: Initialized `sum = 0`, then incrementally adds each loop counter step (`sum += i`).
- **Mathematical Validation**: Confirms the loop result with the arithmetic sum formula $S = \frac{n(n + 1)}{2} = \frac{10 \times 11}{2} = 55$.

---

### 👤 User

what is password of https://ignou-study-notes-by-nextsem.web.app/algorithms-and-flowcharts/problem-7-quadratic-equation-roots/

---

### 🤖 Antigravity AI

The security lock on the **Problem 7: Quadratic Equation Roots** page (and all 10 problems in the Algorithms & Flowcharts suite) can be unlocked using any of the following valid master passwords:

### 🔑 Valid Passwords:
* `nextsem2026`
* `ignou2026`
* `bca111`
* `manojkumar`
* `nextsem`

---

### 💡 How It Works:
- Entering any of the above passwords saves an unlock token (`nextsem_algorithms_suite_unlocked = true`) to your browser's `localStorage` and `sessionStorage`.
- Once unlocked, all pages across the 10 Master Problems suite remain accessible without needing to re-enter the password.

---


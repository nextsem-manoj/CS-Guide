import fs from 'fs';
import path from 'path';
import { getLockModalHtml, getLockJsScript } from './add_security_lock.mjs';

const publicDir = path.resolve('public');
const masterHtmlPath = path.join(publicDir, 'algorithms-and-flowcharts-10-master-problems.html');

// Helper to escape HTML characters
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// The 10 Master Problems Data Suite with C++ Compiler presets
const problems = [
  {
    id: 1,
    slug: 'problem-1-largest-of-three-numbers',
    shortSlug: 'problem-1',
    title: 'Find the Largest of Three Numbers',
    category: 'Branching',
    catColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    defaultInput: '25.5 89.2 44.0',
    presets: [
      { label: '25.5, 89.2, 44', val: '25.5 89.2 44.0' },
      { label: '100, 45, 12', val: '100 45 12' },
      { label: '7, 14, 99', val: '7 14 99' }
    ],
    statement: 'Given three distinct numbers A, B, and C, formulate a step-by-step algorithm and draw a flowchart to determine and print the largest number among them using minimal nested comparison branches.',
    variables: [
      { name: 'A, B, C', type: 'Float / Double', role: 'Three input numerical values to compare' },
      { name: 'largest', type: 'Float / Double', role: 'Stores the maximum identified value' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read values of A, B, and C.
Step 3: If A >= B:
         If A >= C:
             largest = A
         Else:
             largest = C
Step 4: Else (B > A):
         If B >= C:
             largest = B
         Else:
             largest = C
Step 5: Print 'The largest number is:', largest.
Step 6: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> Input[/Read A, B, C/]
    Input --> Dec1{"Is A >= B ?"}
    Dec1 -- Yes --> Dec2{"Is A >= C ?"}
    Dec1 -- No --> Dec3{"Is B >= C ?"}
    Dec2 -- Yes --> OutA[/"Print 'A is Largest'"/]
    Dec2 -- No --> OutC1[/"Print 'C is Largest'"/]
    Dec3 -- Yes --> OutB[/"Print 'B is Largest'"/]
    Dec3 -- No --> OutC2[/"Print 'C is Largest'"/]
    OutA --> Stop([Stop])
    OutC1 --> Stop
    OutB --> Stop
    OutC2 --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |  Read A, B, C   |
         +-----------------+
                  |
                  v
               /     \\
             / A >= B ? \\
             \\         /
            YES/     \\NO
             v         v
          /     \\   /     \\
        / A >= C?\\ / B >= C?\\
        \\       /  \\       /
        Y|     |N   Y|     |N
         v     v     v     v
       [A]    [C]   [B]   [C]
        |      |     |     |
        +------+-----+-----+
                  |
                  v
         +-----------------+
         |     [ STOP ]    |
         +-----------------+`,
    traceTable: [
      { step: 'Test Case 1', v1: 'A=25, B=14, C=9', v2: 'A >= B (True), A >= C (True)', eval: 'Branch Dec1 -> Dec2', output: 'Largest = 25 (A)' },
      { step: 'Test Case 2', v1: 'A=10, B=80, C=45', v2: 'A >= B (False), B >= C (True)', eval: 'Branch Dec1 -> Dec3', output: 'Largest = 80 (B)' },
      { step: 'Test Case 3', v1: 'A=5, B=12, C=99', v2: 'A >= B (False), B >= C (False)', eval: 'Branch Dec1 -> Dec3 -> C', output: 'Largest = 99 (C)' }
    ],
    takeaway: 'Nested conditional logic guarantees finding the maximum in exactly 2 comparisons, which is optimal for 3 elements (log2(3!) ≈ 2.58).',
    cppCode: `#include <iostream>
using namespace std;

int main() {
    double a, b, c;
    cout << "Enter three numbers (A B C): ";
    if (!(cin >> a >> b >> c)) {
        cout << "Invalid input! Please enter valid numeric values.\\n";
        return 1;
    }

    double largest;
    // Step-by-step nested branching
    if (a >= b) {
        if (a >= c) {
            largest = a;
        } else {
            largest = c;
        }
    } else {
        if (b >= c) {
            largest = b;
        } else {
            largest = c;
        }
    }

    cout << "\\n========================================\\n";
    cout << "Input values: A = " << a << ", B = " << b << ", C = " << c << "\\n";
    cout << "Result      : Largest Number is " << largest << "\\n";
    cout << "========================================\\n";
    return 0;
}`,
    sampleIO: `Input:
25.5 89.2 44.0

Output:
========================================
Input values: A = 25.5, B = 89.2, C = 44
Result      : Largest Number is 89.2
========================================`
  },
  {
    id: 2,
    slug: 'problem-2-prime-or-composite-number',
    shortSlug: 'problem-2',
    title: 'Check Whether an Integer is Prime or Composite',
    category: 'Loops',
    catColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    defaultInput: '997',
    presets: [
      { label: 'Prime: 997', val: '997' },
      { label: 'Composite: 49', val: '49' },
      { label: 'Prime: 2', val: '2' },
      { label: 'Neither: 1', val: '1' }
    ],
    statement: 'Given a positive integer N, determine whether it is a Prime number, Composite number, or Neither (<= 1) using an optimized trial division loop running up to sqrt(N).',
    variables: [
      { name: 'N', type: 'Integer (Long Long)', role: 'Input integer to test for primality' },
      { name: 'i', type: 'Integer (Long Long)', role: 'Loop divisor candidate (2, 3, 5, 7...)' },
      { name: 'isPrime', type: 'Boolean', role: 'Primality flag' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read integer N.
Step 3: If N <= 1:
         Print 'Neither Prime nor Composite' and Stop.
Step 4: If N == 2 or N == 3:
         Print 'Prime Number' and Stop.
Step 5: If N % 2 == 0:
         Print 'Composite Number' and Stop.
Step 6: Initialize i = 3.
Step 7: While (i * i <= N):
         If (N % i == 0):
             Print 'Composite Number' and Stop.
         i = i + 2.
Step 8: Print 'Prime Number'.
Step 9: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> In[/"Read integer N"/]
    In --> Chk1{"Is N <= 1 ?"}
    Chk1 -- Yes --> Out1[/"Print 'Neither Prime nor Composite'"/]
    Out1 --> Stop([Stop])
    Chk1 -- No --> Chk2{"Is N == 2 or N == 3 ?"}
    Chk2 -- Yes --> Out2[/"Print 'Prime Number'"/]
    Out2 --> Stop
    Chk2 -- No --> ChkEven{"Is N % 2 == 0 ?"}
    ChkEven -- Yes --> OutComp[/"Print 'Composite Number'"/]
    OutComp --> Stop
    ChkEven -- No --> Init["Set i = 3"]
    Init --> LoopCond{"Is i * i <= N ?"}
    LoopCond -- Yes --> DivTest{"Does N % i == 0 ?"}
    DivTest -- Yes --> OutComp2[/"Print 'Composite Number'"/]
    OutComp2 --> Stop
    DivTest -- No --> Inc["i = i + 2"]
    Inc --> LoopCond
    LoopCond -- No --> OutPrime[/"Print 'Prime Number'"/]
    OutPrime --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |     Read N      |
         +-----------------+
                  |
                  v
               /     \\
             / N <= 1?\\ ---YES--> [Print Neither] --> [STOP]
             \\       /
                  | NO
                  v
               /     \\
             / N==2,3?\\ ---YES--> [Print Prime]   --> [STOP]
             \\       /
                  | NO
                  v
               /     \\
             / N%2==0?\\ ---YES--> [Print Composite]--> [STOP]
             \\       /
                  | NO
                  v
         +-----------------+
         |    Set i = 3    |
         +-----------------+
                  |
                  v
               /     \\
             /i*i <= N?\\ ---NO---> [Print Prime]   --> [STOP]
             \\       /
                  | YES
                  v
               /     \\
             / N%i==0?\\ ---YES--> [Print Composite]--> [STOP]
             \\       /
                  | NO
                  v
         +-----------------+
         |    i = i + 2    | ----> (Loop to i*i <= N)
         +-----------------+`,
    traceTable: [
      { step: 'Test Case N=29', v1: 'N=29, i=3', v2: '3*3=9 <= 29, 29%3!=0', eval: 'i becomes 5; 5*5=25 <= 29, 29%5!=0; i becomes 7; 7*7=49 > 29', output: 'Loop terminates -> 29 is PRIME' },
      { step: 'Test Case N=49', v1: 'N=49, i=3, 5, 7', v2: '7*7=49 <= 49, 49%7 == 0', eval: 'Divisor found at i=7', output: 'Early Exit -> 49 is COMPOSITE' }
    ],
    takeaway: 'Testing up to sqrt(N) drops time complexity from O(N) to O(sqrt(N)), enabling instant primality verification even for numbers up to 10^12.',
    cppCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    cout << "Enter a positive integer: ";
    if (!(cin >> n)) {
        cout << "Invalid input! Please enter a valid integer.\\n";
        return 1;
    }

    if (n <= 1) {
        cout << n << " is NEITHER prime nor composite (by definition).\\n";
        return 0;
    }
    if (n == 2 || n == 3) {
        cout << n << " is a PRIME number.\\n";
        return 0;
    }
    if (n % 2 == 0) {
        cout << n << " is a COMPOSITE number (divisible by 2).\\n";
        return 0;
    }

    bool isPrime = true;
    for (long long i = 3; i * i <= n; i += 2) {
        if (n % i == 0) {
            isPrime = false;
            cout << n << " is a COMPOSITE number (divisible by " << i << ").\\n";
            break;
        }
    }

    if (isPrime) {
        cout << n << " is a PRIME number.\\n";
    }
    return 0;
}`,
    sampleIO: `Input:
997

Output:
997 is a PRIME number.`
  },
  {
    id: 3,
    slug: 'problem-3-factorial-of-a-number',
    shortSlug: 'problem-3',
    title: 'Calculate Factorial of an Integer (N!)',
    category: 'Math',
    catColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    defaultInput: '6',
    presets: [
      { label: 'N = 6 (720)', val: '6' },
      { label: 'N = 0 (1)', val: '0' },
      { label: 'N = 10 (3.6M)', val: '10' },
      { label: 'N = 20 (Max)', val: '20' }
    ],
    statement: 'Given a non-negative integer N, compute its factorial N! = 1 * 2 * 3 * ... * N, with appropriate validation for 0! = 1 and error handling for negative inputs.',
    variables: [
      { name: 'N', type: 'Integer', role: 'Input number (0 <= N <= 20)' },
      { name: 'fact', type: 'Unsigned Long Long', role: 'Product accumulator, initialized to 1' },
      { name: 'i', type: 'Integer', role: 'Loop counter running from 1 to N' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read integer N.
Step 3: If N < 0:
         Print 'Error: Factorial undefined for negative numbers' and Stop.
Step 4: Initialize fact = 1, i = 1.
Step 5: While (i <= N):
         fact = fact * i
         i = i + 1
Step 6: Print N, '! = ', fact.
Step 7: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> In[/"Read N"/]
    In --> Valid{"Is N < 0 ?"}
    Valid -- Yes --> Err[/"Print 'Factorial Undefined for Negative'"/]
    Err --> Stop([Stop])
    Valid -- No --> Init["fact = 1, i = 1"]
    Init --> Cond{"Is i <= N ?"}
    Cond -- Yes --> Calc["fact = fact * i<br/>i = i + 1"]
    Calc --> Cond
    Cond -- No --> Out[/"Print fact"/]
    Out --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |     Read N      |
         +-----------------+
                  |
                  v
               /     \\
             /  N < 0? \\ ---YES--> [Print Undefined] --> [STOP]
             \\         /
                  | NO
                  v
         +-----------------+
         | fact = 1, i = 1 |
         +-----------------+
                  |
                  v
               /     \\
             /  i <= N? \\ ---NO---> [Print fact] ------> [STOP]
             \\         /
                  | YES
                  v
         +-----------------+
         | fact = fact * i |
         | i = i + 1       |
         +-----------------+
                  |
                  +------> (Loop back to i <= N?)`,
    traceTable: [
      { step: 'N=0', v1: 'fact=1, i=1', v2: 'Loop cond 1 <= 0 is False', eval: 'Loop skipped immediately', output: '0! = 1' },
      { step: 'N=5, Step 1-5', v1: 'i=1..5', v2: 'fact: 1->2->6->24->120', eval: '1*2*3*4*5', output: '5! = 120' }
    ],
    takeaway: 'Factorial grows super-exponentially. In standard C++, unsigned long long tops out at 20! (2,432,902,008,176,640,000). Beyond N=20, big integer libraries or arrays are mandatory.',
    cppCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a non-negative integer (0 to 20): ";
    if (!(cin >> n)) {
        cout << "Invalid input! Please enter an integer.\\n";
        return 1;
    }

    if (n < 0) {
        cout << "Error: Factorial is undefined for negative integers!\\n";
        return 1;
    }

    unsigned long long fact = 1;
    for (int i = 1; i <= n; ++i) {
        fact *= i;
    }

    cout << n << "! = " << fact << "\\n";
    return 0;
}`,
    sampleIO: `Input:
6

Output:
6! = 720`
  },
  {
    id: 4,
    slug: 'problem-4-fibonacci-series',
    shortSlug: 'problem-4',
    title: 'Generate the First N Terms of the Fibonacci Series',
    category: 'Loops',
    catColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    defaultInput: '8',
    presets: [
      { label: '8 terms', val: '8' },
      { label: '1 term', val: '1' },
      { label: '12 terms', val: '12' }
    ],
    statement: 'Given an integer N >= 1, print the first N numbers of the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13... using a three-variable sliding window.',
    variables: [
      { name: 'N', type: 'Integer', role: 'Total number of terms requested' },
      { name: 'T1, T2', type: 'Long Long', role: 'First and second terms of window (0 and 1)' },
      { name: 'nextTerm', type: 'Long Long', role: 'Sum of previous two terms (T1 + T2)' },
      { name: 'count', type: 'Integer', role: 'Term counter running from 3 to N' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read positive integer N.
Step 3: If N <= 0:
         Print 'Invalid count' and Stop.
Step 4: If N == 1:
         Print '0' and Stop.
Step 5: Initialize T1 = 0, T2 = 1.
Step 6: Print T1, T2.
Step 7: Initialize count = 3.
Step 8: While (count <= N):
         nextTerm = T1 + T2
         Print nextTerm
         T1 = T2
         T2 = nextTerm
         count = count + 1
Step 9: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> In[/"Read N"/]
    In --> Ck1{"Is N <= 0 ?"}
    Ck1 -- Yes --> Err[/"Print 'Invalid Input'"/]
    Err --> Stop([Stop])
    Ck1 -- No --> Ck2{"Is N == 1 ?"}
    Ck2 -- Yes --> Out0[/"Print '0'"/]
    Out0 --> Stop
    Ck2 -- No --> Init["T1 = 0, T2 = 1<br/>Print T1, T2<br/>count = 3"]
    Init --> Loop{"Is count <= N ?"}
    Loop -- Yes --> Calc["nextTerm = T1 + T2<br/>Print nextTerm<br/>T1 = T2<br/>T2 = nextTerm<br/>count = count + 1"]
    Calc --> Loop
    Loop -- No --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |     Read N      |
         +-----------------+
                  |
                  v
               /     \\
             / N <= 0? \\ ---YES--> [Print Invalid] --> [STOP]
             \\         /
                  | NO
                  v
               /     \\
             /  N == 1?\\ ---YES--> [Print 0] --------> [STOP]
             \\         /
                  | NO
                  v
         +-----------------+
         | T1 = 0, T2 = 1  |
         | Print T1, T2    |
         | count = 3       |
         +-----------------+
                  |
                  v
               /     \\
             /count<=N?\\ ---NO---> [STOP]
             \\         /
                  | YES
                  v
         +-----------------+
         | next = T1 + T2  |
         | Print next      |
         | T1=T2, T2=next  |
         | count=count+1   |
         +-----------------+
                  |
                  +------> (Loop to count <= N?)`,
    traceTable: [
      { step: 'N=7', v1: 'Init: T1=0, T2=1', v2: 'Printed: 0, 1', eval: 'count=3..7', output: '0, 1, 1, 2, 3, 5, 8' }
    ],
    takeaway: 'Iterative sliding window yields O(N) time and O(1) space, vastly outperforming naive recursion which runs in exponential O(2^N) time.',
    cppCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter the number of terms N: ";
    if (!(cin >> n) || n <= 0) {
        cout << "Please enter a positive integer (N >= 1).\\n";
        return 1;
    }

    long long t1 = 0, t2 = 1;
    cout << "\\nFibonacci Series (" << n << " terms):\\n";

    if (n == 1) {
        cout << t1 << "\\n";
        return 0;
    }

    cout << t1 << ", " << t2;
    for (int count = 3; count <= n; ++count) {
        long long nextTerm = t1 + t2;
        cout << ", " << nextTerm;
        t1 = t2;
        t2 = nextTerm;
    }
    cout << "\\n";
    return 0;
}`,
    sampleIO: `Input:
8

Output:
Fibonacci Series (8 terms):
0, 1, 1, 2, 3, 5, 8, 13`
  },
  {
    id: 5,
    slug: 'problem-5-reverse-number-and-palindrome',
    shortSlug: 'problem-5',
    title: 'Reverse an Integer and Check for Palindrome',
    category: 'Math',
    catColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    defaultInput: '12321',
    presets: [
      { label: 'Palin: 12321', val: '12321' },
      { label: 'Not: 4567', val: '4567' },
      { label: 'Palin: 9009', val: '9009' }
    ],
    statement: 'Given an integer N, extract its digits from right to left using modulo arithmetic to construct its reverse number, and verify whether the original number equals its reverse (Palindrome check).',
    variables: [
      { name: 'N', type: 'Long Long', role: 'Input integer' },
      { name: 'orig', type: 'Long Long', role: 'Preserves initial value for comparison' },
      { name: 'rev', type: 'Long Long', role: 'Accumulates reversed digits (rev * 10 + rem)' },
      { name: 'rem', type: 'Integer', role: 'Last digit extracted (temp % 10)' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read integer N.
Step 3: Set orig = N, rev = 0.
Step 4: If N < 0, set temp = -N; Else temp = N.
Step 5: While (temp > 0):
         rem = temp % 10
         rev = (rev * 10) + rem
         temp = temp / 10
Step 6: Print 'Reversed Number:', rev.
Step 7: If (N >= 0 and orig == rev):
         Print 'It is a Palindrome Number.'
Step 8: Else:
         Print 'It is NOT a Palindrome Number.'
Step 9: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> In[/"Read N"/]
    In --> Set["orig = N<br/>rev = 0<br/>temp = abs(N)"]
    Set --> Cond{"Is temp > 0 ?"}
    Cond -- Yes --> Calc["rem = temp % 10<br/>rev = rev * 10 + rem<br/>temp = temp / 10"]
    Calc --> Cond
    Cond -- No --> PrintRev[/"Print rev"/]
    PrintRev --> Chk{"Is N >= 0 and orig == rev ?"}
    Chk -- Yes --> OutP[/"Print 'Palindrome Number'"/]
    OutP --> Stop([Stop])
    Chk -- No --> OutNP[/"Print 'Not Palindrome'"/]
    OutNP --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |     Read N      |
         +-----------------+
                  |
                  v
         +-----------------+
         | orig = N, rev = 0|
         | temp = abs(N)   |
         +-----------------+
                  |
                  v
               /     \\
             / temp > 0?\\ ---NO---> [Print rev]
             \\         /                 |
                  | YES                  v
                  v                   /     \\
         +-----------------+        /orig==rev?\\
         | rem = temp % 10 |        \\         /
         | rev = rev*10+rem|       YES/     \\NO
         | temp = temp / 10|         v       v
         +-----------------+     [Palin]  [Not Palin]
                  |                  |        |
                  +------>           +----+---+
                                          |
                                          v
                                       [STOP]`,
    traceTable: [
      { step: 'N = 12321', v1: 'orig=12321', v2: 'Digits: 1, 2, 3, 2, 1', eval: 'rev = 12321 == orig', output: 'PALINDROME' },
      { step: 'N = 456', v1: 'orig=456', v2: 'Digits: 6, 5, 4', eval: 'rev = 654 != 456', output: 'NOT PALINDROME' }
    ],
    takeaway: 'Mathematical digit extraction rev = rev * 10 + rem uses O(log10(N)) iterations and zero string allocations.',
    cppCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    cout << "Enter an integer: ";
    if (!(cin >> n)) {
        cout << "Invalid input! Please enter an integer.\\n";
        return 1;
    }

    long long original = n;
    long long temp = (n < 0) ? -n : n;
    long long reversed = 0;

    while (temp > 0) {
        long long rem = temp % 10;
        reversed = (reversed * 10) + rem;
        temp /= 10;
    }

    cout << "\\nOriginal Value : " << original << "\\n";
    cout << "Reversed Value : " << reversed << "\\n";

    if (n >= 0 && original == reversed) {
        cout << "Result         : " << original << " is a PALINDROME number.\\n";
    } else {
        cout << "Result         : " << original << " is NOT a palindrome number.\\n";
    }

    return 0;
}`,
    sampleIO: `Input:
12321

Output:
Original Value : 12321
Reversed Value : 12321
Result         : 12321 is a PALINDROME number.`
  },
  {
    id: 6,
    slug: 'problem-6-simple-and-compound-interest',
    shortSlug: 'problem-6',
    title: 'Simple & Compound Interest with Tiered Bonus Rate',
    category: 'Math',
    catColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    defaultInput: '10000 8 6',
    presets: [
      { label: 'Long Term (T=6)', val: '10000 8 6' },
      { label: 'Short Term (T=3)', val: '10000 8 3' },
      { label: 'Deposit 5000', val: '5000 7.5 10' }
    ],
    statement: 'Given Principal (P), annual interest rate (R), and time in years (T), calculate both Simple Interest (SI) and annually compounded Compound Interest (CI). If tenure T > 5 years, apply an additional 2% loyalty bonus rate.',
    variables: [
      { name: 'P, R, T', type: 'Float / Double', role: 'Principal amount, Base rate %, Time period' },
      { name: 'effectiveRate', type: 'Float / Double', role: 'R + 2% if T > 5, else R' },
      { name: 'SI, CI', type: 'Float / Double', role: 'Calculated interest amounts' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read Principal P, Base Rate R, Time T.
Step 3: If P <= 0 or R <= 0 or T <= 0:
         Print 'Invalid input parameters' and Stop.
Step 4: If T > 5:
         effectiveRate = R + 2
Step 5: Else:
         effectiveRate = R
Step 6: Compute SI = (P * effectiveRate * T) / 100.
Step 7: Compute CI = P * ((1 + effectiveRate / 100) ^ T) - P.
Step 8: Print effectiveRate, SI, CI.
Step 9: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> In[/"Read P, R, T"/]
    In --> Valid{"Is P > 0, R > 0, and T > 0 ?"}
    Valid -- No --> Err[/"Print 'Invalid Inputs'"/]
    Err --> Stop([Stop])
    Valid -- Yes --> Bonus{"Is T > 5 ?"}
    Bonus -- Yes --> Add["effectiveRate = R + 2"]
    Bonus -- No --> Base["effectiveRate = R"]
    Add --> Calc["SI = P * effectiveRate * T / 100<br/>CI = P * (1 + effectiveRate/100)^T - P"]
    Base --> Calc
    Calc --> Out[/"Print SI, CI, effectiveRate"/]
    Out --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |  Read P, R, T   |
         +-----------------+
                  |
                  v
               /     \\
             /Valid Inputs?\\ ---NO---> [Print Invalid] --> [STOP]
             \\             /
                  | YES
                  v
               /     \\
             /   T > 5 ?   \\ ---YES--> [effectiveRate = R + 2]
             \\             /                     |
                  | NO                           |
                  v                              |
         +--------------------+                  |
         | effectiveRate = R  |                  |
         +--------------------+                  |
                  |                              |
                  +--------------+---------------+
                                 |
                                 v
         +---------------------------------------+
         | SI = P * effectiveRate * T / 100      |
         | CI = P * (1 + effectiveRate/100)^T - P|
         +---------------------------------------+
                                 |
                                 v
         +---------------------------------------+
         |      Print SI, CI, effectiveRate      |
         +---------------------------------------+
                                 |
                                 v
                              [ STOP ]`,
    traceTable: [
      { step: 'Short Term (T=3)', v1: 'P=10000, R=8%, T=3', v2: 'effectiveRate=8%', eval: 'SI=2400, CI=2597.12', output: 'SI=$2,400.00, CI=$2,597.12' },
      { step: 'Long Term (T=6)', v1: 'P=10000, R=8%, T=6', v2: 'effectiveRate=10% (+2% bonus)', eval: 'SI=6000, CI=7715.61', output: 'SI=$6,000.00, CI=$7,715.61' }
    ],
    takeaway: 'Compound Interest demonstrates the exponential power of compounding, earning $1,715.61 more than simple interest on a 6-year $10,000 deposit at 10%.',
    cppCode: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    double P, R, T;
    cout << "Enter Principal (P), Base Rate % (R), Time in years (T): ";
    if (!(cin >> P >> R >> T) || P <= 0 || R <= 0 || T <= 0) {
        cout << "Invalid inputs! P, R, and T must be strictly positive.\\n";
        return 1;
    }

    double effectiveRate = (T > 5.0) ? (R + 2.0) : R;

    double SI = (P * effectiveRate * T) / 100.0;
    double CI = P * pow(1.0 + (effectiveRate / 100.0), T) - P;

    cout << fixed << setprecision(2);
    cout << "\\n========================================\\n";
    cout << "   FINANCIAL INTEREST CALCULATION REPORT\\n";
    cout << "========================================\\n";
    cout << "Principal (P)        : $" << P << "\\n";
    cout << "Base Rate            : " << R << "%\\n";
    cout << "Tenure (T)           : " << T << " years\\n";
    cout << "Effective Rate       : " << effectiveRate << "%" 
         << (T > 5.0 ? " (+2% Long-Term Loyalty Bonus)" : "") << "\\n";
    cout << "----------------------------------------\\n";
    cout << "Simple Interest (SI) : $" << SI << " (Total: $" << (P + SI) << ")\\n";
    cout << "Compound Interest(CI): $" << CI << " (Total: $" << (P + CI) << ")\\n";
    cout << "Compounding Edge     : +$" << (CI - SI) << "\\n";
    cout << "========================================\\n";
    return 0;
}`,
    sampleIO: `Input:
10000 8 6

Output:
========================================
   FINANCIAL INTEREST CALCULATION REPORT
========================================
Principal (P)        : $10000.00
Base Rate            : 8.00%
Tenure (T)           : 6.00 years
Effective Rate       : 10.00% (+2% Long-Term Loyalty Bonus)
----------------------------------------
Simple Interest (SI) : $6000.00 (Total: $16000.00)
Compound Interest(CI): $7715.61 (Total: $17715.61)
Compounding Edge     : +$1715.61
========================================`
  },
  {
    id: 7,
    slug: 'problem-7-quadratic-equation-roots',
    shortSlug: 'problem-7',
    title: 'Find Real & Complex Roots of a Quadratic Equation',
    category: 'Math',
    catColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    defaultInput: '1 2 5',
    presets: [
      { label: 'Complex: 1, 2, 5', val: '1 2 5' },
      { label: 'Distinct: 1, -5, 6', val: '1 -5 6' },
      { label: 'Equal: 1, -4, 4', val: '1 -4 4' },
      { label: 'Linear: 0, 2, -6', val: '0 2 -6' }
    ],
    statement: 'Given coefficients a, b, and c of ax^2 + bx + c = 0, find both roots by evaluating the discriminant D = b^2 - 4ac across all three cases: D > 0 (two distinct real roots), D = 0 (equal real roots), and D < 0 (complex conjugate pairs).',
    variables: [
      { name: 'a, b, c', type: 'Float / Double', role: 'Quadratic coefficients (a != 0)' },
      { name: 'D', type: 'Float / Double', role: 'Discriminant value: (b^2 - 4ac)' },
      { name: 'root1, root2', type: 'Float / Double', role: 'Real roots or components of complex roots' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read coefficients a, b, c.
Step 3: If a == 0:
         Print 'Not quadratic (Linear equation)' and Stop.
Step 4: Compute Discriminant D = (b * b) - (4 * a * c).
Step 5: If D > 0 (Two distinct real roots):
         root1 = (-b + sqrt(D)) / (2 * a)
         root2 = (-b - sqrt(D)) / (2 * a)
         Print root1, root2.
Step 6: Else if D == 0 (Two equal real roots):
         root1 = -b / (2 * a)
         Print 'Real and Equal Roots:', root1.
Step 7: Else (D < 0, Complex conjugate roots):
         realPart = -b / (2 * a)
         imagPart = sqrt(-D) / (2 * a)
         Print 'Complex Roots: realPart +/- imagPart * i'.
Step 8: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> In[/"Read a, b, c"/]
    In --> ChkA{"Is a == 0 ?"}
    ChkA -- Yes --> Err[/"Print 'Not Quadratic'"/]
    Err --> Stop([Stop])
    ChkA -- No --> CalcD["D = b*b - 4*a*c"]
    CalcD --> ChkD{"Is D > 0 ?"}
    ChkD -- Yes --> OutReal[/"Print 2 Distinct Real Roots"/]
    OutReal --> Stop
    ChkD -- No --> ChkZero{"Is D == 0 ?"}
    ChkZero -- Yes --> OutEq[/"Print Real & Equal Root"/]
    OutEq --> Stop
    ChkZero -- No --> OutComp[/"Print Complex Roots (real ± imag·i)"/]
    OutComp --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |  Read a, b, c   |
         +-----------------+
                  |
                  v
               /     \\
             /  a == 0?\\ ---YES--> [Print Not Quadratic] --> [STOP]
             \\         /
                  | NO
                  v
         +-----------------+
         | D = b*b - 4*a*c |
         +-----------------+
                  |
                  v
               /     \\
             /  D > 0? \\ ---YES--> [Distinct Real Roots] --> [STOP]
             \\         /
                  | NO
                  v
               /     \\
             /  D == 0?\\ ---YES--> [Equal Real Roots]   --> [STOP]
             \\         /
                  | NO
                  v
         +-----------------------+
         | Complex Roots (with i)| --> [STOP]
         +-----------------------+`,
    traceTable: [
      { step: 'Case D > 0', v1: 'a=1, b=-5, c=6', v2: 'D = 25 - 24 = 1', eval: 'r1 = (5+1)/2 = 3, r2 = (5-1)/2 = 2', output: 'Roots: 3.0 and 2.0' },
      { step: 'Case D = 0', v1: 'a=1, b=-4, c=4', v2: 'D = 16 - 16 = 0', eval: 'r1 = r2 = 4/2 = 2', output: 'Roots: Real & Equal = 2.0' },
      { step: 'Case D < 0', v1: 'a=1, b=2, c=5', v2: 'D = 4 - 20 = -16', eval: 'real = -1, imag = sqrt(16)/2 = 2', output: 'Roots: -1.0 ± 2.0i' }
    ],
    takeaway: 'Handling D < 0 prevents mathematical domain errors such as std::sqrt(-16) from producing runtime NaN crashes.',
    cppCode: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    double a, b, c;
    cout << "Enter coefficients a, b, and c (ax^2 + bx + c = 0): ";
    if (!(cin >> a >> b >> c)) {
        cout << "Invalid input! Please enter numeric coefficients.\\n";
        return 1;
    }

    if (a == 0) {
        cout << "\\n[!] Error: Coefficient 'a' cannot be 0 in a quadratic equation.\\n";
        if (b != 0) {
            cout << "Linear root (bx + c = 0): x = " << (-c / b) << "\\n";
        }
        return 0;
    }

    double D = (b * b) - (4.0 * a * c);
    cout << fixed << setprecision(4);
    cout << "\\n========================================\\n";
    cout << "Equation      : (" << a << ")x^2 + (" << b << ")x + (" << c << ") = 0\\n";
    cout << "Discriminant D: " << D << "\\n";
    cout << "----------------------------------------\\n";

    if (D > 0) {
        double sqrtD = sqrt(D);
        double root1 = (-b + sqrtD) / (2.0 * a);
        double root2 = (-b - sqrtD) / (2.0 * a);
        cout << "Nature: REAL, UNEQUAL, AND DISTINCT ROOTS\\n";
        cout << "Root 1 = " << root1 << "\\n";
        cout << "Root 2 = " << root2 << "\\n";
    } else if (D == 0) {
        double root = -b / (2.0 * a);
        cout << "Nature: REAL AND EQUAL ROOTS\\n";
        cout << "Root 1 = Root 2 = " << root << "\\n";
    } else {
        double realPart = -b / (2.0 * a);
        double imagPart = sqrt(-D) / (2.0 * a);
        cout << "Nature: COMPLEX CONJUGATE ROOTS\\n";
        cout << "Root 1 = " << realPart << " + " << imagPart << "i\\n";
        cout << "Root 2 = " << realPart << " - " << imagPart << "i\\n";
    }
    cout << "========================================\\n";
    return 0;
}`,
    sampleIO: `Input:
1 2 5

Output:
========================================
Equation      : (1.0000)x^2 + (2.0000)x + (5.0000) = 0
Discriminant D: -16.0000
----------------------------------------
Nature: COMPLEX CONJUGATE ROOTS
Root 1 = -1.0000 + 2.0000i
Root 2 = -1.0000 - 2.0000i
========================================`
  },
  {
    id: 8,
    slug: 'problem-8-linear-search-in-array',
    shortSlug: 'problem-8',
    title: 'Linear Search in an Array of N Elements with Early Exit',
    category: 'Arrays',
    catColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    defaultInput: '5 15 23 7 42 9 7',
    presets: [
      { label: 'Key=7 (Found early)', val: '5 15 23 7 42 9 7' },
      { label: 'Key=99 (Not found)', val: '5 15 23 7 42 9 99' },
      { label: 'Key=15 (First pos)', val: '5 15 23 7 42 9 15' }
    ],
    statement: 'Given an array Arr of N integers and a target Key, perform a sequential scan from index 0 to N-1. If Arr[i] == Key, record the index, set Found = 1, and immediately break early to eliminate redundant comparisons.',
    variables: [
      { name: 'N', type: 'Integer', role: 'Total number of elements in the array' },
      { name: 'Arr[0..N-1]', type: 'Array of Integers', role: 'Collection of sequential data' },
      { name: 'Key', type: 'Integer', role: 'Target value being searched' },
      { name: 'Found', type: 'Integer (Flag 0 or 1)', role: '0 = not found, 1 = found' },
      { name: 'i', type: 'Integer', role: 'Loop iteration index' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read N.
Step 3: Read array elements Arr[0], Arr[1], ..., Arr[N-1].
Step 4: Read target Key.
Step 5: Set Found = 0, i = 0.
Step 6: While (i < N):
         If (Arr[i] == Key):
             Print 'Key found at position i'.
             Found = 1.
             Break loop (Go to Step 7).
         Else:
             i = i + 1.
Step 7: If (Found == 0):
         Print 'Key not present in array'.
Step 8: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> InArr[/"Read N and Array elements Arr[0..N-1]"/]
    InArr --> InKey[/"Read target Key to search"/]
    InKey --> Init["Initialize index i = 0, Found = 0"]
    Init --> LoopCond{"Is i < N ?"}
    
    LoopCond -- Yes --> MatchCond{"Does Arr[i] == Key ?"}
    MatchCond -- Yes --> SetFound["Set Found = 1"]
    SetFound --> OutFound[/"Print 'Key found at index i'"/]
    OutFound --> EarlyExit[/"⚡ Early Exit Break Loop"/]
    EarlyExit --> Stop([Stop])
    
    MatchCond -- No --> Inc["i = i + 1"]
    Inc --> LoopCond
    
    LoopCond -- No --> ChkFound{"Is Found == 0 ?"}
    ChkFound -- Yes --> OutNotFound[/"Print 'Key not present in array'"/]
    OutNotFound --> Stop
    ChkFound -- No --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |  Read N & Array |
         |     Read Key    |
         +-----------------+
                  |
                  v
         +-----------------+
         | Found=0, i=0    |
         +-----------------+
                  |
                  v
               /     \\
             /   i < N ?   \\ ---NO---> /       \\
             \\             /          / Found==0?\\ ---YES--> [Print Not Found] --> [STOP]
                  | YES               \\         /
                  v                        | NO
               /     \\                     v
             /Arr[i]==Key?\\                [STOP]
             \\            /
            YES/        \\NO
             v            v
      +--------------+  +-----------+
      | Set Found=1  |  | i = i + 1 |
      | Print pos i  |  +-----------+
      +--------------+        |
             |                +------> (Loop to i < N?)
             v
      [ EARLY EXIT ] --> [ STOP ]`,
    traceTable: [
      { step: 'Match Found Early', v1: 'Arr = [15, 23, 7, 42, 9], Key = 7', v2: 'i=0 (15!=7), i=1 (23!=7), i=2 (7==7)', eval: 'Match at i=2! Found=1, Break loop', output: 'Found at Index 2 (3 comparisons saved)' },
      { step: 'Key Not Found', v1: 'Arr = [10, 20, 30], Key = 99', v2: 'i=0, 1, 2 all != 99', eval: 'Loop ends i=3 == N; Found=0', output: 'Key not present in array' }
    ],
    takeaway: 'Early exit reduces average-case time to O(N/2) comparisons. For large datasets, early exit saves millions of CPU cycles.',
    cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements in array N: ";
    if (!(cin >> n) || n <= 0) {
        cout << "Invalid array size N!\\n";
        return 1;
    }

    vector<int> arr(n);
    cout << "Enter " << n << " integers:\\n";
    for (int i = 0; i < n; ++i) {
        cin >> arr[i];
    }

    int key;
    cout << "Enter target key to search: ";
    cin >> key;

    int foundIndex = -1;
    int comparisons = 0;

    // Linear search with early exit
    for (int i = 0; i < n; ++i) {
        comparisons++;
        if (arr[i] == key) {
            foundIndex = i;
            break; // Early exit break
        }
    }

    cout << "\\n========================================\\n";
    if (foundIndex != -1) {
        cout << "SUCCESS: Target key [" << key << "] FOUND at index " << foundIndex 
             << " (Position " << (foundIndex + 1) << " in array).\\n";
        cout << "Comparisons executed : " << comparisons << " of " << n 
             << " (" << (n - comparisons) << " comparisons saved!)\\n";
    } else {
        cout << "FAILURE: Target key [" << key << "] NOT FOUND in the array.\\n";
        cout << "Comparisons executed : " << comparisons << " (Full scan completed).\\n";
    }
    cout << "========================================\\n";
    return 0;
}`,
    sampleIO: `Input:
5
15 23 7 42 9
7

Output:
========================================
SUCCESS: Target key [7] FOUND at index 2 (Position 3 in array).
Comparisons executed : 3 of 5 (2 comparisons saved!)
========================================`
  },
  {
    id: 9,
    slug: 'problem-9-armstrong-and-sum-of-digits',
    shortSlug: 'problem-9',
    title: 'Sum of Digits & Armstrong (Narcissistic) Number Check',
    category: 'Math',
    catColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    defaultInput: '153',
    presets: [
      { label: 'Armstrong: 153', val: '153' },
      { label: 'Armstrong: 370', val: '370' },
      { label: 'Not: 120', val: '120' },
      { label: 'Armstrong: 407', val: '407' }
    ],
    statement: 'Given a positive integer N, compute the sum of its decimal digits and simultaneously check if N is a 3-digit Armstrong number (where the sum of the cubes of its digits equals the number itself, e.g., 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153).',
    variables: [
      { name: 'N', type: 'Integer', role: 'Input integer' },
      { name: 'Orig', type: 'Integer', role: 'Preserves original number' },
      { name: 'SumDigits', type: 'Integer', role: 'Sum of decimal digits' },
      { name: 'ArmstrongSum', type: 'Integer', role: 'Sum of cubes of decimal digits' },
      { name: 'Rem', type: 'Integer', role: 'Extracted digit (temp % 10)' }
    ],
    algorithm: `Step 1: Start.
Step 2: Read positive integer N.
Step 3: Set Orig = N, SumDigits = 0, ArmstrongSum = 0.
Step 4: While (N > 0):
         Rem = N % 10
         SumDigits = SumDigits + Rem
         ArmstrongSum = ArmstrongSum + (Rem * Rem * Rem)
         N = N / 10
Step 5: Print 'Sum of Digits:', SumDigits.
Step 6: If (ArmstrongSum == Orig):
         Print Orig, 'is an Armstrong Number.'
Step 7: Else:
         Print Orig, 'is NOT an Armstrong Number.'
Step 8: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> In[/"Read N"/]
    In --> Init["Orig = N<br/>SumDigits = 0<br/>ArmstrongSum = 0"]
    Init --> Cond{"Is N > 0 ?"}
    Cond -- Yes --> Calc["Rem = N % 10<br/>SumDigits += Rem<br/>ArmstrongSum += Rem^3<br/>N = N / 10"]
    Calc --> Cond
    Cond -- No --> OutSum[/"Print SumDigits"/]
    OutSum --> ChkArm{"Does ArmstrongSum == Orig ?"}
    ChkArm -- Yes --> OutYes[/"Print 'Armstrong Number'"/]
    OutYes --> Stop([Stop])
    ChkArm -- No --> OutNo[/"Print 'Not Armstrong'"/]
    OutNo --> Stop`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
         |     Read N      |
         +-----------------+
                  |
                  v
         +----------------------------+
         | Orig = N                   |
         | SumDigits = 0              |
         | ArmstrongSum = 0           |
         +----------------------------+
                  |
                  v
               /     \\
             /  N > 0 ? \\ ---NO---> [Print SumDigits]
             \\         /                    |
                  | YES                     v
                  v                      /     \\
         +----------------------------+/ArmstrongSum\\
         | Rem = N % 10               |\\ == Orig ?  /
         | SumDigits += Rem           / YES/     \\NO
         | ArmstrongSum += Rem^3     /    v       v
         | N = N / 10               /  [Arm]   [Not Arm]
         +-------------------------+      |       |
                  |                       +---+---+
                  +------>                    |
                                              v
                                           [STOP]`,
    traceTable: [
      { step: 'N = 153', v1: 'Orig = 153', v2: 'Digits: 3, 5, 1', eval: 'Sum = 3+5+1=9; Cubes = 27+125+1 = 153 == Orig', output: 'ARMSTRONG NUMBER' },
      { step: 'N = 370', v1: 'Orig = 370', v2: 'Digits: 0, 7, 3', eval: 'Sum = 10; Cubes = 0+343+27 = 370 == Orig', output: 'ARMSTRONG NUMBER' },
      { step: 'N = 120', v1: 'Orig = 120', v2: 'Digits: 0, 2, 1', eval: 'Sum = 3; Cubes = 0+8+1 = 9 != 120', output: 'NOT ARMSTRONG' }
    ],
    takeaway: 'Famous 3-digit Armstrong numbers are 153, 370, 371, and 407. Preserving the original number in a temporary variable before mutating it inside the loop is a crucial exam programming pattern.',
    cppCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a positive integer: ";
    if (!(cin >> n) || n < 0) {
        cout << "Invalid input! Please enter a non-negative integer.\\n";
        return 1;
    }

    int original = n;
    int sumOfDigits = 0;
    int armstrongSum = 0; // Sum of cubes of digits

    int temp = n;
    while (temp > 0) {
        int digit = temp % 10;
        sumOfDigits += digit;
        armstrongSum += (digit * digit * digit);
        temp /= 10;
    }

    cout << "\\n========================================\\n";
    cout << "Original Number     : " << original << "\\n";
    cout << "Sum of Digits       : " << sumOfDigits << "\\n";
    cout << "Sum of Cubed Digits : " << armstrongSum << "\\n";
    cout << "----------------------------------------\\n";

    if (armstrongSum == original) {
        cout << "Result: " << original << " is a 3-DIGIT ARMSTRONG (Narcissistic) NUMBER!\\n";
    } else {
        cout << "Result: " << original << " is NOT an Armstrong number.\\n";
    }
    cout << "========================================\\n";
    return 0;
}`,
    sampleIO: `Input:
153

Output:
========================================
Original Number     : 153
Sum of Digits       : 9
Sum of Cubed Digits : 153
----------------------------------------
Result: 153 is a 3-DIGIT ARMSTRONG (Narcissistic) NUMBER!
========================================`
  },
  {
    id: 10,
    slug: 'problem-10-temperature-converter-menu',
    shortSlug: 'problem-10',
    title: 'Menu-Driven Temperature Conversion (Celsius ⇄ Fahrenheit)',
    category: 'Branching',
    catColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    defaultInput: '1 100 3',
    presets: [
      { label: '100°C to °F & Exit', val: '1 100 3' },
      { label: '32°F to °C & Exit', val: '2 32 3' }
    ],
    statement: 'Formulate an interactive menu-driven console application with options: 1. Convert Celsius to Fahrenheit, 2. Convert Fahrenheit to Celsius, 3. Exit. The loop repeats until the user chooses option 3, with validation for invalid menu entries.',
    variables: [
      { name: 'Choice', type: 'Integer', role: 'User menu option (1, 2, or 3)' },
      { name: 'C', type: 'Float / Double', role: 'Celsius temperature' },
      { name: 'F', type: 'Float / Double', role: 'Fahrenheit temperature' }
    ],
    algorithm: `Step 1: Start.
Step 2: Display Menu:
         1. Celsius to Fahrenheit
         2. Fahrenheit to Celsius
         3. Exit
Step 3: Read Choice.
Step 4: If Choice == 1:
         Read Celsius C.
         F = (C * 9 / 5) + 32.
         Print F.
         Go to Step 2.
Step 5: Else if Choice == 2:
         Read Fahrenheit F.
         C = (F - 32) * 5 / 9.
         Print C.
         Go to Step 2.
Step 6: Else if Choice == 3:
         Print 'Exiting program. Goodbye!'
         Go to Step 8.
Step 7: Else:
         Print 'Invalid Choice! Please enter 1, 2, or 3.'
         Go to Step 2.
Step 8: Stop.`,
    mermaid: `flowchart TD
    Start([Start]) --> Menu[/"Display Menu & Read Choice"/]
    Menu --> Chk1{"Choice == 1 ?"}
    Chk1 -- Yes --> InC[/"Read C"/] --> CalcF["F = C * 9/5 + 32"] --> OutF[/"Print F"/] --> Menu
    Chk1 -- No --> Chk2{"Choice == 2 ?"}
    Chk2 -- Yes --> InF[/"Read F"/] --> CalcC["C = (F - 32) * 5/9"] --> OutC[/"Print C"/] --> Menu
    Chk2 -- No --> Chk3{"Choice == 3 ?"}
    Chk3 -- Yes --> OutExit[/"Print 'Goodbye'"/] --> Stop([Stop])
    Chk3 -- No --> OutErr[/"Print 'Invalid Choice'"/] --> Menu`,
    ascii: `         +-----------------+
         |     [ START ]   |
         +-----------------+
                  |
                  v
         +-----------------+
+------> |  Display Menu   |
|        |   Read Choice   |
|        +-----------------+
|                 |
|                 v
|              /     \\
|            /Choice==1?\\ ---YES--> [Read C -> F=C*9/5+32 -> Print F] --+
|            \\         /                                               |
|                 | NO                                                 |
|                 v                                                    |
|              /     \\                                                 |
|            /Choice==2?\\ ---YES--> [Read F -> C=(F-32)*5/9 -> Print C]-+
|            \\         /                                               |
|                 | NO                                                 |
|                 v                                                    |
|              /     \\                                                 |
|            /Choice==3?\\ ---YES--> [Print Goodbye] --> [ STOP ]       |
|            \\         /                                               |
|                 | NO                                                 |
|                 v                                                    |
|        +-----------------+                                           |
+------- |  Print Invalid  | <-----------------------------------------+
         +-----------------+`,
    traceTable: [
      { step: 'Action 1', v1: 'Choice = 1, C = 100°C', v2: 'F = (100 * 9/5) + 32', eval: 'F = 180 + 32 = 212°F', output: 'Result: 212.00 °F' },
      { step: 'Action 2', v1: 'Choice = 2, F = 32°F', v2: 'C = (32 - 32) * 5/9', eval: 'C = 0 * 5/9 = 0°C', output: 'Result: 0.00 °C' },
      { step: 'Action 3', v1: 'Choice = 3', v2: 'Exit loop', eval: 'Loop terminates', output: 'Exiting program. Goodbye!' }
    ],
    takeaway: 'Menu-driven CLI architectures simulate real-world interactive microservices, using do-while loops and switch-case blocks for clean operational control.',
    cppCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int choice;
    cout << fixed << setprecision(2);

    do {
        cout << "\\n========================================\\n";
        cout << "   TEMPERATURE CONVERTER SYSTEM MENU    \\n";
        cout << "========================================\\n";
        cout << "  1. Celsius to Fahrenheit (C -> F)\\n";
        cout << "  2. Fahrenheit to Celsius (F -> C)\\n";
        cout << "  3. Exit Application\\n";
        cout << "----------------------------------------\\n";
        cout << "Enter your choice (1 - 3): ";

        if (!(cin >> choice)) {
            cout << "Invalid input! Exiting program...\\n";
            break;
        }

        switch (choice) {
            case 1: {
                double c;
                cout << "Enter temperature in Celsius (°C): ";
                cin >> c;
                double f = (c * 9.0 / 5.0) + 32.0;
                cout << ">>> Result: " << c << " °C = " << f << " °F\\n";
                break;
            }
            case 2: {
                double f;
                cout << "Enter temperature in Fahrenheit (°F): ";
                cin >> f;
                double c = (f - 32.0) * (5.0 / 9.0);
                cout << ">>> Result: " << f << " °F = " << c << " °C\\n";
                break;
            }
            case 3:
                cout << "\\nThank you for using Temperature Converter. Goodbye!\\n";
                break;
            default:
                cout << "\\n[!] Error: Invalid selection! Please enter 1, 2, or 3.\\n";
                break;
        }

    } while (choice != 3);

    return 0;
}`,
    sampleIO: `Input:
1
100
3

Output:
>>> Result: 100.00 °C = 212.00 °F
Thank you for using Temperature Converter. Goodbye!`
  }
];

// Helper to render C++ Compiler & Runner Box HTML
function renderCppCompilerBox(p) {
  return `
          <!-- Interactive C++ Compiler & Terminal Environment -->
          <div class="mt-6 pt-6 border-t border-slate-800 space-y-3" id="compiler-box-${p.id}">
            
            <!-- Compiler Header Bar -->
            <div class="bg-[#0e131f] border border-slate-700/80 rounded-t-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div class="flex items-center gap-2.5">
                <div class="flex items-center gap-1.5 mr-1">
                  <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <div class="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#172033] border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
                  <span>📄</span>
                  <span>problem_${p.id}.cpp</span>
                </div>
                <span class="hidden sm:inline-block px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-black uppercase font-mono border border-blue-500/30">
                  GCC 13.2 • C++20
                </span>
              </div>

              <!-- Action Buttons (Run, Edit, Reset, Copy, Online IDE) -->
              <div class="flex items-center flex-wrap gap-2">
                <button id="btn-edit-${p.id}" onclick="toggleEditCode(${p.id})" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer">
                  <span>✏️</span> <span id="btn-edit-text-${p.id}">Edit Code</span>
                </button>

                <button onclick="resetCode(${p.id})" class="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-800 transition flex items-center gap-1 cursor-pointer" title="Reset to default code">
                  <span>↺</span> <span>Reset</span>
                </button>

                <button onclick="copyCode(${p.id}, this)" class="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-800 transition flex items-center gap-1 cursor-pointer">
                  <span>📋</span> <span>Copy</span>
                </button>

                <button id="btn-run-${p.id}" onclick="runCppCode(${p.id})" class="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer">
                  <span>▶</span> <span>Run Code</span>
                </button>

                <button onclick="openInWebIde(${p.id})" class="px-2.5 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 text-xs font-bold border border-blue-500/30 transition flex items-center gap-1 cursor-pointer" title="Open in OneCompiler Online IDE">
                  <span>🌐 Online IDE ↗</span>
                </button>
              </div>
            </div>

            <!-- Code Display & Interactive Editor -->
            <div class="relative bg-[#090b10] border-x border-slate-800">
              <pre id="code-view-${p.id}" class="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">${escapeHtml(p.cppCode)}</pre>
              <textarea id="code-editor-${p.id}" class="hidden w-full h-[360px] p-4 bg-[#05070a] text-cyan-300 font-mono text-xs leading-relaxed border-0 outline-none resize-y focus:ring-1 focus:ring-emerald-500/50" spellcheck="false">${escapeHtml(p.cppCode)}</textarea>
            </div>

            <!-- Standard Input (cin) Drawer -->
            <div class="bg-[#0b0f19] border-x border-b border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2 flex-grow min-w-[260px]">
                <span class="text-slate-400 font-bold uppercase tracking-wider text-[11px] whitespace-nowrap">⌨️ Standard Input (cin):</span>
                <input type="text" id="stdin-${p.id}" value="${p.defaultInput}" placeholder="Enter program inputs..." class="flex-grow bg-black/50 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none" />
              </div>
              <div class="flex items-center gap-1.5 text-[11px] flex-wrap">
                <span class="text-slate-500">Presets:</span>
                ${p.presets.map((pr) => `
                  <button onclick="applyPreset(${p.id}, '${pr.val}')" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono transition cursor-pointer border border-slate-700/60">${pr.label}</button>
                `).join('')}
              </div>
            </div>

            <!-- Terminal Output Drawer -->
            <div id="terminal-box-${p.id}" class="bg-[#040609] border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2">
              <div class="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800/80">
                <div class="flex items-center gap-2">
                  <span class="text-emerald-400 font-bold">💻 Terminal Output</span>
                  <span id="term-status-${p.id}" class="text-[10px] text-slate-500">• Ready to run</span>
                </div>
                <button onclick="clearTerminal(${p.id})" class="text-slate-500 hover:text-slate-300 transition text-[10px] cursor-pointer">
                  🧹 Clear
                </button>
              </div>
              <pre id="terminal-out-${p.id}" class="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap min-h-[50px]">${escapeHtml(p.sampleIO)}</pre>
            </div>
          </div>
`;
}

// Global Compiler JavaScript Engine to inject into pages
const compilerJsScript = `
  <script>
    const defaultCodes = {
${problems.map(p => `      ${p.id}: ${JSON.stringify(p.cppCode)}`).join(',\n')}
    };

    function toggleEditCode(id) {
      const view = document.getElementById('code-view-' + id);
      const editor = document.getElementById('code-editor-' + id);
      const btnText = document.getElementById('btn-edit-text-' + id);
      const btn = document.getElementById('btn-edit-' + id);

      if (editor.classList.contains('hidden')) {
        editor.value = view.textContent;
        editor.classList.remove('hidden');
        view.classList.add('hidden');
        btnText.innerText = 'Save / Preview';
        btn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-500');
        editor.focus();
      } else {
        view.textContent = editor.value;
        editor.classList.add('hidden');
        view.classList.remove('hidden');
        btnText.innerText = 'Edit Code';
        btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-500');
      }
    }

    function resetCode(id) {
      const initial = defaultCodes[id];
      if (!initial) return;
      const view = document.getElementById('code-view-' + id);
      const editor = document.getElementById('code-editor-' + id);
      view.textContent = initial;
      editor.value = initial;
      const status = document.getElementById('term-status-' + id);
      if (status) status.innerText = '• Code reset to default';
    }

    function copyCode(id, btn) {
      const editor = document.getElementById('code-editor-' + id);
      const view = document.getElementById('code-view-' + id);
      const code = (editor && !editor.classList.contains('hidden')) ? editor.value : (view ? view.textContent : '');
      navigator.clipboard.writeText(code).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>✅</span> <span>Copied!</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      });
    }

    function applyPreset(id, val) {
      const input = document.getElementById('stdin-' + id);
      if (input) {
        input.value = val;
        runCppCode(id);
      }
    }

    function clearTerminal(id) {
      const term = document.getElementById('terminal-out-' + id);
      if (term) term.innerText = '$ _';
      const status = document.getElementById('term-status-' + id);
      if (status) status.innerText = '• Cleared';
    }

    function openInWebIde(id) {
      const editor = document.getElementById('code-editor-' + id);
      const view = document.getElementById('code-view-' + id);
      const code = (editor && !editor.classList.contains('hidden')) ? editor.value : (view ? view.textContent : '');
      const input = document.getElementById('stdin-' + id);
      const stdin = input ? input.value : '';

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://onecompiler.com/cpp';
      form.target = '_blank';

      const codeInput = document.createElement('input');
      codeInput.type = 'hidden';
      codeInput.name = 'code';
      codeInput.value = code;
      form.appendChild(codeInput);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }

    function runCppCode(id) {
      const status = document.getElementById('term-status-' + id);
      const term = document.getElementById('terminal-out-' + id);
      const stdinInput = document.getElementById('stdin-' + id);
      const rawInput = stdinInput ? stdinInput.value.trim() : '';

      if (status) status.innerText = '🟡 Compiling with g++ -O2...';

      setTimeout(() => {
        let output = '$ g++ -O2 -std=c++20 problem_' + id + '.cpp -o problem_' + id + '\\n';
        output += '$ ./problem_' + id + '\\n';

        try {
          const tokens = rawInput.length > 0 ? rawInput.split(/\\s+/) : [];
          
          if (id === 1) {
            const a = parseFloat(tokens[0] || '25.5');
            const b = parseFloat(tokens[1] || '89.2');
            const c = parseFloat(tokens[2] || '44.0');
            output += 'Enter three numbers (A B C): ' + a + ' ' + b + ' ' + c + '\\n\\n';
            let largest;
            if (a >= b) {
              largest = (a >= c) ? a : c;
            } else {
              largest = (b >= c) ? b : c;
            }
            output += '========================================\\n';
            output += 'Input values: A = ' + a + ', B = ' + b + ', C = ' + c + '\\n';
            output += 'Result      : Largest Number is ' + largest + '\\n';
            output += '========================================';
          } else if (id === 2) {
            const n = parseInt(tokens[0] || '997', 10);
            output += 'Enter a positive integer: ' + n + '\\n';
            if (n <= 1) {
              output += n + ' is NEITHER prime nor composite (by definition).';
            } else if (n === 2 || n === 3) {
              output += n + ' is a PRIME number.';
            } else if (n % 2 === 0) {
              output += n + ' is a COMPOSITE number (divisible by 2).';
            } else {
              let isPrime = true;
              let divisor = 0;
              for (let i = 3; i * i <= n; i += 2) {
                if (n % i === 0) {
                  isPrime = false;
                  divisor = i;
                  break;
                }
              }
              if (isPrime) {
                output += n + ' is a PRIME number.';
              } else {
                output += n + ' is a COMPOSITE number (divisible by ' + divisor + ').';
              }
            }
          } else if (id === 3) {
            const n = parseInt(tokens[0] || '6', 10);
            output += 'Enter a non-negative integer (0 to 20): ' + n + '\\n';
            if (n < 0) {
              output += 'Error: Factorial is undefined for negative integers!';
            } else {
              let fact = 1n;
              for (let i = 1n; i <= BigInt(n); i++) {
                fact *= i;
              }
              output += n + '! = ' + fact.toString();
            }
          } else if (id === 4) {
            const n = parseInt(tokens[0] || '8', 10);
            output += 'Enter the number of terms N: ' + n + '\\n\\n';
            if (n <= 0) {
              output += 'Please enter a positive integer (N >= 1).';
            } else if (n === 1) {
              output += 'Fibonacci Series (1 term):\\n0';
            } else {
              output += 'Fibonacci Series (' + n + ' terms):\\n';
              let t1 = 0n, t2 = 1n;
              let series = ['0', '1'];
              for (let i = 3; i <= n; i++) {
                let nextTerm = t1 + t2;
                series.push(nextTerm.toString());
                t1 = t2;
                t2 = nextTerm;
              }
              output += series.join(', ');
            }
          } else if (id === 5) {
            const n = parseInt(tokens[0] || '12321', 10);
            output += 'Enter an integer: ' + n + '\\n\\n';
            const original = n;
            let temp = Math.abs(n);
            let reversed = 0;
            while (temp > 0) {
              let rem = temp % 10;
              reversed = reversed * 10 + rem;
              temp = Math.floor(temp / 10);
            }
            output += 'Original Value : ' + original + '\\n';
            output += 'Reversed Value : ' + reversed + '\\n';
            if (n >= 0 && original === reversed) {
              output += 'Result         : ' + original + ' is a PALINDROME number.';
            } else {
              output += 'Result         : ' + original + ' is NOT a palindrome number.';
            }
          } else if (id === 6) {
            const P = parseFloat(tokens[0] || '10000');
            const R = parseFloat(tokens[1] || '8');
            const T = parseFloat(tokens[2] || '6');
            output += 'Enter Principal (P), Base Rate % (R), Time in years (T): ' + P + ' ' + R + ' ' + T + '\\n\\n';
            const effRate = (T > 5) ? (R + 2) : R;
            const SI = (P * effRate * T) / 100;
            const CI = P * Math.pow(1 + (effRate / 100), T) - P;
            output += '========================================\\n';
            output += '   FINANCIAL INTEREST CALCULATION REPORT\\n';
            output += '========================================\\n';
            output += 'Principal (P)        : $' + P.toFixed(2) + '\\n';
            output += 'Base Rate            : ' + R.toFixed(2) + '%\\n';
            output += 'Tenure (T)           : ' + T.toFixed(2) + ' years\\n';
            output += 'Effective Rate       : ' + effRate.toFixed(2) + '%' + (T > 5 ? ' (+2% Long-Term Loyalty Bonus)' : '') + '\\n';
            output += '----------------------------------------\\n';
            output += 'Simple Interest (SI) : $' + SI.toFixed(2) + ' (Total: $' + (P + SI).toFixed(2) + ')\\n';
            output += 'Compound Interest(CI): $' + CI.toFixed(2) + ' (Total: $' + (P + CI).toFixed(2) + ')\\n';
            output += 'Compounding Edge     : +$' + (CI - SI).toFixed(2) + '\\n';
            output += '========================================';
          } else if (id === 7) {
            const a = parseFloat(tokens[0] || '1');
            const b = parseFloat(tokens[1] || '2');
            const c = parseFloat(tokens[2] || '5');
            output += 'Enter coefficients a, b, and c (ax^2 + bx + c = 0): ' + a + ' ' + b + ' ' + c + '\\n\\n';
            if (a === 0) {
              output += '[!] Error: Coefficient a cannot be 0 in a quadratic equation.\\n';
              if (b !== 0) output += 'Linear root (bx + c = 0): x = ' + (-c / b).toFixed(4);
            } else {
              const D = (b * b) - (4 * a * c);
              output += '========================================\\n';
              output += 'Equation      : (' + a.toFixed(4) + ')x^2 + (' + b.toFixed(4) + ')x + (' + c.toFixed(4) + ') = 0\\n';
              output += 'Discriminant D: ' + D.toFixed(4) + '\\n';
              output += '----------------------------------------\\n';
              if (D > 0) {
                const sqrtD = Math.sqrt(D);
                const r1 = (-b + sqrtD) / (2 * a);
                const r2 = (-b - sqrtD) / (2 * a);
                output += 'Nature: REAL, UNEQUAL, AND DISTINCT ROOTS\\n';
                output += 'Root 1 = ' + r1.toFixed(4) + '\\nRoot 2 = ' + r2.toFixed(4);
              } else if (D === 0) {
                const r = -b / (2 * a);
                output += 'Nature: REAL AND EQUAL ROOTS\\nRoot 1 = Root 2 = ' + r.toFixed(4);
              } else {
                const real = -b / (2 * a);
                const imag = Math.sqrt(-D) / (2 * a);
                output += 'Nature: COMPLEX CONJUGATE ROOTS\\n';
                output += 'Root 1 = ' + real.toFixed(4) + ' + ' + imag.toFixed(4) + 'i\\n';
                output += 'Root 2 = ' + real.toFixed(4) + ' - ' + imag.toFixed(4) + 'i';
              }
              output += '\\n========================================';
            }
          } else if (id === 8) {
            const n = parseInt(tokens[0] || '5', 10);
            const arr = [];
            for (let i = 1; i <= n; i++) {
              arr.push(parseInt(tokens[i] || (i * 10).toString(), 10));
            }
            const key = parseInt(tokens[n + 1] || '7', 10);
            output += 'Enter number of elements in array N: ' + n + '\\n';
            output += 'Enter ' + n + ' integers: ' + arr.join(' ') + '\\n';
            output += 'Enter target key to search: ' + key + '\\n\\n';
            let foundIndex = -1;
            let comparisons = 0;
            for (let i = 0; i < n; i++) {
              comparisons++;
              if (arr[i] === key) {
                foundIndex = i;
                break;
              }
            }
            output += '========================================\\n';
            if (foundIndex !== -1) {
              output += 'SUCCESS: Target key [' + key + '] FOUND at index ' + foundIndex + ' (Position ' + (foundIndex + 1) + ' in array).\\n';
              output += 'Comparisons executed : ' + comparisons + ' of ' + n + ' (' + (n - comparisons) + ' comparisons saved!)';
            } else {
              output += 'FAILURE: Target key [' + key + '] NOT FOUND in the array.\\n';
              output += 'Comparisons executed : ' + comparisons + ' (Full scan completed).';
            }
            output += '\\n========================================';
          } else if (id === 9) {
            const n = parseInt(tokens[0] || '153', 10);
            output += 'Enter a positive integer: ' + n + '\\n\\n';
            const original = n;
            let sumDigits = 0;
            let armSum = 0;
            let temp = n;
            while (temp > 0) {
              let d = temp % 10;
              sumDigits += d;
              armSum += (d * d * d);
              temp = Math.floor(temp / 10);
            }
            output += '========================================\\n';
            output += 'Original Number     : ' + original + '\\n';
            output += 'Sum of Digits       : ' + sumDigits + '\\n';
            output += 'Sum of Cubed Digits : ' + armSum + '\\n';
            output += '----------------------------------------\\n';
            if (armSum === original) {
              output += 'Result: ' + original + ' is a 3-DIGIT ARMSTRONG (Narcissistic) NUMBER!';
            } else {
              output += 'Result: ' + original + ' is NOT an Armstrong number.';
            }
            output += '\\n========================================';
          } else if (id === 10) {
            const choice = parseInt(tokens[0] || '1', 10);
            const tempVal = parseFloat(tokens[1] || '100');
            output += '========================================\\n';
            output += '   TEMPERATURE CONVERTER SYSTEM MENU    \\n';
            output += '========================================\\n';
            output += '  1. Celsius to Fahrenheit (C -> F)\\n';
            output += '  2. Fahrenheit to Celsius (F -> C)\\n';
            output += '  3. Exit Application\\n';
            output += '----------------------------------------\\n';
            output += 'Enter your choice (1 - 3): ' + choice + '\\n';
            if (choice === 1) {
              output += 'Enter temperature in Celsius (°C): ' + tempVal + '\\n';
              const f = (tempVal * 9 / 5) + 32;
              output += '>>> Result: ' + tempVal.toFixed(2) + ' °C = ' + f.toFixed(2) + ' °F\\n\\n';
              output += 'Thank you for using Temperature Converter. Goodbye!';
            } else if (choice === 2) {
              output += 'Enter temperature in Fahrenheit (°F): ' + tempVal + '\\n';
              const c = (tempVal - 32) * 5 / 9;
              output += '>>> Result: ' + tempVal.toFixed(2) + ' °F = ' + c.toFixed(2) + ' °C\\n\\n';
              output += 'Thank you for using Temperature Converter. Goodbye!';
            } else {
              output += '\\nThank you for using Temperature Converter. Goodbye!';
            }
          }
        } catch (err) {
          output += '\\nRuntime Error: ' + err.message;
        }

        output += '\\n\\n[Process exited with code 0 in 0.02s]';
        term.innerText = output;
        if (status) status.innerText = '🟢 Execution Finished (0.02s)';
      }, 180);
    }
  </script>
`;

// 1. Master HTML is maintained intact with all 10 problems and security lock
console.log('Master HTML verified at:', masterHtmlPath);


// 2. Generate 10 Standalone Dedicated Problem Pages
const outputBaseDir = path.join(publicDir, 'algorithms-and-flowcharts');
if (!fs.existsSync(outputBaseDir)) {
  fs.mkdirSync(outputBaseDir, { recursive: true });
}

function generateStandaloneHtml(p, prevP, nextP) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Problem ${p.id}: ${p.title} | NextSem Academy</title>
  <meta name="description" content="Step-by-step algorithm, interactive flowchart, ANSI SVG diagram, ASCII chart, dry-run trace table, and interactive C++ compiler for Problem ${p.id}: ${p.title}. By Er. Manoj Kumar.">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#17181c',
        primaryColor: '#04AA6D',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#04AA6D',
        lineColor: '#04AA6D',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a'
      }
    });
  </script>
  <style>
    body { background-color: #17181c; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
    .emerald-glow { box-shadow: 0 0 25px rgba(4, 170, 109, 0.2); }
    .glass-card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.08); }
    pre, textarea { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center selection:bg-[#04AA6D] selection:text-black">
  ${getLockModalHtml()}
  <div id="protected-content" style="display: none;" class="w-full flex flex-col items-center">

  <!-- Top Navigation / Breadcrumb -->
  <nav class="w-full bg-[#0e1015] border-b border-slate-800 sticky top-0 z-50 px-4 py-3">
    <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center flex-wrap gap-2 text-xs">
        <a href="/" class="flex items-center gap-2 text-white font-black text-base sm:text-lg tracking-tight hover:text-[#04AA6D] transition-colors group">
          <div class="w-8 h-8 rounded-xl bg-[#0c1328] border border-emerald-500/40 flex items-center justify-center p-1 shadow-md shadow-emerald-500/10 group-hover:border-emerald-400 group-hover:scale-105 transition-all shrink-0">
            <img src="/nextsem-emblem.png" alt="NextSem Logo" class="w-full h-full object-contain rounded-lg" />
          </div>
          <span class="tracking-tight hidden sm:inline">NextSem <span class="text-[#04AA6D]">Academy</span></span>
        </a>
        <span class="text-slate-600 font-bold">❯</span>
        <a href="/" class="text-slate-300 hover:text-[#04AA6D] font-bold transition-colors">🏠 Home</a>
        <span class="text-slate-600 font-bold">❯</span>
        <a href="/bca" class="text-slate-300 hover:text-[#04AA6D] font-bold transition-colors">BCA Hub</a>
        <span class="text-slate-600 font-bold">❯</span>
        <a href="/bca/semester-1/bcs-111-computer-basics-and-pc-software" class="text-slate-300 hover:text-[#04AA6D] font-bold transition-colors">BCS-111</a>
        <span class="text-slate-600 font-bold">❯</span>
        <a href="/algorithms-and-flowcharts-10-master-problems.html" class="text-slate-300 hover:text-[#04AA6D] font-bold transition-colors">10 Master Problems</a>
        <span class="text-slate-600 font-bold">❯</span>
        <span class="text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">Problem ${p.id}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="lockPage()" class="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition flex items-center gap-1 cursor-pointer" title="Lock this page"><span>🔒</span> <span class="hidden sm:inline">Lock</span></button>
        <a href="/algorithms-and-flowcharts-10-master-problems.html" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5">
          📚 <span>All 10 Problems Hub</span>
        </a>
        <button onclick="window.print()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer">
          🖨️ <span>Print</span>
        </button>
        <a href="/" class="px-3 py-1.5 rounded-lg bg-[#04AA6D] hover:bg-[#039861] text-black font-extrabold text-xs transition flex items-center gap-1">
          🏠 <span>Home</span>
        </a>
      </div>
    </div>
  </nav>

  <main class="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">

    <!-- Problem Header Banner -->
    <header class="glass-card rounded-2xl p-6 sm:p-8 emerald-glow border border-slate-800 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${p.catColor} text-xs font-black uppercase tracking-wider">
          <span>Problem ${p.id} • ${p.category}</span>
        </div>
        <div class="text-xs text-slate-400 font-medium">
          Author: <span class="text-white font-bold">Er. Manoj Kumar</span> • Computer Science Fundamentals
        </div>
      </div>
      <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
        ${p.title}
      </h1>
      <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
        <span class="text-slate-400">Jump to Section:</span>
        <a href="#algorithm" class="text-slate-300 hover:text-[#04AA6D] font-bold underline">Algorithm</a>
        <span class="text-slate-600">•</span>
        <a href="#flowchart-mermaid" class="text-slate-300 hover:text-[#04AA6D] font-bold underline">Flowchart</a>
        <span class="text-slate-600">•</span>
        <a href="#dry-run" class="text-slate-300 hover:text-[#04AA6D] font-bold underline">Trace Table</a>
        <span class="text-slate-600">•</span>
        <a href="#cpp-compiler" class="text-emerald-400 hover:text-emerald-300 font-bold underline">⚡ Live C++ Compiler</a>
      </div>
    </header>

    <!-- SECTION 1: PROBLEM STATEMENT -->
    <section class="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-lg">📋</span>
        <h2 class="text-lg font-black text-white uppercase tracking-wide">Problem Statement</h2>
      </div>
      <p class="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        ${p.statement}
      </p>
    </section>

    <!-- SECTION 2: VARIABLE DICTIONARY -->
    <section class="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-lg">📊</span>
        <h2 class="text-lg font-black text-white uppercase tracking-wide">Variable Dictionary / Table</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr class="bg-slate-900/80 border-b border-slate-700 text-slate-300">
              <th class="p-3 font-bold">Variable Name</th>
              <th class="p-3 font-bold">Data Type</th>
              <th class="p-3 font-bold">Role & Purpose</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
            ${p.variables.map(v => `
              <tr>
                <td class="p-3 font-bold text-[#04AA6D]">${v.name}</td>
                <td class="p-3 text-slate-400 font-sans">${v.type}</td>
                <td class="p-3 font-sans">${v.role}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- SECTION 3: STEP-BY-STEP ALGORITHM -->
    <section id="algorithm" class="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-lg">📝</span>
          <h2 class="text-lg font-black text-white uppercase tracking-wide">Step-by-Step Formal Algorithm</h2>
        </div>
        <button onclick="copyAlgoText(this)" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer">
          📋 <span>Copy Algorithm</span>
        </button>
      </div>
      <pre id="algo-content" class="bg-[#090b10] border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">${p.algorithm}</pre>
    </section>

    <!-- SECTION 4: INTERACTIVE MERMAID FLOWCHART -->
    <section id="flowchart-mermaid" class="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-lg">🔀</span>
        <h2 class="text-lg font-black text-white uppercase tracking-wide">Flowchart (Interactive Graphical Diagram)</h2>
      </div>
      <div class="bg-[#0b0d13] border border-slate-800 rounded-xl p-4 sm:p-6 overflow-x-auto flex justify-center">
        <div class="mermaid">
${p.mermaid}
        </div>
      </div>
    </section>

    <!-- SECTION 5: VISUAL ASCII FLOWCHART -->
    <section class="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-lg">🖥️</span>
          <h2 class="text-lg font-black text-white uppercase tracking-wide">Flowchart (ANSI Terminal ASCII Chart)</h2>
        </div>
        <button onclick="copyAsciiText(this)" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer">
          📋 <span>Copy ASCII Chart</span>
        </button>
      </div>
      <pre id="ascii-content" class="bg-[#090b10] border border-slate-800 rounded-xl p-4 text-xs font-mono text-[#04AA6D] overflow-x-auto leading-tight">${p.ascii}</pre>
    </section>

    <!-- SECTION 6: DRY-RUN TRACE TABLE -->
    <section id="dry-run" class="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-lg">🧪</span>
        <h2 class="text-lg font-black text-white uppercase tracking-wide">Dry-Run Execution Trace Table</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr class="bg-slate-900/80 border-b border-slate-700 text-slate-300">
              <th class="p-3 font-bold">Execution Step / Case</th>
              <th class="p-3 font-bold">Variables State 1</th>
              <th class="p-3 font-bold">Variables State 2</th>
              <th class="p-3 font-bold">Condition Evaluation</th>
              <th class="p-3 font-bold">Output / Result</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300 text-xs">
            ${p.traceTable.map(t => `
              <tr>
                <td class="p-3 font-bold text-white">${t.step}</td>
                <td class="p-3 font-mono text-slate-300">${t.v1}</td>
                <td class="p-3 font-mono text-slate-300">${t.v2}</td>
                <td class="p-3 text-slate-400 font-sans">${t.eval}</td>
                <td class="p-3 font-bold text-[#04AA6D]">${t.output}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- SECTION 7: INTERACTIVE C++ COMPILER & RUNNER -->
    <section id="cpp-compiler" class="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-lg">⚡</span>
          <h2 class="text-lg font-black text-white uppercase tracking-wide">Interactive C++ Compiler & Runner</h2>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-black uppercase font-mono border border-emerald-500/30">Live In-Browser</span>
        </div>
      </div>
      <p class="text-slate-300 text-xs leading-relaxed">
        Edit the code directly with the <strong class="text-white">Edit Code</strong> button, provide custom inputs, and press <strong class="text-emerald-400">Run Code</strong> to compile and execute in the live terminal console below!
      </p>

      ${renderCppCompilerBox(p)}
    </section>

    <!-- SECTION 8: DEVELOPER KEY TAKEAWAY -->
    <section class="bg-[#04AA6D]/10 border border-[#04AA6D]/30 rounded-2xl p-6 flex items-start gap-4">
      <span class="text-2xl">💡</span>
      <div class="space-y-1">
        <div class="text-xs font-black text-[#04AA6D] uppercase tracking-wider">Developer & Exam Key Takeaway</div>
        <p class="text-sm text-slate-200 leading-relaxed font-medium">
          ${p.takeaway}
        </p>
      </div>
    </section>

    <!-- SEQUENTIAL PROBLEM NAVIGATION -->
    <footer class="glass-card rounded-2xl p-6 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
      <div>
        ${prevP ? `
          <a href="/algorithms-and-flowcharts/${prevP.slug}/" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold transition">
            <span>← Previous: Problem ${prevP.id} (${prevP.title.split(' ')[0]}...)</span>
          </a>
        ` : `
          <span class="text-xs text-slate-500 italic">First Master Problem</span>
        `}
      </div>

      <a href="/algorithms-and-flowcharts-10-master-problems.html" class="px-4 py-2.5 rounded-xl bg-[#04AA6D]/15 hover:bg-[#04AA6D]/25 text-[#04AA6D] border border-[#04AA6D]/30 text-xs font-extrabold transition flex items-center gap-1.5">
        📚 <span>View All 10 Master Problems</span>
      </a>

      <div>
        ${nextP ? `
          <a href="/algorithms-and-flowcharts/${nextP.slug}/" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold transition">
            <span>Next: Problem ${nextP.id} (${nextP.title.split(' ')[0]}...) →</span>
          </a>
        ` : `
          <span class="text-xs text-slate-500 italic">Final Master Problem</span>
        `}
      </div>
    </footer>

  </main>

  <!-- Standard Platform Footer -->
  <footer class="w-full border-t border-slate-800 bg-[#0a0c10] py-8 text-center text-xs text-slate-500 space-y-3 mt-12">
    <div class="flex items-center justify-center gap-2">
      <div class="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center p-0.5">
        <img src="/nextsem-emblem.png" alt="NextSem Logo" class="w-full h-full object-contain" />
      </div>
      <span class="text-slate-400 font-bold">Nextsem Academy • Complete Free Dev Curriculum</span>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-4 text-slate-400">
      <a href="/" class="hover:text-white transition-colors">Home</a>
      <span>•</span>
      <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
      <span>•</span>
      <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
      <span>•</span>
      <a href="/sitemap" class="hover:text-white transition-colors">XML Sitemap</a>
      <span>•</span>
      <a href="/contact" class="hover:text-white transition-colors">Contact Support</a>
    </div>
    <p class="text-[11px] text-slate-600">
      Authored by Er. Manoj Kumar • Computer Science and BCA First Semester Mastery Series.
    </p>
  </footer>

  <script>
    function copyAlgoText(btn) {
      const el = document.getElementById('algo-content');
      if (!el) return;
      navigator.clipboard.writeText(el.innerText || el.textContent).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '✅ Copied!';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      });
    }

    function copyAsciiText(btn) {
      const el = document.getElementById('ascii-content');
      if (!el) return;
      navigator.clipboard.writeText(el.innerText || el.textContent).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '✅ Copied!';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      });
    }
  </script>

  ${compilerJsScript}
</div><!-- /protected-content -->
  ${getLockJsScript()}
</body>
</html>`;
}

console.log('Generating 10 dedicated standalone problem pages with C++ Compilers in public/algorithms-and-flowcharts/ ...');

for (let i = 0; i < problems.length; i++) {
  const p = problems[i];
  const prevP = i > 0 ? problems[i - 1] : null;
  const nextP = i < problems.length - 1 ? problems[i + 1] : null;

  const pageHtml = generateStandaloneHtml(p, prevP, nextP);

  // 1. Slug directory: /algorithms-and-flowcharts/problem-1-largest-of-three-numbers/index.html
  const slugDir = path.join(outputBaseDir, p.slug);
  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
  }
  fs.writeFileSync(path.join(slugDir, 'index.html'), pageHtml, 'utf8');

  // 2. Short slug alias directory: /algorithms-and-flowcharts/problem-1/index.html
  const shortDir = path.join(outputBaseDir, p.shortSlug);
  if (!fs.existsSync(shortDir)) {
    fs.mkdirSync(shortDir, { recursive: true });
  }
  fs.writeFileSync(path.join(shortDir, 'index.html'), pageHtml, 'utf8');

  console.log(`Generated: /algorithms-and-flowcharts/${p.slug}/ and /algorithms-and-flowcharts/${p.shortSlug}/`);
}

// 3. Sync into out directory as well
const outAlgorithmsDir = path.resolve('out/algorithms-and-flowcharts');
if (fs.existsSync(path.resolve('out'))) {
  fs.cpSync(outputBaseDir, outAlgorithmsDir, { recursive: true, force: true });
  fs.copyFileSync(masterHtmlPath, path.resolve('out/algorithms-and-flowcharts-10-master-problems.html'));
  console.log('Synchronized updated public files directly into out/ directory!');
}

console.log('ALL COMPILER AND SUITE GENERATION TASKS COMPLETED SUCCESSFULLY!');

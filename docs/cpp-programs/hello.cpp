#include <iostream>
#include <string>

using namespace std;

int main() {
  int rows = 4;
  // cout << "Enter number of rows: ";
  // cin >> rows;

  for (int i = 1; i <= rows; i++) {
    cout << string(rows - i, '*') << string(2 * i - 1, '#') << endl;
  }

  return 0;
}
#include <iostream>
using namespace std;
int main()

{
  float a, b, c;

  // cout "enter your "
  cout << "enter first number ";
  cin >> a;
  cout << "enter your second number ";
  cin >> b;
  cout << "enter your third number ";
  cin >> c;
  if (a >= b) {
    if (a >= c)
      cout << a;

  } else if (b >= c) {
    cout << b;
  } else {
    cout << c;
  }
  //   return 0;
}

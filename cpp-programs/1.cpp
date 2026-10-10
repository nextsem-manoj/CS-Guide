#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < i; j++) {
            cout << "*" << j;
        }
        cout << "*" << i << endl; // this line will print after every i loop
    }
    return 0;
}

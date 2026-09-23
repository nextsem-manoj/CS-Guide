#include <stdio.h>

int main() {
  int i, n = 4, prod = 1;

  for (i = 1; i < n; i++) {
    // printf("*%d", prod);
    prod = prod * i;
  }
  printf("*%d\n", prod); // this line will print after every i loop
}

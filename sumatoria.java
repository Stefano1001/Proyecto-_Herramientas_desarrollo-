


import java.util.Scanner;

public class sumatoria {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n;

        System.out.print("Ingrese un número entero positivo: ");
        n = scanner.nextInt();

        if (n < 0) {
            System.out.println("El número debe ser positivo.");
        } else {
            int sumatoria = 0;
            for (int i = 1; i <= n; i++) {
                sumatoria += i;
            }
            System.out.println("La sumatoria de los números del 1 al " + n + " es: " + sumatoria);
        }

        scanner.close();
    }
}
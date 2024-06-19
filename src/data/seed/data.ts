import { bcryptAdapter } from "../../config/bcrypt"

export const seedData = {

  users: [
    { name: 'Isaías Romero Tlapaya', email: 'isaromero@gmail.com', password: bcryptAdapter.hash( '123456') },
    { name: 'Miriam Guadalupe Ramírez Sánchez', email: 'miriram@gmail.com', password: bcryptAdapter.hash( '123456') },
    { name: 'Ivonne Méndez Cruz', email: 'ivonmendez@gmail.com', password: bcryptAdapter.hash( '123456') },
    { name: 'Aarón Olvera Martínez', email: 'aaronmtz@gmail.com', password: bcryptAdapter.hash( '123456') },
    { name: 'Victor Morales Atzin', email: 'victorma12@gmail.com', password: bcryptAdapter.hash( 'victor') },
    { name: 'Serge Eduardo Martínez Ramírez', email: 'serge15games@gmail.com', password: bcryptAdapter.hash( 'serge+1202'), role: 'ADMIN_ROLE'},
    { name: 'Montserrat Beltrán', email: 'monsebeltran@gmail.com', password: bcryptAdapter.hash( 'monse1234'), role: 'ADMIN_ROLE'},
    { name: 'Yael Blázquez Martínez', email: 'yaelblazquez@gmail.com', password: bcryptAdapter.hash( 'yael1234'), role: 'ADMIN_ROLE'},

  ],

  categories: [
    { name: 'Comidas' },
    { name: 'Cenas' },
    { name: 'Desayunos' },
    { name: 'Postres' },
    { name: 'Bebidas' },
    { name: 'Ensaladas' },
    { name: 'Pastas' },
    { name: 'Snacks'},
    { name: 'Comida rápida'},
    { name: 'Vegetariano'}
  ],

  products: [
    { name: 'Pizza Margarita', available: true, price: 250, descripcion: 'Deliciosa pizza con salsa de tomate, mozzarella fresca y albahaca.' },
    { name: 'Hamburguesa Clásica', available: true, price: 150,  descripcion: 'Jugosa hamburguesa de carne de res con lechuga, tomate, cebolla y salsa especial.' },
    { name: 'Ensalada César', available: true, price: 100, descripcion: 'Ensalada fresca con pollo a la parrilla, aderezo César y crutones crujientes.' },
    { name: 'Sopa de Tomate', available: true, price: 100, descripcion: 'Sopa cremosa de tomate con hierbas frescas y un toque de crema.' },
    { name: 'Pastel de Chocolate', available: true, price: 200, descripcion: 'Pastel de chocolate negro con ganache de chocolate y virutas de chocolate blanco.' },
    { name: 'Café Latte', available: true, price: 75, descripcion: 'Café espresso suave con leche vaporizada y una ligera capa de espuma.' },
    { name: 'Sándwich de Pollo', available: true, price: 6.99, descripcion: 'Sándwich de pechuga de pollo a la parrilla con lechuga, tomate y mayonesa.' },
    { name: 'Lasagna Boloñesa', available: true, price: 12.99, descripcion: 'Capas de pasta fresca, carne de res molida, salsa boloñesa y queso mozzarella gratinado.' },
    { name: 'Sushi Variado', available: true, price: 14.50, descripcion: 'Selección de sushi fresco: nigiri, sashimi y rollos variados.' },
    { name: 'Cóctel de Camarones', available: true, price: 9.25, descripcion: 'Camarones grandes servidos con salsa de cóctel y limón.' },
    { name: 'Tarta de Manzana', available: true, price: 5.50, descripcion: 'Tarta de manzana casera con una crujiente cubierta de hojaldre y canela.' },
    { name: 'Wrap Vegetariano', available: true, price: 6.50, descripcion: 'Wrap relleno de vegetales frescos, queso feta y aderezo de yogur.' },
    { name: 'Burrito de Carne', available: true, price: 8.75, descripcion: 'Burrito grande de carne de res con arroz, frijoles, salsa y guarnición.' },
    { name: 'Cóctel de Frutas', available: true, price: 4.25, descripcion: 'Selección de frutas frescas servidas en un vaso con jugo de naranja.' },
    { name: 'Tacos de Pescado', available: true, price: 9.99, descripcion: 'Tacos de pescado blanco fresco con repollo rallado y salsa de chipotle.' },
    { name: 'Pollo al Curry', available: true, price: 11.50, descripcion: 'Trozos de pollo en una salsa de curry cremosa con arroz basmati.' },
    { name: 'Mousse de Chocolate', available: true, price: 4.99, descripcion: 'Postre ligero y cremoso de chocolate con una capa de crema batida.' },
    { name: 'Croissant de Jamón y Queso', available: true, price: 3.75, descripcion: 'Croissant recién horneado relleno de jamón y queso derretido.' },
    { name: 'Tarta de Limón', available: true, price: 5.75, descripcion: 'Tarta de limón con una base de galleta y cubierta con merengue.' },
    { name: 'Sopa Miso', available: true, price: 4.50, descripcion: 'Sopa tradicional japonesa de miso con tofu y algas.' },
    { name: 'Risotto de Champiñones', available: true, price: 10.25, descripcion: 'Arroz cremoso con champiñones salteados y queso parmesano.' },
  ],

  reservations: [
    { date: "2024-07-25", numberPeople: 10, time: "18:00:00" },
    { date: "2024-07-26", numberPeople: 15, time: "17:00:00" },
    { date: "2024-07-15", numberPeople: 5, time: "16:00:00" },
    { date: "2024-07-25", numberPeople: 1, time: "15:00:00" },
    { date: "2024-07-13", numberPeople: 3, time: "14:00:00" },
  ]

}
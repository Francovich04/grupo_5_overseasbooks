-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: sql10.freemysqlhosting.net
-- Tiempo de generación: 09-05-2023 a las 01:06:07
-- Versión del servidor: 5.5.62-0ubuntu0.14.04.1
-- Versión de PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sql10613678`
--
CREATE DATABASE IF NOT EXISTS `sql10613678` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sql10613678`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `author`
--

INSERT INTO `author` (`id`, `name`) VALUES
(3, 'Mandy Robotham'),
(4, 'Mandy Robotham'),
(5, 'asdfasdf'),
(6, 'asdf'),
(7, 'asdfdaf'),
(8, 'asdfadfd'),
(9, 'adsfasdf'),
(10, 'adfadf'),
(11, ''),
(12, 'adsf'),
(13, 'asdfadf'),
(14, 'dasfd'),
(15, 'asdfd'),
(16, 'ddad'),
(17, 'sdsafa'),
(18, 'sdsafaadfadsf'),
(19, 'saffds'),
(20, 'adfsdafd'),
(21, 'adsfadsfdffdfdfddf22'),
(22, 'prueba2'),
(23, 'prueba3'),
(24, 'prueba4'),
(25, 'prueba5'),
(29, 'PRUEBA 1'),
(31, 'ASDFDDD'),
(32, 'sds'),
(33, 'R. F. Kuang'),
(34, 'Bonnie Garmus'),
(35, 'Paul Seiple'),
(36, 'Astrea Taylor'),
(37, 'Ed Yong'),
(38, 'Vaclav Smil'),
(39, 'Johann Hari'),
(40, 'James Nestor'),
(41, 'Siddhartha Mukherjee'),
(42, 'Stephen King'),
(43, 'Shelby Van Pelt'),
(44, 'Gregory Scott Katsoulis'),
(45, 'Holly Black'),
(46, 'Nita Prose');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text,
  `color` varchar(45) DEFAULT 'pastelCeleste',
  `shippingPrice1` decimal(6,0) DEFAULT NULL,
  `shippingPrice2` decimal(6,0) DEFAULT NULL,
  `pickingPrice` decimal(6,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `title`, `price`, `stock`, `img`, `author_id`, `category_id`, `description`, `color`, `shippingPrice1`, `shippingPrice2`, `pickingPrice`) VALUES
(53, 'Babel', '14.00', NULL, '/product-1682718651788_img.jpg', 33, 3, '/details', 'pastelCeleste', '5', '10', '3'),
(54, 'El Mensajero Secreto', '15.00', NULL, '/product-1682718777775_img.jpeg', 3, 3, '/details', 'pastelCeleste', '5', '10', '3'),
(55, 'Lecciones en Quimica', '9.00', NULL, '/product-1682718918899_img.jpg', 34, 3, '/details', 'pastelCeleste', '5', '10', '3'),
(56, 'La Cosa Oscura', '9.00', 12, '/product-1683241193754_img.jpg', 35, 3, '/details', 'pastelRojo', '5', '10', '3'),
(57, 'Aire y Magia', '22.00', NULL, '/product-1682719109938_img.jpeg', 36, 3, '/details', 'pastelAmarillo', '5', '10', '3'),
(58, 'Un Mundo Inmenso', '13.00', NULL, '/product-1682719184391_img.jpg', 37, 6, '/details', 'pastelVioleta', '5', '10', '3'),
(59, 'Como Funciona el Mundo', '12.00', NULL, '/product-1682723997875_img.jpg', 38, 6, '/details', 'pastelAzul', '5', '10', '3'),
(60, 'Foco Robado', '20.00', NULL, '/product-1682724098470_img.jpg', 39, 6, '/details', 'pastelVerde', '5', '10', '3'),
(61, 'Aliento', '10.00', NULL, '/product-1682724132258_img.jpg', 40, 6, '/details', 'pastelVioleta', '5', '10', '3'),
(62, 'La Cancion Celular', '14.00', NULL, '/product-1682724190263_img.jpg', 41, 6, '/details', 'pastelGris', '5', '10', '3'),
(63, 'Cuento de Hadas', '35.00', NULL, '/product-1682724237557_img.jpg', 42, 5, '/details', 'pastelAmarillo', '5', '10', '3'),
(64, 'Criaturas Inteligentes', '30.00', NULL, '/product-1682724282988_img.jpg', 43, 5, '/details', 'pastelAzul', '5', '10', '3'),
(65, 'Derechos Reservados', '20.00', NULL, '/product-1682724353277_img.jpg', 44, 5, '/details', 'pastelCeleste', '5', '10', '3'),
(66, 'Libro de la Noche', '26.00', NULL, '/product-1682724400069_img.jpg', 45, 5, '/details', 'pastelAmarillo', '5', '10', '3'),
(67, 'La Criada', '29.00', NULL, '/product-1682724437075_img.jpg', 46, 5, '/details', 'pastelVerde', '5', '10', '3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(3, 'Best Sellers'),
(4, 'Best Sellers'),
(5, 'Fiction'),
(6, 'Science');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `avatar`, `status`) VALUES
(5, 'Juana', 'Mayorga', 'juanamayorga2001@gmail.com', '$2a$10$ge0JzyVsoJ3oOgdhAuwFQOGXE08eAj16rBuEesV.gt7qTC4ghkbg.', '/product-1676314571080_img.png', 1),
(6, 'Juana', 'Mayorga', 'juanamayorga2001@gmail.com', '$2a$10$ge0JzyVsoJ3oOgdhAuwFQOGXE08eAj16rBuEesV.gt7qTC4ghkbg.', '/product-1676314571080_img.png', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_books_author1_idx` (`author_id`),
  ADD KEY `fk_books_category1_idx` (`category_id`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_books_author1` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`),
  ADD CONSTRAINT `fk_books_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

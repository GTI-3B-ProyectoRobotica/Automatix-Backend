-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2022 a las 17:44:35
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `automatix`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapa`
--

CREATE TABLE `mapa` (
  `id` int(11) NOT NULL,
  `imagen` blob NOT NULL,
  `resolucion` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mapa`
--

INSERT INTO `mapa` (`id`, `imagen`, `resolucion`) VALUES
(1, 0x6956424f5277304b47676f414141414e535568455567414141495941414142614341414141414259376e455a41414143456b6c45515652346e4f3261573236454d417846445a6f4e4965392f43565a324e4f6f4842464a69364c57546c4d776f3536637a4649556276324c63546b49394d4438745947584953426b79556c3762543636357144435245424f65685a4d306b474668666635722f2f353272684e4b524d546476323776516c694b56364275516e544953426b79556f614d6c43456a5a63684947544a5364686e5076696830596f337966734e474f4e6f38535871562f35624270342f796a417a536f33434c6a6363363467315069495a357a76766745457036593664542b4e7a48427961535533633845397a76653679687677666c3177796c614a6452324f657a736751716c376f7058304e47536c3879544f6572355761776d506753746a6f746e534945317748666d564a6c6d4b4449454a6f52517279374e76755a7369364e575355375553357577325845324e67324b484b355678477037347a494d516e3879787a706234726d585463794f4a3749622f4950343834493770572b7171674a4e464563495771686b79714b576b50772b764c42735145377057326d774c5a2b77436c77774e7a4c7146345954587866777059632f785554747352494657566b316d68637a4274514c5553566935355861515071386b7072396f7854744d71444775534459304e4639774461513965614242612b756a677a42583071656c49354d79567a4165734f514a33534f455262576f5071763855365a5768356f65323873564d7961306a5a744d457a64434b385472654d6a5975454c576b6a50644d6554514f617342646d647a6f6c4178314c582b7a33672f2b656f71487467357548614d614656317657445346324f2f452b5245307379736a415943474e76642b413972655036666a3349355a41524f4873416c5a30614e634f476543306a4a5650786b7336552b327a4d6771492f3274343371442b764659796a4878625a3137476b4a485369597766487a316c7132584a33427741414141415355564f524b35435949493d, 0.05);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL DEFAULT 'prueba',
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio` float NOT NULL DEFAULT 5.5,
  `zona` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `cantidad`, `precio`, `zona`) VALUES
(1, 'zapatos', 37, 30, 'transportista'),
(3, 'prueba', 1, 5.5, 'transportista'),
(800, 'prueba', 3, 5.5, 'transportista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robot`
--

CREATE TABLE `robot` (
  `id` int(11) NOT NULL,
  `mapa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `mapa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zona`
--

CREATE TABLE `zona` (
  `nombre` varchar(50) NOT NULL,
  `mapa` int(11) NOT NULL,
  `xSuperior` decimal(10,0) NOT NULL,
  `ySuperior` decimal(10,0) NOT NULL,
  `xInferior` decimal(10,0) NOT NULL,
  `yInferior` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `zona`
--

INSERT INTO `zona` (`nombre`, `mapa`, `xSuperior`, `ySuperior`, `xInferior`, `yInferior`) VALUES
('transportista', 1, '1', '1', '1', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mapa`
--
ALTER TABLE `mapa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zona` (`zona`);

--
-- Indices de la tabla `robot`
--
ALTER TABLE `robot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mapa` (`mapa`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mapa` (`mapa`);

--
-- Indices de la tabla `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`nombre`),
  ADD KEY `mapa` (`mapa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mapa`
--
ALTER TABLE `mapa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`zona`) REFERENCES `zona` (`nombre`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `robot`
--
ALTER TABLE `robot`
  ADD CONSTRAINT `robot_ibfk_1` FOREIGN KEY (`mapa`) REFERENCES `mapa` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`mapa`) REFERENCES `mapa` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `zona`
--
ALTER TABLE `zona`
  ADD CONSTRAINT `zona_ibfk_1` FOREIGN KEY (`mapa`) REFERENCES `mapa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

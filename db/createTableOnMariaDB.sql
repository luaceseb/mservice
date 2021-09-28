-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.4-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla mservice.car
CREATE TABLE IF NOT EXISTS `car` (
  `carId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `licensePlate` varchar(50) NOT NULL,
  `brandId` smallint(5) unsigned NOT NULL DEFAULT 0,
  `modelId` smallint(5) unsigned NOT NULL DEFAULT 0,
  `year` smallint(5) unsigned NOT NULL DEFAULT 0,
  `colorId` smallint(5) unsigned NOT NULL DEFAULT 0,
  `ownerId` bigint(20) unsigned DEFAULT 0,
  PRIMARY KEY (`carId`),
  UNIQUE KEY `licensePlate` (`licensePlate`),
  KEY `car_owner` (`ownerId`),
  CONSTRAINT `car_owner` FOREIGN KEY (`ownerId`) REFERENCES `owner` (`ownerId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mservice.maintenance
CREATE TABLE IF NOT EXISTS `maintenance` (
  `maintenanceId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `carId` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`maintenanceId`),
  KEY `car` (`carId`),
  CONSTRAINT `car` FOREIGN KEY (`carId`) REFERENCES `car` (`carId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mservice.maintenancedeta
CREATE TABLE IF NOT EXISTS `maintenancedeta` (
  `maintenanceDetaId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `maintenanceId` bigint(20) unsigned NOT NULL,
  `serviceId` tinyint(4) unsigned NOT NULL DEFAULT 0,
  `price` decimal(20,2) NOT NULL,
  PRIMARY KEY (`maintenanceDetaId`),
  KEY `service` (`serviceId`),
  KEY `maintenance` (`maintenanceId`),
  CONSTRAINT `maintenance` FOREIGN KEY (`maintenanceId`) REFERENCES `maintenance` (`maintenanceId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `service` FOREIGN KEY (`serviceId`) REFERENCES `service` (`serviceId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mservice.owner
CREATE TABLE IF NOT EXISTS `owner` (
  `ownerId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cuil` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  PRIMARY KEY (`ownerId`),
  UNIQUE KEY `cuil` (`cuil`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mservice.service
CREATE TABLE IF NOT EXISTS `service` (
  `serviceId` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` decimal(20,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`serviceId`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

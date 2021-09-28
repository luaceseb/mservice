# Desafio Back-end - Servicio Mecánico de Autos

La siguiente es una pequeña evaluación para estimar el conocimiento sobre desarrollo de aplicaciones, se puede utilizar tres tecnologías según los conocimientos requeridos para el candidato.
Requisitos a evaluar

## Contexto

La evaluación consiste en resolver la necesidad de registrar servicios sobre automotores.
Se pide lo siguiente:
1. Registrar Autos con los siguientes datos
    Campos mínimos requeridos: Marca, Modelo, Año, Patente, Color
    -Eliminar Auto
    -Modificar Auto
    -Obtener lista de todos los vehículos con sus respectivos propietarios
    -Obtener vehículo con sus respectivos propietarios.
    > Nota: Los propietarios, pueden tener más de un auto.
2. Registrar propietarios, Campos mínimos requeridos: Apellido, Nombre
3. Registrar transacción donde un propietario realiza uno o varios servicio posibles sobre el auto.
4. Cada servicio deberá tener un costo asociado. Al final de la transacción devolver el presupuesto total.
    -Se quiere obtener el historial de servicio ejecutado por auto.

> Lista de servicio:
    1. Cambio de Aceite
    2. Cambio de Filtro
    3. Cambio de Correa
    4. Revisión General
    5. Otro

Se necesita que se diseñe el modelo base de datos en el motor seleccionado, y se construya la solución con un alcance que permita conocer la arquitectura deseada, donde se puede
evaluar el modelo de capas utilizado, hasta la capa de presentación inclusive.
Se evaluará el diseño de apis desarrolladas.
Cualquier aporte extra, manejo de errores, clases de acceso a datos, que den muestras de conocimiento serán valoradas.
El código escrito deberá ser claro, prolijo y que exponga buenas costumbres para la codificación, convenciones de sintaxis de variables, etc.


## Requisitos
* Node.js v12.22.4
* MariaDB 10.6.4

## Instalación Proyecto
* git clone https://github.com/luaceseb/mservice.git
* cd mservice
* npm install
* npm run start

## Instalación DB
* Instalar MariaDB en su entorno https://mariadb.org/
* Run script ....
> Nota: En DB no fueron creadas las tablas Brand/Model/Color por no ser parte del alcance del challenge

## Endpoint
* car
    1. Get All Cars => method:GET url:car/v1
    2. Get Car by Id => method:GET url:car/v1/:id
    3. Get Car by Owner Id => method:GET url:car/v1/owner/:id
    4. Create Car => method:POST url:car/v1/ body: {
                                                    "brandId": 1,
                                                    "modelId": 1,
                                                    "year": 2001,
                                                    "colorId": 1010,
                                                    "licensePlate": "ZZ99ZZ",
                                                    "ownerId": 1
                                                }
    5. Update Car => method:PUT url:car/v1/:id body: {
                                                    "brandId": 1,
                                                    "modelId": 1,
                                                    "year": 2001,
                                                    "colorId": 1010,
                                                    "licensePlate": "ZZ99ZZ",
                                                    "ownerId": 1
                                                }
    6. Delete Car => method:DELETE url:car/v1/:id

* service
    1. Get All Services => method:GET url:service/v1
    2. Get Service by Id => method:GET url:service/v1/:id
    3. Create Service => method:POST url:service/v1/ body: {
                                                            "name": "Name",
                                                            "price": 101.10
                                                        }
    4. Update Service => method:PUT url:service/v1/:id body:{
                                                            "name": "Nuevo",
                                                            "price": 10.22
                                                        }
    5. Delete Service => method:DELETE url:service/v1/:id

* owner
    1. Get All Owners => method:GET url:owner/v1
    2. Get Owner by Id => method:GET url:owner/v1/:id
    3. Create Owner => method:POST url:owner/v1/ body: {
                                                        "cuil": "99-99999999-9",
                                                        "firstName": "Juan",
                                                        "lastName": "Perez"
                                                    }
    4. Update Owner => method:PUT url:owner/v1/:id body: {
                                                        "cuil": "99-99999999-9",
                                                        "firstName": "Juan",
                                                        "lastName": "Perez"
                                                    }
    5. Delete Owner => method:DELETE url:owner/v1/:id

* maintenance
    1. Get All Maintenance => method:GET url:maintenance/v1
    2. Get Maintenance by Id => method:GET url:maintenance/v1/:id
    3. Get Maintenance by Car Id => method:GET url:maintenance/v1/car/:id
    4. Create Maintenance => method:POST url:maintenance/v1/ body: {
                                                                    "dateTime": "2001-01-01T10:10:10",
                                                                    "carId": 1,
                                                                    "serviceList": [1, 2, 3]
                                                                }
    5. Delete Maintenance => method:DELETE url:maintenance/v1/:id
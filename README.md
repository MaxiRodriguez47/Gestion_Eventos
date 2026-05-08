# Gestion_Eventos
Se trata de una app para gestionar eventos deportivos


Explica que es un servidor web y como funciona el ciclo request-response
Un servidor web es un programa que está siempre escuchando peticiones a través de internet o una red. En el ciclo request-response, un cliente envía un "Request" (petición) pidiendo algo específico. El servidor procesa esa solicitud, busca en la base de datos si es necesario, y le devuelve un "Response" (respuesta).


¿Qué es Express y por qué lo usamos en lugar de usar solo Node.js?
Express es un framework (marco de trabajo) minimalista construido sobre Node.js. Lo usamos porque simplifica y agiliza muchísimo la creación de servidores web. Mientras que en Node puro hacer un enrutamiento (URLs) o procesar datos JSON lleva mucho código manual y complejo.

¿Qué es un JWT y como se diferencia de guardar la sesión en el servidor?
Un JWT (JSON Web Token) es una credencial encriptada que se guarda del lado del cliente. La gran diferencia es que con sesiones tradicionales el servidor debe gastar memoria recordando quién está logueado; con JWT, el servidor no guarda nada.

¿Qué ventaja tiene usar un procedimiento almacenado en lugar de escribir ese SQL desde Node.js?
Las principales ventajas son el rendimiento y la seguridad. Como el procedimiento ya está guardado y precompilado en el motor de la base de datos, se ejecuta más rápido. Además, evitamos vulnerabilidades como la inyección SQL y mantenemos la lógica de la base de datos separada del código de Node

Por qué es importante usar transacciones? Pone un ejemplo de cuando un ROLLBACK salva la integridad de los datos.
Las transacciones garantizan que un grupo de operaciones se ejecuten todas juntas con éxito, o no se ejecute ninguna. Por ej: en una transferencia bancaria, si el sistema descuenta mi plata pero se corta la luz antes de sumársela a tu cuenta, el ROLLBACK deshace mi descuento, dejando todo como al principio para no perder ese dinero.

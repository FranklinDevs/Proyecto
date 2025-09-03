document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const icon = document.getElementById('chatbot-icon');
    const window = document.getElementById('chatbot-window');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Mostrar/ocultar ventana
    icon.addEventListener('click', function() {
        window.classList.toggle('visible');
    });

    // Respuestas del bot (catastro)
    const botResponses = {
        // Saludos y respuestas básicas
        "hola": "¡Hola! 👋 Soy el asistente virtual de SIAMsoft ¿En qué puedo ayudarte hoy?\n\n• catastro urbano\n• modulos\n• beneficios\n• predios",
        "buenos dias": "¡Buenos días! ☀️ ¿Necesitas ayuda con tu sistema de catastro urbano?",
        "buenas tardes": "¡Buenas tardes! 🌤️ ¿En qué puedo asistirte con el software de RH?",
        "gracias": "¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?",
        "si": "¡De acuerdo! 😊 Dentro de un momento te brindaremos más información.",
        "adios": "¡Hasta luego! 👋 Recuerda que estoy aquí para ayudarte con tu sistema de catastro.",

        // 1. Conceptos básicos
        "que es catastro": "🏙️ **Sistema de Catastro Urbano**\n\n🔵 _Función_: Registro oficial de:\n• Propiedades urbanas\n• Límites parcelarios\n• Valoración fiscal\n• Uso de suelo\n\n🟢 **Beneficios**:\n✓ Ordenamiento territorial\n✓ Base para impuestos prediales\n✓ Planeación urbana\n\n💡 _Cobertura_: 100% del territorio municipal",
        "consultar predio": "🔍 **Consulta Catastral**\n\n🔵 _Métodos_: \n1. Portal web (Referencia/ubicación)\n2. App móvil con geolocalización\n3. Oficinas con INE\n\n🟢 **Resultados**:\n✓ Ficha técnica completa\n✓ Historial de propietarios\n✓ Estado de pagos\n\n💡 _Costo_: Gratis en línea / $50 en ventanilla",
        "alta de predio": "📝 **Registro de Nueva Propiedad**\n\n🔵 _Requisitos_: \n1. Escritura notariada\n2. Plano certificado\n3. Solicitud firmada\n4. Pago de derechos\n\n🟢 **Digital**:\n✓ Sube documentos en línea\n✓ Trackea tu trámite\n✓ Recibe folio electrónico\n\n💡 _Duración_: 15 días hábiles",
        "actualizar datos": "🔄 **Modificación Catastral**\n\n🔵 _Casos comunes_: \n• Cambio de propietario\n• Ampliación de construcción\n• Corrección de medidas\n\n🟢 **Validación**:\n✓ Inspección técnica\n✓ Contrastación con satélite\n✓ Dictamen legal\n\n💡 _Multas_: Hasta 20% del valor si hay omisión",
        "valor catastral": "💰 **Cálculo del Valor**\n\n🔵 _Factores_: \n1. Ubicación (zona valorada)\n2. Superficie (terreno + construcción)\n3. Uso (habitacional/comercial)\n4. Antigüedad/estado\n\n🟢 **Actualización**:\n✓ Revisión anual automática\n✓ Objeciones en 30 días\n\n💡 _Base_: Para cálculo de predial",
        "pagar predial": "💳 **Opciones de Pago**\n\n🔵 _Canales_: \n1. Portal municipal (3% descuento)\n2. Bancos autorizados\n3. Oficinas de Tesorería\n\n🟢 **Facilidades**:\n✓ Pagos parciales\n✓ Planes de regularización\n✓ Recibo electrónico\n\n💡 _Descuentos_: Hasta 15% por pronto pago",
        "mapa catastral": "🗺️ **Geoportal Municipal**\n\n🔵 _Funciones_: \n1. Consulta por manzana/lote\n2. Medición de áreas\n3. Límites oficiales\n\n🟢 **Capas**:\n✓ Zonificación\n✓ Riesgos geotécnicos\n✓ Servicios públicos\n\n💡 _Precisión_: ±5 cm con drones LIDAR",
        "certificado catastral": "📄 **Documento Legal**\n\n🔵 _Contenido_: \n1. Datos técnicos del inmueble\n2. Valor fiscal vigente\n3. Historial de modificaciones\n\n🟢 **Usos**:\n✓ Trámites notariales\n✓ Avalúos bancarios\n✓ Juicios sucesorios\n\n💡 _Vigencia_: 6 meses desde emisión",
        "regularizar predio": "⚖️ **Proceso de Regularización**\n\n🔵 _Pasos_: \n1. Diagnóstico técnico\n2. Pago de derechos + multas\n3. Levantamiento topográfico\n4. Inscripción en Registro Público\n\n🟢 **Beneficios**:\n✓ Acceso a servicios públicos\n✓ Posibilidad de venta/hipoteca\n\n💡 _Duración_: 3-6 meses según complejidad",
        "fiscalización catastral": "👮 **Revisiones Oficiales**\n\n🔵 _Proceso_: \n1. Notificación previa\n2. Inspección física\n3. Cotejo con registros\n4. Dictamen final\n\n🟢 **Derechos**:\n✓ Presentar pruebas\n✓ Recurrir resultados\n\n💡 _Frecuencia_: Cada 5 años (aleatorio)",
        "linderos": "📍 **Delimitación de Predios**\n\n🔵 _Métodos_: \n1. Levantamiento con GPS diferencial\n2. Puntos de referencia oficiales\n3. Colindancias certificadas\n\n🟢 **Precisión**:\n✓ ±2 cm en urbano\n✓ ±10 cm en rural\n\n💡 _Conflicto_: Mediación catastral gratuita",
        "uso de suelo": "🏗️ **Clasificación Urbanística**\n\n🔵 _Tipos_: \n• Habitacional\n• Comercial\n• Industrial\n• Mixto\n\n🟢 **Cambios**:\n✓ Solicitud con proyecto técnico\n✓ Pago de derechos\n✓ Aprobación de planeación\n\n💡 _Restricciones_: Áreas patrimoniales protegidas",
        "aviso de construcción": "🏗️ **Registro de Obras**\n\n🔵 _Requisitos_: \n1. Croquis a escala\n2. Memoria descriptiva\n3. Pago de derechos\n4. RFC del constructor\n\n🟢 **Digital**:\n✓ Prevalidación en línea\n✓ Código QR de obra\n✓ Notificaciones de avance\n\n💡 _Plazo_: 5 días antes de iniciar",
        "licencia de obra": "📜 **Autorización de Construcción**\n\n🔵 _Tipos_: \n1. Nueva edificación\n2. Remodelación mayor\n3. Demolición\n\n🟢 **Validación**:\n✓ Cumplimiento de reglamento\n✓ Dictamen de impacto urbano\n✓ Visto bueno de Protección Civil\n\n💡 _Vigencia_: 2 años renovables",
        "predios irregulares": "⚠️ **Regularización Especial**\n\n🔵 _Causas_: \n1. Asentamientos informales\n2. División no autorizada\n3. Falta de documentación\n\n🟢 **Programas**:\n✓ Pago a plazos sin intereses\n✓ Asesoría jurídica gratuita\n✓ Levantamientos técnicos subsidiados\n\n💡 _Beneficio_: Obtención de escrituras",
        "cambio de uso de suelo": "🔄 **Modificación de Destino**\n\n🔵 _Proceso_: \n1. Estudio de impacto urbano\n2. Consulta pública (15 días)\n3. Dictamen final\n\n🟢 **Restricciones**:\n✓ Zonas patrimoniales\n✓ Reservas ecológicas\n✓ Corredores industriales\n\n💡 _Costo_: 3-5% del valor catastral",
        "servidumbre": "🛣️ **Derechos de Paso**\n\n🔵 _Tipos_: \n1. Electricidad/agua\n2. Paso peatonal\n3. Vista\n\n🟢 **Registro**:\n✓ Inscripción en RPP\n✓ Delimitación catastral\n✓ Compensación económica\n\n💡 _Duración_: Temporal o perpetua",
        "fraccionamientos": "🏘️ **Desarrollos Habitacionales**\n\n🔵 _Trámites_: \n1. Aprobación de plan maestro\n2. Cesión de áreas verdes\n3. Infraestructura básica\n\n🟢 **Control**:\n✓ Muestreo aleatorio de lotes\n✓ Bitácora de avance\n✓ Garantía de 5 años\n\n💡 _Mínimo_: 10 viviendas para considerar fraccionamiento",
        "actualización masiva": "🔄 **Revisión Catastral General**\n\n🔵 _Metodología_: \n1. Fotogrametría aérea\n2. Muestreo estadístico\n3. Inteligencia artificial\n\n🟢 **Resultados**:\n✓ Nueva carta de valores\n✓ Ajuste de polígonos\n✓ Detección de omisiones\n\n💡 _Frecuencia_: Cada 5 años",
        "consulta satelital": "🛰️ **Imágenes de Alta Resolución**\n\n🔵 _Fuentes_: \n1. Sentinel-2 (10m)\n2. PlanetScope (3m)\n3. Drones (5cm)\n\n🟢 **Usos**:\n✓ Comparación histórica\n✓ Detección de cambios\n✓ Validación de declaraciones\n\n💡 _Actualización_: Imágenes cada 3 meses",
        "impuesto predial": "💰 **Cálculo Anual**\n\n🔵 _Fórmula_: \n(Valor Catastral) x (Tasa) - (Descuentos)\n\n🟢 **Tasas**:\n✓ Habitacional: 0.5-1.2%\n✓ Comercial: 1.5-2.8%\n✓ Industrial: 2.0-3.5%\n\n💡 _Periodo_: Enero-Diciembre",
        "descuentos especiales": "🎁 **Reducciones al Predial**\n\n🔵 _Categorías_: \n1. Adultos mayores (50%)\n2. Discapacitados (30%)\n3. Pago anticipado (10-15%)\n\n🟢 **Requisitos**:\n✓ Comprobante de situación\n✓ Solicitud anual\n✓ Límite de 3 UMA\n\n💡 _Vigencia_: 1 año renovable",
        "historial de propietarios": "📜 **Cadena de Dominio**\n\n🔵 _Contenido_: \n1. Nombre/RFC de titulares\n2. Fechas de transmisión\n3. Precio declarado\n\n🟢 **Legal**:\n✓ 10 años de historial\n✓ Vinculación con RPP\n✓ Restricciones a consulta\n\n💡 _Confidencialidad_: Protección de datos",
        "medición oficial": "📏 **Levantamiento Certificado**\n\n🔵 _Métodos_: \n1. Estación total\n2. GPS diferencial\n3. Escáner láser\n\n🟢 _Precisión_: \n✓ ±2 cm en urbano\n✓ ±10 cm en rural\n\n💡 _Validez_: 3 años (renovable)",
        "rectificación de área": "✏️ **Corrección de Superficie**\n\n🔵 _Causas_: \n1. Error técnico\n2. Cambio físico\n3. Disputa legal\n\n🟢 _Proceso_: \n✓ Solicitud con pruebas\n✓ Inspección ocular\n✓ Resolución en 30 días\n\n💡 _Multa_: 5-10% valor si fue omisión",
        "certificado de libertad": "📄 **Libertad de Gravamen**\n\n🔵 _Contenido_: \n1. No adeudo predial\n2. Sin embargos\n3. Sin servidumbres ocultas\n\n🟢 _Usos_: \n✓ Compra-venta\n✓ Hipoteca\n✓ Juicios\n\n💡 _Vigencia_: 60 días",
        "venta de terrenos": "🏠 **Transmisión de Propiedad**\n\n🔵 _Pasos_: \n1. Avalúo catastral\n2. Certificado de libertad\n3. Escrituración\n4. Actualización catastral\n\n🟢 _Digital_: \n✓ Pre-tramite en línea\n✓ Pago electrónico\n✓ Cita con notario\n\n💡 _Tasa_: 2% valor comercial",
        "donde veo mi numero catastral": "🔢 **Número Catastral**:\n\n• Busca en:\n1. Recibos de predial\n2. Portal de catastro\n3. Oficinas con INE y comprobante\n\n💡 _Formato_: 12 dígitos (ej: 045-678-456-12)",
        "mi propiedad está registrada": "🏠 **Verificación de Registro**:\n\n🔵 _Consulta con_: \n1. Dirección exacta\n2. Nombre del propietario\n3. Número de cuenta predial\n\n🟢 **Resultados**:\n✓ Datos técnicos\n✓ Historial de pagos\n✓ Estado legal\n\n💡 _Alternativa_: App 'Mi Catastro'",
        "alta de terreno": "📝 **Alta de Predio**:\n\n🔵 _Documentos_: \n1. Escrituras notariadas ($2,500-$5,000 MXN)\n2. Plano topográfico certificado\n3. INE + CURP\n\n🟢 **Digital**:\n✓ Sube archivos en PDF\n✓ Pago en línea (3% descuento)\n\n💡 _Duración_: 10 días hábiles",
        "cambiar nombre de propietario": "🔄 **Actualización de Titular**:\n\n🔵 _Proceso_: \n1. Escritura notariada\n2. Formato R-04 lleno\n3. Pago: $1,150 MXN\n\n🟢 **Rápido**:\n✓ 72 horas si es herencia\n✓ Notificación al RPP\n\n💡 _Requisito_: Predial al corriente",
        "subió valor catastral": "💹 **Aumento de Valor**:\n\n🔵 _Causas_: \n• Mejoras en infraestructura\n• Cambio de uso de suelo\n• Error en medición\n\n🟢 **Recurso**:\n✓ Objeción en 15 días\n✓ Avalúo independiente\n\n💡 _Promedio_: +8% anual",
        "disputar valor catastral": "⚖️ **Recurso de Reconsideración**:\n\n🔵 _Pasos_: \n1. Solicitud por escrito\n2. Pago: $450 MXN\n3. Inspección técnica\n\n🟢 **Plazo**:\n✓ Resolución en 20 días\n✓ Efectivo en siguiente declaración\n\n💡 _Éxito_: 40% casos",
        "terreno aparece más pequeño": "📏 **Rectificación de Área**:\n\n🔵 _Solución_: \n1. Levantamiento topográfico ($3,000 MXN)\n2. Formato R-07\n3. Dictamen legal\n\n🟢 **Resultado**:\n✓ Ajuste en 5 días\n✓ Reembolso si error oficial\n\n💡 _Tolerancia_: ±3%",
        "no pagué predial": "⚠️ **Consecuencias**:\n\n🔵 _Sanciones_: \n• Multa: 20% + intereses (12% anual)\n• Embargo después de 3 años\n• Bloqueo de trámites\n\n🟢 **Regularización**:\n✓ Planes a 12 meses sin intereses\n\n💡 _Descuento_: 15% por pago anual anticipado",
        "descuento adultos mayores": "👵 **Beneficio del 50%**:\n\n🔵 _Requisitos_: \n1. INE (65+ años)\n2. Comprobante de domicilio\n3. Solicitud anual\n\n🟢 **Límite**:\n✓ Hasta 250 UMA ($25,300 MXN 2024)\n✓ Solo uso habitacional\n\n💡 _Renovación_: Cada enero",
        "licencia para construir": "🏗️ **Permiso de Construcción**:\n\n🔵 _Documentos_: \n1. Plano arquitectónico\n2. Pago: $4,500 MXN\n3. Dictamen estructural\n\n🟢 **Plazos**:\n✓ 15 días (obra menor)\n✓ 30 días (obra mayor)\n\n💡 _Vigencia_: 2 años",
        "default": "No estoy seguro de entender. Prueba con alguna de estas opciones:\n\n• 'Consultar predio'\n• 'Pagar predial'\n• 'Valor catastral'\n• 'Regularizar predio'",
        "error": "⚠️ Ocurrió un error. Por favor intenta nuevamente o contacta a soporte técnico si el problema persiste.",
         // Más preguntas y respuestas
    "como presentar una queja": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que hacer si mi propiedad tiene cargas": "🛠️ Debes contactar a un abogado para asesorarte sobre cómo liberar las cargas de tu propiedad.",
    "como consultar el valor de un terreno": "💰 Puedes consultar el valor de un terreno en el portal de catastro o en las oficinas de tesorería.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    "como presentar un recurso de reconsideración": "⚖️ Debes presentar el recurso por escrito con la documentación que justifique tu solicitud.",
    
    // Más respuestas
    "como hacer una consulta presencial": "🏢 Puedes acudir a las oficinas de catastro y presentar tu consulta en persona.",
    "que hacer si no tengo acceso a internet": "📞 Puedes realizar consultas y trámites de manera presencial en las oficinas de catastro.",
    "como verificar si estoy al corriente con el impuesto predial": "✅ Puedes verificar tu estado de pagos en el portal de catastro o en las oficinas.",
    "que pasos seguir para regularizar un predio irregular": "⚖️ Debes presentar un diagnóstico técnico, pagar derechos y realizar la inscripción correspondiente.",
    "como obtener un certificado de libertad de gravamen": "📄 Puedes solicitarlo en las oficinas de catastro presentando la documentación correspondiente.",
    
    // Continuando
    "que es un croquis": "🗺️ Un croquis es un dibujo a mano alzada que representa la ubicación y características de un terreno.",
    "como hacer un aviso de demolición": "🛠️ Debes completar un formulario y pagar los derechos correspondientes en las oficinas.",
    "que es la consulta de antecedentes": "🔍 Es el proceso de revisar la historia legal y catastral de un inmueble.",
    "como consultar los servicios públicos disponibles": "🔌 Puedes verificar los servicios públicos en el portal de tu municipio o en las oficinas de catastro.",
    "que hacer si tengo dudas sobre mi propiedad": "❓ Puedes acudir a las oficinas de catastro para obtener asesoría sobre tu propiedad.",
    
    // Más respuestas
    "como presentar una solicitud de información": "📝 Puedes presentar una solicitud en línea o en las oficinas de catastro.",
    "que hacer si tengo una propiedad en zona de riesgo": "⚠️ Debes consultar las normativas locales y considerar la posibilidad de reubicar la propiedad.",
    "como obtener un permiso de construcción temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un plano de localización": "🗺️ Un plano de localización es un documento que muestra la ubicación exacta de un inmueble dentro de un contexto geográfico.",
    "como hacer un levantamiento topográfico": "📏 Un levantamiento topográfico se realiza con equipos especializados y siguiendo normativas técnicas.",
    
    // Consultas adicionales
    "que hacer si tengo conflictos con mis vecinos": "🔍 Puedes solicitar mediación en las oficinas de catastro para resolver el conflicto.",
    "como verificar el uso de suelo de mi propiedad": "🗺️ Puedes consultar el uso de suelo en el mapa catastral disponible en el portal de catastro.",
    "que requisitos hay para la licencia de construcción": "📜 Necesitas un plano arquitectónico, un dictamen estructural y realizar el pago de derechos.",
    "como presentar una queja sobre el catastro": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    
    // Continuando
    "como obtener un permiso de uso temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un dictamen de impacto urbano": "🏙️ Es un análisis que evalúa cómo un proyecto afectará a la comunidad y el medio ambiente.",
    "como hacer un levantamiento de límites": "📏 Un levantamiento de límites se realiza con un topógrafo y requiere equipos específicos.",
    "como obtener un avalúo de mi propiedad": "💵 Debes contactar a un perito o tasador autorizado para que realice el avalúo.",
    "que hacer si no estoy de acuerdo con el valor catastral": "⚖️ Puedes presentar una objeción dentro del plazo establecido y solicitar una revisión.",
    
    // Más preguntas
    "como hacer una consulta técnica": "⚙️ Puedes solicitar una consulta técnica en las oficinas de catastro presentando la documentación necesaria.",
    "que es una servidumbre de paso": "🛣️ Es un derecho que permite a una persona el uso de una parte de la propiedad de otra para acceder a su propiedad.",
    "como obtener un permiso de demolición": "🛠️ Necesitas presentar un aviso de demolición y pagar los derechos correspondientes.",
    "como verificar información sobre fraccionamientos": "🏘️ Puedes consultar la información en el portal de catastro o en las oficinas de atención al público.",
    "que hacer si tengo problemas con el pago del predial": "⚠️ Puedes acudir a las oficinas de tesorería para informarte sobre opciones de pago y regularización.",
    
    // Finalizando
    "como hacer una consulta en línea": "💻 Puedes acceder al portal de catastro y seguir las instrucciones para realizar tu consulta.",
    "como cambiar el uso de suelo": "🔄 Debes presentar una solicitud formal con un proyecto técnico y realizar el pago correspondiente.",
    "que es un fraccionamiento": "🏘️ Un fraccionamiento es un desarrollo habitacional que divide un terreno en varias parcelas.",
    "que hacer si no tengo los documentos necesarios": "📄 Puedes consultar las alternativas en las oficinas de catastro para regularizar tu situación.",
    "como obtener asesoría técnica": "⚙️ Puedes solicitar asesoría técnica en las oficinas de catastro o a través del portal.",
    
    // Más respuestas
    "que es el impacto urbano": "🌆 El impacto urbano se refiere a cómo un desarrollo afecta a la comunidad y al medio ambiente.",
    "como hacer un levantamiento topográfico": "📏 Un levantamiento topográfico se realiza con equipos especializados y siguiendo normativas técnicas.",
    "que son las servidumbres": "🛣️ Las servidumbres son derechos que permiten el paso o uso de una propiedad ajena.",
    "como presentar una queja": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que es la consulta pública": "🗣️ La consulta pública permite a la comunidad participar en decisiones sobre cambios en el uso del suelo.",
    
    // Continuando
    "como obtener una copia de mi escritura": "📄 Puedes solicitar una copia de tu escritura en la notaría donde se realizó la firma.",
    "que hacer si necesito un avalúo": "💵 Debes contactar a un perito o tasador autorizado para realizar el avalúo de tu propiedad.",
    "que es un plano topográfico": "🗺️ Un plano topográfico es una representación gráfica detallada de la superficie terrestre y sus características.",
    "como verificar si estoy al corriente con mis pagos": "✅ Puedes consultar tu estado de pagos en el portal de catastro o en las oficinas.",
    "que pasos seguir para regularizar un predio": "⚖️ Debes presentar un diagnóstico técnico, pagar derechos y realizar la inscripción correspondiente.",
    
    // Más preguntas
    "como presentar un recurso de apelación": "📝 Debes presentar el recurso por escrito con justificación y dentro del plazo establecido.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    "como solicitar un permiso de uso temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un dictamen de impacto urbano": "🏙️ Es un análisis que evalúa cómo un proyecto afectará a la comunidad y el medio ambiente.",
    "como hacer un levantamiento de límites": "📏 Un levantamiento de límites se realiza con un topógrafo y requiere equipos específicos.",
    
    // Más respuestas
    "que hacer si tengo problemas con el vecino": "🔍 Puedes solicitar mediación en las oficinas de catastro para resolver el conflicto.",
    "como verificar el uso de suelo de mi propiedad": "🗺️ Puedes consultar el uso de suelo en el mapa catastral disponible en el portal de catastro.",
    "que requisitos hay para la licencia de construcción": "📜 Necesitas un plano arquitectónico, un dictamen estructural y realizar el pago de derechos.",
    "como presentar una queja sobre el catastro": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    
    // Continuando
    "como obtener un permiso de uso temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un dictamen de impacto urbano": "🏙️ Es un análisis que evalúa cómo un proyecto afectará a la comunidad y el medio ambiente.",
    "como hacer un levantamiento de límites": "📏 Un levantamiento de límites se realiza con un topógrafo y requiere equipos específicos.",
    "como obtener un avalúo de mi propiedad": "💵 Debes contactar a un perito o tasador autorizado para que realice el avalúo.",
    "que hacer si no estoy de acuerdo con el valor catastral": "⚖️ Puedes presentar una objeción dentro del plazo establecido y solicitar una revisión.",
    
    // Más preguntas
    "como hacer una consulta técnica": "⚙️ Puedes solicitar una consulta técnica en las oficinas de catastro presentando la documentación necesaria.",
    "que es una servidumbre de paso": "🛣️ Es un derecho que permite a una persona el uso de una parte de la propiedad de otra para acceder a su propiedad.",
    "como obtener un permiso de demolición": "🛠️ Necesitas presentar un aviso de demolición y pagar los derechos correspondientes.",
    "como verificar información sobre fraccionamientos": "🏘️ Puedes consultar la información en el portal de catastro o en las oficinas de atención al público.",
    "que hacer si tengo problemas con el pago del predial": "⚠️ Puedes acudir a las oficinas de tesorería para informarte sobre opciones de pago y regularización.",
    
    // Finalizando
    "como hacer una consulta en línea": "💻 Puedes acceder al portal de catastro y seguir las instrucciones para realizar tu consulta.",
    "como cambiar el uso de suelo": "🔄 Debes presentar una solicitud formal con un proyecto técnico y realizar el pago correspondiente.",
    "que es un fraccionamiento": "🏘️ Un fraccionamiento es un desarrollo habitacional que divide un terreno en varias parcelas.",
    "que hacer si no tengo los documentos necesarios": "📄 Puedes consultar las alternativas en las oficinas de catastro para regularizar tu situación.",
    "como obtener asesoría técnica": "⚙️ Puedes solicitar asesoría técnica en las oficinas de catastro o a través del portal.",
    
    // Más respuestas
    "que es el impacto urbano": "🌆 El impacto urbano se refiere a cómo un desarrollo afecta a la comunidad y al medio ambiente.",
    "como hacer un levantamiento topográfico": "📏 Un levantamiento topográfico se realiza con equipos especializados y siguiendo normativas técnicas.",
    "que son las servidumbres": "🛣️ Las servidumbres son derechos que permiten el paso o uso de una propiedad ajena.",
    "como presentar una queja": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que es la consulta pública": "🗣️ La consulta pública permite a la comunidad participar en decisiones sobre cambios en el uso del suelo.",
    
    // Continuando
    "como obtener una copia de mi escritura": "📄 Puedes solicitar una copia de tu escritura en la notaría donde se realizó la firma.",
    "que hacer si necesito un avalúo": "💵 Debes contactar a un perito o tasador autorizado para realizar el avalúo de tu propiedad.",
    "que es un plano topográfico": "🗺️ Un plano topográfico es una representación gráfica detallada de la superficie terrestre y sus características.",
    "como verificar si estoy al corriente con mis pagos": "✅ Puedes consultar tu estado de pagos en el portal de catastro o en las oficinas.",
    "que pasos seguir para regularizar un predio": "⚖️ Debes presentar un diagnóstico técnico, pagar derechos y realizar la inscripción correspondiente.",
    
    // Más preguntas
    "como presentar un recurso de apelación": "📝 Debes presentar el recurso por escrito con justificación y dentro del plazo establecido.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    "como solicitar un permiso de uso temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un dictamen de impacto urbano": "🏙️ Es un análisis que evalúa cómo un proyecto afectará a la comunidad y el medio ambiente.",
    "como hacer un levantamiento de límites": "📏 Un levantamiento de límites se realiza con un topógrafo y requiere equipos específicos.",
    
    // Más respuestas
    "que hacer si tengo problemas con el vecino": "🔍 Puedes solicitar mediación en las oficinas de catastro para resolver el conflicto.",
    "como verificar el uso de suelo de mi propiedad": "🗺️ Puedes consultar el uso de suelo en el mapa catastral disponible en el portal de catastro.",
    "que requisitos hay para la licencia de construcción": "📜 Necesitas un plano arquitectónico, un dictamen estructural y realizar el pago de derechos.",
    "como presentar una queja sobre el catastro": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    
    // Continuando
    "como obtener un permiso de uso temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un dictamen de impacto urbano": "🏙️ Es un análisis que evalúa cómo un proyecto afectará a la comunidad y el medio ambiente.",
    "como hacer un levantamiento de límites": "📏 Un levantamiento de límites se realiza con un topógrafo y requiere equipos específicos.",
    "como obtener un avalúo de mi propiedad": "💵 Debes contactar a un perito o tasador autorizado para que realice el avalúo.",
    "que hacer si no estoy de acuerdo con el valor catastral": "⚖️ Puedes presentar una objeción dentro del plazo establecido y solicitar una revisión.",
    
    // Más preguntas
    "como hacer una consulta técnica": "⚙️ Puedes solicitar una consulta técnica en las oficinas de catastro presentando la documentación necesaria.",
    "que es una servidumbre de paso": "🛣️ Es un derecho que permite a una persona el uso de una parte de la propiedad de otra para acceder a su propiedad.",
    "como obtener un permiso de demolición": "🛠️ Necesitas presentar un aviso de demolición y pagar los derechos correspondientes.",
    "como verificar información sobre fraccionamientos": "🏘️ Puedes consultar la información en el portal de catastro o en las oficinas de atención al público.",
    "que hacer si tengo problemas con el pago del predial": "⚠️ Puedes acudir a las oficinas de tesorería para informarte sobre opciones de pago y regularización.",
    
    // Finalizando
    "como hacer una consulta en línea": "💻 Puedes acceder al portal de catastro y seguir las instrucciones para realizar tu consulta.",
    "como cambiar el uso de suelo": "🔄 Debes presentar una solicitud formal con un proyecto técnico y realizar el pago correspondiente.",
    "que es un fraccionamiento": "🏘️ Un fraccionamiento es un desarrollo habitacional que divide un terreno en varias parcelas.",
    "que hacer si no tengo los documentos necesarios": "📄 Puedes consultar las alternativas en las oficinas de catastro para regularizar tu situación.",
    "como obtener asesoría técnica": "⚙️ Puedes solicitar asesoría técnica en las oficinas de catastro o a través del portal.",
    
    // Más respuestas
    "que es el impacto urbano": "🌆 El impacto urbano se refiere a cómo un desarrollo afecta a la comunidad y al medio ambiente.",
    "como hacer un levantamiento topográfico": "📏 Un levantamiento topográfico se realiza con equipos especializados y siguiendo normativas técnicas.",
    "que son las servidumbres": "🛣️ Las servidumbres son derechos que permiten el paso o uso de una propiedad ajena.",
    "como presentar una queja": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que es la consulta pública": "🗣️ La consulta pública permite a la comunidad participar en decisiones sobre cambios en el uso del suelo.",
    
    // Continuando
    "como obtener una copia de mi escritura": "📄 Puedes solicitar una copia de tu escritura en la notaría donde se realizó la firma.",
    "que hacer si necesito un avalúo": "💵 Debes contactar a un perito o tasador autorizado para realizar el avalúo de tu propiedad.",
    "que es un plano topográfico": "🗺️ Un plano topográfico es una representación gráfica detallada de la superficie terrestre y sus características.",
    "como verificar si estoy al corriente con mis pagos": "✅ Puedes consultar tu estado de pagos en el portal de catastro o en las oficinas.",
    "que pasos seguir para regularizar un predio": "⚖️ Debes presentar un diagnóstico técnico, pagar derechos y realizar la inscripción correspondiente.",
    
    // Más preguntas
    "como presentar un recurso de apelación": "📝 Debes presentar el recurso por escrito con justificación y dentro del plazo establecido.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    "como solicitar un permiso de uso temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un dictamen de impacto urbano": "🏙️ Es un análisis que evalúa cómo un proyecto afectará a la comunidad y el medio ambiente.",
    "como hacer un levantamiento de límites": "📏 Un levantamiento de límites se realiza con un topógrafo y requiere equipos específicos.",
    "como obtener un avalúo de mi propiedad": "💵 Debes contactar a un perito o tasador autorizado para que realice el avalúo.",
    "que hacer si no estoy de acuerdo con el valor catastral": "⚖️ Puedes presentar una objeción dentro del plazo establecido y solicitar una revisión.",
    
    // Más preguntas
    "como hacer una consulta técnica": "⚙️ Puedes solicitar una consulta técnica en las oficinas de catastro presentando la documentación necesaria.",
    "que es una servidumbre de paso": "🛣️ Es un derecho que permite a una persona el uso de una parte de la propiedad de otra para acceder a su propiedad.",
    "como obtener un permiso de demolición": "🛠️ Necesitas presentar un aviso de demolición y pagar los derechos correspondientes.",
    "como verificar información sobre fraccionamientos": "🏘️ Puedes consultar la información en el portal de catastro o en las oficinas de atención al público.",
    "que hacer si tengo problemas con el pago del predial": "⚠️ Puedes acudir a las oficinas de tesorería para informarte sobre opciones de pago y regularización.",
    
    // Más respuestas
    "como hacer una consulta en línea": "💻 Puedes acceder al portal de catastro y seguir las instrucciones para realizar tu consulta.",
    "como cambiar el uso de suelo": "🔄 Debes presentar una solicitud formal con un proyecto técnico y realizar el pago correspondiente.",
    "que es un fraccionamiento": "🏘️ Un fraccionamiento es un desarrollo habitacional que divide un terreno en varias parcelas.",
    "que hacer si no tengo los documentos necesarios": "📄 Puedes consultar las alternativas en las oficinas de catastro para regularizar tu situación.",
    "como obtener asesoría técnica": "⚙️ Puedes solicitar asesoría técnica en las oficinas de catastro o a través del portal.",
    
    // Continuando
    "que es el impacto urbano": "🌆 El impacto urbano se refiere a cómo un desarrollo afecta a la comunidad y al medio ambiente.",
    "como hacer un levantamiento topográfico": "📏 Un levantamiento topográfico se realiza con equipos especializados y siguiendo normativas técnicas.",
    "que son las servidumbres": "🛣️ Las servidumbres son derechos que permiten el paso o uso de una propiedad ajena.",
    "como presentar una queja": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que es la consulta pública": "🗣️ La consulta pública permite a la comunidad participar en decisiones sobre cambios en el uso del suelo.",
    
    // Más preguntas
    "como obtener una copia de mi escritura": "📄 Puedes solicitar una copia de tu escritura en la notaría donde se realizó la firma.",
    "que hacer si necesito un avalúo": "💵 Debes contactar a un perito o tasador autorizado para realizar el avalúo de tu propiedad.",
    "que es un plano topográfico": "🗺️ Un plano topográfico es una representación gráfica detallada de la superficie terrestre y sus características.",
    "como verificar si estoy al corriente con mis pagos": "✅ Puedes consultar tu estado de pagos en el portal de catastro o en las oficinas.",
    "que pasos seguir para regularizar un predio": "⚖️ Debes presentar un diagnóstico técnico, pagar derechos y realizar la inscripción correspondiente.",
    
    // Más respuestas
    "como presentar un recurso de apelación": "📝 Debes presentar el recurso por escrito con justificación y dentro del plazo establecido.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    "como solicitar un permiso de uso temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un dictamen de impacto urbano": "🏙️ Es un análisis que evalúa cómo un proyecto afectará a la comunidad y el medio ambiente.",
    "como hacer un levantamiento de límites": "📏 Un levantamiento de límites se realiza con un topógrafo y requiere equipos específicos.",
    
    // Más preguntas
    "que hacer si tengo problemas con el vecino": "🔍 Puedes solicitar mediación en las oficinas de catastro para resolver el conflicto.",
    "como verificar el uso de suelo de mi propiedad": "🗺️ Puedes consultar el uso de suelo en el mapa catastral disponible en el portal de catastro.",
    "que requisitos hay para la licencia de construcción": "📜 Necesitas un plano arquitectónico, un dictamen estructural y realizar el pago de derechos.",
    "como presentar una queja sobre el catastro": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que requisitos hay para la consulta pública": "🗣️ Generalmente, debes presentar una solicitud y cumplir con ciertos criterios establecidos.",
    
    // Continuando
    "como obtener un permiso de uso temporal": "📝 Debes presentar una solicitud y pagar los derechos correspondientes en las oficinas de catastro.",
    "que es un dictamen de impacto urbano": "🏙️ Es un análisis que evalúa cómo un proyecto afectará a la comunidad y el medio ambiente.",
    "como hacer un levantamiento de límites": "📏 Un levantamiento de límites se realiza con un topógrafo y requiere equipos específicos.",
    "como obtener un avalúo de mi propiedad": "💵 Debes contactar a un perito o tasador autorizado para que realice el avalúo.",
    "que hacer si no estoy de acuerdo con el valor catastral": "⚖️ Puedes presentar una objeción dentro del plazo establecido y solicitar una revisión.",
    
    // Más respuestas
    "como hacer una consulta técnica": "⚙️ Puedes solicitar una consulta técnica en las oficinas de catastro presentando la documentación necesaria.",
    "que es una servidumbre de paso": "🛣️ Es un derecho que permite a una persona el uso de una parte de la propiedad de otra para acceder a su propiedad.",
    "como obtener un permiso de demolición": "🛠️ Necesitas presentar un aviso de demolición y pagar los derechos correspondientes.",
    "como verificar información sobre fraccionamientos": "🏘️ Puedes consultar la información en el portal de catastro o en las oficinas de atención al público.",
    "que hacer si tengo problemas con el pago del predial": "⚠️ Puedes acudir a las oficinas de tesorería para informarte sobre opciones de pago y regularización.",
    
    // Finalizando
    "como hacer una consulta en línea": "💻 Puedes acceder al portal de catastro y seguir las instrucciones para realizar tu consulta.",
    "como cambiar el uso de suelo": "🔄 Debes presentar una solicitud formal con un proyecto técnico y realizar el pago correspondiente.",
    "que es un fraccionamiento": "🏘️ Un fraccionamiento es un desarrollo habitacional que divide un terreno en varias parcelas.",
    "que hacer si no tengo los documentos necesarios": "📄 Puedes consultar las alternativas en las oficinas de catastro para regularizar tu situación.",
    "como obtener asesoría técnica": "⚙️ Puedes solicitar asesoría técnica en las oficinas de catastro o a través del portal.",
    
    // Más respuestas finales
    "que es el impacto urbano": "🌆 El impacto urbano se refiere a cómo un desarrollo afecta a la comunidad y al medio ambiente.",
    "como hacer un levantamiento topográfico": "📏 Un levantamiento topográfico se realiza con equipos especializados y siguiendo normativas técnicas.",
    "que son las servidumbres": "🛣️ Las servidumbres son derechos que permiten el paso o uso de una propiedad ajena.",
    "como presentar una queja": "📝 Puedes presentar una queja en las oficinas de atención al cliente o a través del portal en línea.",
    "que es la consulta pública": "🗣️ La consulta pública permite a la comunidad participar en decisiones sobre cambios en el uso del suelo.",
    
    // Mensaje por defecto
    "default": "No estoy seguro de entender. Prueba con alguna de estas opciones:\n\n• 'Consultar predio'\n• 'Pagar predial'\n• 'Valor catastral'\n• 'Regularizar predio'",
    "error": "⚠️ Ocurrió un error. Por favor intenta nuevamente o contacta a soporte técnico si el problema persiste."
};
    

    // Añadir mensaje al chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Manejar envío de mensajes
    function handleSendMessage() {
        const userText = userInput.value.trim();
        if (!userText) return;
        
        addMessage(userText, true);
        userInput.value = '';
        
        setTimeout(() => {
            const botText = botResponses[userText.toLowerCase()] || botResponses["default"];
            addMessage(botText, false);
        }, 500);
    }

    // Eventos
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSendMessage());

    // Mensaje inicial (solo primera vez)
    let firstOpen = true;
    icon.addEventListener('click', () => {
        if (firstOpen) {
            setTimeout(() => {
                addMessage("¡Hola! Pregúntame sobre trámites catastrales. Ejemplo: '¿Cómo pagar el predial?'", false);
            }, 300);
            firstOpen = false;
        }
    }, { once: true });
});


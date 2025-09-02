// =============================================
// FUNCIONES DE INICIALIZACIÓN Y CONFIGURACIÓN
// =============================================

/**
 * Crea partículas animadas para el fondo de la página
 */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;
    
    // Crear partículas con estilos aleatorios
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamaño aleatorio entre 5px y 20px
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria en el viewport
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Opacidad aleatoria entre 0.2 y 0.8
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        // Duración de animación aleatoria entre 10s y 25s
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Retraso aleatorio hasta 5s
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Configura un carrusel con funcionalidad de navegación automática y manual
 * @param {HTMLElement} container - Contenedor del carrusel
 * @param {number} intervalTime - Tiempo en milisegundos entre transiciones
 */
function setupCarousel(container, intervalTime) {
    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const dots = container.querySelectorAll('.carousel-dot');
    
    let currentIndex = 0;
    let interval;
    
    /**
     * Mueve el carrusel a la diapositiva especificada
     * @param {number} index - Índice de la diapositiva a mostrar
     */
    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar indicadores (dots)
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentIndex = index;
    }
    
    // Configurar eventos para los dots de navegación
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            goToSlide(index);
            startInterval();
        });
    });
    
    /**
     * Inicia el intervalo para la navegación automática
     */
    function startInterval() {
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        }, intervalTime);
    }
    
    // Iniciar la navegación automática
    startInterval();
    
    // Pausar la navegación automática al hacer hover
    container.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    // Reanudar la navegación automática al quitar el hover
    container.addEventListener('mouseleave', () => {
        startInterval();
    });
}

/**
 * Inicializa el slider de Transformación Digital con efectos 3D
 */
function initSlider() {
    let sliderItems = document.querySelectorAll('.slider .slider-item');
    let nextBtn = document.querySelector('.slider-next');
    let prevBtn = document.querySelector('.slider-prev');
    let dots = document.querySelectorAll('.slider-dot');
    
    // Salir si no hay elementos del slider
    if (!sliderItems.length || !nextBtn || !prevBtn) return;
    
    let active = 0;
    
    /**
     * Carga y muestra las diapositivas con efectos 3D
     */
    function loadShow() {
        // Actualizar indicadores (dots)
        dots.forEach((dot, index) => {
            if (index === active) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        let stt = 0;
        
        // Configurar diapositiva activa
        sliderItems[active].style.transform = `none`;
        sliderItems[active].style.zIndex = 1;
        sliderItems[active].style.filter = 'none';
        sliderItems[active].style.opacity = 1;
        
        // Configurar diapositivas a la derecha de la activa
        for (let i = active + 1; i < sliderItems.length; i++) {
            stt++;
            sliderItems[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
            sliderItems[i].style.zIndex = -stt;
            sliderItems[i].style.filter = 'blur(5px)';
            sliderItems[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        
        stt = 0;
        
        // Configurar diapositivas a la izquierda de la activa
        for (let i = active - 1; i >= 0; i--) {
            stt++;
            sliderItems[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
            sliderItems[i].style.zIndex = -stt;
            sliderItems[i].style.filter = 'blur(5px)';
            sliderItems[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }
    
    // Inicializar slider solo si hay elementos
    if (sliderItems.length > 0) {
        loadShow();
        
        // Evento para botón siguiente
        nextBtn.onclick = function() {
            active = active + 1 < sliderItems.length ? active + 1 : 0;
            loadShow();
        };
        
        // Evento para botón anterior
        prevBtn.onclick = function() {
            active = active - 1 >= 0 ? active - 1 : sliderItems.length - 1;
            loadShow();
        };
        
        // Añadir funcionalidad a los dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                active = index;
                loadShow();
            });
        });

        // Navegación automática cada 5 segundos
        setInterval(() => {
            active = active + 1 < sliderItems.length ? active + 1 : 0;
            loadShow();
        }, 5000);
    }
}

/**
 * Configura animaciones al hacer scroll
 */
function setupScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate');
    
    /**
     * Comprueba si los elementos deben animarse según su posición en el viewport
     */
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    // Comprobar al cargar la página
    checkScroll();
    
    // Comprobar al hacer scroll
    window.addEventListener('scroll', checkScroll);
}

/**
 * Configura efectos de animación para las estrellas de calificación
 */
function setupTestimonialStars() {
    const stars = document.querySelectorAll('.rating .star');
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            this.style.animation = 'rotateStar 0.8s ease-in-out';
        });
        
        star.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}



// =============================================
// MANEJO DE EVENTOS GLOBALES
// =============================================

/**
 * Maneja el evento de scroll para efectos en la barra de navegación
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}


/**
 * Configura el formulario de contacto con validación y envío a Gmail
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    // Salir si no existe el formulario
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validación básica
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;
        
        if (!nombre || !correo || !asunto || !mensaje) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }
        
        // Obtener valores del formulario
        const municipalidad = document.getElementById('municipalidad').value;
        const asuntoSelect = document.getElementById('asunto');
        const asuntoTexto = asuntoSelect.options[asuntoSelect.selectedIndex].text;
        
        // Crear el cuerpo del mensaje
        const cuerpo = 
            `Nombre: ${nombre}\n` +
            `Correo: ${correo}\n` +
            `Municipalidad: ${municipalidad}\n` +
            `Asunto: ${asuntoTexto}\n\n` +
            `Mensaje:\n${mensaje}`;
        
        // Codificar para URL
        const asuntoCodificado = encodeURIComponent(asuntoTexto);
        const cuerpoCodificado = encodeURIComponent(cuerpo);
        
        // Crear el enlace de Gmail
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=rs.siamsoft@gmail.com&su=${asuntoCodificado}&body=${cuerpoCodificado}`;
        
        // Mostrar mensaje de confirmación
        if (confirmationMessage) {
            confirmationMessage.style.display = 'block';
        }
        
        // Abrir Gmail después de un breve retraso para que el usuario vea el mensaje
        setTimeout(function() {
            window.open(gmailLink, '_blank');
            
            // Limpiar el formulario después de enviar
            contactForm.reset();
            
            // Ocultar el mensaje de confirmación después de 5 segundos
            if (confirmationMessage) {
                setTimeout(function() {
                    confirmationMessage.style.display = 'none';
                }, 5000);
            }
        }, 1000);
    });
}

/**
 * Configura la funcionalidad del menú hamburguesa
 */
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevenir el scroll del cuerpo cuando el menú está abierto
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar el menú al hacer clic en un enlace
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// =============================================
// INICIALIZACIÓN PRINCIPAL
// =============================================

/**
 * Función principal que inicializa todos los componentes cuando el DOM está listo
 */
function initializeApp() {
    // Crear partículas de fondo
    createParticles();
    
    // Configurar animaciones al hacer scroll
    setupScrollAnimation();
    
    // Inicializar slider de transformación digital
    initSlider();
    
    // Configurar formulario de contacto
    setupContactForm();
    
    // Configurar efectos para estrellas de calificación
    setupTestimonialStars();

    setupHamburgerMenu();
    
    // Configurar carrusel principal
    const largeCarousel = document.querySelector('.large-carousel');
    if (largeCarousel) {
        setupCarousel(largeCarousel, 5000); // 5 segundos entre transiciones
    }
    
    console.log('SIAMsoft - Aplicación inicializada correctamente');
}

// =============================================
// EVENT LISTENERS GLOBALES
// =============================================

// Configurar evento de scroll para la barra de navegación
window.addEventListener('scroll', handleNavbarScroll);

// Inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeApp);

// =============================================
// MANEJO DE ERRORES
// =============================================

// Manejar errores no capturados
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Manejar promesas rechazadas no capturadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada no manejada:', e.reason);
});
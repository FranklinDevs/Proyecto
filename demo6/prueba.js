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
                
                // Opacidad aleatoria entre 0.2 and 0.8
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
         * Configura el carrusel de municipalidades
         */
        function setupMunicipalitiesCarousel() {
            const carousel = document.getElementById('carousel');
            const indicatorsContainer = document.getElementById('indicators');
            const prevButton = document.getElementById('prev');
            const nextButton = document.getElementById('next');
            const overlay = document.getElementById('overlay');
            const overlayImg = document.getElementById('overlay-img');
            const closeBtn = document.getElementById('close-btn');
            
            // Array con imágenes de municipalidades
            const images = [
                'img/Imagen de WhatsApp 2025-09-01 a las 15.29.57_8907a2b3.jpg',
                'img/tramitedocumentario.png',
                'img/fimahuella.png',
                'img/image2.png',
                'img/image3.png',
                'img/Imagen de WhatsApp 2025-09-01 a las 15.29.57_1edc95d1.jpg',
                'img/Imagen de WhatsApp 2025-09-01 a las 15.29.57_6c2c6cc0.jpg',
            ];
            
            const totalItems = images.length;
            let currentIndex = 0;
            let autoSlideInterval;
            
            // Crear elementos del carrusel
            function createCarouselItems() {
                carousel.innerHTML = '';
                indicatorsContainer.innerHTML = '';
                
                // Crear elementos de carrusel
                for (let i = 0; i < totalItems; i++) {
                    const item = document.createElement('div');
                    item.className = 'carousel-item';
                    
                    const img = document.createElement('img');
                    img.src = images[i];
                    img.alt = `Municipalidad ${i + 1}`;
                    img.className = 'carousel-img';
                    
                    item.appendChild(img);
                    carousel.appendChild(item);
                    
                    // Crear indicadores
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    if (i === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => {
                        stopAutoSlide();
                        goToSlide(i);
                        startAutoSlide();
                    });
                    indicatorsContainer.appendChild(indicator);
                }
                
                updateCarousel();
            }
            
            // Función para actualizar el carrusel
            function updateCarousel() {
                const items = document.querySelectorAll('.carousel-item');
                const indicators = document.querySelectorAll('.indicator');
                
                items.forEach((item, index) => {
                    // Calcular la posición relativa al índice actual
                    let position = index - currentIndex;
                    
                    // Ajustar para el efecto de carrusel infinito
                    if (position < -totalItems/2) position += totalItems;
                    if (position > totalItems/2) position -= totalItems;
                    
                    // Aplicar transformaciones según la posición
                    if (position === 0) {
                        // Elemento central
                        item.style.transform = 'translateX(-50%) scale(1)';
                        item.style.opacity = '1';
                        item.style.zIndex = '5';
                        item.style.filter = 'blur(0)';
                        item.classList.add('active');
                    } else if (position === -1 || position === 1) {
                        // Elementos adyacentes
                        const translateX = position * 300;
                        item.style.transform = `translateX(calc(-50% + ${translateX}px)) scale(0.9)`;
                        item.style.opacity = '0.8';
                        item.style.zIndex = '4';
                        item.style.filter = 'blur(1px)';
                        item.classList.remove('active');
                    } else if (position === -2 || position === 2) {
                        // Elementos más lejanos
                        const translateX = position * 300;
                        item.style.transform = `translateX(calc(-50% + ${translateX}px)) scale(0.85)`;
                        item.style.opacity = '0.6';
                        item.style.zIndex = '3';
                        item.style.filter = 'blur(2px)';
                        item.classList.remove('active');
                    } else {
                        // Elementos fuera de vista
                        item.style.transform = 'translateX(calc(-50% + 800px)) scale(0.8)';
                        item.style.opacity = '0';
                        item.style.zIndex = '2';
                        item.style.filter = 'blur(3px)';
                        item.classList.remove('active');
                    }
                });
                
                // Actualizar indicadores
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            // Función para ir a un slide específico
            function goToSlide(index) {
                currentIndex = index;
                if (currentIndex < 0) currentIndex = totalItems - 1;
                if (currentIndex >= totalItems) currentIndex = 0;
                updateCarousel();
            }
            
            // Función para abrir imagen en overlay
            function openOverlay(imgSrc) {
                overlayImg.src = imgSrc;
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Función para cerrar overlay
            function closeOverlay() {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // Función para avanzar al siguiente slide
            function nextSlide() {
                goToSlide(currentIndex + 1);
            }
            
            // Función para retroceder al slide anterior
            function prevSlide() {
                goToSlide(currentIndex - 1);
            }
            
            // Función para iniciar la transición automática
            function startAutoSlide() {
                autoSlideInterval = setInterval(nextSlide, 3000); // Cambiar cada 3 segundos
            }
            
            // Función para detener la transición automática
            function stopAutoSlide() {
                clearInterval(autoSlideInterval);
            }
            
            // Event listeners para botones de navegación
            nextButton.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
            
            prevButton.addEventListener('click', function() {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
            
            // Event listeners para las imágenes
            carousel.addEventListener('click', function(e) {
                const item = e.target.closest('.carousel-item');
                if (item) {
                    const imgSrc = item.querySelector('img').src;
                    openOverlay(imgSrc);
                }
            });
            
            // Event listener para cerrar overlay
            closeBtn.addEventListener('click', closeOverlay);
            
            // Cerrar overlay al hacer clic fuera de la imagen
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeOverlay();
                }
            });
            
            // Pausar auto slide al pasar el ratón por encima
            carousel.addEventListener('mouseenter', stopAutoSlide);
            
            // Reanudar auto slide al quitar el ratón
            carousel.addEventListener('mouseleave', startAutoSlide);
            
            // Inicializar el carrusel y comenzar la transición automática
            createCarouselItems();
            startAutoSlide();
            
            // Navegación con teclado
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight') {
                    stopAutoSlide();
                    nextSlide();
                    startAutoSlide();
                } else if (e.key === 'ArrowLeft') {
                    stopAutoSlide();
                    prevSlide();
                    startAutoSlide();
                } else if (e.key === 'Escape') {
                    closeOverlay();
                }
            });
        }

        
        /**
         * Configura el slider de Transformación Digital
         */
        function setupSlider() {
            const track = document.querySelector('.slider-track');
            const items = document.querySelectorAll('.slider-item');
            const dots = document.querySelectorAll('.slider-dot');
            const prevBtn = document.querySelector('.slider-prev');
            const nextBtn = document.querySelector('.slider-next');
            
            let currentIndex = 0;
            const itemWidth = items[0].offsetWidth + 30; // Ancho + margen
            
            // Función para actualizar el slider
            function updateSlider() {
                // Calcular el desplazamiento para centrar el elemento activo
                const containerWidth = document.querySelector('.slider').offsetWidth;
                const offset = (containerWidth / 2) - (itemWidth / 2) - (currentIndex * itemWidth);
                track.style.transform = `translateX(${offset}px)`;
                
                // Actualizar clases active
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                });
                
                // Actualizar dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            // Event listeners para botones
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = items.length - 1;
                }
                updateSlider();
            });
            
            nextBtn.addEventListener('click', () => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            });
            
            // Event listeners para dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider();
                });
            });
            
            // Touch events para móviles
            let startX = 0;
            let endX = 0;
            
            track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, {passive: true});
            
            track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            }, {passive: true});
            
            function handleSwipe() {
                const diff = startX - endX;
                const swipeThreshold = 50;
                
                if (diff > swipeThreshold) {
                    // Swipe izquierda - siguiente
                    if (currentIndex < items.length - 1) {
                        currentIndex++;
                    } else {
                        currentIndex = 0;
                    }
                    updateSlider();
                } else if (diff < -swipeThreshold) {
                    // Swipe derecha - anterior
                    if (currentIndex > 0) {
                        currentIndex--;
                    } else {
                        currentIndex = items.length - 1;
                    }
                    updateSlider();
                }
            }
            
            // Recalcular en redimensionamiento
            window.addEventListener('resize', updateSlider);
            
            // Inicializar slider
            updateSlider();
            
            // Auto slide cada 5 segundos
            setInterval(() => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
        }

        // Inicializar el slider cuando el documento esté listo
        document.addEventListener('DOMContentLoaded', setupSlider);

        /**
         * Configura el modal de videos
         */
        function setupVideoModal() {
            const videoModal = document.getElementById('videoModal');
            const modalIframe = document.getElementById('modalIframe');
            const closeModal = document.getElementById('closeModal');
            const videoRectangles = document.querySelectorAll('.video-rectangle');
            const videoLabels = document.querySelectorAll('.video-label');
            
            // Función para extraer el ID de YouTube desde la URL del iframe
            function extractYouTubeId(iframeElement) {
                try {
                    const iframeSrc = iframeElement.querySelector('iframe').src;
                    // Busca el patrón /embed/ seguido del ID
                    const match = iframeSrc.match(/\/embed\/([a-zA-Z0-9_-]+)/);
                    return match ? match[1] : null;
                } catch (error) {
                    console.error("Error extrayendo ID de YouTube:", error);
                    return null;
                }
            }
            
            // Función para abrir el modal con el video
            function openVideoModal(videoId) {
                if (!videoId) {
                    console.error("No se pudo obtener el ID del video");
                    return;
                }
                
                // Configurar el iframe con autoplay
                modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Función para cerrar el modal
            function closeVideoModal() {
                videoModal.classList.remove('active');
                // Pausar el video al cerrar el modal
                modalIframe.src = '';
                document.body.style.overflow = 'auto';
            }
            
            // Event listeners para los rectángulos de video
            videoRectangles.forEach(rectangle => {
                rectangle.addEventListener('click', function() {
                    const videoId = extractYouTubeId(this);
                    openVideoModal(videoId);
                });
            });
            
            // Event listeners para los botones de video
            videoLabels.forEach(label => {
                label.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevenir que se active el evento del rectangle
                    
                    // Encontrar el rectangle de video correspondiente
                    const videoItem = this.closest('.video-item');
                    const videoRectangle = videoItem.querySelector('.video-rectangle');
                    const videoId = extractYouTubeId(videoRectangle);
                    
                    openVideoModal(videoId);
                });
            });
            
            // Event listener para cerrar el modal
            closeModal.addEventListener('click', closeVideoModal);
            
            // Cerrar modal al hacer clic fuera del contenido
            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            });
            
            // Cerrar modal con la tecla Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Eescape' && videoModal.classList.contains('active')) {
                    closeVideoModal();
                }
            });
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
            
            // Configurar carrusel de municipalidades
            setupMunicipalitiesCarousel();
            
            // Configurar slider de transformación digital
            setupSlider();
            
            // Configurar animaciones al hacer scroll
            setupScrollAnimation();
            
            // Configurar modal de videos
            setupVideoModal();
            
            // Configurar formulario de contacto
            setupContactForm();
            
            // Configurar efectos para estrellas de calificación
            setupTestimonialStars();

            // Configurar menú hamburguesa
            setupHamburgerMenu();
            
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
// JavaScript principal pour le portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation de tous les modules
    initCursorFollower();
    initHeaderScroll();
    initScrollAnimations();
    initProjectFilters();
    initProjectDetails();
    initContactForm();
    
    // Animation des points de données au chargement de la page
    animateDataPoints();
});

// ====== MODULE 1: CURSEUR PERSONNALISÉ ======
function initCursorFollower() {
    const cursor = document.querySelector('.cursor-follower');
    
    // Désactiver sur appareils tactiles
    if (window.matchMedia("(pointer: coarse)").matches) {
        cursor.style.display = 'none';
        return;
    }
    
    // Position initiale du curseur (hors écran)
    cursor.style.opacity = '0';
    
    // Suivi du curseur
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        if (cursor.style.opacity === '0') {
            cursor.style.opacity = '1';
        }
    });
    
    // Masquer le curseur quand il quitte la fenêtre
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
    
    // Effet sur les éléments cliquables
    const clickables = document.querySelectorAll('a, button, .project-card, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(226, 88, 34, 0.2)';
        });
        
        el.addEventListener('mouseout', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// ====== MODULE 2: HEADER AU SCROLL ======
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Changement de style du header au scroll
    window.addEventListener('scroll', () => {
        // Ajouter la classe scrolled au header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mettre à jour le lien actif dans la navigation
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Navigation en douceur
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Animation de la transition de page
                const transitionLayer = document.querySelector('.page-transition');
                transitionLayer.classList.add('active');
                
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        transitionLayer.classList.remove('active');
                    }, 500);
                }, 300);
            }
        });
    });
}

// ====== MODULE 3: ANIMATION AU SCROLL ======
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Récupérer le type d'animation depuis l'attribut data-animation
                const animation = entry.target.dataset.animation || 'fade-in';
                
                // Ajouter la classe d'animation
                entry.target.classList.add(animation);
                
                // Désactiver l'observation une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ====== MODULE 4: FILTRES DE PROJETS ======
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la catégorie à filtrer
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrer les projets
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    // Afficher tous les projets
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 100);
                } else {
                    // Vérifier si la carte appartient à la catégorie
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, 100);
                    } else {
                        card.classList.remove('fade-in');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ====== MODULE 5: DÉTAILS DES PROJETS ======
function initProjectDetails() {
    const projectLinks = document.querySelectorAll('.view-project');
    const projectDetails = document.querySelectorAll('.project-detail');
    const closeButtons = document.querySelectorAll('.close-project');
    const body = document.body;
    
    // Ouvrir les détails du projet
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer l'ID du projet à afficher
            const projectId = this.getAttribute('href');
            const projectDetail = document.querySelector(projectId);
            
            if (projectDetail) {
                // Désactiver le scroll de la page
                body.style.overflow = 'hidden';
                
                // Afficher les détails du projet
                projectDetail.style.display = 'block';
                setTimeout(() => {
                    projectDetail.classList.add('active');
                }, 10);
            }
        });
    });
    
    // Fermer les détails du projet
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectDetail = this.closest('.project-detail');
            
            // Masquer les détails du projet
            projectDetail.classList.remove('active');
            
            // Réactiver le scroll de la page après l'animation
            setTimeout(() => {
                projectDetail.style.display = 'none';
                body.style.overflow = 'auto';
            }, 500);
        });
    });
    
    // Navigation entre projets
    const navLinks = document.querySelectorAll('.nav-prev, .nav-next');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer l'ID du projet actuel et du projet cible
            const currentProject = this.closest('.project-detail');
            const targetProjectId = this.getAttribute('href');
            const targetProject = document.querySelector(targetProjectId);
            
            if (targetProject) {
                // Masquer le projet actuel
                currentProject.classList.remove('active');
                
                setTimeout(() => {
                    currentProject.style.display = 'none';
                    
                    // Afficher le projet cible
                    targetProject.style.display = 'block';
                    setTimeout(() => {
                        targetProject.classList.add('active');
                    }, 10);
                }, 500);
            }
        });
    });
    
    // Retour à la liste des projets
    const backButtons = document.querySelectorAll('.nav-back');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectDetail = this.closest('.project-detail');
            
            // Masquer les détails du projet
            projectDetail.classList.remove('active');
            
            // Réactiver le scroll de la page et défiler jusqu'à la section des projets
            setTimeout(() => {
                projectDetail.style.display = 'none';
                body.style.overflow = 'auto';
                
                const projectsSection = document.querySelector('#projects');
                window.scrollTo({
                    top: projectsSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 500);
        });
    });
}

// ====== MODULE 6: FORMULAIRE DE CONTACT ======
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'envoi du formulaire
            const submitButton = this.querySelector('button[type="submit"]');
            const formFields = this.querySelectorAll('input, textarea');
            
            // Désactiver le bouton pendant "l'envoi"
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            
            // Simuler un délai d'envoi
            setTimeout(() => {
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Réactiver le bouton
                submitButton.disabled = false;
                submitButton.textContent = 'Envoyer';
                
                // Afficher un message de confirmation
                const confirmation = document.createElement('div');
                confirmation.className = 'form-confirmation';
                confirmation.textContent = 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
                contactForm.appendChild(confirmation);
                
                // Supprimer le message après quelques secondes
                setTimeout(() => {
                    confirmation.remove();
                }, 5000);
            }, 1500);
        });
    }
}

// ====== MODULE 7: ANIMATIONS DÉCORATIVES ======
function animateDataPoints() {
    const points = document.querySelectorAll('.data-point');
    const lines = document.querySelectorAll('.data-line');
    
    // Animer les points de données
    points.forEach((point, index) => {
        setTimeout(() => {
            point.style.opacity = '1';
        }, 1000 + (index * 200));
    });
    
    // Animer les lignes de données
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transform = line.style.transform.replace('scaleX(0)', 'scaleX(1)');
            line.style.opacity = '0.3';
        }, 1200 + (index * 200));
    });
    
    // Animation de la grille au mouvement de souris
    const grid = document.querySelector('.grid-background');
    const hero = document.querySelector('.hero');
    
    if (grid && hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            
            grid.style.transform = `rotate(${x * 3}deg) scale(${1 + y * 0.1})`;
        });
    }
}

// ====== UTILITAIRES ======

// Fonction pour révéler les images
document.addEventListener('DOMContentLoaded', () => {
    const revealImages = document.querySelectorAll('.reveal-image');
    
    revealImages.forEach(container => {
        // Créer l'overlay de révélation s'il n'existe pas déjà
        if (!container.querySelector('.reveal-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'reveal-overlay';
            container.appendChild(overlay);
        }
        
        // Observer pour déclencher l'animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const overlay = container.querySelector('.reveal-overlay');
                    if (overlay) {
                        overlay.style.transform = 'translateX(100%)';
                    }
                    observer.unobserve(container);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(container);
    });
});
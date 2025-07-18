document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			e.preventDefault();

			const navLinks = document.querySelector('.nav-links');
			if (navLinks.classList.contains('active')) {
				navLinks.classList.remove('active');
				setTimeout(() => {
					window.scrollTo({
						top: target.offsetTop - 80,
						behavior: 'smooth'
					});
				}, 300);
			} else {
				window.scrollTo({
					top: target.offsetTop - 80,
					behavior: 'smooth'
				});
			}
		}
	});
});

// Бургер-меню
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
	navLinks.classList.toggle('active');
});

// Изменение хедера при скролле
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
	if (window.scrollY > 100) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});

// Отправка формы
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
	e.preventDefault();
	alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
	contactForm.reset();
});

// Анимация при загрузке
document.addEventListener('DOMContentLoaded', () => {
	const fadeElements = document.querySelectorAll('.fade-in');

	fadeElements.forEach(el => {
		el.style.opacity = '0';
	});

	setTimeout(() => {
		fadeElements.forEach((el, index) => {
			setTimeout(() => {
				el.style.animation = 'fadeIn 0.8s ease forwards';
			}, 200 * index);
		});
	}, 300);

	initTypingAnimation();
	initPortfolioModals();
});

// Hover эффекты для карточек услуг
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
	const setHover = (hover) => {
		card.style.transform = hover ? 'translateY(-10px)' : 'translateY(0)';
		card.style.boxShadow = hover
			? '0 10px 25px rgba(0, 0, 0, 0.1)'
			: '0 4px 12px rgba(0, 0, 0, 0.08)';
	};

	card.addEventListener('mouseenter', () => setHover(true));
	card.addEventListener('mouseleave', () => setHover(false));
	card.addEventListener('touchstart', () => setHover(true), { passive: true });
	card.addEventListener('touchend', () => setTimeout(() => setHover(false), 200));
});

// Анимация печатающегося кода
function initTypingAnimation() {
	const codeElement = document.querySelector('.typing-animation');
	if (!codeElement) return;

	const code = codeElement.textContent;
	codeElement.textContent = '';

	let i = 0;
	const speed = 40;

	function typeWriter() {
		if (i < code.length) {
			codeElement.textContent += code.charAt(i);
			i++;
			setTimeout(typeWriter, speed);
			codeElement.parentElement.scrollTop = codeElement.parentElement.scrollHeight;
		} else {
			codeElement.innerHTML = code + '<span class="blinking-cursor">|</span>';
		}
	}

	setTimeout(typeWriter, 1000);
}
// Portfolio Modal
function initPortfolioModals() {
	const modal = document.querySelector('.portfolio-modal');
	const modalClose = document.querySelector('.modal-close');
	const modalTitle = document.querySelector('.modal-title');
	const modalGallery = document.querySelector('.modal-gallery');
	const modalInfo = document.querySelector('.modal-info');
	const modalLink = document.querySelector('.modal-content .btn');
	const detailButtons = document.querySelectorAll('.portfolio-details-btn');

	// Данные для модальных окон (можно расширить)
	const projectsData = {
		1: {
			title: "Swift Star",
			images: [
				"swift1.png",
				"swift3.png"
			],
			description: [
				"<strong>Задача:</strong></br> - Разработка лендинга для пролвижения услуг по набору персонала под ключ. </br> - Создание логотипа",
				"<strong>Технологии: </strong>HTML, CSS, JavaScript, PHP",
				"<strong>Сроки:</strong> 1 неделя",
				"<strong>Результат:</strong> Продающий лендинг в премиальном минималистичном стиле, адаптированный под разные устройства и ОС"
			],
			link: "https://swift-star.ru"
		},
	};

	detailButtons.forEach(button => {
		button.addEventListener('click', () => {
			const projectId = button.getAttribute('data-project');
			const project = projectsData[projectId];

			// Заполняем модальное окно данными
			modalTitle.textContent = project.title;
			modalGallery.innerHTML = project.images.map(img =>
				`<img src="${img}" alt="${project.title}">`).join('');
			modalInfo.innerHTML = project.description.map(p =>
				`<p>${p}</p>`).join('');
			modalLink.href = project.link;

			// Показываем модальное окно
			modal.classList.add('active');
			document.body.style.overflow = 'hidden';
		});
	});

	modalClose.addEventListener('click', () => {
		modal.classList.remove('active');
		document.body.style.overflow = '';
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}

// Анимация шагов процесса
function initProcessAnimation() {
	const processSteps = document.querySelectorAll('.process-step');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const step = entry.target;
				const stepNumber = parseInt(step.getAttribute('data-step'));

				// Задержка для каждого шага
				setTimeout(() => {
					step.classList.add('active');
				}, 200 * stepNumber);
			}
		});
	}, {
		threshold: 0.3,
		rootMargin: '0px 0px -100px 0px'
	});

	processSteps.forEach(step => {
		observer.observe(step);
	});
}

// Вызовите эту функцию в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
	initProcessAnimation();
});


// FAQ Accordion
function initFAQAccordion() {
	const faqItems = document.querySelectorAll('.faq-item');

	faqItems.forEach(item => {
		const question = item.querySelector('.faq-question');

		question.addEventListener('click', () => {
			// Закрываем все открытые вопросы
			faqItems.forEach(otherItem => {
				if (otherItem !== item && otherItem.classList.contains('active')) {
					otherItem.classList.remove('active');
				}
			});

			// Открываем/закрываем текущий вопрос
			item.classList.toggle('active');
		});
	});
}

// Вызовите эту функцию в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
	initFAQAccordion();
	// ... остальной код инициализации
});

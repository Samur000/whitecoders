document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			e.preventDefault();

			// Закрываем меню если оно открыто (для мобильных)
			const navLinks = document.querySelector('.nav-links');
			if (navLinks.classList.contains('active')) {
				navLinks.classList.remove('active');

				// Даем время на анимацию закрытия меню
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

	// Здесь должна быть логика отправки формы
	alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
	contactForm.reset();
});

// Анимация при загрузке
document.addEventListener('DOMContentLoaded', () => {
	const fadeElements = document.querySelectorAll('.fade-in');

	fadeElements.forEach(el => {
		el.style.opacity = '0';
	});

	// Постепенное появление элементов
	setTimeout(() => {
		fadeElements.forEach((el, index) => {
			setTimeout(() => {
				el.style.animation = 'fadeIn 0.8s ease forwards';
			}, 200 * index);
		});
	}, 300);
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

	// Для тач-устройств
	card.addEventListener('touchstart', () => setHover(true), { passive: true });
	card.addEventListener('touchend', () => setTimeout(() => setHover(false), 200));
});


// Анимация печатающегося кода
function initTypingAnimation() {
	if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		const codeElement = document.querySelector('.typing-animation');
		if (codeElement) {
			codeElement.style.animation = 'none';
			codeElement.classList.remove('typing-animation');
		}
		return;
	}

	const codeElement = document.querySelector('.typing-animation');
	if (!codeElement) return;

	const code = codeElement.textContent;
	codeElement.textContent = '';

	let i = 0;
	const speed = 40; // скорость печати (меньше = быстрее)

	function typeWriter() {
		if (i < code.length) {
			codeElement.textContent += code.charAt(i);
			i++;
			setTimeout(typeWriter, speed);

			// Прокрутка вниз по мере наполнения
			codeElement.parentElement.scrollTop = codeElement.parentElement.scrollHeight;
		} else {
			// После завершения оставляем мигающий курсор
			codeElement.innerHTML = code + '<span class="blinking-cursor">|</span>';
		}
	}

	// Запускаем анимацию после небольшой задержки
	setTimeout(typeWriter, 1000);
}

// Добавляем вызов функции в обработчик загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
	// ... существующий код ...
	initTypingAnimation();
});

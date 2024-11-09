/* https://css-tricks.com/snippets/css/typewriter-effect/ */

const texts = [
  "Computer Graphics",
  "Statistics + ML",
  "Systems",
  "Manycore Enthusiast"
];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isPaused = false;
let isTypingComplete = false;
const typewriterElement = document.getElementById("typewriter");

const typingSpeed = 100;
const deletingSpeed = 40;
const pauseDuration = 200;
const pauseAfterTyping = 1500;

function type() {
  const currentText = texts[currentTextIndex];

  if (isPaused) {
    setTimeout(() => {
      isPaused = false;
      type();
    }, pauseDuration);
    return;
  }

  if (isTypingComplete) {
    setTimeout(() => {
      isDeleting = true;
      isTypingComplete = false;
      type();
    }, pauseAfterTyping);
    return;
  }

  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(
      0,
      currentCharIndex - 1
    );
    currentCharIndex--;
    if (currentCharIndex === 0) {
      isDeleting = false;
      isPaused = true;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
    }
  } else {
    typewriterElement.textContent = currentText.substring(
      0,
      currentCharIndex + 1
    );
    currentCharIndex++;
    if (currentCharIndex === currentText.length) {
      isTypingComplete = true;
    }
  }

  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

type();

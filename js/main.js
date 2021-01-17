const emailForm = document.querySelector("#email");
const resultText = document.querySelector(".result-text");
const fieldElements = [emailForm, resultText];
const submitBtn = document.querySelector("#submit");

emailForm.addEventListener("input", () => {
    if (emailForm.value == "") {
        fieldElements.forEach(el => {
            el.classList.remove("valid");
            el.classList.remove("error");
        })
    }
})

submitBtn.addEventListener("click", e => {
    e.preventDefault();

    validateEmail(emailForm.value);
})

function validateEmail(userEmail) {
    const emailPattern = /^([a-zA-Z]{1,})([\w \. \-]+)(\@[\w]{3,8})(\.[a-zA-Z]{2,4})(\.[a-zA-Z]{2,3})?$/;

    if (userEmail) {
        if (userEmail.match(emailPattern)) {
            addValidClass();
        } else {
            showError("invalid");
        }
    } else {
        showError("empty");
    }
}

function showError(err) {
    switch (err) {
        case "empty":
            resultText.textContent = "Please enter your email address";
            addErrorClass();
            break;
        case "invalid":
            resultText.textContent = "Check your email please"
            addErrorClass();
            break;
    }
}

function addErrorClass() {
    fieldElements.forEach(el => {
        el.classList.remove("valid");
        el.classList.add("error");
    })
}

function addValidClass() {
    fieldElements.forEach(el => {
        el.classList.remove("error");
        el.classList.add("valid");
    })

    resultText.textContent = "Valid email address"
}

const ctaBtn = document.querySelector(".primary-btn");

ctaBtn.addEventListener("click", e => {
    e.preventDefault();
    document.documentElement.style.scrollBehavior = "auto";
    smoothScroll();
})

function smoothScroll() {
    const targetElement = document.querySelector(".footer");
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (start === undefined) start = timestamp;

        const elapsed = timestamp - start;

        // window.scrollTo(0, distance*(elapsed/duration) + startPosition)

        window.scrollTo(0, ease(elapsed, startPosition, distance, duration))

        if (elapsed < duration) window.requestAnimationFrame(step);

        function ease(t, b, c, d) {
            t /= d;
            return c*t*t*t + b;
        };
    }

    setTimeout(() => document.documentElement.style.scrollBehavior = "smooth", 1000);
}
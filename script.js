const generateBtn = document.getElementById("generateBtn");
const passwordOutput = document.getElementById("passwordOutput");
const lengthInput = document.getElementById("length");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

generateBtn.addEventListener("click", () => {
  const type = document.querySelector('input[name="type"]:checked').value;
  const length = parseInt(lengthInput.value);

  if (!length || length <= 0) {
    message.textContent = "⚠️ Please enter a valid password length.";
    message.style.color = "#ff4444";
    return;
  }

  let chars = "";

  if (type === "letters") {
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  } else if (type === "numbers") {
    chars = "0123456789";
  } else if (type === "mixed") {
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordOutput.value = password;
  message.textContent = "✅ Password generated successfully!";
  message.style.color = "#00ff90";

  checkStrength(password);
});

copyBtn.addEventListener("click", () => {
  if (passwordOutput.value.trim() === "") {
    message.textContent = "⚠️ No password to copy!";
    message.style.color = "#ff4444";
    return;
  }
  navigator.clipboard.writeText(passwordOutput.value);
  message.textContent = "📋 Password copied to clipboard!";
  message.style.color = "#00ff90";
});

function checkStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  let strengthLevel = "";
  let color = "";

  if (strength <= 1) {
    strengthLevel = "Weak";
    color = "#ff4444";
    strengthBar.style.width = "33%";
  } else if (strength === 2 || strength === 3) {
    strengthLevel = "Medium";
    color = "#ffb400";
    strengthBar.style.width = "66%";
  } else {
    strengthLevel = "Strong";
    color = "#00ff90";
    strengthBar.style.width = "100%";
  }

  strengthBar.style.background = color;
  strengthText.textContent = strengthLevel;
  strengthText.style.color = color;
}


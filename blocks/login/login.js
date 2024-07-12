export default function decorate(block) {
  const userCredentials = [];
  const container = document.querySelector('.login');
  const userForm = document.createElement('form');
  userForm.setAttribute("id", "loginForm");
  const labelInput = document.createElement('label');
  labelInput.innerHTML = 'User Name';
  const userInput = document.createElement('input');
  userInput.type = 'text';
  userInput.name = 'username';
  userInput.id = 'username';
  userInput.placeholder = 'Enter a UserName';
  const pwdLabel = document.createElement('label');
  pwdLabel.innerHTML = 'Password';
  const pwdInput = document.createElement('input');
  pwdInput.type = 'password';
  pwdInput.name = 'password';
  pwdInput.id = 'password';
  pwdInput.placeholder = 'Enter a Password';
  const btnInput = document.createElement('button');
  btnInput.type = 'submit';
  btnInput.innerHTML = 'Login';
  container.append(userForm);
  userForm.appendChild(labelInput);
  userForm.appendChild(userInput);
  userForm.appendChild(pwdLabel)
  userForm.appendChild(pwdInput);
  userForm.appendChild(btnInput);


    // rows and columns to get the data
    [...block.children].forEach((row, r) => {
        const cols = row.children;
        if (cols.length >= 2) {  // at least two columns
            const username = cols[0].textContent.trim();
            const password = cols[1].textContent.trim();
            userCredentials.push({ username, password });
        }
    });

    // Check authenticatation
    const isAuthenticated = checkAuth();

    const currentPath = window.location.pathname;
    if(currentPath === '/develop' && isAuthenticated) {
        window.location.href = '/develop';
    }
    if (currentPath !== '/login' && !isAuthenticated) {
        window.location.href = '/login';
    }

    // If the user is on the login page and authenticated, redirect to the home page
    if (currentPath === '/login' && isAuthenticated) {
        window.location.href = '/';
    }

    // Handle login form 
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const enteredUsername = event.target.username.value;
        const enteredPassword = event.target.password.value;
        const authenticated = userCredentials.some(cred => cred.username === enteredUsername && cred.password === enteredPassword);
        if (authenticated) {      
            localStorage.setItem('authToken', 'your-auth-token');
            window.location.href = '/';
        } else {
            alert('Invalid credentials');
        }
    });

    function checkAuth() {
        
        const token = localStorage.getItem('authToken');
        if(token != null) {
            document.querySelector('.login-wrapper .login').style.display = 'none';
        }
        return token !== null;
    }

     // Timeout logic

     let timeout;
     const logoutAfterInactivity = () => {
         localStorage.removeItem('authToken');
         window.location.href = 'login';
     };

     const resetTimeout = () => {
        if (!checkAuth()) {
            removeActivityListeners();
            return;
        }
        timeout = setTimeout(logoutAfterInactivity, 20000);
    };
  
    const activityEvents = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    const addActivityListeners = () => {
        activityEvents.forEach(event => {
            document.addEventListener(event, resetTimeout);
        });
    };

    const removeActivityListeners = () => {
        activityEvents.forEach(event => {
            document.removeEventListener(event, resetTimeout);
        });
    };

    addActivityListeners();
    resetTimeout();
  }


  
document.querySelector('button[onclick="handleRegister()"]').addEventListener('click', handleRegister);

function handleRegister() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem.');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('Cadastro bem-sucedido:', userCredential.user);
      saveUserInfo(userCredential.user.uid, name, email);
      alert('Cadastro realizado com sucesso. Faça login para continuar.');
      toggleForms('login');
    })
    .catch(error => {
      console.error('Erro ao cadastrar:', error.message);
      alert('Erro: ' + error.message);
    });
}

function saveUserInfo(uid, name, email) {
  db.collection('usuarios').doc(uid).set({
    uid: uid,
    nome: name,
    email: email
  })
  .then(() => {
    console.log('Informações do usuário salvas com sucesso');
  })
  .catch(error => {
    console.error('Erro ao salvar informações do usuário:', error.message);
  });
}

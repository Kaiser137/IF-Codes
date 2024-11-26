document.getElementById('login-button').addEventListener('click', handleLogin);

function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('Login bem-sucedido:', userCredential.user);
      window.location.href = 'https://script.google.com/macros/s/AKfycbxRaNCnQq81ntg38NdVi_zRPJzYtFR-cllDBHbIMlcIlz3nnzbDM2824i1YpPj8czczfQ/exec';
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error.message);
      alert('Erro: ' + error.message);
    });
}

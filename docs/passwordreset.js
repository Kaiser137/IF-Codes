document.querySelector('button[onclick="handlePasswordReset()"]').addEventListener('click', handlePasswordReset);

function handlePasswordReset() {
  const email = document.getElementById('reset-email').value;

  auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('Email de redefinição de senha enviado');
      alert('Um link para redefinição de senha foi enviado para seu e-mail.');
      toggleForms('login');
    })
    .catch(error => {
      console.error('Erro ao enviar email de redefinição de senha:', error.message);
      alert('Erro: ' + error.message);
    });
}

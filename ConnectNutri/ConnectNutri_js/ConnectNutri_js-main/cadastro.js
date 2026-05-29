import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://cdfoxaisfwzhyrmlfgiy.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZm94YWlzZnd6aHlybWxmZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MjM3OTMsImV4cCI6MjA4MDE5OTc5M30.aLo40pPWcrnTZumnQfMSn04spI0tI_UItUaivQV9v1I";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const formData = new FormData(form);

  const senha = formData.get("senha").trim();
  const confirmar = formData.get("confirmarsenha").trim();

  // VALIDAR SENHAS
  if (senha !== confirmar) {

    alert("As senhas não coincidem!");
    return;

  }

  const email = formData.get("email").trim().toLowerCase();

  // CRIAR USUÁRIO NO AUTH
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password: senha
  });

  if (signUpError) {

    console.error("Erro no cadastro:", signUpError);

    alert("Erro ao cadastrar usuário: " + signUpError.message);

    return;

  }

  // PEGAR ID DO USUÁRIO
  const userId = signUpData.user.id;

  // SALVAR DADOS NA TABELA
  const { error: errorUsuarios } = await supabase
    .from("usuarios")
    .insert([{
      id: userId,
      nome: formData.get("nome").trim(),
      email: email,
      telefone: formData.get("telefone").trim()
    }]);

  if (errorUsuarios) {

    console.error("Erro ao salvar dados:", errorUsuarios);

    alert("Erro ao salvar dados: " + errorUsuarios.message);

    return;

  }

  // SUCESSO
  alert("Cadastro realizado com sucesso!");

  form.reset();

  window.location.href = "index.html";

});
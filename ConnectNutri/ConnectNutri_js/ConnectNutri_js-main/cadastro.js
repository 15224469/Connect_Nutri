import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://asorsiryghfeaaacurai.supabase.co";
const supabaseKey = "sb_publishable_3Kqws8GOkvFPeTdN7vk5Mw_PPk2UppT";
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const senha = formData.get("senha").trim();
  const confirmar = formData.get("confirmarsenha").trim();

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
    alert("Erro ao cadastrar: " + signUpError.message);
    return;
  }

  const userId = signUpData.user.id;

  // SALVAR NA TABELA PACIENTES (sem email!)
  const { error: errorPacientes } = await supabase
    .from("pacientes") // ✅ corrigido
    .insert([{
      id: userId,
      nome_completo: formData.get("nome").trim(), // ✅ nome correto da coluna
      telefone: formData.get("telefone").trim()
    }]);

  if (errorPacientes) {
    alert("Erro ao salvar dados: " + errorPacientes.message);
    return;
  }

  alert("Cadastro realizado com sucesso!");
  form.reset();
  window.location.href = "index.html";
});
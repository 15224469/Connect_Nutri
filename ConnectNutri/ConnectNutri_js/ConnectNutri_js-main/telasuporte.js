document.addEventListener('DOMContentLoaded', () => {
    // === 1. LÓGICA DO NOME DO USUÁRIO (PERFIL) ===
    const userProfileNameElement = document.querySelector('.profile-section span');
    const userName = 'Perfil'; 
    if (userProfileNameElement) {
        userProfileNameElement.textContent = userName;
    }

    // === 2. LÓGICA DO MENU DE NAVEGAÇÃO PRINCIPAL (INÍCIO, SUPORTE, CONSULTAS) ===
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            const linkHref = item.getAttribute('href'); 
            
            // Redireciona para a página correspondente. 
            // Se já estiver na página de suporte, o redirecionamento será inócuo.
            if (linkHref && linkHref !== '#') {
                window.location.href = linkHref;
            } else if (item.id === 'menu-suporte') {
                 // Opção para recarregar se for o link da página atual, mas o href deve ser o correto.
                 window.location.reload();
            }
        });
    });

    // === 3. LÓGICA DO MENU DROPDOWN DE PERFIL ===
    const profileBtn = document.getElementById('profile-btn');
    const dropdown = document.getElementById('profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    // Alternar visibilidade ao clicar no perfil
    if (profileBtn && dropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            dropdown.classList.toggle('active');
        });
    }

    // Fechar o menu se clicar em qualquer lugar fora dele
    document.addEventListener('click', (e) => {
        if (dropdown && dropdown.classList.contains('active')) {
            const userMenuWrapper = document.querySelector('.user-menu-wrapper');
            
            if (userMenuWrapper && !userMenuWrapper.contains(e.target)) {
                 dropdown.classList.remove('active');
            }
        }
    });

    // Ação do Botão Sair da Conta
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const confirmLogout = confirm;
            
            if (confirmLogout) {
                window.location.href = 'index.html'; // Altere para a URL correta de login
            }
        });
    }
});
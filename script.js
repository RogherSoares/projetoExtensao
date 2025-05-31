document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const resultadosContainer = document.querySelector('.resultados-container');

    // Oculta os resultados inicialmente
    resultadosContainer.style.display = 'none';

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Coleta os valores dos campos
        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const horas = document.getElementById('horas').value;
        const vagas = document.getElementById('vagas').value;

        // Cria um novo card de resultado
        const card = document.createElement('div');
        card.className = 'resultado-card';
        card.innerHTML = `
            <div class="resultado-titulo">${nome}</div>
            <div class="resultado-info"><strong>Endereço:</strong> ${endereco}</div>
            <div class="resultado-info"><strong>Telefone:</strong> ${telefone}</div>
            <div class="resultado-info"><strong>E-mail:</strong> ${email}</div>
            <div class="resultado-info"><strong>Horas Semanais:</strong> ${horas}</div>
            <div class="resultado-info"><strong>Vagas:</strong> ${vagas}</div>
        `;

        resultadosContainer.appendChild(card);

        // Exibe os resultados se estava oculto
        resultadosContainer.style.display = 'flex';

        // Limpa o formulário
        form.reset();
    });

    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 10) {
            // Celular: (XX) XXXXX-XXXX
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 6) {
            // Fixo: (XX) XXXX-XXXX
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            value = value.replace(/^(\d*)/, '($1');
        }
        e.target.value = value.trim();
    });
});
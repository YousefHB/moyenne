document.getElementById('calculer').addEventListener('click', function() {
    // Calcul des moyennes par matière
    const matieres = [
        { nom: "Math d'ing", dsId: "math_ing_ds", examId: "math_ing_exam", coeff: 2, module: "Mathématique" },
        { nom: "Probabilité", dsId: "prob_ds", examId: "prob_exam", coeff: 2, module: "Mathématique" },
        { nom: "Base de données", dsId: "bd_ds", examId: "bd_exam", coeff: 3, module: "Programmation" },
        { nom: "Langage C", dsId: "c_ds", examId: "c_exam", coeff: 3, module: "Programmation" },
        { nom: "Python", dsId: "python_ds", examId: "python_exam", coeff: 3, module: "Programmation" },
        { nom: "Web", dsId: "web_ds", examId: "web_exam", coeff: 2, module: "Programmation" },
        { nom: "Système d'exploitation", dsId: "sys_ds", examId: "sys_exam", coeff: 3, module: "Concept de Base de Système" },
        { nom: "Transmission", dsId: "trans_ds", examId: "trans_exam", coeff: 2, module: "Concept de Base de Système" },
        { nom: "Architecture ordinateur", dsId: "arch_ds", examId: "arch_exam", coeff: 2, module: "Architecture Système" },
        { nom: "Système logique", dsId: "log_ds", examId: "log_exam", coeff: 2, module: "Architecture Système" },
        { nom: "Français", dsId: "fr_ds", examId: "fr_exam", coeff: 3, module: "Divers" },
        { nom: "Comptabilité", dsId: "compta_ds", examId: "compta_exam", coeff: 1, module: "Divers" }
    ];

    // Calcul des moyennes par matière
    matieres.forEach(matiere => {
        const ds = parseFloat(document.getElementById(matiere.dsId).value) || 0;
        const exam = parseFloat(document.getElementById(matiere.examId).value) || 0;
        matiere.moyenne = (ds * 0.3) + (exam * 0.7);
    });

    // Calcul des moyennes par module
    const modules = {};
    matieres.forEach(matiere => {
        if (!modules[matiere.module]) {
            modules[matiere.module] = {
                total: 0,
                coeffTotal: 0,
                matieres: []
            };
        }
        modules[matiere.module].total += matiere.moyenne * matiere.coeff;
        modules[matiere.module].coeffTotal += matiere.coeff;
        modules[matiere.module].matieres.push(matiere);
    });

    // Affichage des moyennes par module
    const modulesContainer = document.getElementById('moyennes-modules');
    modulesContainer.innerHTML = '<h3>Moyennes par Module</h3>';

    for (const [nomModule, data] of Object.entries(modules)) {
        const moyenneModule = data.total / data.coeffTotal;
        const moduleDiv = document.createElement('div');
        moduleDiv.innerHTML = `
            <strong>${nomModule}:</strong> ${moyenneModule.toFixed(2)}/20
            <div class="details-matieres">
                ${data.matieres.map(m => `${m.nom}: ${m.moyenne.toFixed(2)}/20 (coeff ${m.coeff})`).join('<br>')}
            </div>
        `;
        modulesContainer.appendChild(moduleDiv);
    }

    // Calcul de la moyenne générale
    const totalGeneral = matieres.reduce((sum, matiere) => sum + (matiere.moyenne * matiere.coeff), 0);
    const coeffTotalGeneral = matieres.reduce((sum, matiere) => sum + matiere.coeff, 0);
    const moyenneGenerale = totalGeneral / coeffTotalGeneral;

    document.getElementById('moyenne-generale').innerHTML = `
        Moyenne Générale: <span style="color: ${moyenneGenerale >= 10 ? 'green' : 'red'}; font-size: 24px;">
            ${moyenneGenerale.toFixed(2)}/20
        </span>
    `;
});
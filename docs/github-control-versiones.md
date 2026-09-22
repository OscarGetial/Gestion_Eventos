# Control de Versiones en GitHub

## Repositorio real del equipo

**Repositorio:** [Gestion_Eventos](https://github.com/OscarGetial/Gestion_Eventos)

**URL:** https://github.com/OscarGetial/Gestion_Eventos

El repositorio proporcionado por el equipo fue verificado y actualmente aparece como **público y vacío**, por lo que el siguiente paso es subir la estructura y el código fuente de este proyecto. 

## Estructura a consolidar

```text
Gestion_Eventos/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── docs/
│   ├── jira-trazabilidad.md
│   ├── github-control-versiones.md
│   ├── scrum-daily.md
│   └── evidencias.html
├── jira/
│   └── jira-import.csv
├── .github/
├── .gitignore
└── README.md
```

## Flujo Git

```bash
git clone https://github.com/OscarGetial/Gestion_Eventos.git
cd Gestion_Eventos

git checkout -b feature/home-mobile-first
# copiar los archivos del proyecto
git add .
git commit -m "feat: maquetar Home Page responsive"
git push -u origin feature/home-mobile-first
```

Después, crear un Pull Request desde `feature/home-mobile-first` hacia `main`.

## Evidencia

- Repositorio: https://github.com/OscarGetial/Gestion_Eventos
- Issues: https://github.com/OscarGetial/Gestion_Eventos/issues
- Pull Requests: https://github.com/OscarGetial/Gestion_Eventos/pulls
- Projects: https://github.com/OscarGetial/Gestion_Eventos/projects


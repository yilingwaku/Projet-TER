# Projet-TER

Ce projet est développé en méthode de co-design avec les utilisateurs finaux. L'objectif est de mettre en relation des séniors et des étudiants en informatique afin de concevoir ensemble une solution permettant de prévenir les risques domestiques liés à l'âge.

## Responsables
Damien Pellier : damien.pellier@imag.fr<br>
Emmanuel MONFORT : emmanuel.monfort@univ-grenoble-alpes.fr<br>
Sidonie SALOME : sidonie.salome@univ-grenoble-alpes.fr<br>

## Utilisateurs
Anonymes

## Développeurs
Jinyang ZHANG : jinyang.zhang@etu.univ-grenoble-alpes.fr<br>
Adrien ZOFFRANIERI : adrien.zoffranieri@etu.univ-grenoble-alpes.fr<br>
Valentin LUGINBUHL : valentin.luginbuhl@etu.univ-grenoble-alpes.fr<br>

# 💿 - Install *Application***
Guide d'installation et de lancement de l'application web.

### Download
Télécharger NodeJS sur [le site](https://nodejs.org/fr).

### Move
Déplacez-vous dans le dossier de l'application.
```bash
cd app
```

### Dependencies
Installez les dépendances nécessaires aux lancement de l'application.
```
npm install
```
Si la fonction npm n'existe pas, installer NodeJs
[le site](https://nodejs.org/en)

Et ajouter le au PATH de votre machine
[tuto](https://www.java.com/fr/download/help/path.html)
Tuto pour Windows 8/10 :
```
1.Dans Rechercher, lancez une recherche et sélectionnez : Système (Panneau de configuration)
2.Cliquez sur le lien Paramètres système avancés.
3.Cliquez sur Variables d'environnement. Dans la section Variables système recherchez la variable d'environnement PATH et sélectionnez-la. Cliquez sur Modifier. Si la variable d'environnement PATH n'existe pas, cliquez sur Nouvelle.
4.Dans la fenêtre Modifier la variable système (ou Nouvelle variable système), indiquez la valeur de la variable d'environnement PATH. Cliquez sur OK. Fermez toutes les fenêtres restantes en cliquant sur OK.
5.Ouvrez à nouveau la fenêtre d'invite de commande et exécutez votre code Java.
```

### Run
Lancer l'application.
```
npm run dev
```

# 📀 Install *Model*
### ⚠️ **nécessaire au bon fonctionnement de l'application
Guide d'installation et de lancement du modèle d'intelligence artificielle.

### Download
Télécharger Ollama sur [le site](https://ollama.com/).

### Model
Télécharger le modèle de l'intelligence artificielle avec Ollama.
```
ollama pull llama3.2:3b
```
### ⚠️ optional
Arrêter ollama. La prochaine étape peut ne pas fonctionner si ollama est déjà démarré.<br><br>
**Linux / MacOS**
```bash
ps aux | grep ollama
pkill -f ollama
```
or **Windows (PowerShell)**
```bash
Get-Process | Where-Object { $_.Path -like "*ollama*" }
```

### Run
Lancer le serveur Ollama avec le modèle d'intelligence artificielle.
```
ollama serve ; ollama run llama3.2:3b
```

# 📀 Install *Services*
### ⚠️ **nécessaire au bon fonctionnement de l'application
Guide d'installation et de lancement des services.

### Move
Déplacez-vous dans le dossier des services.
```
cd services
```

### Environnement
Créez un environnement virtuel.

**Windows**
```
python -m venv env
```
Lancez l'environnement virtuel créer précédemment.<br><br>
**Windows (Shell)**
```
env\Scripts\activate
```
or **Windows (PowerShell)**
```
.\env\Scripts\Activate.ps1
```
or **Linux / MacOS**
```
source env/bin/activate
```

### ⚠️ optional
Désactiver l'environnement.
```
deactivate
```

### Dependencies
Installez les dépendances nécessaires aux lancement des services.
```
pip install -r requirements.txt
```

### Run
Lancer les services.
```
uvicorn main:app --reload
```

# 🐋 - Docker
### Download
Télécharger Docker sur [le site](https://www.docker.com/get-started/).

### Run
You can use Docker:
```bash
docker build -t sitomnia-image .
docker run -d -p 8000:8000 --name sitomnia-project sitomnia-image
```

# 📄 - Documentation
### Google Drive
Retrouvez la [documentation](https://drive.google.com/drive/folders/1JEOdc0krI__xdzLw-yLSniLKJ48SE4SS?usp=drive_link) liée au projet.

### Architectural Decision Record
Les décisions à propos de l'architecture du projet sont disponibles sur le [wiki du GitHub](https://github.com/yilingwaku/Projet-TER/wiki).

### Endpoints
Consultez la [documentation](docs/endpoints.md) pour plus de détails sur les routes disponibles pour les services.

# 🔧 - Gestion
### Trello
Consultez le [suivi du projet](https://trello.com/invite/67f694473f7d3ed3cd7583ed/ATTI3e14e70c17ee6e8dc61fcd186b7bd01f0AEBEF0B) pour plus de détails sur les fonctionnalités, attributions et délais.

### Figma
Vous retrouverez ici les diffèrentes propositions de prototypes de l'interface pour l'application web.<br><br>
Consultez le [prototype n°1](https://www.figma.com/design/bOfLwcAdD0OGfDwInZ7q42/todolist?node-id=0-1&t=YNuIGgAXkFNEhVJk-1).<br>
Consultez le [prototype n°2](https://www.figma.com/design/ijzuRty4xbBLMVeleVlhWO/Untitled?node-id=0-1&p=f&t=ISRgsWjFg27VHsAU-0).<br>

### Canva
Retrouvez la [présentation](https://www.canva.com/design/DAGcXbwDMwI/WpMSW9hnY3FrsqgDGyFeUA/edit?utm_content=DAGcXbwDMwI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) du projet.

# 🔗 - Sources
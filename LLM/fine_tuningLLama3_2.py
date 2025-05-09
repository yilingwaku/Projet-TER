import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

#Fonction pour  creer la requete sur le modèle demandé
def generate_with_ollama(prompt, model="llama3.2:latest"):
    payload = {
        "model": model, #Notre modèle
        "prompt": prompt, #Le prompt que l'utilisateur veut obtenir
        "stream": False  # Pour recevoir toute la réponse d’un coup
    }
    response = requests.post(OLLAMA_URL, json=payload)

    if response.status_code == 200:
        data = response.json()
        return data["response"]
    else:
        raise Exception(f"Erreur Ollama : {response.status_code} - {response.text}")

# Exemple d'utilisation
if __name__ == "__main__":
    question = "Explique la gravité en termes simples."
    réponse = generate_with_ollama(question)
    print("Réponse de LLaMA 3 :", réponse)
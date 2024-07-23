import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
    en: {
        translation: {
            "secret_santa_game": "Secret Santa Game",
            "add_player": "Add Player",
            "player_list": "Player List",
            "results": "Secret Santa Results",
            "add_player_success": "{{name}} successfully added!",
            "remove_player_success": "Player successfully removed!",
            "start_game": "Start Game",
            "start_game_error": "Please add at least 3 players.",
            "start_game_success": "Game started successfully!",
            "results_placeholder": "The results will appear here after starting the game.",
            "give_gift_to": "{{giver}} will give a gift to {{receiver}}",
            "invalid_name": "Please enter the name!",
            "name": "Name",
            "remove": "Remove"
        }
    },
    pt: {
        translation: {
            "secret_santa_game": "Amigo Secreto",
            "add_player": "Adicionar Jogador",
            "player_list": "Lista de Jogadores",
            "results": "Resultados do Amigo Secreto",
            "add_player_success": "{{name}} adicionado com sucesso!",
            "remove_player_success": "Jogador removido com sucesso!",
            "start_game": "Iniciar Jogo",
            "start_game_error": "Adicione pelo menos 3 jogadores.",
            "start_game_success": "Jogo iniciado com sucesso!",
            "results_placeholder": "Os resultados aparecerão aqui após iniciar o jogo.",
            "give_gift_to": "{{giver}} vai dar um presente para {{receiver}}",
            "invalid_name": "Por favor, insira o nome!",
            "name": "Nome",
            "remove": "Remover"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
});

export default i18n;
/**
 * 
 * Calcula a distância em km entre dois pontos geográficos usando a fórmula de Haversine.
 * @param {object} ponto1 - Objeto com { latitude, longitude }
 * @param {object} ponto2 - Objeto com { latitude, longitude }
 * @returns {number} A distância em quilômetros.
 */
export function calcularDistancia(ponto1, ponto2) {
    if (!ponto1 || !ponto2 || typeof ponto1.latitude !== 'number' || typeof ponto2.latitude !== 'number') {
        throw new Error("Pontos inválidos para calcular distância.");
    }

    // Tratar logo pontos idênticos
    if (ponto1.latitude === ponto2.latitude && ponto1.longitude === ponto2.longitude) {
        return 0.0;
    }

    // Constantes
    const MY_PI = 3.14159265358979323846;
    const R_EARTH = 6371.0; // Raio da Terra em km

    // Conversão para radianos
    const lat1 = (MY_PI * ponto1.latitude) / 180.0;
    const lat2 = (MY_PI * ponto2.latitude) / 180.0;
    const lon1 = (MY_PI * ponto1.longitude) / 180.0;
    const lon2 = (MY_PI * ponto2.longitude) / 180.0;

    // Seno das diferencas
    const sin_dlat2 = Math.sin((lat2 - lat1) / 2.0);
    const sin_dlon2 = Math.sin((lon2 - lon1) / 2.0);

    // Quadrado do seno do ângulo entre os pontos
    const sin2_ang =
        sin_dlat2 * sin_dlat2 +
        Math.cos(lat1) * Math.cos(lat2) * sin_dlon2 * sin_dlon2;

    // Distância entre os pontos (usando atan2 para estabilidade numérica)
    return 2.0 * R_EARTH * Math.atan2(Math.sqrt(sin2_ang), Math.sqrt(1 - sin2_ang));
}
import PontoRepository from '../repositories/ponto.repository.js';
import RotaRepository from '../repositories/rota.repository.js';
import { calcularDistancia } from '../utils/haversine.js';

class Noh {
    /**
     * @param {string} id_pt - ID do ponto (ex: "#1")
     * @param {string | null} id_rt - ID da rota que levou até aqui (ex: "&101A")
     * @param {number} g - Custo passado (real)
     * @param {number} h - Custo futuro (heurística)
     */
    constructor(id_pt, id_rt = null, g = 0.0, h = 0.0) {
        this.id_pt = id_pt;
        this.id_rt = id_rt;
        this.g = g;
        this.h = h;
    }

    // Custo total f = g + h
    f() {
        return this.g + this.h;
    }
}

class CaminhoService {
    /**
     * Calcula o caminho mais curto entre dois pontos usando A*.
     * @param {string} idOrigem - ID do ponto de origem
     * @param {string} idDestino - ID do ponto de destino
     * @returns {Promise<object>} Objeto com o resultado do cálculo
     */
    static async calculaCaminho(idOrigem, idDestino) {
        // Validar Pontos
        const pontoOrigem = await PontoRepository.findById(idOrigem);
        const pontoDestino = await PontoRepository.findById(idDestino);

        if (!pontoOrigem) {
            const error = new Error('Ponto de origem não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        if (!pontoDestino) {
            const error = new Error('Ponto de destino não encontrado.');
            error.statusCode = 404;
            throw error;
        }

        // Algoritmo A* 

        // No C++, 'Aberto' era uma std::list ordenada.
        // Aqui, é um array simples.
        const Aberto = [];

        // No C++, 'Fechado' era um std::vector.
        // Aqui, é um Map, que é mais rápido
        // A chave será a ID do ponto (ex: "#1"), e o valor será o 'Noh'
        const Fechado = new Map();

        // Cria nó inicial
        const hInicial = calcularDistancia(pontoOrigem, pontoDestino);
        const nohInicial = new Noh(idOrigem, null, 0.0, hInicial);
        Aberto.push(nohInicial);

        let solucaoEncontrada = false;
        let nohAtual = null;

        // Laço principal
        while (Aberto.length > 0) {
            // Ordena 'Aberto' pelo menor custo f()
            Aberto.sort((a, b) => a.f() - b.f());

            // Pega o nó de menor custo 
            nohAtual = Aberto.shift(); // .shift() remove e retorna o primeiro elemento

            // Move 'nohAtual' para 'Fechado'
            Fechado.set(nohAtual.id_pt, nohAtual);

            // Verifica se é o destino?
            if (nohAtual.id_pt === idDestino) {
                solucaoEncontrada = true;
                break; // se a solução foi encontrada, sai do laço
            }

            // Gera sucessores
            // Busca as rotas conectadas ao ponto atual
            const rotasConectadas = await RotaRepository.findAllConnectedToPoint(nohAtual.id_pt);

            for (const rota of rotasConectadas) {
                // Descobre a ID do ponto sucessor
                const idSucessor = rota.extremidades[0] === nohAtual.id_pt
                    ? rota.extremidades[1]
                    : rota.extremidades[0];

                // Verifica se o sucessor já está em 'Fechado'
                if (Fechado.has(idSucessor)) {
                    continue; // se já encontrou o melhor caminho para este nó, ignora.
                }

                // Calcula custos para o sucessor
                // Necessidade do ponto sucessor para calcular a heurística
                const pontoSucessor = await PontoRepository.findById(idSucessor);
                if (!pontoSucessor) continue; // se o ponto da rota não foi encontrado, ignora

                const g = nohAtual.g + rota.comprimento;
                const h = calcularDistancia(pontoSucessor, pontoDestino);
                const nohSucessor = new Noh(idSucessor, rota.id, g, h);

                // Verifica se o sucessor já está em 'Aberto'
                const nohExistenteEmAberto = Aberto.find(noh => noh.id_pt === idSucessor);

                if (nohExistenteEmAberto) {
                    // Se o caminho novo (nohSucessor) for pior, ignora
                    if (nohSucessor.f() >= nohExistenteEmAberto.f()) {
                        continue;
                    }
                    
                    // Se o caminho novo for melhor, remove o antigo de 'Aberto'
                    // O novo será adicionado logo abaixo
                    const index = Aberto.findIndex(noh => noh.id_pt === idSucessor);
                    Aberto.splice(index, 1);
                }

                // Adiciona o novo nó (ou o nó melhorado) em 'Aberto'
                Aberto.push(nohSucessor);
            }
        } // Fim do while

        // Processar Resultado
        const numAberto = Aberto.length;
        const numFechado = Fechado.size;

        if (!solucaoEncontrada) {
            return {
                mensagem: "Nenhum caminho foi encontrado.",
                comprimento: -1.0,
                numAberto,
                numFechado,
                caminho: []
            };
        }

        // Reconstruir Caminho
        // (O 'nohAtual' ainda é o nó de destino)
        const caminho = [];
        let nohCaminho = nohAtual;

        while (nohCaminho.id_rt !== null) { // Para no nó inicial
            const rota = await RotaRepository.findById(nohCaminho.id_rt);
            const ponto = await PontoRepository.findById(nohCaminho.id_pt);

            caminho.push({
                idPonto: ponto.id,
                nomePonto: ponto.nome,
                idRota: rota.id,
                nomeRota: rota.nome,
                comprimentoRota: rota.comprimento
            });

            // Encontra a outra extremidade da rota
            const idAntecessor = rota.extremidades[0] === nohCaminho.id_pt
                ? rota.extremidades[1]
                : rota.extremidades[0];

            // Pega o nó antecessor do Map 'Fechado'
            nohCaminho = Fechado.get(idAntecessor);
        }

        // Adiciona o ponto de origem (que não tem rota de chegada)
        const ponto = await PontoRepository.findById(nohCaminho.id_pt);
        caminho.push({
            idPonto: ponto.id,
            nomePonto: ponto.nome,
            idRota: null,
            nomeRota: null,
            comprimentoRota: 0
        });

        // O 'Caminho' em C++ era uma pilha, então o resultado saía na ordem correta
        // Aqui, é um array de trás para frente, então é preciso invertê-lo.
        return {
            mensagem: "Caminho encontrado com sucesso!",
            comprimento: nohAtual.g, // Custo 'g' do nó de destino
            numAberto,
            numFechado,
            caminho: caminho.reverse()
        };
    }
}

export default CaminhoService;
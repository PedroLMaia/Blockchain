const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, mensagem, hashAnterior = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.mensagem = mensagem;
        this.hashAnterior = hashAnterior;
        this.hash = this.calcularHash();
        this.nonce = 0;
    }

    calcularHash() {
        return SHA256(this.index + this.hashAnterior + this.timestamp + JSON.stringify(this.mensagem) + this.nonce).toString();
    }
    minerarBloco(dificuldade){
        while(this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join('0')){
            this.nonce++;
            this.hash = this.calcularHash();
        }

        console.log("Bloco minerado: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.criaBlockGenesis()];
        this.dificuldade = 5;
    }

    criaBlockGenesis() {
        return new Block(0, "29/08/2022", "Bloco genesis", "0");
    }

    getUltimoBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.hashAnterior = this.getUltimoBlock().hash;
        newBlock.minerarBloco(this.dificuldade);
        this.chain.push(newBlock);
    }

    validacaoDeChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const blocoAtual = this.chain[i];
            const blocoAnterior = this.chain[i - 1];

            if (blocoAtual.hash !== blocoAtual.calcularHash() || blocoAtual.hashAnterior !== blocoAnterior.hash) {
                return "Invalida";
            }
        }
        return "Validada!";
    }
}

let PedroCoin = new Blockchain();

console.log("\nMinerando bloco 1...")
PedroCoin.addBlock(new Block(1, "29/08/2022", "Primeiro"));
console.log("\nMinerando bloco 2...")
PedroCoin.addBlock(new Block(2, "30/08/2022", "Segundo"));
console.log("\nMinerando bloco 3...")
PedroCoin.addBlock(new Block(3, "30/08/2022", "Aula hoje"));
console.log("\nMinerando bloco 4...")
PedroCoin.addBlock(new Block(4, "30/08/2022", "Aula"));
console.log("\nMinerando bloco 5...")
PedroCoin.addBlock(new Block(5, "30/08/2022", "ir para casa!"));

console.log(JSON.stringify(PedroCoin, null, 2));
console.log("\nBlockChain valida? " +PedroCoin.validacaoDeChain() + "\n")

PedroCoin.chain[3].mensagem = "AHHHHHHHHHHHHHH";
PedroCoin.chain[3].hash = PedroCoin.chain[3].calcularHash();

console.log(JSON.stringify(PedroCoin, null, 2));

console.log("\nBlockChain valida? " +PedroCoin.validacaoDeChain() + "\n")
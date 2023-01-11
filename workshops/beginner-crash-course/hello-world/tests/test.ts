import {
    it,
    describe,
} from 'mocha'
import {
    Connection,
    Keypair,
    sendAndConfirmTransaction,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js'


function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(require('fs').readFileSync(path, "utf-8")))
    )
}


describe("hello-solana", () => {

    const connection = new Connection(`https://api.devnet.solana.com`, 'confirmed')
    const payer = createKeypairFromFile(require('os').homedir() + '/.config/solana/id.json')
    const program = createKeypairFromFile('./program/target/deploy/program-keypair.json')
  
    it("Say hello!", async () => {

        let ix = new TransactionInstruction({
            keys: [
                {pubkey: payer.publicKey, isSigner: true, isWritable: true}
            ],
            programId: program.publicKey,
            data: Buffer.alloc(0), // No data
        })

        await sendAndConfirmTransaction(
            connection, 
            new Transaction().add(ix),
            [payer]
        )
    })
  })
  
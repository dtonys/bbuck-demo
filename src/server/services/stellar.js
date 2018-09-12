/* eslint-disable */
const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server(process.env.STELLAR_HORIZON);
const StellarHdWallet = require('stellar-hd-wallet');
const wallet = StellarHdWallet.fromMnemonic(process.env.STELLAR_ROOT_MNEMONIC);

if (process.env.NODE_ENV === 'production') {
  StellarSdk.Network.usePublicNetwork();
} else {
  StellarSdk.Network.useTestNetwork();
}

// gets the list of epic friends
exports.createUserWallet = (account, newAccountKeypair) => {
  return server.loadAccount(process.env.STELLAR_FUNDING_ACCOUNT)
    .then((sourceAccount) => {
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
        .addOperation(StellarSdk.Operation.createAccount({
          destination: newAccountKeypair.publicKey(),
          startingBalance: '1.51'
        }))
        .addOperation(StellarSdk.Operation.changeTrust({
          asset: new StellarSdk.Asset(process.env.STELLAR_ASSET_CODE, process.env.STELLAR_ASSET_ISSUER),
          source: newAccountKeypair.publicKey()
        }))
        .build();

      transaction.sign(StellarSdk.Keypair.fromSecret(process.env.STELLAR_FUNDING_ACCOUNT_SECRET));
      transaction.sign(newAccountKeypair);

      // console.log(transaction.toEnvelope().toXDR().toString('base64'));
      // return Promise.resolve();
      return server.submitTransaction(transaction);
    })
    .catch((err) => {
      console.error(err);
      console.error('Funding account cannot be loaded. Wrong account or network?', err);
    });
};

exports.getAccount = (sequence) => {
  return wallet.getPublicKey(sequence);
};

exports.getKeypair = (sequence) => {
  return wallet.getKeypair(sequence);
}
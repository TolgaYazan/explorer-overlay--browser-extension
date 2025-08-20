import dotenv from 'dotenv';
dotenv.config();

import { Command } from 'commander';
import { Contract, JsonRpcProvider, formatUnits } from 'ethers';
import CometAbi from './abi/Comet.json';
import { loadEnv } from './config';

async function main(): Promise<void> {
  const env = loadEnv();
  const program = new Command();
  program.requiredOption('-a, --address <address>', 'Address to inspect').parse(process.argv);
  const { address } = program.opts<{ address: string }>();

  if (!env.COMET_ADDRESS) throw new Error('COMET_ADDRESS not set');
  const provider = new JsonRpcProvider(env.RPC_URL);
  const comet = new Contract(env.COMET_ADDRESS, CometAbi as any, provider);

  const [decimals, debt, healthy] = await Promise.all([
    comet.decimals().catch(() => 6),
    comet.borrowBalanceOf(address).catch(() => 0n),
    comet.isBorrowCollateralized(address).catch(() => true)
  ]);

  console.log({
    address,
    healthy,
    borrow: formatUnits(debt, decimals)
  });
}

main().catch((err) => { console.error(err); process.exit(1); }); 